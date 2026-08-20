<template lang="pug">
section.gallery-section
  .section-header
    span.section-badge 📸 KHOẢNH KHẮC RỰC RỠ 📸
    h2.section-title Bộ Sưu Tập Hot Girl "Chị Trang"
    p.section-subtitle Mỗi bức ảnh là một tuyệt tác nhan sắc thách thức thời gian ✨

  .photos-grid
    .polaroid-card(
      v-for="(photo, index) in photos"
      :key="index"
      :class="'tilt-' + (index % 2 === 0 ? 'left' : 'right')"
      @click="openLightbox(photo)"
    )
      .pin 📌
      .photo-frame
        .photo-img-wrap
          img(:src="photo.src" :alt="photo.caption")
          .photo-badge {{ photo.tag }}
        .photo-caption
          span.caption-text {{ photo.caption }}
          .heart-counter(@click.stop="likePhoto(index)")
            span.heart-icon ❤️
            span.likes-num {{ photo.likes }}

  // Lightbox xem ảnh lớn
  transition(name="fade")
    .lightbox-modal(v-if="selectedPhoto" @click="selectedPhoto = null")
      .lightbox-content(@click.stop)
        button.close-btn(@click="selectedPhoto = null") ✕
        .lightbox-img-box
          img(:src="selectedPhoto.src" :alt="selectedPhoto.caption")
        .lightbox-info
          h4.lightbox-title {{ selectedPhoto.caption }}
          p.lightbox-quote {{ selectedPhoto.quote }}
          button.btn-gold(@click="sendLoves")
            span 💖 THẢ BÃO TIM CHO MẸ ({{ selectedPhoto.likes }})
</template>

<script setup>
import { ref } from 'vue'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'

import photo1 from '@/assets/images/photo1.jpg'
import photo2 from '@/assets/images/photo2.jpg'

const photos = ref([
  {
    src: photo1,
    tag: 'Nữ Thần Sắc Đẹp ✨',
    caption: 'Nụ cười tỏa nắng rạng ngời 🌟',
    quote: '"Vẻ đẹp không tuổi, nụ cười làm bừng sáng cả ngôi nhà ấm áp!"',
    likes: 9999
  },
  {
    src: photo2,
    tag: 'Hot Girl Tháng 8 👑',
    caption: 'Thần thái sang chảnh vô đối 💃',
    quote: '"Xinh đẹp, quý phái và luôn tràn đầy năng lượng tích cực!"',
    likes: 8888
  }
])

const selectedPhoto = ref(null)

const openLightbox = (photo) => {
  sound.playTing()
  selectedPhoto.value = photo
}

const likePhoto = (index) => {
  sound.playTing()
  photos.value[index].likes += 1
  confetti({
    particleCount: 15,
    spread: 50,
    colors: ['#EC4899', '#F43F5E', '#FBBF24']
  })
}

const sendLoves = () => {
  sound.playCheer()
  if (selectedPhoto.value) {
    selectedPhoto.value.likes += 10
  }
  confetti({
    particleCount: 80,
    spread: 100,
    colors: ['#EC4899', '#F59E0B', '#FEF08A', '#F43F5E']
  })
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.gallery-section
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
  font-size: 40px
  color: #78350F
  margin: 8px 0

.section-subtitle
  font-size: 16px
  color: #92400E
  margin: 0

.photos-grid
  display: flex
  gap: 40px
  justify-content: center
  flex-wrap: wrap
  max-width: 900px
  margin-top: 20px

.polaroid-card
  position: relative
  cursor: pointer
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)

  &.tilt-left
    transform: rotate(-3deg)
  &.tilt-right
    transform: rotate(3deg)

  &:hover
    transform: rotate(0deg) scale(1.05) translateY(-8px)
    z-index: 10

.pin
  position: absolute
  top: -14px
  left: 50%
  transform: translateX(-50%)
  font-size: 24px
  z-index: 5
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))

.photo-frame
  background: #FFFFFF
  padding: 16px 16px 22px
  border-radius: 12px
  box-shadow: 0 15px 35px rgba(120,53,15,0.18), 0 3px 10px rgba(0,0,0,0.08)
  border: 2px solid rgba(253, 230, 138, 0.8)
  width: 280px
  display: flex
  flex-direction: column

.photo-img-wrap
  position: relative
  width: 100%
  height: 320px
  border-radius: 8px
  overflow: hidden
  background: #FEF3C7

  img
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.5s ease

  &:hover img
    transform: scale(1.06)

.photo-badge
  position: absolute
  bottom: 10px
  left: 10px
  background: rgba(245, 158, 11, 0.9)
  color: #FFFFFF
  font-size: 12px
  font-weight: 700
  padding: 4px 10px
  border-radius: 9999px
  box-shadow: 0 2px 6px rgba(0,0,0,0.2)
  backdrop-filter: blur(4px)

.photo-caption
  margin-top: 14px
  display: flex
  justify-content: space-between
  align-items: center

.caption-text
  font-family: $font-hand
  font-size: 18px
  font-weight: 700
  color: #78350F

.heart-counter
  display: flex
  align-items: center
  gap: 4px
  background: #FEF3C7
  padding: 4px 10px
  border-radius: 9999px
  font-size: 12px
  font-weight: 700
  color: #DC2626
  transition: transform 0.2s

  &:hover
    transform: scale(1.15)

// Lightbox modal
.lightbox-modal
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(69, 26, 3, 0.75)
  backdrop-filter: blur(10px)
  display: flex
  align-items: center
  justify-content: center
  z-index: 150
  padding: 20px

.lightbox-content
  card-glass()
  background: #FFFDF5
  max-width: 520px
  width: 100%
  padding: 24px
  border-radius: 24px
  position: relative
  text-align: center
  animation: popIn 0.3s ease

.close-btn
  position: absolute
  top: 14px
  right: 16px
  background: #FEF3C7
  border: none
  width: 36px
  height: 36px
  border-radius: 50%
  font-size: 18px
  font-weight: bold
  color: #78350F
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  transition: background 0.2s

  &:hover
    background: #FDE68A

.lightbox-img-box
  width: 100%
  height: 380px
  border-radius: 16px
  overflow: hidden
  margin-top: 10px
  box-shadow: 0 8px 20px rgba(0,0,0,0.15)

  img
    width: 100%
    height: 100%
    object-fit: cover

.lightbox-info
  margin-top: 16px

.lightbox-title
  font-family: $font-title
  font-size: 22px
  color: #B45309
  margin: 8px 0 4px

.lightbox-quote
  font-family: $font-hand
  font-size: 18px
  color: #78350F
  margin: 0 0 18px
  font-style: italic

.btn-gold
  gold-button()
  width: 100%

@keyframes popIn
  0%
    transform: scale(0.8)
    opacity: 0
  100%
    transform: scale(1)
    opacity: 1

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0
</style>
