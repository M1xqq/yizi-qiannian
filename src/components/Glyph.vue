<script setup>
import { computed } from 'vue'
import { GLYPHS } from '../data/glyphs.js'

const props = defineProps({
  name: { type: String, required: true },
  stage: { type: String, default: 'jiagu' },
  label: { type: Boolean, default: false }
})

const glyph = computed(() => GLYPHS[props.name])
const isText = computed(() => props.stage === 'lishu' || props.stage === 'kaishu')
const markup = computed(() => glyph.value?.[props.stage] || glyph.value?.jiagu || '')
</script>

<template>
  <span class="glyph-wrap" :class="{ 'with-label': label }">
    <svg
      v-if="!isText"
      class="glyph"
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
  transform: scaleX(1.08);
  letter-spacing: 0.02em;
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
