<script setup>
import { ref } from 'vue'
import StageFrame from '../components/StageFrame.vue'
import Glyph from '../components/Glyph.vue'
import NatureIcon from '../components/NatureIcon.vue'

const pairs = [
  { nature: 'sun', glyph: 'ri', char: '日', line: '一个圆，中间一短横：太阳的样子。' },
  { nature: 'mountain', glyph: 'shan', char: '山', line: '三个尖尖的山峰，中间最高。' },
  { nature: 'tree', glyph: 'mu', char: '木', line: '上有枝、中有干、下有根的一棵树。' }
]

const shown = ref(1)
const demoKey = ref(0)

function more() {
  if (shown.value < pairs.length) shown.value += 1
}

function replay() {
  shown.value = 1
  demoKey.value += 1
}
</script>

<template>
  <StageFrame
    kicker="第二幕 · 穿越三千年"
    title="商代人怎么写字？"
    sub="他们把字刻在龟甲和兽骨上，用来问天、记事——这就是「甲骨文」。"
    section="02 / 07"
  >
    <div class="grid">
      <div class="left">
        <div class="card relic">
          <div class="relic-icons">
            <div class="relic-item">
              <NatureIcon type="gujia" />
              <span>龟甲</span>
            </div>
            <div class="relic-item">
              <NatureIcon type="bone" />
              <span>兽骨</span>
            </div>
          </div>
          <ul>
            <li>先写后刻：毛笔书写，刀刻成文</li>
            <li>内容多是占卜：下雨吗？收成好吗？</li>
            <li>字很细，笔画又直又硬</li>
          </ul>
        </div>
        <p class="note">这些字为什么长得像画？往下看。</p>
      </div>

      <div class="right" :key="demoKey">
        <div
          v-for="(p, i) in pairs"
          :key="p.glyph"
          class="pair"
          :class="{ show: i < shown, ghost: i >= shown }"
          :style="{ '--d': i * 0.1 + 's' }"
        >
          <div class="cell nature-cell">
            <div class="art"><NatureIcon :type="p.nature" /></div>
            <span class="cap">看到</span>
          </div>
          <span class="arrow">→</span>
          <div class="cell glyph-cell">
            <div class="art"><Glyph :name="p.glyph" /></div>
            <span class="cap">甲骨文</span>
          </div>
          <span class="arrow">→</span>
          <div class="cell char-cell">
            <div class="art"><b>{{ p.char }}</b></div>
            <span class="cap">今天的字</span>
          </div>
          <p class="line">{{ p.line }}</p>
          <span v-if="i >= shown" class="lock">?</span>
        </div>
      </div>
    </div>

    <template #footer>
      <button v-if="shown < pairs.length" class="btn" @click="more">再看一个字 →</button>
      <template v-else>
        <span class="ask">你发现了吗——古人造字，先看世界，再画下来。</span>
        <button class="btn ghost" @click="replay">重新演示</button>
      </template>
    </template>
  </StageFrame>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 48px;
  width: 100%;
  max-width: 1500px;
  align-items: stretch;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}

.relic {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relic-icons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.relic-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 13px 8px;
  border-radius: 14px;
  background: linear-gradient(160deg, #fdfbf6, #f4eee2);
  border: 1px solid rgba(42, 42, 42, 0.05);
  color: var(--ink-2);
}

.relic-item > :first-child {
  width: min(76%, 96px);
  aspect-ratio: 1;
}

.relic-item span {
  font-size: 14px;
  color: var(--ink-3);
  letter-spacing: 0.16em;
}

.relic ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 9px;
}

.relic li {
  position: relative;
  padding-left: 1.15em;
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-2);
}

.relic li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.78em;
  width: 0.55em;
  height: 1px;
  background: var(--cinnabar);
  opacity: 0.7;
}

.note {
  margin: 0 0 0 4px;
  font-size: 14px;
  color: var(--ink-4);
  letter-spacing: 0.06em;
}

.right {
  display: grid;
  gap: 14px;
  align-content: center;
}

.pair {
  position: relative;
  display: grid;
  grid-template-columns: 92px auto 92px auto 92px;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: start;
  column-gap: 16px;
  row-gap: 6px;
  padding: 14px 24px;
  border-radius: 18px;
  background: var(--card);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(42, 42, 42, 0.05);
  opacity: 0;
  transform: translateY(14px) scale(0.985);
  transition: opacity 0.5s ease var(--d), transform 0.5s cubic-bezier(0.2, 0.7, 0.3, 1) var(--d);
}

.pair.show {
  opacity: 1;
  transform: none;
}

.pair.ghost .cell,
.pair.ghost .arrow {
  opacity: 0.1;
  filter: blur(1.5px);
}

.pair.ghost {
  opacity: 1;
  transform: none;
  border-style: dashed;
  box-shadow: none;
  background: rgba(255, 255, 255, 0.5);
}

.pair.ghost .line {
  visibility: hidden;
}

.lock {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  font-size: 34px;
  color: var(--ink-4);
  font-weight: 700;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--ink);
  transition: opacity 0.3s ease;
}

.art {
  height: 84px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  width: 100%;
}

.art > :deep(*) {
  width: 100%;
  height: 100%;
}

.char-cell b {
  font-size: 48px;
  line-height: 1;
  font-weight: 500;
  font-family: var(--kai);
}

.cap {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--ink-4);
  white-space: nowrap;
}

.arrow {
  color: var(--cinnabar);
  opacity: 0.45;
  font-size: 20px;
  align-self: center;
}

.line {
  grid-column: 1 / -1;
  justify-self: end;
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--ink-4);
  letter-spacing: 0.04em;
}

.glyph-cell {
  color: var(--cinnabar);
}

.nature-cell {
  color: var(--ink-2);
}

.ask {
  font-size: 18px;
  color: var(--cinnabar);
  letter-spacing: 0.06em;
}

</style>
