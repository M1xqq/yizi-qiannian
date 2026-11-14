<script setup>
/**
 * 心纹项目标识（官方素材 logored.png，构建时 base64 内联，离线可用）
 * 不做任何改色或重绘，保持原始印面细节。
 */
import logo from '../assets/xinwen-logo.png'

defineProps({
  height: { type: Number, default: 150 }
})
</script>

<template>
  <img class="xinwen-logo" :src="logo" :style="{ height: `${height}px` }" alt="心纹" />
</template>

<style scoped>
.xinwen-logo {
  display: block;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 18px rgba(183, 63, 66, 0.14));
}
</style>
