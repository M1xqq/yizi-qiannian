// 打包单文件版：把 index.html 的本地引用全部内联
//  - script（vue/glyphs）→ 内联文本
//  - png 图片 → 经无头浏览器 canvas 转 webp（保留透明，大幅瘦身）
//  - woff2 字体 / mp3 音效 → base64 data URI
// 输出: yizi-qiannian/_发送/一纸千年-课程页面-单文件版.html
// 用法: node tools/build-singlefile.cjs
const puppeteer = require("puppeteer-core");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../yizi-qiannian");
const OUT = path.join(ROOT, "_发送", "一纸千年-课程页面-单文件版.html");
const PORT = 8934;

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mp3": "audio/mpeg",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".css": "text/css",
};

const server = http.createServer((req, res) => {
  try {
    let name = decodeURIComponent(req.url.split("?")[0].slice(1)) || "index.html";
    const file = path.join(ROOT, name);
    const data = fs.readFileSync(file);
    if (res.headersSent) return;
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "Access-Control-Allow-Origin": "*" });
    res.end(data);
  } catch (e) {
    if (!res.headersSent) res.writeHead(404);
    res.end("nf");
  }
});

const base64 = (rel) => fs.readFileSync(path.join(ROOT, rel)).toString("base64");
const MIME_OF = { ".woff2": "font/woff2", ".mp3": "audio/mpeg" };

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

  // 1. 内联 script
  html = html.replace(
    /<script src="(vendor\/vue\.global\.prod\.js|glyphs\.js)"><\/script>/g,
    (m, p) => `<script>\n${fs.readFileSync(path.join(ROOT, p), "utf8")}\n</script>`
  );

  // 2. png → webp（无头浏览器 canvas）
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "domcontentloaded" });

  const pngRefs = [...html.matchAll(/(["'(])((?:assets)\/[^'")\s]+?\.png)\1/g)].map((m) => m[2]);
  const webpMap = {};
  for (const rel of [...new Set(pngRefs)]) {
    const uri = await page.evaluate(async (url) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("load fail " + url)); img.src = url; });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      return c.toDataURL("image/webp", 0.88);
    }, `http://127.0.0.1:${PORT}/${rel}`);
    webpMap[rel] = uri;
    console.log("webp:", rel, "->", Math.round(uri.length / 1024) + "KB(base64)");
  }
  await browser.close();

  html = html.replace(/(["'(])((?:assets)\/[^'")\s]+?\.png)\1/g, (m, q, rel) => q + (webpMap[rel] || m) + q);

  // 3. woff2 / mp3 → base64
  html = html.replace(/(["'(])((?:fonts|audio)\/[^'")\s]+?\.(?:woff2|mp3))\1/g, (m, q, rel) => {
    const ext = path.extname(rel).toLowerCase();
    return q + `data:${MIME_OF[ext]};base64,${base64(rel)}` + q;
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, html);
  const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
  console.log(`\n输出: ${OUT}`);
  console.log(`大小: ${mb} MB`);
  server.close();
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
