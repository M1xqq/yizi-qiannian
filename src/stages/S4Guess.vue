<script setup>
import { computed, ref } from 'vue'
import Glyph from '../components/Glyph.vue'
import SceneArt from '../components/SceneArt.vue'

const questions = [
  {
    name: 'yue',
    scene: 'moon',
    title: '第一题',
    options: ['月', '刀', '鱼'],
    answer: '月',
    reason: '一弯细细的月牙，中间那一竖是月亮上的暗影。'
  },
  {
    name: 'mu',
    scene: 'tree',
    title: '第二题',
    options: ['米', '木', '火'],
    answer: '木',
    reason: '中间一竖是树干，上面分叉是树枝，下面就长出根来。'
  },
  {
    name: 'tian',
    scene: 'field',
    title: '第三题',
    options: ['田', '目', '回'],
    answer: '田',
    reason: '方方正正一块地，中间的横和竖，就是田埂。'
  }
]

const step = ref(0)
const picked = ref('')
const locked = ref(false)
const runId = ref(0)

const q = computed(() => questions[step.value])
const isRight = computed(() => picked.value === q.value.answer)

function choose(opt) {
  if (locked.value) return
  picked.value = opt
  locked.value = true
}

function nextQuestion() {
  if (step.value >= questions.length - 1) return
  step.value += 1
  picked.value = ''
  locked.value = false
  runId.value += 1
}
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第三幕 · 甲骨文猜猜乐</p>
        <h1 class="stage-title">这个字，你认得出来吗？</h1>
        <p class="stage-sub">看形状，猜一猜；想好了就举手</p>
      </div>
      <div class="progress">
        <span class="pdot" v-for="(item, i) in questions" :key="item.name" :class="{ on: i === step, done: i < step }"></span>
        <span class="ptext">{{ step + 1 }} / {{ questions.length }}</span>
      </div>
    </header>

    <div class="stage-body">
      <div class="split wide-left">
        <div class="left">
          <div class="glyph-box" :key="runId">
            <Glyph :name="q.name" stage="jiagu" draw :speed="1.4" />
          </div>
        </div>

        <div class="right">
          <Transition name="swap" mode="out-in">
            <div v-if="!locked" key="ask" class="ask">
              <p class="q">{{ q.title }}：这是哪个字？</p>
              <div class="options">
                <button
                  v-for="opt in q.options"
                  :key="opt"
                  class="option"
                  @click="choose(opt)"
                >
                  {{ opt }}
                </button>
              </div>
              <p class="hint">三个选项里，只有一个是它本来的意思</p>
            </div>

            <div v-else key="ans" class="ans">
              <div class="verdict" :class="isRight ? 'ok' : 'no'">
                {{ isRight ? '答对了！' : `是「${q.answer}」` }}
              </div>

              <div class="compare">
                <span class="mini"><SceneArt :type="q.scene" /></span>
                <span class="eq">就是</span>
                <span class="char">{{ q.answer }}</span>
              </div>

              <p class="reason">{{ q.reason }}</p>

              <button v-if="step < questions.length - 1" class="btn" @click="nextQuestion">
                下一题 →
              </button>
              <p v-else class="done">三题都猜完了，接下来看看甲骨文背后的故事</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pdot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(176, 138, 82, 0.3);
}

.pdot.done {
  background: var(--bronze);
}

.pdot.on {
  background: var(--cinnabar);
  transform: scale(1.35);
}

.ptext {
  margin-left: 8px;
  font-size: 17px;
  color: var(--ink-3);
  letter-spacing: 0.08em;
}

.left {
  display: grid;
  place-items: center;
}

.glyph-box {
  width: 400px;
  height: 400px;
  color: var(--brown);
  background: var(--card);
  border-radius: 28px;
  box-shadow: var(--shadow);
  padding: 34px;
  border: 1px solid rgba(176, 138, 82, 0.2);
}

.q {
  margin: 0 0 26px;
  font-size: 32px;
  color: var(--brown);
  letter-spacing: 0.03em;
}

.options {
  display: grid;
  gap: 14px;
}

.option {
  display: grid;
  place-items: center;
  padding: 16px;
  font-size: 40px;
  font-family: var(--kai);
  color: var(--brown);
  background: var(--card);
  border-radius: 18px;
  border: 1px solid rgba(176, 138, 82, 0.28);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.option:hover {
  color: var(--cinnabar);
  border-color: var(--cinnabar-line);
  background: var(--cinnabar-soft);
  transform: translateY(-2px);
}

.hint {
  margin: 20px 0 0;
  font-size: 18px;
  color: var(--ink-4);
}

.verdict {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
}

.verdict.ok {
  color: var(--cinnabar);
}

.verdict.no {
  color: var(--bronze-deep);
}

.compare {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}

.mini {
  width: 132px;
  height: 100px;
  border-radius: 12px;
  background: var(--paper-warm);
  overflow: hidden;
  display: block;
}

.mini :deep(svg) {
  width: 100%;
  height: 100%;
}

.eq {
  font-size: 20px;
  color: var(--ink-3);
}

.char {
  font-size: 64px;
  font-family: var(--kai);
  color: var(--cinnabar);
  line-height: 1;
}

.reason {
  margin: 18px 0 24px;
  font-size: 23px;
  line-height: 1.7;
  color: var(--ink-2);
}

.done {
  font-size: 20px;
  color: var(--ink-3);
  letter-spacing: 0.02em;
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
