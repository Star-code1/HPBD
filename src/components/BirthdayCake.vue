<template lang="pug">
section#cake-section.cake-section
  .section-header
    span.section-badge 🎂 ĐIỀU ƯỚC TUỔI MỚI 🎂
    h2.section-title Bánh Sinh Nhật Hoàng Gia
    p.section-subtitle Hãy nhắm mắt lại, ước 1 điều thật đẹp rồi thổi nến mẹ nhé! ✨

  .cake-stage
    .cake-container
      // Nến sinh nhật
      .candles-wrapper
        .candle(
          v-for="(candle, idx) in candles"
          :key="idx"
          @click="toggleCandle(idx)"
        )
          .flame(v-if="candle.lit")
            .flame-inner
            .flame-glow
          .smoke(v-else)
          .wick
          .candle-stick

      // Tầng bánh trên cùng
      .cake-layer.layer-top
        .icing-drips
          .drip(v-for="n in 6" :key="n")
        .layer-decor
          span 🍓
          span ⭐
          span 🍓
        .cream-plate

      // Tầng bánh giữa
      .cake-layer.layer-middle
        .icing-drips
          .drip(v-for="n in 8" :key="n")
        .layer-text 20/08/1984
        .layer-decor
          span 💛
          span 👑
          span 💛
        .cream-plate

      // Tầng bánh dưới cùng
      .cake-layer.layer-bottom
        .icing-drips
          .drip(v-for="n in 10" :key="n")
        .layer-text CHỊ TRANG XINH ĐẸP
        .layer-decor
          span ✨
          span 💖
          span ✨
        .cream-plate

      // Đĩa bánh
      .cake-plate

  .cake-controls
    button.btn-gold(v-if="hasLitCandles" @click="blowAllCandles")
      span.btn-icon 🌬️
      span THỔI TẮT NẾN & ƯỚC NGUYỆN
    button.btn-outline(v-else @click="relightCandles")
      span.btn-icon 🔥
      span THẮP LẠI NẾN LUNG LINH

  transition(name="fade")
    .wish-popup(v-if="showWishModal")
      .wish-popup-card
        .wish-icon 🎉
        h3.wish-title Ước Nguyện Đã Được Gửi Tới Vũ Trụ!
        p.wish-desc Chúc "Chị Trang" bước sang tuổi mới luôn luôn trẻ đẹp như hoa, sức khỏe tràn đầy, nụ cười rạng rỡ và tiền vào như nước! Cả nhà yêu mẹ nhất trên đời! 💖
        button.btn-gold(@click="showWishModal = false")
          span CẢM ƠN CẢ NHÀ 💛
</template>

<script setup>
import { ref, computed } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

const candles = ref([
  { lit: true },
  { lit: true },
  { lit: true }
])

const showWishModal = ref(false)

const hasLitCandles = computed(() => candles.value.some(c => c.lit))

const toggleCandle = (idx) => {
  candles.value[idx].lit = !candles.value[idx].lit
  if (!candles.value[idx].lit) {
    sound.playBlow()
  } else {
    sound.playTing()
  }
}

