<script setup>
import { ref } from 'vue'
import SceneArt from '../components/SceneArt.vue'

const page = ref(0)

const todayQs = ['明天会下雨吗？', '今年收成好不好？', '出门要不要带伞？']
const shangQs = ['明天会下雨吗？', '今年的收成好不好？', '这次出行顺不顺利？']
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第四幕 · 你不知道的冷知识</p>
        <h1 class="stage-title">{{ page === 0 ? '为什么叫「甲骨文」？' : '三千多年前，他们也关心天气' }}</h1>
        <p class="stage-sub">{{ page === 0 ? '「甲」是龟甲，「骨」是兽骨' : '古人刻在甲骨上的问题，和我们今天问的很像' }}</p>
      </div>
      <div class="tabs">
        <button :class="{ on: page === 0 }" @click="page = 0">冷知识一</button>
        <button :class="{ on: page === 1 }" @click="page = 1">冷知识二</button>
      </div>
    </header>

    <div class="stage-body">
      <Transition name="swap" mode="out-in">
        <!-- 冷知识一 -->
        <div v-if="page === 0" key="one" class="split wide-left">
          <div>
            <div class="scene" style="height: 400px">
              <SceneArt type="shell" />
              <div class="lens">
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <g fill="none" stroke="var(--brown)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M24 44v-16M30 28v18M38 44V24" stroke-width="4" />
                    <path d="M52 30v20M52 40h14" stroke-width="4" />
                    <path d="M26 76h16M34 76v18M58 78v16M58 86h12" stroke-width="4" />
                  </g>
                </svg>
                <span class="lens-cap">刻痕放大</span>
              </div>
            </div>
            <p class="caption">一块龟的腹甲，上面那些细细的刻痕，就是最早的文字</p>
          </div>

          <div>
            <p class="lead">
              古人把字刻在<b>龟的甲</b>和<b>兽的骨</b>上，<br />
              所以叫「甲骨文」。
            </p>
            <p class="note">
              龟甲要先把背面磨平，再钻出小坑、用火烤，看裂纹判断吉凶；
              然后把问的事和结果刻在旁边。兽骨多用牛的肩胛骨，面积更大，能刻更多字。
            </p>
            <p class="note soft">
              一个字刻下去，就留住了三千多年。
            </p>
          </div>
        </div>

        <!-- 冷知识二 -->
        <div v-else key="two" class="split wide-left">
          <div>
            <div class="scene" style="height: 400px">
              <SceneArt type="rain" />
            </div>
            <p class="caption">商代人相信，天气由天上的神掌管，所以要向天发问</p>
          </div>

          <div>
            <p class="lead">
              他们会把问题刻在甲骨上，<br />
              再等着看<b>裂纹</b>给出的答案。
            </p>

            <div class="same">
              <div class="col">
                <h3>三千多年前</h3>
                <p v-for="q in shangQs" :key="q">{{ q }}</p>
              </div>
              <div class="vs">≈</div>
              <div class="col now">
                <h3>今天</h3>
                <p v-for="q in todayQs" :key="q">{{ q }}</p>
              </div>
            </div>

            <p class="note soft">
              关心天气、关心收成、关心出行——三千多年过去，人惦记的事其实没怎么变。
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  border: 1px solid rgba(176, 138, 82, 0.24);
}

.tabs button {
  padding: 9px 20px;
  border-radius: 999px;
  font-size: 18px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
  transition: all 0.2s ease;
}

.tabs button.on {
  background: var(--cinnabar);
  color: #fff;
  box-shadow: 0 6px 16px rgba(183, 63, 66, 0.24);
}

.lens {
  position: absolute;
  right: 40px;
  bottom: 34px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: var(--card);
  border: 3px solid var(--bronze);
  box-shadow: 0 14px 36px rgba(78, 59, 44, 0.2), inset 0 0 0 8px rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
  animation: hover 5s ease-in-out infinite;
}

.lens svg {
  width: 120px;
  height: 120px;
}

.lens-cap {
  position: absolute;
  bottom: -12px;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--bronze);
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.1em;
}

@keyframes hover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.note.soft {
  color: var(--ink-3);
  font-size: 20px;
}

.same {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  align-items: center;
  margin: 24px 0 0;
  padding: 22px 24px;
  background: var(--card);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.col h3 {
  margin: 0 0 12px;
  font-size: 21px;
  letter-spacing: 0.12em;
  color: var(--bronze-deep);
  font-weight: 600;
}

.col.now h3 {
  color: var(--cinnabar);
}

.col p {
  margin: 8px 0;
  font-size: 22px;
  color: var(--ink-2);
  line-height: 1.5;
}

.vs {
  text-align: center;
  font-size: 30px;
  color: var(--ink-4);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
