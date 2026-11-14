/**
 * 古文字字形线稿
 * ---------------------------------------------------------------
 * 这是按通行写法绘制的「示意线稿」，用于课堂观察与对比，
 * 不是拓片扫描件。对外正式使用前，请由课程负责人对照
 * 《甲骨文合集》《金文编》《说文解字》等资料校核一遍，
 * 校核记录写在 README 的「字形校核」一节。
 *
 * 每个字形都是 100 × 100 viewBox 内的内联 SVG，
 * 统一使用 currentColor；全部以「描线」形式给出，
 * 以便 Glyph 组件做逐笔书写的动画。
 */

const stroke = (d, w = 4.6) =>
  `<g fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</g>`

export const GLYPHS = {
  shan: {
    char: '山',
    pinyin: 'shān',
    nature: 'mountain',
    sense: '中间高、两边低，就是三座并立的山峰。',
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
      4.4
    )
  },

  ri: {
    char: '日',
    pinyin: 'rì',
    nature: 'sun',
    sense: '本来就是一个圆圈，中间那一笔是太阳里的光。',
    jiagu: stroke(`
      <circle cx="50" cy="50" r="29"/>
      <path d="M39 50h22"/>`),
    jinwen: stroke(
      `
      <circle cx="50" cy="50" r="31"/>
      <path d="M50 44v12"/>`,
      6.4
    ),
    xiaozhuan: stroke(
      `
      <path d="M30 16h40v68H30z"/>
      <path d="M30 50h40"/>`,
      4.4
    )
  },

  yue: {
    char: '月',
    pinyin: 'yuè',
    nature: 'moon',
    sense: '一弯月牙，中间那一竖是月亮上的暗影。',
    jiagu: stroke(`
      <path d="M66 12C30 26 30 74 66 88 46 70 46 30 66 12Z"/>
      <path d="M52 40v16"/>`)
  },

  mu: {
    char: '木',
    pinyin: 'mù',
    nature: 'tree',
    sense: '中间一竖是树干，上面是枝，下面是根。',
    jiagu: stroke(`
      <path d="M50 12v78"/>
      <path d="M50 36 26 16"/>
      <path d="M50 36 74 16"/>
      <path d="M50 60 24 84"/>
      <path d="M50 60 76 84"/>`)
  },

  tian: {
    char: '田',
    pinyin: 'tián',
    nature: 'field',
    sense: '方方正正一块地，中间的横竖是田埂。',
    jiagu: stroke(`
      <path d="M21 24h58v54H21z"/>
      <path d="M50 24v54"/>
      <path d="M21 51h58"/>`)
  },

  /* 备用题（第⑦节弹性时间用） */
  mu_eye: {
    char: '目',
    pinyin: 'mù',
    nature: 'eye',
    sense: '横过来的一只眼睛，中间那一圈是眼珠。',
    jiagu: stroke(`
      <path d="M16 50C26 32 42 26 50 26s24 6 34 24c-10 18-26 24-34 24s-24-6-34-24Z"/>
      <path d="M40 50a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"/>
      <path d="M32 33 26 24"/>
      <path d="M68 33 74 24"/>`)
  }
}

/** 各字体阶段（用于「山」的演变时间轴） */
export const SCRIPT_STAGES = [
  { key: 'jiagu', name: '甲骨文', era: '商代', note: '刻在龟甲和兽骨上' },
  { key: 'jinwen', name: '金文', era: '商周', note: '铸在青铜器上' },
  { key: 'xiaozhuan', name: '小篆', era: '秦代', note: '全国统一的写法' },
  { key: 'lishu', name: '隶书', era: '汉代', note: '笔画变得平直' },
  { key: 'kaishu', name: '楷书', era: '今天', note: '我们现在写的字' }
]
