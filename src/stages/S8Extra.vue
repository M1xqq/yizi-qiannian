<script setup>
import { computed, ref } from 'vue'
import Glyph from '../components/Glyph.vue'
import SceneArt from '../components/SceneArt.vue'

const options = ['目', '耳', '口']
const picked = ref('')
const locked = ref(false)
const runId = ref(0)

const isRight = computed(() => picked.value === '目')

function choose(o) {
  if (locked.value) return
  picked.value = o
  locked.value = true
}

function reset() {
  picked.value = ''
  locked.value = false
  runId.value += 1
}
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>弹性环节 · 备用题</p>
        <h1 class="stage-title">再猜一个：这是什么？</h1>
        <p class="stage-sub">核心内容讲完了，时间还有就玩这个</p>
      </div>
      <span class="chip">备用 · 可跳过</span>
    </header>

    <div class="stage-body">
      <div class="split wide-left">
        <div class="left">
          <div class="glyph-box" :key="runId">
            <Glyph name="mu_eye" stage="jiagu" draw :speed="1.4" />
          </div>
          <p class="caption">这个字，是横过来画的一只眼睛</p>
        </div>

        <div class="right">
          <Transition name="swap" mode="out-in">
            <div v-if="!locked" key="ask">
              <p class="q">它是下面哪个字？</p>
              <div class="options">
                <button v-for="o in options" :key="o" class="option" @click="choose(o)">{{ o }}</button>
              </div>
            </div>

            <div v-else key="ans">
              <div class="verdict" :class="isRight ? 'ok' : 'no'">
                {{ isRight ? '答对了！' : '是「目」' }}
              </div>

              <div class="compare">
                <span class="mini"><SceneArt type="eye" /></span>
                <span class="eq">就是</span>
                <span class="char">目</span>
              </div>

              <p class="reason">
                古人照着眼睛的形状画：中间那一个圈是眼珠，两边是眼皮。
                后来这个字才立起来，变成今天方方正正的「目」——它现在的意思就是眼睛，
                比如「目光」「目录」。
              </p>

              <button class="btn ghost" @click="reset">再放一遍 ↺</button>
            </div>
          </Transition>

          <div class="extra-note">
            <b>这一节是弹性时间</b>：学生猜字超时、需要补讲、或者设备出问题时用。
            三个批次都讲同样的内容。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left {
  display: grid;
  justify-items: center;
  gap: 10px;
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
  margin: 0 0 22px;
  font-size: 31px;
  color: var(--brown);
}

.options {
  display: grid;
  gap: 13px;
}

.option {
  display: grid;
  place-items: center;
  padding: 15px;
  font-size: 38px;
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

.verdict {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 12px;
}

.verdict.ok { color: var(--cinnabar); }
.verdict.no { color: var(--bronze-deep); }

.compare {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 20px;
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}

.mini {
  width: 150px;
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
  font-size: 62px;
  font-family: var(--kai);
  color: var(--cinnabar);
  line-height: 1;
}

.reason {
  margin: 16px 0 18px;
  font-size: 22px;
  line-height: 1.75;
  color: var(--ink-2);
}

.extra-note {
  margin-top: 22px;
  padding: 14px 18px;
  border-radius: 14px;
  background: var(--bronze-soft);
  font-size: 18px;
  line-height: 1.7;
  color: var(--brown-soft);
}

.extra-note b {
  color: var(--bronze-deep);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.swap-enter-from { opacity: 0; transform: translateX(12px); }
.swap-leave-to { opacity: 0; transform: translateX(-12px); }
</style>
