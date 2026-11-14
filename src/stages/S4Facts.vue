<script setup>
import { ref } from 'vue'
import StageFrame from '../components/StageFrame.vue'
import NatureIcon from '../components/NatureIcon.vue'

const step = ref(0)
</script>

<template>
  <StageFrame
    kicker="第五幕 · 你不知道的甲骨文"
    title="两个小秘密"
    sub="名字是怎么来的？三千年前的人，都在甲骨上问些什么？"
    section="05 / 07"
  >
    <div class="board">
      <div class="art card">
        <Transition name="fade" mode="out-in">
          <div v-if="step === 0" key="a" class="art-inner two">
            <div class="relic"><NatureIcon type="gujia" /><span>龟腹甲</span></div>
            <div class="relic"><NatureIcon type="bone" /><span>牛肩胛骨</span></div>
            <div class="loupe"></div>
          </div>
          <div v-else key="b" class="art-inner one">
            <div class="relic big"><NatureIcon type="bone" /></div>
            <div class="bubbles">
              <span>今天会下雨吗？</span>
              <span>今年收成好吗？</span>
              <span>这次出门顺利吗？</span>
            </div>
          </div>
        </Transition>
      </div>

      <div class="text">
        <Transition name="fade" mode="out-in">
          <div v-if="step === 0" key="a">
            <div class="tag">冷知识 一</div>
            <h2>为什么叫「甲骨文」？</h2>
            <ul>
              <li><b>甲</b>：龟的腹甲、背甲</li>
              <li><b>骨</b>：牛的肩胛骨等兽骨</li>
              <li>字就刻在这些材料上——名字说的其实是「写在什么上面」</li>
            </ul>
            <p class="quote">一片甲骨上，常常刻着好几个人的问话。</p>
          </div>
          <div v-else key="b">
            <div class="tag">冷知识 二</div>
            <h2>三千多年前的人，也关心天气？</h2>
            <ul>
              <li>播种、出行、打仗之前，商代人要先占卜</li>
              <li>问题刻在甲骨上，答案看灼烧后的裂纹</li>
              <li>这些记录留到今天，成了我们了解商代的第一手材料</li>
            </ul>
            <p class="quote">原来三千年前的人，也在担心明天会不会下雨。</p>
          </div>
        </Transition>
      </div>
    </div>

    <template #footer>
      <button v-if="step === 0" class="btn" @click="step = 1">再看一个冷知识 →</button>
      <button v-else class="btn ghost" @click="step = 0">← 回到第一个</button>
    </template>
  </StageFrame>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 51px;
  width: 100%;
  max-width: 1360px;
  align-items: center;
}

.art {
  position: relative;
  min-height: 306px;
  display: grid;
  place-items: center;
  padding: 18px;
  background: radial-gradient(120% 100% at 50% 10%, #fffdf9, #f8f3e9);
  overflow: hidden;
}

.art-inner {
  display: grid;
  gap: 22px;
  width: 100%;
  height: 100%;
  align-items: center;
}

.art-inner.two {
  grid-template-columns: 1fr 1fr;
  padding: 0 4%;
}

.relic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--ink-2);
}

.relic > :first-child {
  width: min(100%, 220px);
  aspect-ratio: 1;
}

.relic span {
  font-size: 14px;
  letter-spacing: 0.16em;
  color: var(--ink-3);
}

.relic.big > :first-child {
  width: min(100%, 300px);
}

.loupe {
  position: absolute;
  right: 12%;
  top: 18%;
  width: 104px;
  aspect-ratio: 1;
  border: 2px solid var(--cinnabar);
  border-radius: 50%;
  opacity: 0.55;
  box-shadow: 0 0 0 8px rgba(183, 63, 66, 0.06);
  animation: drift 6s ease-in-out infinite;
}

.loupe::after {
  content: "";
  position: absolute;
  right: -34%;
  bottom: -22%;
  width: 44%;
  height: 3px;
  background: var(--cinnabar);
  transform: rotate(42deg);
  border-radius: 2px;
  opacity: 0.7;
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, 12px); }
}

.art-inner.one {
  grid-template-columns: 0.8fr 1fr;
  padding: 0 6%;
}

.bubbles {
  display: grid;
  gap: 10px;
}

.bubbles span {
  position: relative;
  padding: 10px 14px;
  border-radius: 14px 14px 14px 4px;
  background: #fff;
  border: 1px solid rgba(42, 42, 42, 0.06);
  box-shadow: var(--shadow-sm);
  font-size: 15px;
  color: var(--ink-2);
}

.bubbles span::after {
  content: "";
  position: absolute;
  left: -5px;
  bottom: 6px;
  width: 8px;
  height: 8px;
  background: #fff;
  border-left: 1px solid rgba(42, 42, 42, 0.06);
  border-bottom: 1px solid rgba(42, 42, 42, 0.06);
  transform: rotate(45deg);
}

.text .tag {
  display: inline-block;
  font-size: 13px;
  letter-spacing: 0.34em;
  color: var(--cinnabar);
  border: 1px solid var(--cinnabar-line);
  border-radius: 4px;
  padding: 5px 11px;
  margin-bottom: 14px;
}

.text h2 {
  margin: 0 0 0.7em;
  font-size: 38px;
  line-height: 1.35;
  letter-spacing: 0.02em;
}

.text ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.text li {
  position: relative;
  padding-left: 1.2em;
  font-size: 18px;
  line-height: 1.75;
  color: var(--ink-2);
}

.text li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.82em;
  width: 0.6em;
  height: 1px;
  background: var(--cinnabar);
  opacity: 0.7;
}

.text li b {
  color: var(--cinnabar);
  font-size: 1.15em;
  margin: 0 0.2em;
}

.quote {
  margin: 1.2em 0 0;
  padding-left: 1em;
  border-left: 2px solid var(--gold);
  font-size: 17px;
  line-height: 1.8;
  color: var(--ink-3);
  font-style: italic;
}

</style>
