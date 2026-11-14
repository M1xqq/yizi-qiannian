<script setup>
import { ref } from 'vue'
import Glyph from '../components/Glyph.vue'
import NatureIcon from '../components/NatureIcon.vue'

const emit = defineEmits(['launch'])
const step = ref(0)

// 龟甲上浮现的古文字
const marks = [
  { name: 'shan', x: 33, y: 26, d: 0.2, s: 15 },
  { name: 'ri', x: 62, y: 33, d: 0.6, s: 13 },
  { name: 'yue', x: 40, y: 52, d: 1.0, s: 12 },
  { name: 'mu', x: 63, y: 62, d: 1.4, s: 13 },
  { name: 'tian', x: 44, y: 76, d: 1.8, s: 11 }
]
</script>

<template>
  <section class="cover" :class="`step-${step}`">
    <div class="glow"></div>

    <header class="cover-head">
      <span class="seal">心纹</span>
      <div class="course">
        <b>一字千年</b>
        <span>穿越三千年的汉字奇妙之旅</span>
      </div>
      <span class="badge">心纹研学营 · 十楼探源</span>
    </header>

    <div class="cover-body">
      <div class="shell-wrap">
        <div class="shell">
          <NatureIcon type="gujia" class="shell-svg" />
          <span
            v-for="m in marks"
            :key="m.name"
            class="mark"
            :style="{ left: m.x + '%', top: m.y + '%', width: m.s + '%', '--d': m.d + 's' }"
          >
            <Glyph :name="m.name" />
          </span>
          <span class="halo"></span>
        </div>
        <p class="find">一九三六年 · 安阳殷墟 · 一片龟甲</p>
      </div>

      <div class="copy">
        <template v-if="step === 0">
          <div class="kicker"><i></i>第一幕 · 神秘文字登场</div>
          <h1>这些符号<br />是图画，还是文字？</h1>
          <p class="lead">
            三千多年前，有人把刀刻进龟甲。<br />
            刻下的，是我们今天还在写的字。
          </p>
          <button class="btn" @click="step = 1">揭晓答案 →</button>
        </template>

        <template v-else>
          <div class="answer-tag">答 案</div>
          <h2 class="answer">甲骨文</h2>
          <p class="answer-sub">距今约 <b>三千三百年</b>，商代人刻在龟甲、兽骨上的字。</p>
          <ul class="facts">
            <li>占卜之前，先把问题刻在甲骨上</li>
            <li>用火灼烧，看裂纹判断吉凶</li>
            <li>这是汉字最早的成熟形态</li>
          </ul>
          <button class="btn" @click="emit('launch')">开启千年之旅 →</button>
        </template>
      </div>
    </div>

    <footer class="cover-foot">
      <span v-if="step === 0">点击按钮或按 → 继续</span>
      <span v-else>接下来，我们一起回到商代</span>
    </footer>
  </section>
</template>

<style scoped>
.cover {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 27px 70px;
  background: radial-gradient(120% 90% at 32% 30%, #2a211a 0%, #17120f 46%, #0d0b0a 100%);
  color: #efe4cf;
  overflow: hidden;
}

.glow {
  position: absolute;
  left: 12%;
  top: 8%;
  width: 992px;
  height: 992px;
  max-width: 900px;
  max-height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 185, 122, 0.18), rgba(201, 185, 122, 0) 62%);
  pointer-events: none;
  animation: breathe 9s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 1; }
}

.cover-head {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 0 0 auto;
}

.cover-head .seal {
  background: #b73f42;
  box-shadow: 0 0 24px rgba(183, 63, 66, 0.5);
}

.course {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.course b {
  font-size: 26px;
  letter-spacing: 0.22em;
  color: #f3ead6;
}

.course span {
  font-size: 14px;
  letter-spacing: 0.16em;
  color: rgba(239, 228, 207, 0.5);
}

.badge {
  margin-left: auto;
  font-size: 14px;
  letter-spacing: 0.2em;
  color: rgba(201, 185, 122, 0.8);
  border: 1px solid rgba(201, 185, 122, 0.3);
  border-radius: 999px;
  padding: 7px 16px;
}

.cover-body {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 64px;
}

.shell-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 0;
}

.shell {
  position: relative;
  height: 522px;
  aspect-ratio: 0.78;
  color: rgba(201, 185, 122, 0.55);
  animation: push 14s ease-out forwards;
}

@keyframes push {
  from { transform: scale(0.94); }
  to { transform: scale(1.06); }
}

.shell-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 40px rgba(201, 185, 122, 0.18));
}

.mark {
  position: absolute;
  transform: translate(-50%, -50%);
  color: #e8cfa0;
  opacity: 0;
  animation: emerge 1.1s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  animation-delay: var(--d);
  filter: drop-shadow(0 0 10px rgba(232, 207, 160, 0.55));
}

@keyframes emerge {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
  to { opacity: 0.95; transform: translate(-50%, -50%) scale(1); }
}

.halo {
  position: absolute;
  inset: 4% 6%;
  border-radius: 50%;
  background: radial-gradient(
    58% 42% at 50% 50%,
    rgba(232, 207, 160, 0.12) 0%,
    rgba(232, 207, 160, 0.04) 45%,
    rgba(232, 207, 160, 0) 72%
  );
  animation: halo 7s ease-in-out infinite;
  pointer-events: none;
}

@keyframes halo {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1.03);
  }
}

.find {
  margin: 13px 0 0;
  font-size: 14px;
  letter-spacing: 0.22em;
  color: rgba(239, 228, 207, 0.42);
}

.copy {
  max-width: 34em;
  padding-bottom: 18px;
}

.kicker {
  color: #c9b97a;
}

.kicker i {
  background: rgba(201, 185, 122, 0.45);
}

.copy h1 {
  margin: 0.5em 0 0.6em;
  font-size: 50px;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: #f6efdf;
  white-space: nowrap;
}

.lead {
  font-size: 21px;
  line-height: 2;
  color: rgba(239, 228, 207, 0.66);
  margin-bottom: 27px;
}

.answer-tag {
  display: inline-block;
  font-size: 13px;
  letter-spacing: 0.4em;
  color: #c9b97a;
  border: 1px solid rgba(201, 185, 122, 0.35);
  padding: 5px 12px;
  border-radius: 4px;
}

.answer {
  margin: 0.35em 0 0.1em;
  font-size: 116px;
  letter-spacing: 0.16em;
  line-height: 1.1;
  color: #f6efdf;
  text-shadow: 0 0 60px rgba(201, 185, 122, 0.28);
}

.answer-sub {
  font-size: 20px;
  color: rgba(239, 228, 207, 0.66);
  margin: 0 0 1.2em;
}

.answer-sub b {
  color: #e8cfa0;
  font-weight: 600;
}

.facts {
  list-style: none;
  padding: 0;
  margin: 0 0 27px;
  display: grid;
  gap: 10px;
}

.facts li {
  position: relative;
  padding-left: 1.4em;
  font-size: 17px;
  color: rgba(239, 228, 207, 0.62);
}

.facts li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 0.7em;
  height: 1px;
  background: rgba(201, 185, 122, 0.6);
}

.cover-foot {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  text-align: center;
  font-size: 13px;
  letter-spacing: 0.3em;
  color: rgba(239, 228, 207, 0.3);
  padding-top: 9px;
}

</style>
