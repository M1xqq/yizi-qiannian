<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Glyph from '../components/Glyph.vue'
import { SCRIPT_STAGES } from '../data/glyphs.js'

const active = ref(0)
const playing = ref(true)
let timer = null

const stage = computed(() => SCRIPT_STAGES[active.value])
const isText = computed(() => stage.value.key === 'lishu' || stage.value.key === 'kaishu')

function pick(i) {
  active.value = i
  playing.value = false
  stop()
}

function start() {
  stop()
  timer = setInterval(() => {
    if (active.value >= SCRIPT_STAGES.length - 1) return stop()
    active.value += 1
  }, 2600)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  start()
  setTimeout(() => {
    if (playing.value) start()
  }, 400)
})

onBeforeUnmount(stop)
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第二幕 · 汉字的演变</p>
        <h1 class="stage-title">一个字，走过了三千年</h1>
        <p class="stage-sub">同一个「山」，被一代代人写了三千多年</p>
      </div>
      <span class="chip">{{ stage.era }} · {{ stage.name }}</span>
    </header>

    <div class="stage-body">
      <div class="wrap">
        <div class="hero">
          <div class="big" :class="{ text: isText }">
            <Transition name="morph" mode="out-in">
              <Glyph :key="stage.key" name="shan" :stage="stage.key" :draw="!isText" :speed="1.5" />
            </Transition>
          </div>

          <div class="explain">
            <p class="era">{{ stage.era }}</p>
            <h2>{{ stage.name }}</h2>
            <p class="note">{{ stage.note }}</p>
            <p class="tip">
              {{ active === SCRIPT_STAGES.length - 1 ? '这就是我们今天写的「山」。' : '点下面的时间轴，可以随时停在任何一个朝代。' }}
            </p>
          </div>
        </div>

        <div class="axis">
          <div class="rail"></div>
          <button
            v-for="(s, i) in SCRIPT_STAGES"
            :key="s.key"
            class="node"
            :class="{ on: i === active, done: i < active, edge: i === 0 || i === SCRIPT_STAGES.length - 1, first: i === 0, last: i === SCRIPT_STAGES.length - 1 }"
            :style="{ left: `${(i / (SCRIPT_STAGES.length - 1)) * 100}%` }"
            @click="pick(i)"
          >
            <span class="dot"></span>
            <span class="lab">{{ s.name }}</span>
            <span class="yr">{{ s.era }}</span>
          </button>
        </div>

        <div class="supplement">
          <span class="sup-label">再看一个：<b>日</b></span>
          <div class="minis">
            <figure v-for="s in SCRIPT_STAGES" :key="s.key" :class="{ on: s.key === stage.key }">
              <span class="mini" :class="{ text: s.key === 'lishu' || s.key === 'kaishu' }">
                <Glyph name="ri" :stage="s.key" />
              </span>
              <figcaption>{{ s.name }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  display: grid;
  gap: 12px;
}

.hero {
  display: grid;
  grid-template-columns: 380px 1fr;
  align-items: center;
  gap: 44px;
}

.big {
  height: 268px;
  margin-bottom: 34px;
  color: var(--brown);
  font-size: 200px;
  display: grid;
  place-items: center;
}

.big.text {
  color: var(--cinnabar);
  font-family: var(--kai);
}

.explain .era {
  margin: 0;
  font-size: 19px;
  letter-spacing: 0.3em;
  color: var(--bronze-deep);
}

.explain h2 {
  margin: 8px 0 0;
  font-size: 60px;
  letter-spacing: 0.06em;
  color: var(--brown);
}

.explain .note {
  margin: 10px 0 0;
  font-size: 26px;
  color: var(--ink-2);
}

.explain .tip {
  margin: 18px 0 0;
  font-size: 20px;
  color: var(--ink-4);
  letter-spacing: 0.02em;
}

/* 时间轴 */
.axis {
  position: relative;
  height: 96px;
  margin: 16px 74px 0;
}

.rail {
  position: absolute;
  left: 0;
  right: 0;
  top: 14px;
  height: 2px;
  background: linear-gradient(90deg, rgba(176, 138, 82, 0.35), rgba(183, 63, 66, 0.5));
}

.node {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 0;
}

/* 首尾节点向内侧对齐，避免标签被画布边缘裁掉 */
.node.first {
  transform: translateX(0);
  justify-items: start;
}

.node.last {
  transform: translateX(-100%);
  justify-items: end;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid rgba(176, 138, 82, 0.6);
  transition: all 0.25s ease;
}

.node.done .dot {
  background: var(--bronze);
  border-color: var(--bronze);
}

.node.on .dot {
  width: 22px;
  height: 22px;
  margin-top: -4px;
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  box-shadow: 0 0 0 6px rgba(183, 63, 66, 0.14);
}

.lab {
  font-size: 21px;
  font-weight: 600;
  color: var(--ink-2);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.node.on .lab {
  color: var(--cinnabar);
}

.yr {
  font-size: 15px;
  color: var(--ink-4);
  letter-spacing: 0.1em;
  white-space: nowrap;
}

/* 补充：日 */
.supplement {
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 14px 26px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(176, 138, 82, 0.18);
}

.sup-label {
  font-size: 20px;
  color: var(--ink-3);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.sup-label b {
  color: var(--cinnabar);
  font-size: 26px;
}

.minis {
  display: flex;
  gap: 12px;
  margin: 0;
}

.minis figure {
  margin: 0;
  display: grid;
  justify-items: center;
  gap: 2px;
  opacity: 0.55;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.minis figure.on {
  opacity: 1;
  transform: translateY(-2px);
}

.mini {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  color: var(--brown);
  font-size: 44px;
}

.mini.text {
  color: var(--cinnabar);
  font-family: var(--kai);
}

.minis figcaption {
  font-size: 14px;
  color: var(--ink-4);
}

.morph-enter-active,
.morph-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.morph-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.morph-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
