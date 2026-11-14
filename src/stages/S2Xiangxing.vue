<script setup>
import SceneArt from '../components/SceneArt.vue'
import Glyph from '../components/Glyph.vue'

const pairs = [
  {
    name: 'shan',
    scene: 'mountain',
    char: '山',
    pinyin: 'shān',
    sense: '中间高、两边低，就是三座并立的山峰。',
    delay: 0
  },
  {
    name: 'ri',
    scene: 'sun',
    char: '日',
    pinyin: 'rì',
    sense: '本来就是一个圆圆的太阳，中间那一笔是太阳里的光。',
    delay: 1.5
  }
]
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第二幕 · 认识象形字</p>
        <h1 class="stage-title">为什么这些字长得像图画？</h1>
        <p class="stage-sub">因为古人就是照着东西的样子画的</p>
      </div>
      <span class="chip">看形状，猜意思</span>
    </header>

    <div class="stage-body">
      <div class="rows">
        <article v-for="p in pairs" :key="p.name" class="row" :style="{ animationDelay: `${p.delay * 0.1}s` }">
          <div class="pic"><SceneArt :type="p.scene" /></div>

          <div class="glyph-cell">
            <Glyph :name="p.name" stage="jiagu" draw :speed="1.1" />
          </div>

          <div class="arrow">
            <span>画着画着</span>
            <svg viewBox="0 0 64 24" aria-hidden="true">
              <path d="M2 12h50" />
              <path d="M46 5l10 7-10 7" />
            </svg>
          </div>

          <div class="glyph-cell now">
            <span class="mod">{{ p.char }}</span>
          </div>

          <div class="words">
            <b>{{ p.char }}</b>
            <em>{{ p.pinyin }}</em>
            <p>{{ p.sense }}</p>
          </div>
        </article>
      </div>
    </div>

    <footer class="stage-foot">
      古人先画出东西的样子，写着写着、刻着刻着，就变成了今天的汉字。
    </footer>
  </div>
</template>

<style scoped>
.stage-foot {
  flex: 0 0 auto;
  text-align: center;
  font-size: 22px;
  color: var(--ink-2);
  letter-spacing: 0.04em;
  padding-bottom: 6px;
}

.rows {
  display: grid;
  gap: 20px;
  width: 100%;
}

.row {
  display: grid;
  grid-template-columns: 190px 150px 118px 150px 1fr;
  align-items: center;
  gap: 18px;
  padding: 16px 26px 16px 16px;
  background: var(--card);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  animation: slide 0.65s ease both;
}

@keyframes slide {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.pic {
  height: 132px;
  border-radius: 14px;
  background: var(--paper-warm);
  overflow: hidden;
  border: 1px solid rgba(176, 138, 82, 0.22);
}

.pic :deep(svg) {
  width: 100%;
  height: 100%;
}

.glyph-cell {
  width: 150px;
  height: 132px;
  color: var(--brown);
  display: grid;
  place-items: center;
}

.glyph-cell.now {
  color: var(--cinnabar);
}

.mod {
  font-size: 96px;
  line-height: 1;
  font-family: var(--kai);
  font-weight: 600;
  text-shadow: 0 4px 18px rgba(183, 63, 66, 0.16);
}

.arrow {
  display: grid;
  justify-items: center;
  gap: 6px;
  color: var(--bronze-deep);
}

.arrow span {
  font-size: 16px;
  letter-spacing: 0.16em;
  color: var(--ink-4);
}

.arrow svg {
  width: 64px;
  height: 24px;
  fill: none;
  stroke: var(--bronze);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.words b {
  display: block;
  font-size: 30px;
  color: var(--brown);
  letter-spacing: 0.06em;
}

.words em {
  display: block;
  margin-top: 2px;
  font-style: normal;
  font-size: 17px;
  letter-spacing: 0.2em;
  color: var(--bronze-deep);
  text-transform: uppercase;
}

.words p {
  margin: 8px 0 0;
  font-size: 21px;
  line-height: 1.6;
  color: var(--ink-2);
}
</style>
