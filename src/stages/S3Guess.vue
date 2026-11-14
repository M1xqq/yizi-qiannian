<script setup>
import { computed, ref } from 'vue'
import StageFrame from '../components/StageFrame.vue'
import Glyph from '../components/Glyph.vue'
import NatureIcon from '../components/NatureIcon.vue'
import { GUESS_QUESTIONS } from '../data/quiz.js'

const index = ref(0)
const picked = ref(null)

const q = computed(() => GUESS_QUESTIONS[index.value])
const answered = computed(() => picked.value !== null)
const right = computed(() => picked.value === q.value.answer)

function choose(option) {
  if (answered.value) return
  picked.value = option
}

function next() {
  if (!answered.value) return
  if (index.value < GUESS_QUESTIONS.length - 1) {
    index.value += 1
    picked.value = null
  }
}
</script>

<template>
  <StageFrame
    kicker="第四幕 · 甲骨文猜猜乐"
    title="这个字，是今天的哪个字？"
    sub="三个选项，一个答案。看字形猜——不用背，用眼睛看。"
    section="04 / 07"
  >
    <div class="board">
      <div class="glyph-card card">
        <div class="q-no">第 {{ index + 1 }} / {{ GUESS_QUESTIONS.length }} 题</div>
        <Transition name="pop" mode="out-in">
          <div :key="q.glyph" class="glyph">
            <Glyph :name="q.glyph" />
          </div>
        </Transition>
        <div class="dots">
          <span
            v-for="(item, i) in GUESS_QUESTIONS"
            :key="item.glyph"
            :class="{ on: i === index, done: i < index }"
          ></span>
        </div>
      </div>

      <div class="panel">
        <div class="options">
          <button
            v-for="opt in q.options"
            :key="opt"
            class="option"
            :class="{
              right: answered && opt === q.answer,
              wrong: answered && opt === picked && opt !== q.answer,
              dim: answered && opt !== q.answer && opt !== picked
            }"
            :disabled="answered"
            @click="choose(opt)"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="answered" class="feedback" :class="right ? 'ok' : 'no'">
          <div class="fb-icon">
            <NatureIcon :type="q.nature" />
          </div>
          <div>
            <b>{{ right ? '答对了！' : `是「${q.answer}」。` }}</b>
            <p>{{ q.explain }}</p>
          </div>
        </div>
      </Transition>
    </div>

    <template #footer>
      <button class="btn" :disabled="!answered || index >= GUESS_QUESTIONS.length - 1" @click="next">
        {{ index >= GUESS_QUESTIONS.length - 1 ? '三题都猜完了' : '下一个字 →' }}
      </button>
    </template>
  </StageFrame>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 51px;
  width: 100%;
  max-width: 1320px;
  align-items: stretch;
}

.glyph-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 450px;
  background: radial-gradient(120% 100% at 50% 0%, #fffdf9, #faf5ea);
}

.q-no {
  font-size: 15px;
  letter-spacing: 0.2em;
  color: var(--ink-4);
}

.glyph {
  height: 252px;
  aspect-ratio: 1;
  color: var(--ink);
}

.glyph > :deep(*) {
  width: 100%;
  height: 100%;
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.2, 0.7, 0.3, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.pop-leave-to {
  opacity: 0;
  transform: scale(1.08);
}

.dots {
  display: flex;
  gap: 7px;
}

.dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ink-4);
  opacity: 0.4;
}

.dots span.done {
  background: var(--cinnabar);
  opacity: 0.45;
}

.dots span.on {
  background: var(--cinnabar);
  opacity: 1;
  transform: scale(1.35);
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  min-width: 0;
}

.options {
  display: grid;
  gap: 14px;
}

.option {
  padding: 20px 30px;
  border-radius: 16px;
  background: var(--card);
  border: 1px solid rgba(42, 42, 42, 0.07);
  box-shadow: var(--shadow-sm);
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-align: left;
  transition: all 0.22s ease;
  color: var(--ink);
}

.option:hover:not(:disabled) {
  transform: translateX(6px);
  border-color: var(--cinnabar-line);
  color: var(--cinnabar);
}

.option:disabled {
  cursor: default;
}

.option.right {
  background: rgba(130, 178, 155, 0.14);
  border-color: rgba(130, 178, 155, 0.55);
  color: #4a8069;
  box-shadow: 0 8px 24px rgba(130, 178, 155, 0.2);
}

.option.wrong {
  background: var(--cinnabar-soft);
  border-color: var(--cinnabar-line);
  color: var(--cinnabar);
  animation: shake 0.42s ease;
}

.option.dim {
  opacity: 0.38;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-7px); }
  75% { transform: translateX(7px); }
}

.feedback {
  grid-column: 1 / -1;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 14px 24px;
  border-radius: 16px;
  background: rgba(130, 178, 155, 0.1);
  border-left: 3px solid var(--wood);
}

.feedback.no {
  background: var(--cinnabar-soft);
  border-left-color: var(--cinnabar);
}

.fb-icon {
  width: 58px;
  height: 58px;
  flex: 0 0 auto;
  color: var(--ink-2);
}

.feedback b {
  font-size: 19px;
  color: var(--ink);
}

.feedback p {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-2);
}

</style>
