import assert from "node:assert/strict";
import { handler } from "../netlify/functions/send-estimate.js";

const originalFetch = globalThis.fetch;
const originalToken = process.env.TELEGRAM_BOT_TOKEN;
const originalChat = process.env.TELEGRAM_CHAT_ID;

process.env.TELEGRAM_BOT_TOKEN = "test-token";
process.env.TELEGRAM_CHAT_ID = "test-chat";

function multipartEvent({ request, photos }) {
  const boundary = "----carlabra-test-boundary";
  const chunks = [];

  function addField(name, value) {
    chunks.push(`--${boundary}\r\n`);
    chunks.push(`Content-Disposition: form-data; name="${name}"\r\n\r\n`);
    chunks.push(`${value}\r\n`);
  }

  function addFile(name, filename, contentType, value) {
    chunks.push(`--${boundary}\r\n`);
    chunks.push(
      `Content-Disposition: form-data; name="${name}"; filename="${filename}"\r\n`
    );
    chunks.push(`Content-Type: ${contentType}\r\n\r\n`);
    chunks.push(value);
    chunks.push("\r\n");
  }

  addField("request", JSON.stringify(request));

  photos.forEach((photo, index) => {
    addFile("photos", `damage-${index + 1}.jpg`, "image/jpeg", photo);
  });

  chunks.push(`--${boundary}--\r\n`);

  return {
    httpMethod: "POST",
    headers: {
      "content-type": `multipart/form-data; boundary=${boundary}`,
    },
    body: Buffer.from(chunks.join(""), "utf8").toString("base64"),
    isBase64Encoded: true,
  };
}

function estimateRequest() {
  return {
    name: "QA Test",
    phone: "+358 44 000 0000",
    email: "qa@example.com",
    car: "Volvo V60",
    parts: ["Door", "Front fender"],
    damage: "Medium damage",
    price: "813€ – 1050€",
  };
}

async function runWithFetchRecorder(event) {
  const calls = [];

  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: options.body });
    return {
      ok: true,
      async json() {
        return { ok: true };
      },
    };
  };

  const response = await handler(event);

  assert.equal(response.statusCode, 200, response.body);
  assert.deepEqual(JSON.parse(response.body), { ok: true });

  return calls;
}

const singlePhotoCalls = await runWithFetchRecorder(
  multipartEvent({
    request: estimateRequest(),
    photos: ["single-photo-bytes"],
  })
);

assert.equal(singlePhotoCalls.length, 2);
assert.ok(singlePhotoCalls[0].url.endsWith("/sendMessage"));
assert.ok(singlePhotoCalls[1].url.endsWith("/sendPhoto"));
assert.equal(singlePhotoCalls[1].body.get("photo").name, "damage-1.jpg");

const multiplePhotoCalls = await runWithFetchRecorder(
  multipartEvent({
    request: estimateRequest(),
    photos: ["photo-1", "photo-2", "photo-3", "photo-4"],
  })
);

assert.equal(multiplePhotoCalls.length, 2);
assert.ok(multiplePhotoCalls[0].url.endsWith("/sendMessage"));
assert.ok(multiplePhotoCalls[1].url.endsWith("/sendMediaGroup"));

const media = JSON.parse(multiplePhotoCalls[1].body.get("media"));
assert.equal(media.length, 3);
assert.deepEqual(
  media.map((item) => item.media),
  ["attach://photo0", "attach://photo1", "attach://photo2"]
);
assert.equal(multiplePhotoCalls[1].body.get("photo0").name, "damage-1.jpg");
assert.equal(multiplePhotoCalls[1].body.get("photo1").name, "damage-2.jpg");
assert.equal(multiplePhotoCalls[1].body.get("photo2").name, "damage-3.jpg");

globalThis.fetch = originalFetch;

if (originalToken === undefined) {
  delete process.env.TELEGRAM_BOT_TOKEN;
} else {
  process.env.TELEGRAM_BOT_TOKEN = originalToken;
}

if (originalChat === undefined) {
  delete process.env.TELEGRAM_CHAT_ID;
} else {
  process.env.TELEGRAM_CHAT_ID = originalChat;
}

console.log("Telegram upload tests passed.");
