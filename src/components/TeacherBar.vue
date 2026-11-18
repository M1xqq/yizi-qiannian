<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  titles: { type: Array, default: () => [] },
  elapsed: { type: Number, default: 0 },
  fullscreen: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  soundOn: { type: Boolean, default: true }
})

const emit = defineEmits(['prev', 'next', 'replay', 'reset', 'toggle-pause', 'toggle-sound', 'toggle-fullscreen', 'jump'])

const open = ref(true)
const toggleOpen = () => { open.value = !open.value }

const clock = computed(() => {
  const m = Math.floor(props.elapsed / 60)
  const s = props.elapsed % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
</script>

<template>
  <button class="bar-toggle" :class="{ off: !open }" :title="open ? '收起控制条' : '展开控制条'" @click="toggleOpen">
    {{ open ? '✕' : '☰' }}
  </button>
  <div class="bar" :class="{ hidden: !open }" role="toolbar" aria-label="教师控制条">
    <button class="arrow" :disabled="index === 0" title="上一节（←）" @click="emit('prev')">←</button>

    <div class="dots">
      <button
        v-for="(t, i) in titles"
        :key="i"
        class="dot"
        :class="{ on: i === index, done: i < index }"
        :title="`${i + 1}. ${t}（按 ${i + 1} 直达）`"
        :aria-label="t"
        @click="emit('jump', i)"
      >
        <span>{{ i + 1 }}</span>
      </button>
    </div>

    <span class="now">{{ titles[index] }}</span>

    <span class="clock" :title="`本节课程已进行 ${clock}`">{{ clock }}</span>

    <button class="tool" :class="{ on: paused }" title="暂停／继续动画（P）" @click="emit('toggle-pause')">
      {{ paused ? '▶' : '❚❚' }}
    </button>
    <button class="tool" title="重播本节动画（R）" @click="emit('replay')">↻</button>
    <button class="tool" :class="{ off: !soundOn }" :title="soundOn ? '音效开（点击静音）' : '音效关（点击开启）'" @click="emit('toggle-sound')">
      {{ soundOn ? '♪' : '×' }}
    </button>
    <button class="tool" title="重置本节／整节课（Shift+R 全量重置）" @click="emit('reset')">⟲</button>
    <button class="tool" title="全屏投屏（F）" @click="emit('toggle-fullscreen')">
      {{ fullscreen ? '⤡' : '⤢' }}
    </button>

    <button class="arrow next" :disabled="index >= total - 1" title="下一节（→ 或空格）" @click="emit('next')">
      →
    </button>
  </div>
</template>

<style scoped>
.bar-toggle {
  position: fixed;
  right: 2.4%;
  bottom: 18px;
  z-index: 61;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: var(--brown);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.bar-toggle:hover {
  transform: scale(1.08);
  background: #fff;
}

.bar-toggle.off {
  background: var(--cinnabar-soft);
  color: var(--cinnabar);
}

.bar {
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  opacity: 0.55;
  transition: opacity 0.25s ease, transform 0.3s ease;
  z-index: 60;
  max-width: 1180px;
}

.bar.hidden {
  transform: translateX(-50%) translateY(140%);
}

.bar:hover,
.bar:focus-within {
  opacity: 1;
}

.arrow {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--cinnabar);
  color: #fff;
  font-size: 15px;
  line-height: 1;
  display: grid;
  place-items: center;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.arrow:hover:not(:disabled) {
  background: var(--cinnabar-deep);
}

.arrow:disabled {
  background: var(--ink-4);
  opacity: 0.45;
  cursor: default;
}

.dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--cinnabar-line);
  color: var(--ink-3);
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  transition: all 0.2s ease;
}

.dot.done {
  background: var(--cinnabar-soft);
  border-color: transparent;
  color: var(--cinnabar);
}

.dot.on {
  background: var(--cinnabar);
  border-color: var(--cinnabar);
  color: #fff;
}

.now {
  font-size: 12px;
  color: var(--ink-2);
  letter-spacing: 0.06em;
  max-width: 20ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 4px;
}

.clock {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--cinnabar);
  background: var(--cinnabar-soft);
  border-radius: 999px;
  padding: 3px 9px;
}

.tool {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: var(--ink-2);
  font-size: 14px;
  display: grid;
  place-items: center;
}

.tool:hover {
  background: rgba(42, 42, 42, 0.06);
  color: var(--ink);
}

.tool.on {
  background: var(--cinnabar);
  color: #fff;
}

.tool.off {
  color: var(--cinnabar);
  background: rgba(183, 63, 66, 0.1);
}

</style>