const blowAllCandles = () => {
  sound.playBlow()
  candles.value.forEach(c => c.lit = false)
  
  setTimeout(() => {
    sound.playCheer()
    sound.playTing()
    showWishModal.value = true

    // Hiệu ứng pháo hoa cực lớn
    const end = Date.now() + 2.5 * 1000
    const colors = ['#F59E0B', '#FBBF24', '#FEF08A', '#EC4899', '#3B82F6']

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, 400)
}

const relightCandles = () => {
  sound.playTing()
  candles.value.forEach(c => c.lit = true)
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.cake-section
  padding: 60px 20px
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  z-index: 2

.section-header
  text-align: center
  margin-bottom: 40px

.section-badge
  background: rgba(245, 158, 11, 0.15)
  color: #B45309
  border: 1.5px solid rgba(245, 158, 11, 0.4)
  padding: 6px 18px
  border-radius: 9999px
  font-size: 13px
  font-weight: 700
  letter-spacing: 1px
  display: inline-block
  margin-bottom: 8px

.section-title
  font-family: $font-title
  font-size: 42px
  color: #78350F
  margin: 8px 0
  filter: drop-shadow(0 2px 8px rgba(245,158,11,0.2))

.section-subtitle
  font-size: 16px
  color: #92400E
  margin: 0

.cake-stage
  position: relative
  margin: 40px 0 30px
  display: flex
  justify-content: center
  align-items: flex-end

.cake-container
  position: relative
  display: flex
  flex-direction: column
  align-items: center

// Nến
.candles-wrapper
  display: flex
  gap: 24px
  margin-bottom: -4px
  z-index: 10

.candle
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer
  position: relative

.wick
  width: 2px
  height: 8px
  background: #451A03

.candle-stick
  width: 12px
  height: 38px
  background: repeating-linear-gradient(45deg, #FEF08A, #FEF08A 6px, #F59E0B 6px, #F59E0B 12px)
  border-radius: 4px
  box-shadow: 0 2px 6px rgba(0,0,0,0.15)

.flame
  position: relative
  width: 16px
  height: 26px
  margin-bottom: -2px
  animation: flicker 1s ease-in-out infinite alternate

.flame-inner
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  width: 14px
  height: 24px
  background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #FEF08A 30%, #F59E0B 75%, #DC2626 100%)
  border-radius: 50% 50% 20% 20% / 60% 60% 40% 40%

.flame-glow
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 32px
  height: 32px
  background: radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(251,191,36,0) 70%)
  border-radius: 50%
  pointer-events: none

.smoke
  width: 6px
  height: 18px
  background: rgba(150, 150, 150, 0.4)
  border-radius: 50%
  animation: smokeFade 1s forwards
  margin-bottom: 2px

// Tầng bánh
.cake-layer
  position: relative
  background: linear-gradient(to right, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)
  border-radius: 12px
  box-shadow: inset 0 3px 0 #FFFBEB, 0 6px 15px rgba(120,53,15,0.15)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  overflow: hidden

.layer-top
  width: 160px
  height: 60px
  z-index: 3

.layer-middle
  width: 220px
  height: 70px
  margin-top: -6px
  z-index: 2

.layer-bottom
  width: 280px
  height: 80px
  margin-top: -6px
  z-index: 1

.icing-drips
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 14px
  display: flex
  justify-content: space-around

.drip
  width: 14px
  height: 12px
  background: #FFFBEB
  border-radius: 0 0 10px 10px
  box-shadow: 0 2px 4px rgba(245,158,11,0.2)

.layer-text
  font-family: $font-display
  font-size: 13px
  font-weight: 800
  color: #78350F
  letter-spacing: 1px
  z-index: 4

.layer-decor
  font-size: 14px
  display: flex
  gap: 8px
  z-index: 4
  margin-top: 2px

.cream-plate
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 6px
  background: #FFFBEB

.cake-plate
  width: 320px
  height: 16px
  background: linear-gradient(to right, #D97706, #FEF08A, #F59E0B, #B45309)
  border-radius: 50%
  margin-top: -4px
  box-shadow: 0 10px 20px rgba(120,53,15,0.2)

.cake-controls
  margin-top: 24px

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

.wish-popup
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(69, 26, 3, 0.6)
  backdrop-filter: blur(8px)
  display: flex
  align-items: center
  justify-content: center
  z-index: 100
  padding: 20px

.wish-popup-card
  card-glass()
  background: #FFFDF5
  max-width: 480px
  padding: 36px 28px
  text-align: center
  border: 3px solid #FBBF24
  box-shadow: 0 25px 50px rgba(0,0,0,0.25), $shadow-glow
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)

.wish-icon
  font-size: 50px
  margin-bottom: 12px

.wish-title
  font-family: $font-title
  font-size: 26px
  color: #B45309
  margin: 0 0 12px

.wish-desc
  font-size: 16px
  color: #78350F
  line-height: 1.6
  margin-bottom: 24px

@keyframes flicker
  0%
    transform: scale(1) rotate(-2deg)
  100%
    transform: scale(1.1) rotate(2deg)

@keyframes smokeFade
  0%
    opacity: 0.8
    transform: translateY(0) scale(1)
  100%
    opacity: 0
    transform: translateY(-20px) scale(2)

@keyframes popIn
  0%
    transform: scale(0.7)
    opacity: 0
  100%
    transform: scale(1)
    opacity: 1

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>
