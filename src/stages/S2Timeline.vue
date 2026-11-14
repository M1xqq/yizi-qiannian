<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import StageFrame from '../components/StageFrame.vue'
import Glyph from '../components/Glyph.vue'
import { SCRIPT_STAGES } from '../data/glyphs.js'

const eras = ['约前1300年', '商周', '前221年 · 秦', '汉代', '今天']
const stages = SCRIPT_STAGES.map((s, i) => ({ ...s, era: eras[i] }))

const current = ref(0)
const auto = ref(true)
let timer = null

const active = computed(() => stages[current.value])

function stopAuto() {
  auto.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function tick() {
  if (current.value >= stages.length - 1) {
    stopAuto()
    return
  }
  current.value += 1
}

function start() {
  stopAuto()
  current.value = 0
  auto.value = true
  timer = setInterval(tick, 3400)
}

function pick(i) {
  stopAuto()
  current.value = i
}

onMounted(() => {
  timer = setInterval(tick, 3400)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <StageFrame
    kicker="第三幕 · 一个字，走了三千年"
    title="看「山」怎么变成今天的样子"
    sub="同一个字，换过五种写法。你会发现：越往后，越像我们今天写的字。"
    section="03 / 07"
  >
    <div class="wrap">
      <div class="display card">
        <div class="display-top">
          <span class="tag">{{ active.name }}</span>
          <span class="era">{{ active.era }}</span>
        </div>

        <div :key="active.key" class="big-glyph">
          <Glyph name="shan" :stage="active.key" />
        </div>

        <p class="note">{{ active.note }}</p>
        <div class="hint">这个字是 <b>山</b> —— {{ current === stages.length - 1 ? '和我们今天写的一样了。' : '继续看它怎么变。' }}</div>
      </div>

      <div class="timeline">
        <div class="rail"></div>
        <button
          v-for="(s, i) in stages"
          :key="s.key"
          class="node"
          :class="{ on: i === current, passed: i < current }"
          @click="pick(i)"
        >
          <span class="dot"></span>
          <span class="node-name">{{ s.name }}</span>
          <span class="node-era">{{ s.era }}</span>
        </button>
      </div>
    </div>

    <template #footer>
      <span class="ask">观察一下：哪些地方变了？有什么一直留着？</span>
      <button class="btn ghost" @click="start">{{ auto && current < stages.length - 1 ? '重新播放' : '重播演变' }}</button>
    </template>
  </StageFrame>
</template>

<style scoped>
.wrap {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 54px;
  width: 100%;
  max-width: 1420px;
  align-items: center;
}

.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  padding: 36px;
  min-height: 468px;
  justify-content: center;
  background:
    radial-gradient(120% 100% at 50% 0%, #fffdf9 0%, #fbf7ee 100%);
}

.display-top {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.tag {
  font-size: 23px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--cinnabar);
}

.era {
  font-size: 14px;
  color: var(--ink-4);
  letter-spacing: 0.1em;
}

.big-glyph {
  height: 270px;
  aspect-ratio: 1;
  color: var(--ink);
  display: grid;
  place-items: center;
  animation: glyphIn 0.5s cubic-bezier(0.2, 0.7, 0.3, 1) both;
}

@keyframes glyphIn {
  from {
    opacity: 0;
    transform: scale(0.88);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.big-glyph > :deep(*) {
  width: 100%;
  height: 100%;
}

.note {
  margin: 0;
  font-size: 17px;
  color: var(--ink-3);
  letter-spacing: 0.08em;
}

.hint {
  font-size: 16px;
  color: var(--ink-2);
}

.hint b {
  color: var(--cinnabar);
  font-size: 1.2em;
}

.timeline {
  position: relative;
  display: grid;
  gap: 13px;
  padding-left: 26px;
}

.rail {
  position: absolute;
  left: 7px;
  top: 12%;
  bottom: 12%;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--cinnabar-line), transparent);
}

.node {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid transparent;
  transition: all 0.28s ease;
  color: var(--ink-3);
}

.node:hover {
  background: rgba(255, 255, 255, 0.7);
}

.dot {
  position: absolute;
  left: -26px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--ink-4);
  transition: all 0.28s ease;
}

.node-name {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.node-era {
  font-size: 13px;
  color: var(--ink-4);
  white-space: nowrap;
}

.node.passed {
  color: var(--ink-2);
}

.node.passed .dot {
  background: var(--cinnabar);
  opacity: 0.5;
}

.node.on {
  background: var(--card);
  border-color: var(--cinnabar-line);
  box-shadow: var(--shadow-sm);
  color: var(--cinnabar);
  transform: translateX(6px);
}

.node.on .dot {
  background: var(--cinnabar);
  box-shadow: 0 0 0 5px var(--cinnabar-soft);
}

.ask {
  font-size: 18px;
  color: var(--cinnabar);
  letter-spacing: 0.04em;
}

</style>
