<script setup>
/** 自然物 / 文物简笔线稿：与字形做「像不像」的对照 */
defineProps({
  type: { type: String, default: 'mountain' }
})
</script>

<template>
  <svg class="nature" viewBox="0 0 100 100" aria-hidden="true">
    <!-- 山 -->
    <g v-if="type === 'mountain'" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round">
      <path d="M8 80 32 36 50 66 64 42 92 80Z" fill="currentColor" fill-opacity="0.14" />
      <path d="M32 36 39 53 25 53Z" fill="currentColor" fill-opacity="0.4" stroke="none" />
      <path d="M4 80h92" />
    </g>

    <!-- 日 -->
    <g v-else-if="type === 'sun'" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
      <circle cx="50" cy="50" r="21" fill="currentColor" fill-opacity="0.16" />
      <path d="M50 14v10M50 76v10M14 50h10M76 50h10M24 24l7 7M69 69l7 7M76 24l-7 7M31 69l-7 7" />
    </g>

    <!-- 月 -->
    <g v-else-if="type === 'moon'" fill="currentColor">
      <path d="M68 16a36 36 0 1 0 0 68 42 42 0 0 1 0-68Z" fill-opacity="0.2" />
      <path d="M68 16a36 36 0 1 0 0 68 42 42 0 0 1 0-68Z" fill="none" stroke="currentColor" stroke-width="2.6" />
      <circle cx="38" cy="38" r="3.4" fill-opacity="0.5" />
      <circle cx="30" cy="58" r="2.4" fill-opacity="0.4" />
    </g>

    <!-- 木 -->
    <g v-else-if="type === 'tree'" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
      <path d="M50 86V42" />
      <path d="M50 62 32 50M50 58 68 44" />
      <path d="M50 86 38 94M50 86 62 94" />
      <circle cx="50" cy="30" r="19" fill="currentColor" fill-opacity="0.14" />
      <circle cx="34" cy="40" r="12" fill="currentColor" fill-opacity="0.12" />
      <circle cx="66" cy="40" r="12" fill="currentColor" fill-opacity="0.12" />
    </g>

    <!-- 田 -->
    <g v-else-if="type === 'field'" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round">
      <path d="M12 72 34 44h54L66 72Z" fill="currentColor" fill-opacity="0.12" />
      <path d="M28 44 50 72M50 44 72 72M12 58h54M34 44l16 28" stroke-opacity="0.55" />
    </g>

    <!-- 龟甲 -->
    <g v-else-if="type === 'gujia'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
      <path d="M50 8c22 0 34 18 34 42S72 92 50 92 16 74 16 50 28 8 50 8Z" fill="currentColor" fill-opacity="0.07" />
      <path d="M50 13v74" stroke-opacity="0.3" />
      <path d="M28 26c-4 16-4 32 0 48M72 26c4 16 4 32 0 48" stroke-opacity="0.28" />
      <path d="M20 36c10 3 20 3 30 1M20 64c10 2 20 2 30-1M80 36c-10 3-20 3-30 1M80 64c-10 2-20 2-30-1" stroke-opacity="0.2" />
      <path d="M38 30l1 12-2 6" stroke-opacity="0.8" />
      <path d="M62 29l-1 13 2 5" stroke-opacity="0.8" />
      <path d="M43 58l2 11" stroke-opacity="0.6" />
      <path d="M58 60l-2 9" stroke-opacity="0.6" />
    </g>

    <!-- 兽骨（牛肩胛骨） -->
    <g v-else fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round">
      <path
        d="M26 12h48q9 0 9 9v30q0 9-7 12l-12 7v14q0 6-6 6H42q-6 0-6-6V70l-12-7q-7-3-7-12V21q0-9 9-9Z"
        fill="currentColor"
        fill-opacity="0.08"
      />
      <path d="M32 24c12 6 24 6 36 0" stroke-opacity="0.45" />
      <path d="M37 38h26M39 50h22" stroke-opacity="0.32" />
      <path d="M50 70v16" stroke-opacity="0.28" />
      <circle cx="62" cy="60" r="2.6" fill="currentColor" stroke="none" opacity="0.35" />
    </g>
  </svg>
</template>

<style scoped>
.nature {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
