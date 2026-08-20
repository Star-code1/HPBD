<template lang="pug">
section.hero-banner
  .hero-wrapper
    .crown-wrapper
      span.crown 👑
      .glow-ring

    .badge-wrap
      span.badge-pill 🌟 SINH NHẬT ĐẶC BIỆT 20/08/1984 🌟

    h1.hero-title
      span.sub-hello CHÚC MỪNG SINH NHẬT
      span.mom-name "CHỊ TRANG"
      span.age-tag Mãi Mãi Tuổi 18+ 💛

    p.hero-tagline
      | Người phụ nữ quyền lực, xinh đẹp, đảm đang & dễ thương nhất vũ trụ của gia đình ta! ✨

    .stats-grid
      .stat-card
        .stat-val {{ daysCount }}
        .stat-lbl Ngày Tỏa Sáng ☀️
      .stat-card
        .stat-val 100%
        .stat-lbl Xinh Đẹp & Trẻ Trung 💃
      .stat-card
        .stat-val ∞
        .stat-lbl Tình Yêu Của Cả Nhà ❤️

    .hero-actions
      button.btn-gold(@click="celebrate")
        span.btn-icon 🎆
        span BẮN PHÁO HOA ĂN MỪNG
      button.btn-outline(@click="scrollToCake")
        span.btn-icon 🎂
        span THỔI NẾN NGAY
</template>

<script setup>
import { computed } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

// Tính số ngày từ 20/08/1984
const daysCount = computed(() => {
  const birthDate = new Date('1984-08-20T00:00:00')
  const now = new Date()
  const diffTime = Math.abs(now - birthDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays.toLocaleString('vi-VN')
})

const celebrate = () => {
  sound.playCheer()
  sound.playTing()
  
  // Pháo hoa bung từ 2 bên
  const count = 200
  const defaults = {
    origin: { y: 0.7 }
  }

  const fire = (particleRatio, opts) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#F59E0B', '#FBBF24', '#FEF08A']
  })
  fire(0.2, {
    spread: 60,
    colors: ['#FFFFFF', '#F59E0B', '#D97706']
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FBBF24', '#FEF08A', '#78350F']
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FDE68A', '#F59E0B']
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#F59E0B', '#FFFFFF', '#FBBF24']
  })
}

const scrollToCake = () => {
  sound.playTing()
  const el = document.getElementById('cake-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.hero-banner
  min-height: 85vh
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  padding: 40px 20px
  position: relative
  z-index: 2

.hero-wrapper
  max-width: 850px
  margin: 0 auto
  display: flex
  flex-direction: column
  align-items: center

.crown-wrapper
  position: relative
  margin-bottom: 12px

.crown
  font-size: 64px
  display: inline-block
  animation: bounceRotate 2.5s ease-in-out infinite alternate
  filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.6))

.glow-ring
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 90px
  height: 90px
  border-radius: 50%
  background: radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0) 70%)
  animation: pulseGlow 2s infinite

.badge-wrap
  margin-bottom: 16px

.badge-pill
  background: rgba(245, 158, 11, 0.15)
  color: #B45309
  border: 1.5px solid rgba(245, 158, 11, 0.4)
  padding: 6px 20px
  border-radius: 9999px
  font-size: 14px
  font-weight: 700
  letter-spacing: 1px
  text-transform: uppercase
  display: inline-block
  backdrop-filter: blur(8px)

.hero-title
  margin: 0
  display: flex
  flex-direction: column
  gap: 8px

.sub-hello
  font-family: $font-display
  font-size: 22px
  font-weight: 800
  color: $gold-dark
  letter-spacing: 3px
  text-transform: uppercase

.mom-name
  font-family: $font-title
  font-size: 68px
  line-height: 1.2
  background: linear-gradient(135deg, #D97706 0%, #F59E0B 40%, #FBBF24 70%, #B45309 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  filter: drop-shadow(0 4px 10px rgba(245, 158, 11, 0.35))
  margin: 4px 0

  @media (max-width: 640px)
    font-size: 46px

.age-tag
  font-family: $font-hand
  font-size: 28px
  color: #92400E
  font-weight: 700
  transform: rotate(-3deg)
  display: inline-block

.hero-tagline
  font-size: 18px
  color: #78350F
  max-width: 620px
  margin: 20px auto 30px
  line-height: 1.6
  font-weight: 500

.stats-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 16px
  width: 100%
  max-width: 650px
  margin-bottom: 35px

  @media (max-width: 600px)
    grid-template-columns: 1fr

.stat-card
  card-glass()
  padding: 16px 12px
  transition: transform 0.3s, box-shadow 0.3s
  border-color: rgba(251, 191, 36, 0.5)

  &:hover
    transform: translateY(-5px)
    box-shadow: $shadow-gold

.stat-val
  font-family: $font-display
  font-size: 26px
  font-weight: 900
  color: #B45309

.stat-lbl
  font-size: 13px
  color: #92400E
  font-weight: 600
  margin-top: 4px

.hero-actions
  display: flex
  gap: 16px
  flex-wrap: wrap
  justify-content: center

.btn-gold
  gold-button()
  font-size: 16px

.btn-outline
  background: rgba(255, 255, 255, 0.9)
  color: #B45309
  font-weight: 700
  padding: 12px 28px
  border-radius: 9999px
  border: 2px solid #F59E0B
  cursor: pointer
  display: inline-flex
  align-items: center
  gap: 8px
  transition: all 0.3s

  &:hover
    background: #FEF3C7
    transform: translateY(-3px)
    box-shadow: $shadow-gold

.btn-icon
  font-size: 18px

@keyframes bounceRotate
  0%
    transform: translateY(0) rotate(-6deg) scale(1)
  100%
    transform: translateY(-12px) rotate(6deg) scale(1.08)

@keyframes pulseGlow
  0%
    transform: translate(-50%, -50%) scale(0.8)
    opacity: 0.4
  50%
    transform: translate(-50%, -50%) scale(1.3)
    opacity: 0.8
  100%
    transform: translate(-50%, -50%) scale(0.8)
    opacity: 0.4
</style>
