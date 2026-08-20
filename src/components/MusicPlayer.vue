<template lang="pug">
.music-player-wrap
  button.music-btn(:class="{ 'is-playing': isPlaying }" @click="toggleMusic" title="Bật / Tắt Nhạc Sinh Nhật")
    span.music-icon {{ isPlaying ? '🎵' : '🔇' }}
    span.music-label {{ isPlaying ? 'Đang phát nhạc' : 'Bật nhạc' }}
    .music-waves(v-if="isPlaying")
      span.wave(v-for="n in 3" :key="n")
</template>

<script setup>
import { ref } from 'vue'
import { sound } from '@/utils/audio'

const isPlaying = ref(false)

const toggleMusic = () => {
  isPlaying.value = sound.toggleMusic()
}

defineExpose({
  startMusic: () => {
    sound.startHappyBirthdayMelody(true)
    isPlaying.value = true
  }
})
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.music-player-wrap
  position: fixed
  top: 20px
  right: 20px
  z-index: 100

.music-btn
  background: rgba(255, 255, 255, 0.9)
  backdrop-filter: blur(8px)
  border: 2px solid #F59E0B
  border-radius: 9999px
  padding: 8px 18px
  display: flex
  align-items: center
  gap: 8px
  cursor: pointer
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3)
  transition: all 0.3s
  position: relative

  &:hover
    transform: scale(1.05)
    box-shadow: $shadow-glow
    background: #FEF3C7

  &.is-playing
    background: linear-gradient(135deg, #FEF3C7, #FDE68A)
    border-color: #D97706
    animation: musicPulse 2s infinite

.music-icon
  font-size: 20px

.music-label
  font-size: 13px
  font-weight: 700
  color: #78350F

.music-waves
  display: flex
  gap: 2px
  align-items: flex-end
  height: 14px

.wave
  width: 3px
  background: #B45309
  border-radius: 2px
  animation: waveBar 0.8s ease-in-out infinite alternate

  &:nth-child(1)
    height: 8px
    animation-delay: 0.1s
  &:nth-child(2)
    height: 14px
    animation-delay: 0.3s
  &:nth-child(3)
    height: 10px
    animation-delay: 0.2s

@keyframes waveBar
  0%
    height: 4px
  100%
    height: 14px

@keyframes musicPulse
  0%, 100%
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.4)
  50%
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.8)
</style>
