<script setup>
import { onMounted, ref } from 'vue'
import SceneArt from '../components/SceneArt.vue'

const show = ref(false)
onMounted(() => {
  setTimeout(() => { show.value = true }, 300)
})

const materials = [
  { type: 'shell', name: '龟甲', line: '把龟壳背面磨平，再刻上字' },
  { type: 'bone', name: '牛骨', line: '牛肩胛骨更大片，能刻更多字' },
  { type: 'bronze', name: '青铜器', line: '字先刻在泥模上，再铸进铜器' }
]
</script>

<template>
  <div class="stage">
    <header class="stage-head">
      <div>
        <p class="kicker"><i></i>第二幕 · 回到商代</p>
        <h1 class="stage-title">三千多年前，人们这样记事情</h1>
        <p class="stage-sub">约公元前 1300 年 · 商代</p>
      </div>
      <span class="chip">那时候还没有纸</span>
    </header>

    <div class="stage-body">
      <div class="split wide-left">
        <div>
          <div class="scene" :class="{ in: show }" style="height: 396px">
            <SceneArt type="shang" />
          </div>
          <p class="caption">商代的小村落：茅草屋、远处的山、刚升起的太阳、一堆火</p>
        </div>

        <div>
          <p class="lead">
            要记一件事，古人就把它<b>刻在</b><br />
            能长期保存的东西上。
          </p>

          <ul class="materials">
            <li
              v-for="(m, i) in materials"
              :key="m.name"
              :style="{ animationDelay: `${0.3 + i * 0.16}s` }"
            >
              <span class="mini"><SceneArt :type="m.type" /></span>
              <span class="txt">
                <b>{{ m.name }}</b>
                <em>{{ m.line }}</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.9s ease, transform 0.9s ease;
}
.scene.in {
  opacity: 1;
  transform: scale(1);
}

.materials {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  gap: 13px;
}

.materials li {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 13px 20px 13px 13px;
  background: var(--card);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  border-left: 3px solid var(--bronze);
  opacity: 0;
  animation: rise 0.6s ease forwards;
}

@keyframes rise {
  from { opacity: 0; transform: translateX(18px); }
  to { opacity: 1; transform: translateX(0); }
}

.mini {
  flex: 0 0 auto;
  width: 76px;
  height: 58px;
  display: block;
  border-radius: 10px;
  background: var(--paper-warm);
  overflow: hidden;
}

.mini :deep(svg) {
  width: 100%;
  height: 100%;
}

.txt {
  display: grid;
  gap: 3px;
}

.txt b {
  font-size: 26px;
  color: var(--brown);
  letter-spacing: 0.04em;
}

.txt em {
  font-style: normal;
  font-size: 19px;
  color: var(--ink-3);
  letter-spacing: 0.02em;
}
</style>
