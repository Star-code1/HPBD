<template lang="pug">
.app-container
  // Màn hình mở tiệc chào đón
  transition(name="curtain")
    .welcome-curtain(v-if="showWelcome")
      .welcome-card
        .welcome-badge 🌟 PARTY INVITATION 🌟
        h1.welcome-title 🎂 TIỆC SINH NHẬT 🎂 
        h1.welcome-title 👑 "CHỊ TRANG" 👑
        p.welcome-date 20 / 08 / 1984
        p.welcome-text Chào mừng Nữ Hoàng xinh đẹp nhất vũ trụ bước vào không gian sinh nhật rực rỡ ngập tràn niềm vui!
        button.btn-start-party(@click="startParty")
          span.party-icon 🎁
          span BẤM ĐỂ MỞ TIỆC NGAY!

  // Floating particles & bóng bay
  FloatingParticles

  // Trình phát nhạc
  MusicPlayer(ref="musicPlayerRef")

  // Thanh điều hướng nhanh
  nav.navbar
    .nav-brand
      span.brand-crown 👑
      span.brand-text HPBD CHỊ TRANG
    .nav-links
      a.nav-item(href="#hero-section" @click.prevent="scrollTo('hero-section')") 🏠 Trang Chủ
      a.nav-item(href="#cake-section" @click.prevent="scrollTo('cake-section')") 🎂 Bánh & Nến
      a.nav-item(href="#gallery-section" @click.prevent="scrollTo('gallery-section')") 📸 Album Ảnh
      a.nav-item(href="#voucher-section" @click.prevent="scrollTo('voucher-section')") 🎁 Bốc Thẻ Quà
      a.nav-item(href="#letter-section" @click.prevent="scrollTo('letter-section')") 💌 Tâm Thư

  // Nội dung chính
  main.main-content
    div#hero-section
      HeroBanner

    div#cake-section
      BirthdayCake

    div#gallery-section
      PhotoGallery

    div#voucher-section
      VoucherGiftBox

    div#letter-section
      WishLetter

  // Chân trang
  footer.app-footer
    .footer-content
      p.footer-title 💛 CHÚC MỪNG SINH NHẬT MẸ "CHỊ TRANG" (20/08/1984) 💛
      p.footer-subtitle Tuổi mới ngập tràn niềm vui, trẻ mãi không già và luôn hạnh phúc bên gia đình ta!
      .footer-decor ✨ 👑 💖 🎂 🥂 ✨
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

import FloatingParticles from './components/FloatingParticles.vue'
import HeroBanner from './components/HeroBanner.vue'
import BirthdayCake from './components/BirthdayCake.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import VoucherGiftBox from './components/VoucherGiftBox.vue'
import WishLetter from './components/WishLetter.vue'
import MusicPlayer from './components/MusicPlayer.vue'

const showWelcome = ref(true)
const musicPlayerRef = ref(null)

const startParty = () => {
  showWelcome.value = false
  sound.playCheer()
  sound.playTing()
  
  if (musicPlayerRef.value) {
    musicPlayerRef.value.startMusic()
  }

  // Bắn pháo hoa rực rỡ chào mừng
  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) {
      return clearInterval(interval)
    }
    const particleCount = 50 * (timeLeft / duration)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
      colors: ['#F59E0B', '#FBBF24', '#FEF08A', '#EC4899', '#3B82F6']
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
      colors: ['#F59E0B', '#FBBF24', '#FEF08A', '#EC4899', '#10B981']
    })
  }, 250)
}

