<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'

const { projects = [], delay } = defineProps<{ projects: any[]; delay?: number }>()
</script>

<template>
  <ClientOnly>
    <div class="relative">
      <div class="absolute w-full top-0 right-20 flex justify-end gap-2 px-4 z-10">
        <Button class="swiper-button-prev-custom cursor-pointer" variant="outline"
          ><Icon name="mdi:chevron-left"
        /></Button>
        <Button class="swiper-button-next-custom cursor-pointer" variant="outline"
          ><Icon name="mdi:chevron-right"
        /></Button>
      </div>
      <swiper-container
        v-if="projects.length > 0"
        :modules="{ Autoplay }"
        class="py-16"
        :speed="800"
        :autoplay="{
          delay,
          disableOnInteraction: true,
        }"
        :spaceBetween="50"
        :slides-per-view="1"
        loop
        :breakpoints="{
          768: {
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
          980: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 2.7,
            spaceBetween: 50,
          },
          1500: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1640: {
            slidesPerView: 3.5,
            spaceBetween: 50,
          },
        }"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
      >
        <swiper-slide v-for="(work, index) in projects" :key="index" class="my-4 px-2 flex-center">
          <Dialog>
            <DialogTrigger>
              <Card
                class="w-full sm:w-sm md:w-lg hover:scale-105 transition-all duration-300 h-[460px] pt-0 overflow-hidden cursor-pointer z-100"
              >
                <div>
                  <nuxt-img :src="work.imageUrl" format="webp" class="object-cover h-[300px] w-full" />
                </div>
                <CardContent class="">
                  <div class="text-left grid gap-2 h-[100px]">
                    <h4 class="text-2xl">{{ work.title }}</h4>
                    <p class="text-sm font-light italic text-ring p-0">{{ work.category }}</p>
                    <ul class="flex gap-2">
                      <li v-for="keyword in work.keywords" :key="keyword" class="py-0">
                        <Badge variant="secondary">{{ keyword }}</Badge>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent class="p-0 overflow-hidden sm:max-w-[820px] z-[999]">
              <div>
                <nuxt-img :src="work.imageUrl" format="webp" class="object-cover h-hull" width="920px" />
              </div>

              <div class="text-left grid gap-2 p-4">
                <div class="flex justify-between">
                  <h4 class="text-2xl">{{ work.title }}</h4>
                  <div class="flex gap-2">
                    <Button variant="outline" v-if="work.url">
                      <a :href="work.url" target="_blank"> <Icon name="mdi:web" /></a>
                    </Button>
                    <Button variant="outline" v-if="work.urlGit">
                      <a :href="work.urlGit" target="_blank" class="flex items-center gap-2"
                        ><Icon name="mdi:github" />
                      </a>
                    </Button>
                  </div>
                </div>
                <p class="text-sm font-light italic text-ring p-0">{{ work.category }}</p>
                <ul class="flex gap-2">
                  <li v-for="keyword in work.keywords" :key="keyword" class="py-0">
                    <Badge variant="secondary">{{ keyword }}</Badge>
                  </li>
                </ul>
                <p>{{ work.description }}</p>
              </div>
            </DialogContent>
          </Dialog>
        </swiper-slide>
      </swiper-container>
    </div>
  </ClientOnly>
</template>
