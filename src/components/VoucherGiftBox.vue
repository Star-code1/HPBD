<template lang="pug">
section.voucher-section
  .section-header
    span.section-badge 🎁 HỘP QUÀ BÍ MẬT 🎁
    h2.section-title Rút Thẻ Voucher Đặc Quyền Cho Mẹ
    p.section-subtitle Bấm vào hộp quà vàng để nhận voucher siêu xịn sò chỉ dành riêng cho "Chị Trang" ✨

  .gift-stage
    // Hộp quà tương tác
    .gift-box-wrap(@click="drawVoucher")
      .gift-box(:class="{ 'box-opened': isOpen, 'box-bounce': !isOpen }")
        .box-lid
          .ribbon-bow
            .bow-left
            .bow-right
            .bow-center
          .ribbon-lid
        .box-body
          .ribbon-body-v
          .ribbon-body-h
          .sparkle-icon 🎁
      p.hint-text(v-if="!isOpen") 👆 Bấm vào hộp quà để mở quà mẹ nha!

    // Thẻ Voucher trồi lên
    transition(name="voucher-slide")
      .voucher-card(v-if="isOpen && currentVoucher")
        .voucher-header
          span.stamp 👑 ĐẶC QUYỀN HOÀNG GIA 👑
          h3.v-title {{ currentVoucher.title }}
        
        .voucher-body
          .v-icon {{ currentVoucher.icon }}
          p.v-desc {{ currentVoucher.desc }}
          .v-meta
            span.meta-item ⏳ Hạn dùng: #[strong Vĩnh viễn]
            span.meta-item 🎯 Người thi hành: #[strong Trúc Mai]
            span.meta-item 📜 Điều khoản: #[strong Cấm từ chối]

        .voucher-footer
          button.btn-gold(@click="drawAnother")
            span 🎲 RÚT THÊM THẺ KHÁC
          button.btn-collect(@click="collectVoucher")
            span 📥 LƯU VOUCHER NÀY
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

const isOpen = ref(false)
const currentVoucher = ref(null)

const vouchers = [
  {
    icon: '💆‍♀️',
    title: 'Voucher Massage Vai Gáy & Spa 5 Sao',
    desc: 'Đặc quyền được đấm lưng, bóp vai, phục vụ tận tình bất cứ khi nào mẹ mệt mỏi. ( Chuyên viên Trúc Mai )'
  },
  {
    icon: '🍽️',
    title: 'Voucher Miễn Rửa Bát & Nấu Cơm 1 Tháng',
    desc: 'Mẹ chỉ việc thưởng thức chill còn lại để con bé lo!'
  },
  {
    icon: '🛌',
    title: 'Voucher Ngủ Nướng Không Giới Hạn',
    desc: 'Hôm nay con bé lo hết, mẹ cứ ngủ cho thật đã!'
  },
  {
    icon: '❤️',
    title: 'Voucher Ôm Miễn Phí',
    desc: 'Đổi voucher để nhận một cái ôm - khi nào thì không biết ôm con bé đỡ i!'
  }
]

let lastIndex = -1

const drawVoucher = () => {
  if (isOpen.value) return
  isOpen.value = true
  sound.playCheer()
  sound.playTing()

  let rand = Math.floor(Math.random() * vouchers.length)
  if (rand === lastIndex) {
    rand = (rand + 1) % vouchers.length
  }
  lastIndex = rand
  currentVoucher.value = vouchers[rand]

  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#F59E0B', '#FBBF24', '#FEF08A', '#10B981', '#EC4899']
  })
}

const drawAnother = () => {
  sound.playTing()
  let rand = Math.floor(Math.random() * vouchers.length)
  while (rand === lastIndex) {
    rand = Math.floor(Math.random() * vouchers.length)
  }
  lastIndex = rand
  currentVoucher.value = vouchers[rand]
  
  confetti({
    particleCount: 40,
    spread: 60,
    colors: ['#F59E0B', '#FBBF24', '#FFFFFF']
  })
}

