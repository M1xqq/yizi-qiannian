<script setup>
const emit = defineEmits(['restart'])

const takeaways = [
  { n: '一', t: '甲骨文是汉字最早的成熟形态', d: '刻在龟甲、兽骨上，距今约三千三百年。' },
  { n: '二', t: '象形字，是把世界画了下来', d: '日、月、山、木、田，都从实物长出来。' },
  { n: '三', t: '三千年里字在变，写字的我们一直在', d: '从刀刻到笔写，从龟甲到今天。' }
]
</script>

<template>
  <section class="end">
    <div class="rings" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>

    <div class="badge">
      <div class="seal-big">古文字<br />小侦探</div>
      <div class="badge-text">
        <div class="kicker"><i></i>第七幕 · 回到现代</div>
        <h1>挑战完成</h1>
        <p>你已经在三千年的时光里走了一圈。</p>
      </div>
    </div>

    <div class="cards">
      <div v-for="item in takeaways" :key="item.n" class="take">
        <span class="num">{{ item.n }}</span>
        <div>
          <b>{{ item.t }}</b>
          <p>{{ item.d }}</p>
        </div>
      </div>
    </div>

    <footer class="foot">
      <div class="brand">
        <span class="seal">心纹</span>
        <div>
          <b>一字千年</b>
          <span>心纹研学营 · 十楼探源</span>
        </div>
      </div>
      <button class="btn ghost" @click="emit('restart')">再来一次 ↺</button>
    </footer>
  </section>
</template>

<style scoped>
.end {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 27px;
  padding: 36px 70px;
  overflow: hidden;
}

.rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.rings span {
  position: absolute;
  border: 1px solid var(--cinnabar-line);
  border-radius: 50%;
  opacity: 0.5;
  animation: ripple 7s ease-out infinite;
}

.rings span:nth-child(1) {
  width: 42vmin;
  height: 42vmin;
  animation-delay: 0s;
}
.rings span:nth-child(2) {
  width: 62vmin;
  height: 62vmin;
  animation-delay: 2.2s;
}
.rings span:nth-child(3) {
  width: 82vmin;
  height: 82vmin;
  animation-delay: 4.4s;
}

@keyframes ripple {
  0% { transform: scale(0.86); opacity: 0; }
  30% { opacity: 0.45; }
  100% { transform: scale(1.06); opacity: 0; }
}

.badge {
  position: relative;
  display: flex;
  align-items: center;
  gap: 44px;
  text-align: left;
}

.seal-big {
  flex: 0 0 auto;
  width: 168px;
  height: 168px;
  border-radius: 16px;
  background: var(--cinnabar);
  color: #fff;
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0.06em;
  transform: rotate(-7deg);
  box-shadow: 0 18px 48px rgba(183, 63, 66, 0.32);
  animation: stamp 0.7s cubic-bezier(0.16, 1.2, 0.4, 1);
}

@keyframes stamp {
  0% { opacity: 0; transform: rotate(-7deg) scale(2.1); }
  70% { opacity: 1; transform: rotate(-7deg) scale(0.94); }
  100% { opacity: 1; transform: rotate(-7deg) scale(1); }
}

.kicker {
  color: var(--cinnabar);
}

.badge-text h1 {
  margin: 0.2em 0 0.15em;
  font-size: 76px;
  letter-spacing: 0.1em;
  line-height: 1.1;
}

.badge-text p {
  margin: 0;
  font-size: 19px;
  color: var(--ink-3);
  letter-spacing: 0.04em;
}

.cards {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1240px;
}

.take {
  display: flex;
  gap: 14px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 16px;
  border: 1px solid rgba(42, 42, 42, 0.05);
  box-shadow: var(--shadow-sm);
}

.num {
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--cinnabar-soft);
  color: var(--cinnabar);
  font-size: 14px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.take b {
  font-size: 17px;
  line-height: 1.5;
  display: block;
}

.take p {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--ink-3);
}

.foot {
  position: relative;
  display: flex;
  align-items: center;
  gap: 60px;
  padding-top: 9px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand b {
  font-size: 18px;
  letter-spacing: 0.2em;
}

.brand span:last-child {
  font-size: 12px;
  color: var(--ink-4);
  letter-spacing: 0.14em;
}

</style>