const scrollTo = (id) => {
  sound.playTing()
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="stylus">
@import './style/variables.styl'

*
  box-sizing: border-box
  margin: 0
  padding: 0

body
  font-family: $font-body
  background: radial-gradient(circle at 50% 10%, #FFFBEB 0%, #FEF3C7 40%, #FDE68A 100%)
  background-attachment: fixed
  color: $text-main
  overflow-x: hidden

.app-container
  min-height: 100vh
  position: relative

// Welcome Curtain
.welcome-curtain
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: radial-gradient(circle at center, #FFFBEB 0%, #F59E0B 80%, #B45309 100%)
  z-index: 1000
  display: flex
  align-items: center
  justify-content: center
  padding: 20px

.welcome-card
  card-glass()
  background: rgba(255, 255, 255, 0.95)
  max-width: 540px
  width: 100%
  padding: 40px 30px
  text-align: center
  border: 4px solid #FBBF24
  box-shadow: 0 25px 60px rgba(120,53,15,0.4), $shadow-glow
  animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)

.welcome-badge
  background: #F59E0B
  color: #FFFFFF
  font-size: 13px
  font-weight: 800
  padding: 6px 18px
  border-radius: 9999px
  letter-spacing: 2px
  display: inline-block
  margin-bottom: 12px

.welcome-title
  font-family: $font-title
  font-size: 32px
  color: #B45309
  margin: 10px 0 6px

.welcome-date
  font-family: $font-display
  font-size: 20px
  font-weight: 800
  color: #D97706
  letter-spacing: 4px
  margin-bottom: 16px

.welcome-text
  font-size: 16px
  color: #78350F
  line-height: 1.6
  margin-bottom: 28px

.btn-start-party
  gold-button()
  font-size: 18px
  padding: 16px 36px
  width: 100%

.party-icon
  font-size: 24px

// Navbar
.navbar
  position: sticky
  top: 12px
  z-index: 90
  max-width: 750px
  margin: 0 auto 20px
  padding: 6px 16px
  display: flex
  justify-content: space-between
  align-items: center
  background: rgba(255, 255, 255, 0.85)
  backdrop-filter: blur(16px)
  -webkit-backdrop-filter: blur(16px)
  border: 1.5px solid rgba(251, 191, 36, 0.7)
  border-radius: 9999px
  box-shadow: 0 8px 24px -4px rgba(245, 158, 11, 0.25), 0 2px 6px rgba(0,0,0,0.04)
  transition: all 0.3s ease

  @media (max-width: 680px)
    max-width: 94%
    padding: 6px 10px
    top: 8px

.nav-brand
  display: flex
  align-items: center
  gap: 6px
  padding-right: 12px
  border-right: 1.5px solid rgba(245, 158, 11, 0.25)
  white-space: nowrap

  @media (max-width: 520px)
    display: none

.brand-crown
  font-size: 16px
  filter: drop-shadow(0 0 4px rgba(245,158,11,0.5))

.brand-text
  font-family: $font-display
  font-size: 12px
  font-weight: 800
  color: #92400E
  letter-spacing: 0.5px

.nav-links
  display: flex
  gap: 4px
  align-items: center
  overflow-x: auto
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none

  @media (max-width: 520px)
    width: 100%
    justify-content: space-around

.nav-item
  text-decoration: none
  color: #78350F
  font-size: 12px
  font-weight: 700
  padding: 6px 10px
  border-radius: 9999px
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1)
  white-space: nowrap
  display: inline-flex
  align-items: center
  gap: 4px

  &:hover
    background: linear-gradient(135deg, #FEF3C7, #FDE68A)
    color: #92400E
    transform: translateY(-1px)
    box-shadow: 0 2px 8px rgba(245,158,11,0.2)

  &:active
    transform: scale(0.96)

// Footer
.app-footer
  background: linear-gradient(135deg, #78350F 0%, #451A03 100%)
  color: #FEF3C7
  text-align: center
  padding: 40px 20px
  position: relative
  z-index: 2
  margin-top: 60px
  border-top: 3px solid #F59E0B

.footer-title
  font-family: $font-title
  font-size: 22px
  margin-bottom: 8px
  color: #FDE68A

.footer-subtitle
  font-size: 14px
  color: #FEF3C7
  margin-bottom: 12px
  opacity: 0.9

.footer-decor
  font-size: 20px
  letter-spacing: 8px

// Animations
.curtain-leave-active
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)

.curtain-leave-to
  opacity: 0
  transform: scale(1.1)

@keyframes bounceIn
  0%
    opacity: 0
    transform: scale(0.3)
  50%
    opacity: 0.9
    transform: scale(1.05)
  70%
    transform: scale(0.95)
  100%
    opacity: 1
    transform: scale(1)
</style>
