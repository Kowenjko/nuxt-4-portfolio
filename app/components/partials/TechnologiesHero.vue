<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'
import { technologies } from '@/constants'
</script>

<template>
  <ClientOnly>
    <swiper-container
      class="inline h-10 w-36"
      :direction="'vertical'"
      :autoplay="{
        delay: 1500,
        disableOnInteraction: false,
      }"
      :spaceBetween="50"
      :slides-per-view="1"
      :modules="{ Autoplay }"
      loop
    >
      <swiper-slide
        class="text-2xl flex justify-end items-center gap-2"
        v-for="(technologY, index) in technologies"
        :key="index"
      >
        <Icon :name="technologY.icon" class="w-7 h-7" /> <span class="text-2xl"> {{ technologY.title }} </span>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
