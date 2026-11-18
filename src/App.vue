<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import TeacherBar from './components/TeacherBar.vue'
import S0Cover from './stages/S0Cover.vue'
import S1Shang from './stages/S1Shang.vue'
import S2Xiangxing from './stages/S2Xiangxing.vue'
import S3Timeline from './stages/S3Timeline.vue'
import S4Guess from './stages/S4Guess.vue'
import S5Facts from './stages/S5Facts.vue'
import S6Match from './stages/S6Match.vue'
import S7End from './stages/S7End.vue'
import S8Extra from './stages/S8Extra.vue'
import { loadSfx, playSfx, setSfxOn } from './audio/sfx'

/* 与《一纸千年》大纲一一对应 */
const stages = [
  { title: '① 神秘文字登场', comp: S0Cover },
  { title: '② 回到商代', comp: S1Shang },
  { title: '② 认识象形字', comp: S2Xiangxing },
  { title: '② 汉字演变', comp: S3Timeline },
  { title: '③ 猜猜乐', comp: S4Guess },
  { title: '④ 冷知识', comp: S5Facts },
  { title: '⑤ 配对挑战', comp: S6Match },
  { title: '⑥ 回到现代', comp: S7End },
  { title: '⑦ 弹性时间', comp: S8Extra }
]

const index = ref(0)
const runId = ref(0)
const warping = ref(false)
const elapsed = ref(0)
const isFullscreen = ref(false)
const paused = ref(false)
const soundOn = ref(true)
const scale = ref(1)

function fit() {
  scale.value = Math.min(window.innerWidth / 1600, window.innerHeight / 900)
}

const titles = stages.map((s) => s.title)
const current = computed(() => stages[index.value])
const isCover = computed(() => index.value === 0)

let warpTimer = null
let clockTimer = null

function startClock() {
  if (clockTimer) return
  clockTimer = setInterval(() => {
    elapsed.value += 1
  }, 1000)
}

function go(i) {
  const next = Math.min(Math.max(i, 0), stages.length - 1)
  if (next === index.value) return
  playSfx('drum') // 节间转场：一记大鼓
  index.value = next
  runId.value += 1
  if (next > 0) startClock()
}

function next() {
  if (warping.value) return
  go(index.value + 1)
}

function prev() {
  if (warping.value) return
  go(index.value - 1)
}

function launch() {
  if (warping.value) return
  warping.value = true
  startClock()
  playSfx('chime')
  playSfx('dizi') // 穿越：风铃垫声 + 古笛
  warpTimer = setTimeout(() => {
    index.value = 1
    runId.value += 1
    warping.value = false
  }, 2400)
}

function replay() {
  runId.value += 1
}

function resetStage() {
  runId.value += 1
}

function resetAll() {
  index.value = 0
  runId.value += 1
  elapsed.value = 0
  warping.value = false
  if (clockTimer) {
    clearInterval(clockTimer)
    clockTimer = null
  }
}

function togglePause() {
  paused.value = !paused.value
}

function toggleSound() {
  soundOn.value = !soundOn.value
  setSfxOn(soundOn.value)
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  } catch (error) {
    console.warn('全屏切换失败', error)
  }
}

function onFullscreenChange() {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

function onKeydown(event) {
  const target = event.target
  const inForm = target && target.closest && target.closest('input, textarea, select')
  if (inForm) return

  if (event.key === 'f' || event.key === 'F') {
    event.preventDefault()
    toggleFullscreen()
    return
  }

  if (event.key === 'p' || event.key === 'P') {
    event.preventDefault()
    togglePause()
    return
  }

  // 数字键直达（1–9）
  if (/^[1-9]$/.test(event.key)) {
    event.preventDefault()
    go(Number(event.key) - 1)
    return
  }

  // 焦点在按钮上时交给浏览器原生处理，避免一次按键推进两节
  const onButton = target && target.tagName === 'BUTTON'

  if (event.key === 'ArrowRight' || event.key === 'PageDown' || ((event.key === ' ' || event.key === 'Enter') && !onButton)) {
    event.preventDefault()
    next()
  } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault()
    prev()
  } else if (event.key === 'r') {
    event.preventDefault()
    replay()
  } else if (event.key === 'R') {
    event.preventDefault()
    resetAll()
  }
}

