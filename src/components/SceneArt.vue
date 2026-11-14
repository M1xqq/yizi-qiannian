<script setup>
/**
 * 场景插画：课堂投屏用的大幅线稿
 * 统一 400 × 300 viewBox，深棕描线 + 古铜金淡填 + 朱红点缀，
 * 与宣纸底、古铜细边框配合，形成「古籍插图」的观感。
 * 全部内联 SVG，无外部图片依赖。
 */
defineProps({
  type: { type: String, required: true }
})
</script>

<template>
  <svg viewBox="0 0 400 300" role="presentation">
    <!-- 商代村落夜景前的白天场景：茅屋、山、日、炊烟 -->
    <g v-if="type === 'shang'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <!-- 天光 -->
      <circle cx="316" cy="62" r="26" fill="var(--bronze)" fill-opacity="0.22" stroke="var(--bronze-deep)" />
      <g class="rays" stroke="var(--bronze-deep)" stroke-opacity="0.6">
        <path d="M316 22v-8M316 110v8M276 62h-8M356 62h8" />
        <path d="M288 34l-6-6M344 90l6 6M344 34l6-6M288 90l-6 6" />
      </g>
      <!-- 远山 -->
      <path d="M0 176 68 104 128 176Z" fill="var(--brown)" fill-opacity="0.08" />
      <path d="M96 176 176 88 262 176Z" fill="var(--brown)" fill-opacity="0.12" />
      <path d="M236 176 306 118 380 176Z" fill="var(--brown)" fill-opacity="0.07" />
      <!-- 地面 -->
      <path d="M0 176h400" stroke-width="2.4" />
      <path d="M0 214h400M0 254h400" stroke-opacity="0.16" />
      <!-- 茅屋 -->
      <g>
        <path d="M96 208v-54l52-34 52 34v54Z" fill="var(--card)" />
        <path d="M88 154 148 112l60 42" stroke-width="2.6" fill="var(--bronze)" fill-opacity="0.18" />
        <path d="M88 154 148 112" stroke-opacity="0.4" />
        <path d="M148 112v-14" />
        <path d="M128 208v-30a20 20 0 0 1 40 0v30" fill="var(--bronze)" fill-opacity="0.16" />
        <path d="M104 168h12M104 184h12" stroke-opacity="0.5" />
      </g>
      <!-- 炊烟 -->
      <g class="smoke" stroke="var(--brown-soft)" stroke-opacity="0.5">
        <path d="M148 96c8-10-6-16 2-26s-4-14 4-22" />
        <path d="M160 100c6-8-4-13 2-21" stroke-opacity="0.3" />
      </g>
      <!-- 两个商代人 -->
      <g fill="var(--brown)" fill-opacity="0.72" stroke="none">
        <circle cx="252" cy="196" r="7" />
        <path d="M252 203c-7 0-11 6-11 14v14h22v-14c0-8-4-14-11-14Z" />
        <circle cx="286" cy="200" r="6" />
        <path d="M286 206c-6 0-9 5-9 12v13h18v-13c0-7-3-12-9-12Z" />
      </g>
      <!-- 火堆 -->
      <g class="fire">
        <path d="M348 246c-8-8-10-16-2-24 0 8 6 8 6 2 8 8 8 16 0 22Z" fill="var(--cinnabar)" fill-opacity="0.75" stroke="none" />
        <path d="M336 248h30" stroke="var(--brown)" />
      </g>
    </g>

    <!-- 山 -->
    <g v-else-if="type === 'mountain'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <path d="M0 214 74 96 148 214Z" fill="var(--brown)" fill-opacity="0.1" />
      <path d="M112 214 208 62 306 214Z" fill="var(--brown)" fill-opacity="0.16" />
      <path d="M262 214 340 118 400 214Z" fill="var(--brown)" fill-opacity="0.08" />
      <path d="M0 214h400" stroke-width="2.6" />
      <!-- 雪顶/山脊 -->
      <path d="M186 94 208 62l22 32" stroke="var(--bronze-deep)" stroke-opacity="0.7" />
      <path d="M208 62v152" stroke-opacity="0.18" />
      <!-- 云 -->
      <g class="drift" stroke="var(--bronze-deep)" stroke-opacity="0.5">
        <path d="M60 84c10-12 30-10 34 2 12-4 22 4 20 12H48c-2-8 4-14 12-14Z" fill="var(--card)" />
        <path d="M300 62c8-10 24-8 28 2 10-4 18 4 16 10h-56c-2-6 4-12 12-12Z" fill="var(--card)" />
      </g>
      <!-- 树 -->
      <g stroke="var(--brown)" stroke-opacity="0.55">
        <path d="M54 214v-22M54 200l-8-10M54 200l8-10" />
        <path d="M348 214v-18M348 204l-7-8M348 204l7-8" />
      </g>
    </g>

    <!-- 太阳 -->
    <g v-else-if="type === 'sun'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <circle cx="200" cy="140" r="58" fill="var(--bronze)" fill-opacity="0.28" stroke="var(--bronze-deep)" stroke-width="2.4" />
      <g class="rays" stroke="var(--bronze-deep)">
        <path d="M200 46v-22M200 234v22M106 140H84M294 140h22" />
        <path d="M134 74 118 58M266 206l16 16M266 74l16-16M134 206l-16 16" />
        <path d="M200 22v-6M200 258v6M88 140h-6M318 140h6" stroke-opacity="0.45" />
      </g>
      <path d="M0 250h400" stroke-width="2.4" stroke-opacity="0.4" />
      <path d="M46 250c22-10 44-10 66 0M286 250c22-10 44-10 66 0" stroke-opacity="0.28" />
    </g>

    <!-- 田地 -->
    <g v-else-if="type === 'field'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <path d="M28 96h344v150H28Z" fill="var(--bronze)" fill-opacity="0.14" />
      <path d="M200 96v150M28 171h344" stroke-width="2.6" />
      <g stroke-opacity="0.35">
        <path d="M28 124h344M28 140h344M28 208h344M28 228h344" stroke-dasharray="10 12" />
        <path d="M96 96v150M148 96v150M252 96v150M304 96v150" stroke-dasharray="10 12" />
      </g>
      <!-- 禾苗 -->
      <g stroke="var(--bronze-deep)" stroke-width="2.4">
        <path d="M64 220v-16M64 214l-8-8M64 214l8-8" />
        <path d="M118 214v-14M118 208l-7-7M118 208l7-7" />
        <path d="M262 220v-16M262 214l-8-8M262 214l8-8" />
        <path d="M320 212v-14M320 206l-7-7M320 206l7-7" />
      </g>
      <path d="M0 262h400" stroke-width="2.6" />
    </g>

    <!-- 月夜 -->
    <g v-else-if="type === 'moon'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <path d="M164 52c-34 18-34 76 0 94-24-22-24-72 0-94Z" fill="var(--bronze)" fill-opacity="0.4" stroke="var(--bronze-deep)" stroke-width="2.4" />
      <g class="twinkle" stroke="var(--bronze-deep)" stroke-opacity="0.7">
        <path d="M250 70l4 8 8 4-8 4-4 8-4-8-8-4 8-4Z" fill="var(--bronze)" fill-opacity="0.4" />
        <path d="M306 128v10M301 133h10" />
        <path d="M286 46v8M282 50h8" />
      </g>
      <path d="M0 208 70 140 140 208Z" fill="var(--brown)" fill-opacity="0.12" />
      <path d="M120 208 208 120 296 208Z" fill="var(--brown)" fill-opacity="0.16" />
      <path d="M0 208h400" stroke-width="2.6" />
      <path d="M0 246h400" stroke-opacity="0.18" />
      <g opacity="0.55">
        <path d="M320 208v-20M320 196l-8-9M320 196l8-9" />
      </g>
    </g>

    <!-- 树 -->
    <g v-else-if="type === 'tree'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <path d="M200 264V120" stroke-width="3.4" />
      <path d="M200 168 138 108M200 168l62-60" stroke-width="2.8" />
      <path d="M200 208 152 166M200 208l48-42" stroke-width="2.4" />
      <path d="M138 108c-24-6-30-30-12-42 10-16 38-16 48 0 18 4 18 28 0 34-12 10-24 10-36 8Z" fill="var(--card)" />
      <path d="M262 108c-24-6-30-30-12-42 10-16 38-16 48 0 18 4 18 28 0 34-12 10-24 10-36 8Z" fill="var(--card)" />
      <path d="M200 96c-30-8-34-40-10-52 16-16 44-12 54 6 18 8 12 34-8 40-12 6-24 8-36 6Z" fill="var(--card)" stroke="var(--bronze-deep)" stroke-opacity="0.5" />
      <path d="M0 264h400" stroke-width="2.6" />
      <path d="M200 264v-16M200 252l-14-12M200 252l14-12" stroke-width="2.6" stroke-opacity="0.7" />
    </g>

    <!-- 龟甲（腹甲正面，带灼痕与刻痕） -->
    <g
      v-else-if="type === 'shell'"
      transform="translate(200 112) scale(1.32) translate(-200 -112)"
      fill="none"
      stroke="var(--brown)"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path
        d="M200 22c48 0 78 20 92 48 14 28 12 60-2 84-14 24-40 40-90 40s-76-16-90-40c-14-24-16-56-2-84 14-28 44-48 92-48Z"
        fill="var(--bronze)"
        fill-opacity="0.16"
        stroke-width="2.8"
      />
      <path d="M200 22v52M200 120v50" stroke-opacity="0.55" />
      <path d="M132 96h136" stroke-opacity="0.28" />
      <path d="M166 60c0 22 0 34 0 46M234 60c0 22 0 34 0 46" stroke-opacity="0.18" />
      <path d="M138 70l14 22-10 20M258 70l-14 22 10 20" stroke-opacity="0.3" />
      <!-- 灼痕（钻凿） -->
      <g stroke="var(--cinnabar)" stroke-opacity="0.55" stroke-width="2">
        <ellipse cx="160" cy="64" rx="5" ry="8" />
        <ellipse cx="240" cy="64" rx="5" ry="8" />
        <ellipse cx="150" cy="150" rx="5" ry="8" />
        <ellipse cx="252" cy="150" rx="5" ry="8" />
      </g>
      <!-- 刻痕：示意，不代表真实卜辞内容 -->
      <g stroke="var(--brown)" stroke-opacity="0.42" stroke-width="1.8">
        <path d="M176 100v14M184 100v14M192 100v14M200 100v14M208 100v14" />
        <path d="M176 130h-10M176 130v12M186 130v12" />
        <path d="M222 118v18M222 126h10" />
      </g>
    </g>

    <!-- 兽骨（牛肩胛骨） -->
    <g
      v-else-if="type === 'bone'"
      transform="translate(200 142) scale(1.18) translate(-200 -142)"
      fill="none"
      stroke="var(--brown)"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path
        d="M150 42c0-12 8-20 20-20h60c12 0 20 8 20 20v66c0 12-8 20-20 22l-18 4v56c0 10-8 18-18 18h-8c-10 0-18-8-18-18v-56l-18-4c-12-2-20-10-20-22Z"
        fill="var(--bronze)"
        fill-opacity="0.16"
        stroke-width="2.8"
      />
      <path d="M170 40c20 8 40 8 60 0" stroke-opacity="0.4" />
      <path d="M176 62h48M178 80h44M176 240h48" stroke-opacity="0.3" />
      <path d="M200 156v50" stroke-opacity="0.25" />
      <!-- 刻痕示意 -->
      <g stroke="var(--brown)" stroke-opacity="0.42" stroke-width="1.8">
        <path d="M186 100v16M194 100v16M202 100v16M210 100v16" />
        <path d="M214 132h-12M214 132v14M186 132v14" />
      </g>
      <g stroke="var(--cinnabar)" stroke-opacity="0.5">
        <ellipse cx="182" cy="76" rx="4" ry="7" />
        <ellipse cx="218" cy="76" rx="4" ry="7" />
      </g>
    </g>

    <!-- 青铜鼎 -->
    <g v-else-if="type === 'bronze'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <path d="M132 98h136v56c0 26-30 46-68 46s-68-20-68-46Z" fill="var(--bronze)" fill-opacity="0.26" stroke-width="2.8" />
      <path d="M124 98h152" stroke-width="3.2" />
      <path d="M148 98V80h24v18M228 98V80h24v18" />
      <path d="M170 200v26M230 200v26M156 226h88" stroke-width="2.6" />
      <path d="M150 126h100" stroke-opacity="0.35" />
      <path d="M200 126v52M176 152h48" stroke-opacity="0.28" />
      <path d="M172 78l-6-14M228 78l6-14" stroke-opacity="0.5" />
      <path d="M0 250h400" stroke-width="2.4" stroke-opacity="0.3" />
    </g>

    <!-- 眼睛 -->
    <g v-else-if="type === 'eye'" fill="none" stroke="var(--brown)" stroke-width="2.2" stroke-linecap="round">
      <path d="M60 150C104 84 160 62 200 62s96 22 140 88c-44 66-100 88-140 88S104 216 60 150Z" fill="var(--card)" stroke-width="3" />
      <circle cx="200" cy="150" r="44" fill="var(--bronze)" fill-opacity="0.28" stroke-width="2.8" />
      <circle cx="200" cy="150" r="18" fill="var(--brown)" fill-opacity="0.75" stroke="none" />
      <path d="M156 92 138 66M244 92l18-26" stroke-width="2.6" />
      <path d="M200 238v14" stroke-opacity="0.25" />
    </g>

    <!-- 商代人占卜问天 -->
    <g v-else-if="type === 'rain'" fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <!-- 云雨 -->
      <g stroke="var(--bronze-deep)">
        <path d="M108 62c12-16 40-14 46 2 16-6 30 6 26 18H96c-2-10 4-18 12-20Z" fill="var(--card)" />
        <g class="rain" stroke-opacity="0.6">
          <path d="M118 96l-6 18M142 96l-6 18M166 96l-6 18M126 128l-6 18M154 128l-6 18" />
        </g>
      </g>
      <!-- 人跪坐执骨 -->
      <g fill="var(--brown)" fill-opacity="0.72" stroke="none">
        <circle cx="208" cy="164" r="12" />
        <path d="M208 176c-14 0-22 12-22 28v26h44v-26c0-16-8-28-22-28Z" />
      </g>
      <path d="M186 214h44" stroke="var(--brown)" stroke-opacity="0.5" />
      <!-- 手中的甲骨 -->
      <path d="M246 176h44v56h-44z" fill="var(--bronze)" fill-opacity="0.2" />
      <g stroke="var(--brown)" stroke-opacity="0.45" stroke-width="1.6">
        <path d="M258 192v10M266 192v10M274 192v10" />
        <path d="M258 214h24M258 222h14" />
      </g>
      <!-- 地面 -->
      <path d="M0 240h400" stroke-width="2.6" />
      <path d="M0 272h400" stroke-opacity="0.18" />
    </g>

    <!-- 备用：今天的人看天气 -->
    <g v-else fill="none" stroke="var(--brown)" stroke-width="2" stroke-linecap="round">
      <rect x="130" y="70" width="140" height="170" rx="16" fill="var(--card)" stroke-width="2.6" />
      <path d="M130 108h140" stroke-opacity="0.3" />
      <circle cx="200" cy="88" r="5" fill="var(--brown)" fill-opacity="0.5" stroke="none" />
      <g stroke="var(--bronze-deep)">
        <path d="M158 138c8-10 24-8 28 2 10-4 18 4 16 10h-48c-2-6 2-10 4-12Z" fill="var(--bronze)" fill-opacity="0.2" />
        <path d="M170 168l-5 12M188 168l-5 12M206 168l-5 12" stroke-opacity="0.7" />
        <path d="M150 200h100M150 216h64" stroke="var(--brown)" stroke-opacity="0.3" />
      </g>
      <path d="M0 262h400" stroke-width="2.4" stroke-opacity="0.25" />
    </g>
  </svg>
</template>

<style scoped>
/* 缓慢呼吸式动画：避免闪烁，符合大纲「效果流畅、不过度复杂」 */
.rays {
  transform-origin: 200px 140px;
  animation: breathe 6s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 0.45; }
}

.drift {
  animation: drift 14s ease-in-out infinite;
}
@keyframes drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

.smoke {
  animation: smoke 7s ease-in-out infinite;
}
@keyframes smoke {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(-6px); opacity: 0.4; }
}

.fire {
  transform-origin: 348px 246px;
  animation: flick 1.8s ease-in-out infinite;
}
@keyframes flick {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.12) scaleX(0.94); }
}

.twinkle {
  animation: twinkle 4s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.95; }
}

.rain {
  animation: fall 2.2s linear infinite;
}
@keyframes fall {
  0% { transform: translateY(-6px); opacity: 0; }
  30% { opacity: 0.8; }
  100% { transform: translateY(10px); opacity: 0; }
}
</style>
