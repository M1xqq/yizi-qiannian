<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import StageFrame from '../components/StageFrame.vue'
import Glyph from '../components/Glyph.vue'
import { GLYPHS } from '../data/glyphs.js'
import { MATCH_PAIRS } from '../data/quiz.js'

function shuffle(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const lefts = MATCH_PAIRS
const rights = ref(shuffle(MATCH_PAIRS))
const selected = ref(null)
const matched = ref([])
const wrongL = ref(null)
const wrongR = ref(null)
let timer = null

const done = computed(() => matched.value.length === MATCH_PAIRS.length)

function pickLeft(key) {
  if (matched.value.includes(key)) return
  selected.value = key
}

function pickRight(key) {
  if (matched.value.includes(key) || !selected.value) return
  if (key === selected.value) {
    matched.value = [...matched.value, key]
    selected.value = null
    return
  }
  wrongL.value = selected.value
  wrongR.value = key
  selected.value = null
  timer = setTimeout(() => {
    wrongL.value = null
    wrongR.value = null
  }, 520)
}

function retry() {
  rights.value = shuffle(MATCH_PAIRS)
  selected.value = null
  matched.value = []
  wrongL.value = null
  wrongR.value = null
}

onBeforeUnmount(() => timer && clearTimeout(timer))
</script>

<template>
  <StageFrame
    kicker="第六幕 · 古文字配对挑战"
    title="把它们配成一对"
    sub="左边是甲骨文，右边是今天的字。先点左边，再点右边。"
    section="06 / 07"
  >
    <div class="board" :class="{ done }">
      <div class="col">
        <div class="col-label">甲骨文</div>
        <div class="grid">
          <button
            v-for="key in lefts"
            :key="key"
            class="tile glyph-tile"
            :class="{
              picked: selected === key,
              matched: matched.includes(key),
              wrong: wrongL === key
            }"
            @click="pickLeft(key)"
          >
            <Glyph :name="key" />
            <span v-if="matched.includes(key)" class="tick">✓</span>
          </button>
        </div>
      </div>

      <div class="mid">
        <span class="link-hint">{{ done ? '全部配对成功' : '配对 →' }}</span>
      </div>

      <div class="col">
        <div class="col-label">今天的字</div>
        <div class="grid">
          <button
            v-for="key in rights"
            :key="key"
            class="tile char-tile"
            :class="{
              matched: matched.includes(key),
              wrong: wrongR === key,
              waiting: !!selected && !matched.includes(key)
            }"
            @click="pickRight(key)"
          >
            {{ GLYPHS[key].char }}
            <span v-if="matched.includes(key)" class="tick">✓</span>
          </button>
        </div>
      </div>

      <Transition name="win">
        <div v-if="done" class="win-layer">
          <div class="win-card">
            <span class="win-seal">通</span>
            <h3>四对全配对成功</h3>
            <p>山、日、月、木——三千年前的字，你都认出来了。</p>
            <button class="btn ghost" @click="retry">再来一次</button>
          </div>
        </div>
      </Transition>
    </div>
  </StageFrame>
</template>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 26px;
  width: 100%;
  max-width: 1240px;
  align-items: center;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-label {
  font-size: 13px;
  letter-spacing: 0.3em;
  color: var(--ink-4);
  padding-left: 4px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.tile {
  position: relative;
  aspect-ratio: 1;
  border-radius: 18px;
  background: var(--card);
  border: 1px solid rgba(42, 42, 42, 0.07);
  box-shadow: var(--shadow-sm);
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, box-shadow 0.24s ease, border-color 0.24s ease,
    background 0.24s ease, opacity 0.24s ease;
}

.glyph-tile {
  color: var(--ink);
  padding: 12%;
}

.char-tile {
  font-size: 62px;
  font-family: var(--kai);
  font-weight: 500;
  color: var(--ink);
}

.tile:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.glyph-tile.picked {
  border-color: var(--cinnabar);
  box-shadow: 0 0 0 3px var(--cinnabar-soft), var(--shadow);
  color: var(--cinnabar);
}

.char-tile.waiting:hover {
  border-color: var(--cinnabar-line);
  color: var(--cinnabar);
}

.tile.matched {
  background: rgba(130, 178, 155, 0.1);
  border-color: rgba(130, 178, 155, 0.5);
  color: #467a64;
  transform: none;
  cursor: default;
}

.tile.wrong {
  animation: shake 0.46s ease;
  border-color: var(--cinnabar-line);
  background: var(--cinnabar-soft);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

.tick {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 17px;
  color: #4f8a70;
  font-weight: 700;
}

.mid {
  display: grid;
  place-items: center;
  align-self: center;
}

.link-hint {
  writing-mode: vertical-rl;
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--ink-4);
}

.win-layer {
  position: absolute;
  inset: -6% -4%;
  display: grid;
  place-items: center;
  background: rgba(248, 246, 242, 0.82);
  backdrop-filter: blur(4px);
  border-radius: 24px;
}

.win-card {
  text-align: center;
  padding: 40px 56px;
  background: var(--card);
  border-radius: 22px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--cinnabar-line);
  animation: rise 0.5s cubic-bezier(0.2, 0.8, 0.3, 1);
}

.win-seal {
  display: inline-grid;
  place-items: center;
  width: 76px;
  height: 76px;
  border-radius: 12px;
  background: var(--cinnabar);
  color: #fff;
  font-size: 34px;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(183, 63, 66, 0.3);
}

.win-card h3 {
  margin: 0.5em 0 0.3em;
  font-size: 34px;
  letter-spacing: 0.1em;
  color: var(--cinnabar);
}

.win-card p {
  margin: 0 0 1.2em;
  font-size: 16px;
  color: var(--ink-2);
}

@keyframes rise {
  from { opacity: 0; transform: translateY(18px) scale(0.96); }
  to { opacity: 1; transform: none; }
}

.win-enter-active,
.win-leave-active {
  transition: opacity 0.35s ease;
}
.win-enter-from,
.win-leave-to {
  opacity: 0;
}

</style>