onMounted(() => {
  fit()
  loadSfx()
  window.addEventListener('resize', fit)
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('fullscreenchange', onFullscreenChange)

  // ?stage=3 直达某一节，便于课前检查与彩排
  const param = new URLSearchParams(window.location.search).get('stage')
  if (param && /^[1-9]$/.test(param)) {
    index.value = Math.min(Number(param) - 1, stages.length - 1)
    if (index.value > 0) startClock()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', fit)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  if (warpTimer) clearTimeout(warpTimer)
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <div class="viewport" :class="{ 'on-dark': isCover }">
    <div class="canvas" :class="{ paused }" :style="{ transform: `translate(-50%, -50%) scale(${scale})` }">
      <Transition name="fade" mode="out-in">
        <component :is="current.comp" :key="`${index}-${runId}`" @launch="launch" @restart="resetAll" />
      </Transition>

      <TeacherBar
        :index="index"
        :total="stages.length"
        :titles="titles"
        :elapsed="elapsed"
        :fullscreen="isFullscreen"
        :paused="paused"
        :sound-on="soundOn"
        @prev="prev"
        @next="next"
        @replay="replay"
        @reset="resetStage"
        @toggle-pause="togglePause"
        @toggle-sound="toggleSound"
        @toggle-fullscreen="toggleFullscreen"
        @jump="go"
      />

      <Transition name="warp">
        <div v-if="warping" class="warp" aria-hidden="true">
          <div class="streaks"></div>
          <p class="warp-text">回到 · 商</p>
          <p class="warp-sub">约公元前一千三百年</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* 固定 1600×900 设计画布，按投屏分辨率整幅等比缩放。
   投影设备从 4:3 到 16:9 都常见，缩放能保证任何分辨率下排版一致、不裁切。 */
.viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--paper);
  transition: background 0.6s ease;
}

.viewport.on-dark {
  background: #100d0b;
}

.canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1600px;
  height: 900px;
  overflow: hidden;
  background: var(--paper);
  transform-origin: center center;
  transition: background 0.6s ease;
}

.viewport.on-dark .canvas {
  background: #100d0b;
}

/* 教师暂停：冻结所有动画，画面停在当前一帧 */
.canvas.paused :deep(*) {
  animation-play-state: paused !important;
}

/* 穿越动画 */
.warp {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-content: center;
  gap: 10px;
  text-align: center;
  background: radial-gradient(circle at 50% 50%, #3a2a1d 0%, #17110d 55%, #070606 100%);
  color: #f0e5d0;
}

.streaks {
  position: absolute;
  inset: -30%;
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    rgba(201, 185, 122, 0.22) 0deg 0.5deg,
    transparent 0.5deg 4deg
  );
  animation: spin 3.2s linear infinite;
  mask-image: radial-gradient(circle, transparent 18%, #000 55%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle, transparent 18%, #000 55%, transparent 78%);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.warp-text {
  margin: 0;
  font-size: 66px;
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  animation: zoom 2.4s cubic-bezier(0.3, 0, 0.2, 1) forwards;
}

.warp-sub {
  margin: 0;
  font-size: 15px;
  letter-spacing: 0.34em;
  color: rgba(240, 229, 208, 0.5);
  animation: fadein 2.4s ease forwards;
}

@keyframes zoom {
  0% { opacity: 0; transform: scale(0.7); filter: blur(6px); }
  45% { opacity: 1; transform: scale(1); filter: blur(0); }
  100% { opacity: 1; transform: scale(1.08); }
}

@keyframes fadein {
  0%, 30% { opacity: 0; }
  100% { opacity: 1; }
}

.warp-enter-active {
  transition: opacity 0.5s ease;
}
.warp-leave-active {
  transition: opacity 0.6s ease;
}
.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}
</style>