const collectVoucher = () => {
  sound.playCheer()
  alert('🎉 Đã xác nhận áp dụng Voucher "' + currentVoucher.value.title + '"! Gia đình cam kết thực hiện nghiêm túc ạ 💖')
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.voucher-section
  padding: 60px 20px
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  z-index: 2

.section-header
  text-align: center
  margin-bottom: 30px

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
  font-size: 38px
  color: #78350F
  margin: 8px 0

.section-subtitle
  font-size: 16px
  color: #92400E
  margin: 0

.gift-stage
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  max-width: 600px

.gift-box-wrap
  cursor: pointer
  display: flex
  flex-direction: column
  align-items: center
  margin-bottom: 20px

.hint-text
  font-family: $font-hand
  font-size: 20px
  font-weight: 700
  color: #B45309
  margin-top: 14px
  animation: pulseText 1.5s infinite alternate

.gift-box
  position: relative
  width: 130px
  height: 120px
  perspective: 600px

  &.box-bounce
    animation: boxWobble 2s ease-in-out infinite

  &.box-opened .box-lid
    transform: translateY(-40px) rotate(-25deg)
    opacity: 0.85

.box-lid
  position: absolute
  top: 0
  left: -5px
  width: 140px
  height: 32px
  background: linear-gradient(135deg, #FDE68A, #F59E0B)
  border-radius: 8px
  box-shadow: 0 4px 10px rgba(0,0,0,0.15)
  z-index: 5
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s

.ribbon-lid
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  width: 22px
  height: 100%
  background: #DC2626
  box-shadow: 0 0 6px rgba(220,38,38,0.4)

.ribbon-bow
  position: absolute
  top: -20px
  left: 50%
  transform: translateX(-50%)
  display: flex
  align-items: center
  justify-content: center

.bow-left, .bow-right
  width: 22px
  height: 22px
  border: 4px solid #DC2626
  border-radius: 50% 50% 0 50%

.bow-left
  transform: rotate(-30deg)

.bow-right
  transform: rotate(120deg)
  margin-left: -6px

.bow-center
  position: absolute
  width: 12px
  height: 12px
  background: #B91C1C
  border-radius: 50%

.box-body
  position: absolute
  bottom: 0
  left: 0
  width: 130px
  height: 95px
  background: linear-gradient(135deg, #FBBF24, #D97706)
  border-radius: 0 0 12px 12px
  box-shadow: 0 12px 25px rgba(180,83,9,0.3)
  overflow: hidden
  display: flex
  align-items: center
  justify-content: center

.ribbon-body-v
  position: absolute
  top: 0
  bottom: 0
  left: 50%
  transform: translateX(-50%)
  width: 22px
  background: #DC2626

.ribbon-body-h
  position: absolute
  left: 0
  right: 0
  top: 50%
  transform: translateY(-50%)
  height: 20px
  background: #DC2626

.sparkle-icon
  font-size: 32px
  z-index: 2
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2))

// Voucher Card
.voucher-card
  card-glass()
  background: #FFFDF5
  border: 3px dashed #F59E0B
  border-radius: 20px
  padding: 24px
  width: 100%
  box-shadow: 0 20px 40px rgba(245,158,11,0.25), $shadow-glow
  text-align: center
  position: relative

.stamp
  background: #DC2626
  color: #FFFFFF
  font-size: 11px
  font-weight: 800
  padding: 4px 14px
  border-radius: 9999px
  letter-spacing: 1.5px
  display: inline-block
  margin-bottom: 8px

.v-title
  font-family: $font-display
  font-size: 22px
  font-weight: 800
  color: #92400E
  margin: 4px 0 16px

.v-icon
  font-size: 48px
  margin-bottom: 8px

.v-desc
  font-size: 16px
  color: #78350F
  line-height: 1.6
  margin: 0 0 18px
  font-weight: 500

.v-meta
  display: flex
  flex-direction: column
  gap: 6px
  background: #FEF3C7
  padding: 12px
  border-radius: 12px
  margin-bottom: 20px
  font-size: 14px
  color: #78350F
  text-align: left

.voucher-footer
  display: flex
  gap: 12px
  justify-content: center
  flex-wrap: wrap

.btn-gold
  gold-button()
  font-size: 14px
  padding: 10px 20px

.btn-collect
  background: #10B981
  color: #FFFFFF
  font-weight: 700
  padding: 10px 20px
  border-radius: 9999px
  border: none
  cursor: pointer
  font-size: 14px
  transition: all 0.2s

  &:hover
    background: #059669
    transform: translateY(-2px)
    box-shadow: 0 8px 15px rgba(16,185,129,0.3)

@keyframes boxWobble
  0%, 100%
    transform: translateY(0) rotate(0deg)
  25%
    transform: translateY(-6px) rotate(-3deg)
  75%
    transform: translateY(-6px) rotate(3deg)

@keyframes pulseText
  0%
    transform: scale(0.96)
    opacity: 0.8
  100%
    transform: scale(1.04)
    opacity: 1

.voucher-slide-enter-active
  animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)

.voucher-slide-leave-active
  transition: all 0.3s ease
  opacity: 0
  transform: translateY(20px)

@keyframes slideUp
  0%
    opacity: 0
    transform: translateY(40px) scale(0.9)
  100%
    opacity: 1
    transform: translateY(0) scale(1)
</style>
