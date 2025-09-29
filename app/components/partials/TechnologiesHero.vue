<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'
import { projectTechnologies } from '@/constants'
</script>

<template>
  <ClientOnly>
    <swiper-container
      class="hidden sm:inline h-10 w-30 sm:w-44"
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
        class="text-lg sm:text-2xl flex justify-end items-center gap-2"
        v-for="(technology, index) in projectTechnologies"
        :key="index"
      >
        <Icon :name="technology.icon!" class="w-7 h-7" />
        <span class="text-lg sm:text-2xl text-nowrap"> {{ technology.title }} </span>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
