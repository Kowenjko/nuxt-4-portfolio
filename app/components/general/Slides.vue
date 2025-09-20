<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'

const { projects = [] } = defineProps<{ projects: any[] }>()
</script>

<template>
  <swiper-container
    v-if="projects.length > 0"
    class="py-16"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :spaceBetween="250"
    :slides-per-view="3.5"
    :modules="{ Autoplay }"
    loop
  >
    <swiper-slide v-for="(work, index) in projects" :key="index" class="my-4">
      <Dialog>
        <DialogTrigger>
          <Card class="w-lg hover:scale-105 transition-all duration-300 h-[460px] pt-0 overflow-hidden cursor-pointer">
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
                  <a :href="work.urlGit" target="_blank" class="flex items-center gap-2"><Icon name="mdi:github" /> </a>
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
</template>
