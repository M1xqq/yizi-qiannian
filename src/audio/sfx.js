// 古风音效系统（Web Audio 截段播放 · 无背景循环）
// 素材来源与许可证见 ../assets/audio/来源说明.md
import chimeUrl from '../assets/audio/chime.mp3'
import taikoUrl from '../assets/audio/taiko.mp3'
import bowlUrl from '../assets/audio/bowl.mp3'

const defs = {
  chime: { src: chimeUrl, offset: 0.30, dur: 4.50, gain: 0.70, fadeIn: 0.25, fadeOut: 1.00 }, // 风铃：穿越主声（全段）
  drum: { src: taikoUrl, offset: 4.62, dur: 1.90, gain: 0.85, fadeIn: 0.01, fadeOut: 0.50 }, // 大鼓：节间转场
  drum2: { src: taikoUrl, offset: 6.75, dur: 1.80, gain: 0.80, fadeIn: 0.01, fadeOut: 0.50 }, // 大鼓：领取徽章
  bowl: { src: bowlUrl, offset: 0.72, dur: 3.10, gain: 3.00, fadeIn: 0.02, fadeOut: 0.90 } // 颂钵：答对
}

const state = {
  ctx: null,
  master: null,
  buffers: {},
  loaded: false,
  mode: null,
  elems: null,
  on: true
}

function init() {
  if (state.ctx) return
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  state.ctx = new AC()
  state.master = state.ctx.createGain()
  state.master.connect(state.ctx.destination)
  const unlock = () => {
    if (state.ctx && state.ctx.state === 'suspended') state.ctx.resume()
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)
}

export async function loadSfx() {
  init()
  if (state.loaded) return
  if (state.ctx) {
    try {
      await Promise.all(
        Object.entries(defs).map(async ([name, def]) => {
          if (state.buffers[name]) return
          const res = await fetch(def.src)
          const raw = await res.arrayBuffer()
          state.buffers[name] = await state.ctx.decodeAudioData(raw)
        })
      )
      state.mode = 'buffer'
      state.loaded = true
      return
    } catch (e) {
      /* file:// 下 fetch 被 CORS 拦截，退回 audio 元素模式 */
    }
  }
  // 元素模式兜底：用 <audio> 标签播放
  state.mode = 'element'
  state.elems = {}
  Object.entries(defs).forEach(([name, def]) => {
    const a = new Audio(def.src)
    a.preload = 'auto'
    state.elems[name] = a
  })
  await Promise.all(
    Object.values(state.elems).map(a => new Promise(res => {
      if (a.readyState >= 3) return res()
      a.addEventListener('canplaythrough', res, { once: true })
      a.addEventListener('error', res, { once: true })
      setTimeout(res, 3000)
    }))
  )
  state.loaded = true
}

export function playSfx(name) {
  if (!state.on || !state.loaded) return
  if (state.mode === 'element') return playElement(name)
  if (!state.ctx || !state.buffers[name]) return
  if (state.ctx.state === 'suspended') state.ctx.resume()
  const def = defs[name]
  const src = state.ctx.createBufferSource()
  src.buffer = state.buffers[name]
  const g = state.ctx.createGain()
  const t = state.ctx.currentTime
  const fi = def.fadeIn || 0.02
  const fo = def.fadeOut || 0.5
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(def.gain, t + fi)
  g.gain.setValueAtTime(def.gain, t + Math.max(def.dur - fo, fi))
  g.gain.exponentialRampToValueAtTime(0.0001, t + def.dur)
  src.connect(g)
  g.connect(state.master)
  src.start(t, def.offset, def.dur + 0.05)
}

function playElement(name) {
  const def = defs[name]
  const a = state.elems && state.elems[name]
  if (!a) return
  try { a.pause() } catch (e) { /* ignore */ }
  a.currentTime = def.offset
  a.volume = 0.0001
  a.play().catch(() => {})
  const fi = def.fadeIn || 0.02
  const fo = def.fadeOut || 0.5
  const g = Math.min(1, def.gain)
  const t0 = performance.now()
  const ramp = setInterval(() => {
    const el = (performance.now() - t0) / 1000
    let v
    if (el < fi) v = (g * el) / fi
    else if (el > def.dur - fo) v = g * Math.max(0, (def.dur - el) / fo)
    else v = g
    a.volume = Math.min(1, Math.max(0.0001, v))
    if (el >= def.dur) {
      clearInterval(ramp)
      a.pause()
    }
  }, 40)
}

export function setSfxOn(v) {
  state.on = v
  if (v) playSfx('bowl')
}
