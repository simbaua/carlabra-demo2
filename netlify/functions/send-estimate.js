const MAX_PHOTOS = 3;
const TELEGRAM_API = "https://api.telegram.org";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function escapeTelegram(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseContentDisposition(value = "") {
  const result = {};

  for (const part of value.split(";")) {
    const [rawKey, ...rawValue] = part.trim().split("=");
    if (!rawValue.length) {
      continue;
    }

    result[rawKey] = rawValue.join("=").replace(/^"|"$/g, "");
  }

  return result;
}

function parseMultipartForm(event) {
  const contentType = event.headers["content-type"] || event.headers["Content-Type"] || "";
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

  if (!boundaryMatch) {
    throw new Error("Missing multipart boundary.");
  }

  const boundary = `--${boundaryMatch[1] || boundaryMatch[2]}`;
  const bodyBuffer = Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");
  const body = bodyBuffer.toString("binary");
  const fields = {};
  const files = [];

  for (const rawPart of body.split(boundary)) {
    if (!rawPart || rawPart === "--\r\n" || rawPart === "--") {
      continue;
    }

    const cleanPart = rawPart.replace(/^\r\n/, "").replace(/\r\n--$/, "");
    const separatorIndex = cleanPart.indexOf("\r\n\r\n");

    if (separatorIndex === -1) {
      continue;
    }

    const rawHeaders = cleanPart.slice(0, separatorIndex);
    let content = cleanPart.slice(separatorIndex + 4);

    if (content.endsWith("\r\n")) {
      content = content.slice(0, -2);
    }

    const headers = Object.fromEntries(
      rawHeaders.split("\r\n").map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.toLowerCase(), rest.join(":").trim()];
      })
    );
    const disposition = parseContentDisposition(headers["content-disposition"]);

    if (!disposition.name) {
      continue;
    }

    if (disposition.filename) {
      files.push({
        field: disposition.name,
        filename: disposition.filename,
        contentType: headers["content-type"] || "application/octet-stream",
        buffer: Buffer.from(content, "binary"),
      });
      continue;
    }

    fields[disposition.name] = Buffer.from(content, "binary").toString("utf8");
  }

  return { fields, files };
}

function buildTelegramMessage(request) {
  return `<b>New CarLabra estimate request</b>

<b>Customer:</b>
Name: ${escapeTelegram(request.name)}
Phone: ${escapeTelegram(request.phone)}
Email: ${escapeTelegram(request.email)}
Car: ${escapeTelegram(request.car)}

<b>Estimate:</b>
Parts: ${escapeTelegram(request.parts.join(", "))}
Damage level: ${escapeTelegram(request.damage)}
Estimated price: ${escapeTelegram(request.price)}

Source: Website`;
}

async function callTelegram(method, formData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const response = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    body: formData,
  });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.description || "Telegram API request failed.");
  }

  return payload;
}

async function sendMessage(chatId, text) {
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("text", text);
  formData.append("parse_mode", "HTML");
  await callTelegram("sendMessage", formData);
}

async function sendPhotos(chatId, photos) {
  const validPhotos = photos.filter((file) => file.field === "photos" && file.buffer.length).slice(0, MAX_PHOTOS);

  if (!validPhotos.length) {
    return;
  }

  if (validPhotos.length === 1) {
    const [photo] = validPhotos;
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", new Blob([photo.buffer], { type: photo.contentType }), photo.filename);
    await callTelegram("sendPhoto", formData);
    return;
  }

  const formData = new FormData();
  const media = validPhotos.map((photo, index) => {
    const attachmentName = `photo${index}`;
    formData.append(attachmentName, new Blob([photo.buffer], { type: photo.contentType }), photo.filename);
    return {
      type: "photo",
      media: `attach://${attachmentName}`,
    };
  });

  formData.append("chat_id", chatId);
  formData.append("media", JSON.stringify(media));
  await callTelegram("sendMediaGroup", formData);
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return jsonResponse(500, { error: "Telegram environment variables are not configured." });
  }

  try {
    const { fields, files } = parseMultipartForm(event);
    const request = JSON.parse(fields.request || "{}");

    if (!request.name || !request.phone || !request.parts?.length || !request.damage || !request.price) {
      return jsonResponse(400, { error: "Missing required estimate request fields." });
    }

    await sendMessage(chatId, buildTelegramMessage(request));
    await sendPhotos(chatId, files);

    return jsonResponse(200, { ok: true });
  } catch (error) {
    return jsonResponse(500, { error: error.message || "Failed to send Telegram notification." });
  }
}
