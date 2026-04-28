import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

function resolvePath(url) {
  const decoded = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = decoded === "/" ? "/index.html" : decoded;
  const fullPath = normalize(join(root, requested));

  if (!fullPath.startsWith(root)) {
    return null;
  }

  return fullPath;
}

const server = createServer(async (request, response) => {
  const fullPath = resolvePath(request.url || "/");

  if (!fullPath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(fullPath);

    if (!fileStat.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[extname(fullPath)] || "application/octet-stream",
    });
    createReadStream(fullPath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`CarLabra estimate tool running at http://${host}:${port}`);
});
