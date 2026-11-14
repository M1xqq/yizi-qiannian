/**
 * 古文字字形线稿
 * ---------------------------------------------------------------
 * 这是按通行写法绘制的「示意线稿」，用于课堂观察与对比，
 * 不是拓片扫描件。对外正式使用前，请由课程负责人对照
 * 《甲骨文合集》《金文编》《说文解字》等资料校核一遍，
 * 校核记录写在 README 的「字形校核」一节。
 *
 * 每个字形都是 100 × 100 viewBox 内的内联 SVG，
 * 统一使用 currentColor，便于随主题换色。
 */

const stroke = (d, w = 4.2) =>
  `<g fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</g>`

export const GLYPHS = {
  shan: {
    char: '山',
    pinyin: 'shān',
    nature: '山',
    sense: '像三座并立的山峰，中间高、两边低。',
    jiagu: stroke(`
      <path d="M14 84h72"/>
      <path d="M20 84 28 58 38 84"/>
      <path d="M36 84 50 26 64 84"/>
      <path d="M62 84 72 58 82 84"/>`),
    jinwen: stroke(
      `
      <path d="M16 80h64"/>
      <path d="M22 80 30 54 40 80"/>
      <path d="M38 80 50 24 62 80"/>
      <path d="M60 80 70 54 78 80"/>`,
      7
    ),
    xiaozhuan: stroke(
      `
      <path d="M50 16v68"/>
      <path d="M30 38v46"/>
      <path d="M70 44v40"/>
      <path d="M20 84h60"/>`,
      4.6
    )
  },

  ri: {
    char: '日',
    pinyin: 'rì',
    nature: '太阳',
    sense: '中间一个圆，是太阳；中间一短横，表示太阳的光或影子。',
    jiagu: stroke(`
      <circle cx="50" cy="50" r="29"/>
      <path d="M38 50h24"/>`),
    jinwen: stroke(
      `
      <circle cx="50" cy="50" r="31"/>
      <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none"/>`,
      7
    ),
    xiaozhuan: stroke(
      `
      <path d="M30 16h40v68H30z"/>
      <path d="M30 50h40"/>`,
      4.6
    )
  },

  yue: {
    char: '月',
    pinyin: 'yuè',
    nature: '月亮',
    sense: '像一弯月牙，中间一竖是月亮上的阴影。',
    jiagu: `
      <path d="M66 14C32 26 30 74 66 86 44 68 44 32 66 14Z" fill="currentColor"/>
      <path d="M51 44v14" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`
  },

  mu: {
    char: '木',
    pinyin: 'mù',
    nature: '树',
    sense: '中间一竖是树干，上面分出枝，下面长出根。',
    jiagu: stroke(`
      <path d="M50 12v78"/>
      <path d="M50 38 26 18"/>
      <path d="M50 38 74 18"/>
      <path d="M50 62 24 86"/>
      <path d="M50 62 76 86"/>`)
  },

  tian: {
    char: '田',
    pinyin: 'tián',
    nature: '田地',
    sense: '方方正正一块地，中间的横竖是田埂。',
    jiagu: stroke(`
      <path d="M21 24h58v54H21z"/>
      <path d="M50 24v54"/>
      <path d="M21 51h58"/>`)
  }
}

/** 商代四代字体阶段（用于「山」的演变动画） */
export const SCRIPT_STAGES = [
  { key: 'jiagu', name: '甲骨文', note: '商代 · 刻在龟甲兽骨上' },
  { key: 'jinwen', name: '金文', note: '商周 · 铸在青铜器上' },
  { key: 'xiaozhuan', name: '小篆', note: '秦代 · 统一的标准字' },
  { key: 'lishu', name: '隶书', note: '汉代 · 笔画变平直' },
  { key: 'kaishu', name: '楷书', note: '今天 · 我们写的字' }
]
