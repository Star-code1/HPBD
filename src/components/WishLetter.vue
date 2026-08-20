<template lang="pug">
section.letter-section
  .section-header
    span.section-badge 💌 TÂM THƯ GỬI MẸ 💌
    h2.section-title Bức Thư Origami Gửi "Chị Trang"
    p.section-subtitle Chạm vào phong bì để trải nghiệm hiệu ứng gấp mở giấy Origami 3D độc đáo ✨

  .origami-stage
    // Khung Phong bì Origami 3D
    .envelope-3d(:class="{ 'is-open': isOpen, 'is-animating': isAnimating }" @click="toggleLetter")
      // Nắp phong bì (Flap)
      .origami-flap
        .flap-triangle
        .wax-seal(:class="{ 'seal-broken': isOpen }")
          span.seal-icon 👑
          span.seal-glow

      // Thân phong bì và các cánh Origami
      .origami-pocket
        .pocket-back
        .pocket-wing-left
        .pocket-wing-right
        .pocket-bottom
        .closed-hint(v-if="!isOpen")
          span.hint-envelope 💌 Chạm để mở thư Origami ✨

      // Tờ giấy thư Origami gấp 3 nếp 3D
      .origami-paper-track
        .origami-sheet
          // Khúc giấy 1 (Trên)
          .fold-section.fold-top
            .paper-crease-shadow
            .letter-header
              .header-badge 💛 20/08/1984 💛
              h3.letter-to Kính gửi Mẹ yêu — "Chị Trang" xì-tin!
            p.letter-intro
              | Nhân ngày sinh nhật đặc biệt của Mẹ (người phụ nữ mà con luôn gọi là #[strong "Chị Trang"] vì mẹ lúc nào cũng trẻ trung, rạng ngời như tuổi đôi mươi), chúng con muốn gửi đến mẹ những tình cảm chân thành nhất!

          // Khúc giấy 2 (Giữa)
          .fold-section.fold-middle
            .paper-crease-shadow
            p.letter-mid-text
              | Cảm ơn mẹ vì đã luôn là ánh mặt trời sưởi ấm gia đình, luôn chu đáo, yêu thương và hy sinh vì chúng con. Chúc mẹ bước sang tuổi mới:
            .wishes-origami-grid
              .wish-item
                span.w-icon 🌸
                span #[strong Nhan sắc mãi đỉnh:] Trẻ đẹp rạng rỡ, thách thức thời gian!
              .wish-item
                span.w-icon 💖
                span #[strong Sức khỏe dồi dào:] Bình an, yêu đời và luôn hạnh phúc.
              .wish-item
                span.w-icon 💰
                span #[strong Tài lộc rủng rỉnh:] Tiền bạc đầy túi, niềm vui ngập tràn!

          // Khúc giấy 3 (Dưới)
          .fold-section.fold-bottom
            .paper-crease-shadow
            p.letter-closing
              | Cả nhà mãi mãi yêu "Chị Trang" nhất trên đời! 💖
            .signature-box
              span.signature-text — Cục Zàng & Cục Cứt —
              span.heart-stamp 💛✨

  .letter-action
    button.btn-gold(@click="toggleLetter")
      span.btn-icon {{ isOpen ? '📦' : '💌' }}
      span {{ isOpen ? 'GẤP THƯ ORIGAMI LẠI' : 'MỞ BỨC THƯ ORIGAMI 3D' }}
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

const isOpen = ref(false)
const isAnimating = ref(false)

const toggleLetter = () => {
  if (isAnimating.value) return
  isAnimating.value = true

  isOpen.value = !isOpen.value

  if (isOpen.value) {
    sound.playTing()
    setTimeout(() => {
      sound.playCheer()
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#FBBF24', '#FEF08A', '#EC4899', '#10B981']
      })
    }, 400)
  } else {
    sound.playBlow()
  }

  setTimeout(() => {
    isAnimating.value = false
  }, 900)
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.letter-section
  padding: 50px 20px
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  z-index: 2

.section-header
  text-align: center
  margin-bottom: 24px

.section-badge
  background: rgba(245, 158, 11, 0.15)
  color: #B45309
  border: 1.5px solid rgba(245, 158, 11, 0.4)
  padding: 5px 16px
  border-radius: 9999px
  font-size: 12px
  font-weight: 700
  letter-spacing: 1px
  display: inline-block
  margin-bottom: 8px

