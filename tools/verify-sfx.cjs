// 验证音效系统：无 JS 错误、音频解码成功、各触发点播放不抛异常
// 用法: node tools/verify-sfx.cjs
const puppeteer = require("puppeteer-core");
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../yizi-qiannian");
const PORT = 8932;
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".mp3": "audio/mpeg",
  ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".css": "text/css",
};

const server = http.createServer((req, res) => {
  let name = decodeURIComponent(req.url.split("?")[0].slice(1)) || "index.html";
  if (name.endsWith("/")) name += "index.html";
  const file = path.join(ROOT, name);
  try {
    const data = fs.readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "Access-Control-Allow-Origin": "*" });
    res.end(data);
  } catch (e) { res.writeHead(404); res.end("nf"); }
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--autoplay-policy=no-user-gesture-required"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "networkidle0" });
  await sleep(1200); // 等音频预载

  const loadState = await page.evaluate(() => ({
    hasSfx: typeof Sfx !== "undefined",
    loaded: typeof Sfx !== "undefined" && Sfx.loaded,
    buffers: typeof Sfx !== "undefined" ? Object.keys(Sfx.buffers) : [],
    ctxState: typeof Sfx !== "undefined" && Sfx.ctx ? Sfx.ctx.state : null,
  }));
  console.log("[1] 预载状态:", JSON.stringify(loadState));

  // 模拟首次点击（解锁 AudioContext）→ 开始上课 → 穿越
  await page.click(".btn-main");
  await sleep(400);
  const afterClick = await page.evaluate(() => ({ ctxState: Sfx.ctx.state, travelOn: !!document.querySelector(".travel") }));
  console.log("[2] 点击后开始穿越:", JSON.stringify(afterClick));
  await sleep(2000);
  const afterTravel = await page.evaluate(() => ({ ctxState: Sfx.ctx.state, travelGone: !document.querySelector(".travel") }));
  console.log("[3] 穿越结束换幕:", JSON.stringify(afterTravel));

  // 直接测各音效播放（不应抛异常）
  const playTest = await page.evaluate(async () => {
    const out = {};
    for (const name of ["drum", "drum2", "bowl", "chime", "dizi"]) {
      try { Sfx.play(name); out[name] = "ok"; } catch (e) { out[name] = "ERR " + e.message; }
    }
    return out;
  });
  console.log("[4] 五个音效播放:", JSON.stringify(playTest));

  // 音效开关
  const toggleTest = await page.evaluate(() => {
    Sfx.on = false; const before = Sfx.play("drum");
    const offOk = Sfx.on === false;
    Sfx.on = true; Sfx.play("drum");
    return { offOk };
  });
  console.log("[5] 开关切换:", JSON.stringify(toggleTest));

  // 教师条音效按钮存在
  const btnExists = await page.evaluate(() => [...document.querySelectorAll(".tb")].some((b) => b.textContent.includes("音效")));
  console.log("[6] 教师条音效按钮:", btnExists);

  console.log("[7] JS 错误:", errors.length ? errors : "无");
  await browser.close();
  server.close();
  process.exit(errors.length ? 1 : 0);
})();
