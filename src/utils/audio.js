// Bộ phát âm thanh Web Audio API & Nhạc Happy Birthday không cần tài nguyên ngoài
class SoundController {
  constructor() {
    this.ctx = null
    this.isPlayingMusic = false
    this.musicTimeout = null
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      this.ctx = new AudioContext()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Âm thanh Pop / Bóng nổ
  playPop() {
    this.initContext()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, now)
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.linearRampToValueAtTime(0.01, now + 0.08)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  // Âm thanh Ting / Chuông vàng lấp lánh
  playTing() {
    this.initContext()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const freqs = [1046.5, 1318.51, 1567.98, 2093.0] // C6, E6, G6, C7
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(f, now + idx * 0.05)

      gain.gain.setValueAtTime(0.15, now + idx * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.6)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now + idx * 0.05)
      osc.stop(now + idx * 0.05 + 0.6)
    })
  }

  // Âm thanh Thổi nến (Whoosh)
  playBlow() {
    this.initContext()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const bufferSize = this.ctx.sampleRate * 0.6
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.linearRampToValueAtTime(200, now + 0.6)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    noise.start(now)
    noise.stop(now + 0.6)
  }

  // Âm thanh vỗ tay vui vẻ (Cheer / Applause)
  playCheer() {
    this.initContext()
    if (!this.ctx) return
    const now = this.ctx.currentTime
    for (let i = 0; i < 20; i++) {
      const delay = Math.random() * 0.7
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(500 + Math.random() * 400, now + delay)

      gain.gain.setValueAtTime(0.1, now + delay)
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.15)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now + delay)
      osc.stop(now + delay + 0.15)
    }
  }

  // Giai điệu Happy Birthday to You
  startHappyBirthdayMelody(loop = true) {
    this.initContext()
    if (!this.ctx) return
    this.isPlayingMusic = true

    // Note frequencies (C4 = 261.63, D4 = 293.66, etc.)
    const notes = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
      G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46
    }

    // [Note, duration in beats]
    const melody = [
      ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
      ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
      ['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
      ['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2]
    ]

    const tempo = 135 // bpm
    const beatDuration = 60 / tempo
    let scheduleTime = this.ctx.currentTime + 0.1

    const playLoop = () => {
      if (!this.isPlayingMusic) return
      scheduleTime = this.ctx.currentTime + 0.1
      let totalDuration = 0

      melody.forEach(([noteName, beats]) => {
        const freq = notes[noteName] || 440
        const duration = beats * beatDuration

        // Main melody synth
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, scheduleTime + totalDuration)

        // Warm harmonic overtone
        const osc2 = this.ctx.createOscillator()
        const gain2 = this.ctx.createGain()
        osc2.type = 'triangle'
        osc2.frequency.setValueAtTime(freq * 2, scheduleTime + totalDuration)

        const noteStart = scheduleTime + totalDuration
        gain.gain.setValueAtTime(0.001, noteStart)
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration * 0.95)

        gain2.gain.setValueAtTime(0.001, noteStart)
        gain2.gain.linearRampToValueAtTime(0.06, noteStart + 0.05)
        gain2.gain.exponentialRampToValueAtTime(0.001, noteStart + duration * 0.95)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc2.connect(gain2)
        gain2.connect(this.ctx.destination)

        osc.start(noteStart)
        osc.stop(noteStart + duration)
        osc2.start(noteStart)
        osc2.stop(noteStart + duration)

        totalDuration += duration
      })

      if (loop) {
        this.musicTimeout = setTimeout(() => {
          if (this.isPlayingMusic) {
            playLoop()
          }
        }, totalDuration * 1000 + 1200)
      }
    }

    playLoop()
  }

  stopMusic() {
    this.isPlayingMusic = false
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout)
      this.musicTimeout = null
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic()
      return false
    } else {
      this.startHappyBirthdayMelody(true)
      return true
    }
  }
}

export const sound = new SoundController()
