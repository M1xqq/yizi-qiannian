<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import Glyph from '../components/Glyph.vue'
import { playSfx } from '../audio/sfx'

const items = [
  { name: 'shan', char: '山' },
  { name: 'ri', char: '日' },
  { name: 'yue', char: '月' },
  { name: 'mu', char: '木' }
]

// 左右两侧顺序不同，避免直接对上
const leftOrder = [2, 0, 3, 1]
const rightOrder = [1, 3, 0, 2]

const board = ref(null)
const leftEls = ref([])
const rightEls = ref([])

const pickedLeft = ref(-1)
const wrongPair = ref([])
const matched = ref([]) // [{ l, r, d, key }]
const lines = ref([])

const leftList = computed(() => leftOrder.map((i) => ({ ...items[i], idx: i })))
const rightList = computed(() => rightOrder.map((i) => ({ ...items[i], idx: i })))

const solved = computed(() => matched.value.length === items.length)
const isMatchedLeft = (i) => matched.value.some((m) => m.l === i)
const isMatchedRight = (i) => matched.value.some((m) => m.r === i)
const matchedNo = (i, side) => {
  const found = matched.value.findIndex((m) => (side === 'l' ? m.l === i : m.r === i))
  return found < 0 ? '' : found + 1
}

function pickLeft(i) {
  if (isMatchedLeft(i)) return
  pickedLeft.value = i
  wrongPair.value = []
}

async function pickRight(i) {
  if (isMatchedRight(i)) return
  if (pickedLeft.value < 0) {
    wrongPair.value = [i]
    setTimeout(() => (wrongPair.value = []), 500)
    return
  }
  // 必须比对字形本身，而不是左右两列的位置序号
  const leftItem = leftList.value[pickedLeft.value]
  const rightItem = rightList.value[i]
  if (leftItem.idx === rightItem.idx) {
    matched.value = [...matched.value, { l: pickedLeft.value, r: i, key: `${i}-${Date.now()}` }]
    playSfx('bowl') // 配对成功：颂钵（连错不响）
    if (matched.value.length === items.length) playSfx('drum') // 全部配对成功：加一记大鼓
    pickedLeft.value = -1
    await nextTick()
    measure()
  } else {
    wrongPair.value = [i]
    setTimeout(() => {
      wrongPair.value = []
      pickedLeft.value = -1
    }, 520)
  }
}

function measure() {
  if (!board.value) return
  const rect = board.value
  lines.value = matched.value.map((m) => {
    const le = leftEls.value[m.l]
    const re = rightEls.value[m.r]
    if (!le || !re) return null
    const x1 = le.offsetLeft + le.offsetWidth
    const y1 = le.offsetTop + le.offsetHeight / 2
    const x2 = re.offsetLeft
    const y2 = re.offsetTop + re.offsetHeight / 2
    const mx = (x1 + x2) / 2
    return { d: `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`, key: m.key }
  }).filter(Boolean)
}

onMounted(() => {
  window.addEventListener('resize', measure)
})
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第五幕 · 古文字配对挑战</p>
        <h1 class="stage-title">把它们配成一对</h1>
        <p class="stage-sub">先点左边的古文字，再点右边对应的汉字</p>
      </div>
      <span class="chip">已配对 {{ matched.length }} / {{ items.length }}</span>
    </header>

    <div class="stage-body">
      <div ref="board" class="board">
        <svg class="threads" aria-hidden="true">
          <path v-for="ln in lines" :key="ln.key" :d="ln.d" class="thread" />
        </svg>

        <div class="col">
          <p class="col-head">古文字</p>
          <button
            v-for="(it, i) in leftList"
            :key="`l-${it.name}`"
            :ref="(el) => (leftEls[i] = el)"
            class="tile glyph"
            :class="{
              picked: pickedLeft === i,
              done: isMatchedLeft(i),
              bad: wrongPair.includes(i)
            }"
            @click="pickLeft(i)"
          >
            <span class="glyph-hold"><Glyph :name="it.name" stage="jiagu" /></span>
            <span v-if="matchedNo(i, 'l')" class="no">{{ matchedNo(i, 'l') }}</span>
          </button>
        </div>

        <div class="col">
          <p class="col-head">今天的汉字</p>
          <button
            v-for="(it, i) in rightList"
            :key="`r-${it.name}`"
            :ref="(el) => (rightEls[i] = el)"
            class="tile text"
            :class="{
              done: isMatchedRight(i),
              bad: wrongPair.includes(i)
            }"
            @click="pickRight(i)"
          >
            <span>{{ it.char }}</span>
            <span v-if="matchedNo(i, 'r')" class="no">{{ matchedNo(i, 'r') }}</span>
          </button>
        </div>

        <Transition name="win">
          <div v-if="solved" class="win">
            <div class="badge">全<br />对</div>
            <p>四对全部配对成功！</p>
            <small>山、日、月、木 —— 这四个字，你都认出来了</small>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 120px;
  width: 1120px;
  padding: 0 10px;
}

.col {
  display: grid;
  gap: 12px;
}

.col-head {
  margin: 0 0 4px;
  font-size: 18px;
  letter-spacing: 0.2em;
  color: var(--ink-4);
  text-align: center;
}

.tile {
  position: relative;
  height: 108px;
  display: grid;
  place-items: center;
  background: var(--card);
  border-radius: 18px;
  border: 1px solid rgba(176, 138, 82, 0.26);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.tile:hover:not(.done) {
  border-color: var(--cinnabar-line);
  transform: translateY(-2px);
}

.tile.glyph {
  color: var(--brown);
}

/* 字形必须落在固定尺寸的盒子里，否则 svg 会按宽度等比撑高 */
.glyph-hold {
  display: block;
  width: 118px;
  height: 84px;
}

.tile.text span:first-child {
  font-size: 52px;
  font-family: var(--kai);
  color: var(--brown);
  line-height: 1;
}

.tile.picked {
  border-color: var(--cinnabar);
  background: var(--cinnabar-soft);
  box-shadow: 0 0 0 3px rgba(183, 63, 66, 0.16);
}

.tile.done {
  border-color: rgba(183, 63, 66, 0.4);
  background: rgba(183, 63, 66, 0.05);
  opacity: 0.95;
}

.tile.done.text span:first-child,
.tile.done.glyph {
  color: var(--cinnabar);
}

.tile.bad {
  animation: shake 0.45s ease;
  border-color: var(--bronze);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-9px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-4px); }
}

.no {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 15px;
  color: var(--cinnabar);
  font-weight: 700;
}

.threads {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.thread {
  fill: none;
  stroke: var(--cinnabar);
  stroke-width: 2.4;
  stroke-dasharray: 6 7;
  opacity: 0.6;
}

.win {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 34px 54px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 22px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--cinnabar-line);
}

.badge {
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--cinnabar);
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
  box-shadow: 0 10px 26px rgba(183, 63, 66, 0.3);
}

.win p {
  margin: 0;
  font-size: 26px;
  color: var(--brown);
  letter-spacing: 0.04em;
}

.win small {
  font-size: 17px;
  color: var(--ink-3);
}

.win-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.win-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
