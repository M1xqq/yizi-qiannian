<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import XinwenLogo from '../components/XinwenLogo.vue'
import { playSfx } from '../audio/sfx'

const emit = defineEmits(['restart'])

const phase = ref(0) // 0 = 返航动画，1 = 通关画面
let t1 = null
let t2 = null

onMounted(() => {
  playSfx('drum2') // 领取通关徽章：一记大鼓
  t1 = setTimeout(() => { phase.value = 1 }, 2100)
  t2 = setTimeout(() => { phase.value = 2 }, 2900)
})

onBeforeUnmount(() => {
  clearTimeout(t1)
  clearTimeout(t2)
})
</script>

<template>
  <div class="stage end">
    <!-- 返航：光带向上收拢 -->
    <Transition name="back">
      <div v-if="phase === 0" class="backhome" aria-hidden="true">
        <div class="streaks"></div>
        <p class="big">时光机 · 返回现代</p>
        <p class="small">三千年，一瞬而过</p>
      </div>
    </Transition>

    <div class="content" :class="{ show: phase >= 1 }">
      <div class="medal">
        <div class="ring"></div>
        <div class="seal-badge">古文字<br />小侦探</div>
      </div>

      <h1 class="done-title">挑战完成</h1>
      <p class="done-sub">你已经认识了三千多年前的文字</p>

      <ul class="points">
        <li><b>甲骨文</b>是刻在龟甲和兽骨上的最早的文字</li>
        <li>很多汉字一开始就是<b>照着样子画</b>出来的</li>
        <li>从甲骨文到今天的楷书，汉字走了<b>三千多年</b></li>
      </ul>

      <div class="foot">
        <XinwenLogo :height="126" />
        <span class="credit">心纹 · 一纸千年研学营</span>
      </div>

      <button class="btn ghost again" @click="emit('restart')">再看一次 ↺</button>
    </div>
  </div>
</template>

<style scoped>
.end {
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
}

/* 返航动画 */
.backhome {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 12px;
  text-align: center;
  background: radial-gradient(circle at 50% 60%, #3a2a1d 0%, #17110d 58%, #070606 100%);
  color: #f0e5d0;
  z-index: 5;
}

.streaks {
  position: absolute;
  inset: -40%;
  background: repeating-linear-gradient(
    180deg,
    rgba(201, 185, 122, 0.2) 0px,
    rgba(201, 185, 122, 0.2) 1px,
    transparent 1px,
    transparent 26px
  );
  animation: rush 1.1s linear infinite;
  mask-image: radial-gradient(circle, #000 20%, transparent 72%);
  -webkit-mask-image: radial-gradient(circle, #000 20%, transparent 72%);
}

@keyframes rush {
  to { transform: translateY(-26px); }
}

.backhome .big {
  margin: 0;
  font-size: 54px;
  letter-spacing: 0.28em;
  animation: fadeUp 2s ease forwards;
}

.backhome .small {
  margin: 0;
  font-size: 18px;
  letter-spacing: 0.32em;
  color: rgba(240, 229, 208, 0.55);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

.back-leave-active {
  transition: opacity 0.5s ease;
}
.back-leave-to {
  opacity: 0;
}

/* 通关画面 */
.content {
  position: relative;
  z-index: 6;
  display: grid;
  justify-items: center;
  gap: 6px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.content.show {
  opacity: 1;
  transform: translateY(0);
}

.medal {
  position: relative;
  width: 132px;
  height: 132px;
  display: grid;
  place-items: center;
  margin-bottom: 8px;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px dashed rgba(183, 63, 66, 0.4);
  animation: spin 18s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.seal-badge {
  width: 108px;
  height: 108px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--cinnabar);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.04em;
  text-align: center;
  box-shadow: 0 12px 30px rgba(183, 63, 66, 0.3);
}

.done-title {
  margin: 4px 0 0;
  font-size: 62px;
  letter-spacing: 0.14em;
  color: var(--brown);
}

.done-sub {
  margin: 2px 0 14px;
  font-size: 22px;
  color: var(--ink-3);
  letter-spacing: 0.04em;
}

.points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 9px;
  text-align: center;
}

.points li {
  font-size: 23px;
  color: var(--ink-2);
  letter-spacing: 0.02em;
}

.points b {
  color: var(--cinnabar);
}

.foot {
  display: grid;
  justify-items: center;
  gap: 6px;
  margin-top: 18px;
}

.credit {
  font-size: 16px;
  letter-spacing: 0.16em;
  color: var(--ink-4);
}

.again {
  margin-top: 14px;
  font-size: 18px;
  padding: 0.55em 1.5em;
}
</style>