.section-title
  font-family: $font-title
  font-size: 36px
  color: #78350F
  margin: 6px 0

.section-subtitle
  font-size: 15px
  color: #92400E
  margin: 0

.origami-stage
  position: relative
  width: 100%
  max-width: 600px
  min-height: 380px
  display: flex
  justify-content: center
  align-items: flex-start
  perspective: 1200px
  margin: 20px 0 30px
  transition: min-height 0.6s ease

// Khi mở thư, nới rộng khung
.origami-stage:has(.is-open)
  min-height: 640px

// Khung phong bì 3D
.envelope-3d
  position: relative
  width: 100%
  max-width: 520px
  min-height: 280px
  cursor: pointer
  transform-style: preserve-3d
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)

  &.is-open
    min-height: 620px

.origami-pocket
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 280px
  border-radius: 12px
  overflow: hidden
  box-shadow: 0 16px 35px rgba(120,53,15,0.2)
  z-index: 5
  pointer-events: none
  transition: opacity 0.5s ease

.envelope-3d.is-open .origami-pocket
  opacity: 0.15
  box-shadow: none

.pocket-back
  position: absolute
  inset: 0
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)
  border: 2px solid #F59E0B
  border-radius: 12px

.pocket-wing-left
  position: absolute
  top: 0
  left: 0
  width: 0
  height: 0
  border-top: 140px solid transparent
  border-bottom: 140px solid transparent
  border-left: 180px solid #FCD34D
  filter: drop-shadow(2px 0 4px rgba(0,0,0,0.06))

.pocket-wing-right
  position: absolute
  top: 0
  right: 0
  width: 0
  height: 0
  border-top: 140px solid transparent
  border-bottom: 140px solid transparent
  border-right: 180px solid #FBBF24
  filter: drop-shadow(-2px 0 4px rgba(0,0,0,0.06))

.pocket-bottom
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 0
  border-left: 260px solid transparent
  border-right: 260px solid transparent
  border-bottom: 150px solid #F59E0B

.closed-hint
  position: absolute
  bottom: 24px
  left: 0
  right: 0
  text-align: center
  z-index: 15
  pointer-events: none

.hint-envelope
  font-family: $font-hand
  font-size: 20px
  font-weight: 700
  color: #78350F
  background: rgba(255, 255, 255, 0.85)
  padding: 4px 16px
  border-radius: 9999px
  border: 1px solid #FDE68A
  box-shadow: 0 2px 8px rgba(0,0,0,0.1)
  animation: pulseHint 1.5s ease-in-out infinite alternate
  display: inline-block

@keyframes pulseHint
  0%
    transform: scale(0.96)
    opacity: 0.85
  100%
    transform: scale(1.04)
    opacity: 1

// Nắp phong bì (Flap)
.origami-flap
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 140px
  transform-origin: top center
  transform-style: preserve-3d
  z-index: 10
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), z-index 0.2s

.flap-triangle
  position: absolute
  top: 0
  left: 0
  right: 0
  width: 0
  height: 0
  margin: 0 auto
  border-left: 260px solid transparent
  border-right: 260px solid transparent
  border-top: 140px solid #D97706
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15))

.wax-seal
  position: absolute
  top: 105px
  left: 50%
  transform: translateX(-50%)
  width: 52px
  height: 52px
  background: radial-gradient(circle at 35% 35%, #EF4444, #B91C1C)
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0 4px 12px rgba(185,28,28,0.5), inset 0 2px 4px rgba(255,255,255,0.4)
  border: 2px solid #FEF08A
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  z-index: 12

.seal-icon
  font-size: 24px
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3))

.wax-seal.seal-broken
  transform: translateX(-50%) scale(0.6) rotate(35deg)
  opacity: 0

.envelope-3d.is-open .origami-flap
  transform: rotateX(180deg)
  z-index: 1

// Tờ giấy thư Origami gấp 3 khúc
.origami-paper-track
  position: relative
  width: 100%
  z-index: 6
  pointer-events: none
  opacity: 0
  visibility: hidden
  transform: translateY(50px) scale(0.6)
  transition: opacity 0.5s ease 0.2s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s, visibility 0.5s ease 0.2s

