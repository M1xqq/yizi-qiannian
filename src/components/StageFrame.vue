<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, default: '' },
  sub: { type: String, default: '' },
  section: { type: String, default: '' }
})
</script>

<template>
  <section class="stage">
    <header class="stage-head">
      <div>
        <div v-if="kicker" class="kicker"><i></i>{{ kicker }}</div>
        <h1 class="stage-title">{{ title }}</h1>
        <p v-if="sub" class="stage-sub">{{ sub }}</p>
      </div>
      <div class="head-mark">
        <span class="seal">心纹</span>
        <span v-if="section" class="section-no">{{ section }}</span>
      </div>
    </header>

    <div class="stage-body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="stage-foot">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.head-mark {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 4px;
  flex: 0 0 auto;
}

.section-no {
  font-size: 15px;
  letter-spacing: 0.24em;
  color: var(--ink-4);
}

.stage-foot {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 45px;
  padding-bottom: 36px;
}
</style>
