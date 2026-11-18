// 分析 audio/ 目录下 MP3 的能量分布（RMS/峰值，每 0.1s 一格）
// 用法: node tools/analyze-audio.js
const puppeteer = require("puppeteer-core");
const http = require("http");
const fs = require("fs");
const path = require("path");

const AUDIO_DIR = path.resolve(__dirname, "../../yizi-qiannian/audio");
const PORT = 8931;

const MIME = { ".mp3": "audio/mpeg", ".html": "text/html" };

const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split("?")[0].slice(1)) || "index.html";
  const file = path.join(AUDIO_DIR, name);
  try {
    const data = fs.readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Access-Control-Allow-Origin": "*" });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end("nf");
  }
});

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const files = fs.readdirSync(AUDIO_DIR).filter((f) => f.endsWith(".mp3"));

  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: "new",
    args: ["--autoplay-policy=no-user-gesture-required"],
  });
  const page = await browser.newPage();
  page.on("console", (m) => console.log("[page]", m.text()));
  page.on("pageerror", (e) => console.error("[err]", e.message));

  const report = await page.evaluate(async (files, port) => {
    const ctx = new AudioContext();
    const out = {};
    for (const f of files) {
      try {
        const buf = await (await fetch(`http://127.0.0.1:${port}/${encodeURIComponent(f)}`)).arrayBuffer();
        const audio = await ctx.decodeAudioData(buf);
        const ch = audio.getChannelData(0);
        const sr = audio.sampleRate;
        const rows = [];
        for (let t = 0; t < audio.duration; t += 0.1) {
          const s = Math.floor(t * sr);
          const e = Math.min(ch.length, Math.floor((t + 0.1) * sr));
          let sum = 0, peak = 0;
          for (let i = s; i < e; i++) {
            const v = ch[i];
            sum += v * v;
            if (Math.abs(v) > peak) peak = Math.abs(v);
          }
          rows.push(`${t.toFixed(1)}:${Math.sqrt(sum / (e - s)).toFixed(3)}/${peak.toFixed(2)}`);
        }
        out[f] = `dur=${audio.duration.toFixed(1)}s ch=${audio.numberOfChannels} sr=${sr}\n  ` + rows.join(" ");
      } catch (e) {
        out[f] = "ERROR " + e.message;
      }
    }
    return out;
  }, files, PORT);

  for (const [f, txt] of Object.entries(report)) {
    console.log(`\n===== ${f} =====`);
    console.log(txt);
  }

  await browser.close();
  server.close();
  process.exit(0);
})();