.origami-sheet
  width: 100%
  transform-style: preserve-3d
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1)

// Khúc giấy Origami 3D
.fold-section
  background: #FFFDF7
  padding: 18px 24px
  border-left: 3px solid #F59E0B
  border-right: 3px solid #F59E0B
  box-shadow: 0 4px 15px rgba(0,0,0,0.05)
  position: relative
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)
  transform-origin: center

  p
    color: #451A03
    line-height: 1.6
    font-size: 14.5px

.fold-top
  border-top: 3px solid #F59E0B
  border-radius: 12px 12px 0 0
  transform-origin: bottom center

.fold-middle
  border-top: 1px dashed rgba(245, 158, 11, 0.3)
  border-bottom: 1px dashed rgba(245, 158, 11, 0.3)

.fold-bottom
  border-bottom: 3px solid #F59E0B
  border-radius: 0 0 12px 12px
  transform-origin: top center

.paper-crease-shadow
  position: absolute
  top: 0
  left: 0
  right: 0
  height: 6px
  background: linear-gradient(to bottom, rgba(180, 83, 9, 0.08), transparent)
  pointer-events: none

// Trạng thái Origami: Khi ĐÓNG (Hoàn toàn ẩn và gấp nếp)
.envelope-3d:not(.is-open) .origami-paper-track
  opacity: 0
  visibility: hidden
  pointer-events: none
  transform: translateY(60px) scale(0.6)
  transition: opacity 0.3s ease, transform 0.4s ease, visibility 0.3s ease

.envelope-3d:not(.is-open) .fold-top
  transform: rotateX(-70deg)
  opacity: 0

.envelope-3d:not(.is-open) .fold-middle
  transform: scaleY(0.4)
  opacity: 0

.envelope-3d:not(.is-open) .fold-bottom
  transform: rotateX(70deg)
  opacity: 0

// Trạng thái Origami: Khi MỞ (Hiện ra & bung mở 3D mượt mà)
.envelope-3d.is-open .origami-paper-track
  opacity: 1
  visibility: visible
  pointer-events: auto
  transform: translateY(-25px) scale(1)
  transition: opacity 0.5s ease 0.25s, transform 0.7s cubic-bezier(0.34, 1.3, 0.64, 1) 0.25s, visibility 0.5s ease 0.25s

.envelope-3d.is-open .origami-sheet
  box-shadow: 0 20px 45px rgba(245,158,11,0.25), 0 0 25px rgba(251,191,36,0.3)
  border-radius: 14px

.envelope-3d.is-open .fold-top,
.envelope-3d.is-open .fold-middle,
.envelope-3d.is-open .fold-bottom
  transform: rotateX(0deg) scaleY(1)
  opacity: 1
  filter: brightness(1)

// Chi tiết bên trong thư
.letter-header
  display: flex
  flex-direction: column
  gap: 4px
  margin-bottom: 10px

.header-badge
  font-size: 12px
  font-weight: 800
  color: #B45309
  letter-spacing: 1px

.letter-to
  font-family: $font-hand
  font-size: 26px
  font-weight: 700
  color: #B45309
  margin: 0

.letter-intro
  margin: 0

.wishes-origami-grid
  display: flex
  flex-direction: column
  gap: 8px
  margin: 10px 0
  background: #FEF3C7
  padding: 10px 14px
  border-radius: 10px
  border-left: 3px solid #F59E0B

.wish-item
  display: flex
  align-items: center
  gap: 8px
  font-size: 13.5px
  color: #78350F

.w-icon
  font-size: 16px

.letter-closing
  font-family: $font-hand
  font-size: 20px
  font-weight: 700
  color: #B45309
  margin: 0 0 8px

.signature-box
  display: flex
  justify-content: space-between
  align-items: center
  border-top: 1.5px dashed rgba(245, 158, 11, 0.4)
  padding-top: 8px

.signature-text
  font-size: 13px
  font-weight: 700
  color: #92400E

.heart-stamp
  font-size: 16px

// Nút điều khiển
.letter-action
  margin-top: 10px

.btn-gold
  gold-button()
  font-size: 14px
  padding: 10px 24px

.btn-icon
  font-size: 18px
</style>
