<template lang="pug">
.particles-container
  .balloon(
    v-for="b in balloons"
    :key="b.id"
    :style="{ left: b.left + '%', animationDuration: b.duration + 's', animationDelay: b.delay + 's', transform: 'scale(' + b.scale + ')' }"
    @click="popBalloon(b.id, $event)"
  )
    .balloon-body(:class="b.colorClass")
      span.balloon-icon {{ b.emoji }}
      .string

  .sparkle(
    v-for="s in sparkles"
    :key="s.id"
    :style="{ left: s.left + '%', top: s.top + '%', animationDelay: s.delay + 's', fontSize: s.size + 'px' }"
  ) ✨
</template>

<script setup>
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

const balloons = ref([])
const sparkles = ref([])

const emojis = ['🎂', '👑', '💛', '✨', '💐', '🎁', '⭐', '🥂', '🎉']
const colorClasses = ['gold-solid', 'gold-shiny', 'gold-amber', 'gold-light', 'gold-glitter']

onMounted(() => {
  // Tạo bóng bay
  const newBalloons = []
  for (let i = 0; i < 18; i++) {
    newBalloons.push({
      id: i,
      left: Math.random() * 92 + 3,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 12,
      scale: Math.random() * 0.4 + 0.8,
      emoji: emojis[i % emojis.length],
      colorClass: colorClasses[i % colorClasses.length]
    })
  }
  balloons.value = newBalloons

  // Tạo ánh sao lấp lánh
  const newSparkles = []
  for (let i = 0; i < 25; i++) {
    newSparkles.push({
      id: i,
      left: Math.random() * 95 + 2,
      top: Math.random() * 90 + 5,
      delay: Math.random() * 4,
      size: Math.floor(Math.random() * 14 + 14)
    })
  }
  sparkles.value = newSparkles
})

const popBalloon = (id, event) => {
  sound.playPop()
  const rect = event.target.getBoundingClientRect()
  confetti({
    particleCount: 25,
    spread: 60,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    },
    colors: ['#F59E0B', '#FBBF24', '#FDE68A', '#FEF08A', '#FFFFFF']
  })
  balloons.value = balloons.value.filter(b => b.id !== id)
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.particles-container
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  pointer-events: none
  overflow: hidden
  z-index: 1

.balloon
  position: absolute
  bottom: -120px
  pointer-events: auto
  cursor: pointer
  animation: floatUp 15s linear infinite
  user-select: none
  transition: transform 0.2s

  &:hover
    transform: scale(1.2) !important

.balloon-body
  width: 55px
  height: 70px
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%
  display: flex
  align-items: center
  justify-content: center
  position: relative
  box-shadow: inset -6px -6px 12px rgba(0,0,0,0.15), 0 8px 18px rgba(245,158,11,0.25)

  &.gold-solid
    background: radial-gradient(circle at 30% 30%, #FEF08A, #F59E0B)
  &.gold-shiny
    background: radial-gradient(circle at 30% 30%, #FFFFFF, #FBBF24, #D97706)
  &.gold-amber
    background: radial-gradient(circle at 30% 30%, #FDE68A, #B45309)
  &.gold-light
    background: radial-gradient(circle at 30% 30%, #FFFFFF, #FEF08A, #F59E0B)
  &.gold-glitter
    background: radial-gradient(circle at 35% 25%, #FFFBEB, #F59E0B, #78350F)

  &::after
    content: ''
    position: absolute
    bottom: -6px
    left: 50%
    transform: translateX(-50%)
    width: 0
    height: 0
    border-left: 6px solid transparent
    border-right: 6px solid transparent
    border-bottom: 8px solid #B45309

.balloon-icon
  font-size: 20px

.string
  position: absolute
  bottom: -35px
  left: 50%
  width: 2px
  height: 35px
  background: rgba(180, 83, 9, 0.4)
  transform-origin: top center
  animation: sway 2s ease-in-out infinite alternate

.sparkle
  position: absolute
  animation: twinkle 3s ease-in-out infinite alternate
  opacity: 0.8
  user-select: none

@keyframes floatUp
  0%
    transform: translateY(0) rotate(0deg)
    opacity: 0.9
  80%
    opacity: 0.95
  100%
    transform: translateY(-110vh) rotate(15deg)
    opacity: 0

@keyframes sway
  0%
    transform: rotate(-10deg)
  100%
    transform: rotate(10deg)

@keyframes twinkle
  0%
    transform: scale(0.6) rotate(0deg)
    opacity: 0.2
  50%
    transform: scale(1.3) rotate(45deg)
    opacity: 1
    filter: drop-shadow(0 0 8px #FBBF24)
  100%
    transform: scale(0.6) rotate(90deg)
    opacity: 0.2
</style>
