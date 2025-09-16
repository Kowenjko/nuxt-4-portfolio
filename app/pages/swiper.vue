<script lang="ts" setup>
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
</script>

<template>
  <div class="h-[2500px] pt-96">
    <swiper-container
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
      }"
      :spaceBetween="50"
      :slides-per-view="3"
      :modules="{ Autoplay, Navigation }"
      loop
      navigation
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>
