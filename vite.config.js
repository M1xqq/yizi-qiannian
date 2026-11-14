import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// 目标：产出一个可双击打开、完全不联网的 dist/index.html。
// 现场投屏教室网络不可靠，因此不使用任何 CDN、外部字体或远程图片。
export default defineConfig({
  base: './',
  plugins: [vue(), viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: 100 * 1024 * 1024,
    chunkSizeWarningLimit: 4096
  }
})
