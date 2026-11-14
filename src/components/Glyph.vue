<script setup>
import { computed } from 'vue'
import { GLYPHS } from '../data/glyphs.js'

const props = defineProps({
  name: { type: String, required: true },
  stage: { type: String, default: 'jiagu' },
  label: { type: Boolean, default: false },
  /** 逐笔书写动画：挂载后一笔一笔「刻」出来 */
  draw: { type: Boolean, default: false },
  /** 书写速度倍数，1 = 默认 */
  speed: { type: Number, default: 1 }
})

const glyph = computed(() => GLYPHS[props.name])
const isText = computed(() => props.stage === 'lishu' || props.stage === 'kaishu')
const markup = computed(() => glyph.value?.[props.stage] || glyph.value?.jiagu || '')
const timing = computed(() => ({
  '--ink-speed': `${(0.95 / props.speed).toFixed(2)}s`
}))
</script>

<template>
  <span class="glyph-wrap" :class="{ 'with-label': label }">
    <svg
      v-if="!isText"
      class="glyph"
      :class="{ draw }"
      :style="timing"
      viewBox="0 0 100 100"
      role="img"
      :aria-label="glyph?.char"
    >
      <g v-html="markup"></g>
    </svg>
    <span v-else class="glyph-text" :class="stage">{{ glyph?.char }}</span>
    <em v-if="label" class="glyph-label">{{ glyph?.char }}</em>
  </span>
</template>

<style scoped>
.glyph-wrap {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
}

.glyph,
.glyph-text {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.glyph-text {
  display: grid;
  place-items: center;
  line-height: 1;
  font-weight: 500;
}

.glyph-text.kaishu {
  font-family: var(--kai);
}

.glyph-text.lishu {
  font-family: "LiSu", "STLiti", STKaiti, serif;
  transform: scaleX(1.06);
  letter-spacing: 0.02em;
}

/* 逐笔书写：按笔画顺序依次「刻」出来 */
.glyph.draw :deep(g > *) {
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  animation: ink var(--ink-speed, 0.95s) cubic-bezier(0.55, 0.1, 0.35, 1) forwards;
}

.glyph.draw :deep(g > *:nth-child(1)) { animation-delay: 0s; }
.glyph.draw :deep(g > *:nth-child(2)) { animation-delay: calc(var(--ink-speed, 0.95s) * 0.7); }
.glyph.draw :deep(g > *:nth-child(3)) { animation-delay: calc(var(--ink-speed, 0.95s) * 1.4); }
.glyph.draw :deep(g > *:nth-child(4)) { animation-delay: calc(var(--ink-speed, 0.95s) * 2.1); }
.glyph.draw :deep(g > *:nth-child(5)) { animation-delay: calc(var(--ink-speed, 0.95s) * 2.8); }
.glyph.draw :deep(g > *:nth-child(6)) { animation-delay: calc(var(--ink-speed, 0.95s) * 3.5); }

@keyframes ink {
  to {
    stroke-dashoffset: 0;
  }
}

.glyph-label {
  position: absolute;
  left: 50%;
  bottom: -0.4em;
  transform: translateX(-50%);
  font-style: normal;
  font-size: 0.4em;
  color: var(--ink-3);
  letter-spacing: 0.3em;
}
</style>
