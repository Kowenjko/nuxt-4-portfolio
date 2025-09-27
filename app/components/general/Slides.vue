<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'

const { projects = [], delay } = defineProps<{ projects: ProjectI[]; delay?: number }>()

const searchByName = ref('')
const selectCategory = ref('All')

const searchProjects = computed(() =>
  projects.filter((project) => project.title.toLowerCase().includes(searchByName.value.toLowerCase()))
)

const filterProjects = computed(() => {
  if (selectCategory.value === 'All') return searchProjects.value

  return searchProjects.value.filter((project) => project.category === selectCategory.value)
})

const categories = computed(() => [...new Set(searchProjects.value.map((project) => project.category))])
</script>

<template>
  <ClientOnly>
    <div class="relative">
      <FilterWorks v-model:search="searchByName" v-model:category="selectCategory" :categories />

      <div class="relative" v-if="filterProjects.length > 0">
        <div class="absolute w-full top-0 right-17 flex justify-end gap-2 px-4 z-10">
          <Button class="swiper-button-prev-custom cursor-pointer" variant="outline"
            ><Icon name="mdi:chevron-left"
          /></Button>
          <Button class="swiper-button-next-custom cursor-pointer" variant="outline"
            ><Icon name="mdi:chevron-right"
          /></Button>
        </div>
        <swiper-container
          v-if="filterProjects.length > 0"
          :modules="{ Autoplay }"
          class="py-16"
          :speed="800"
          :autoplay="{
            delay,
            disableOnInteraction: false,
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
          <swiper-slide v-for="(project, index) in filterProjects" :key="index" class="my-4 px-2 flex-center">
            <Dialog>
              <DialogTrigger>
                <Card
                  class="w-full sm:w-sm md:w-lg hover:scale-105 transition-all duration-300 h-[460px] pt-0 overflow-hidden cursor-pointer z-100"
                >
                  <div>
                    <nuxt-img
                      v-if="project.imageUrl"
                      :src="project.imageUrl"
                      format="webp"
                      class="object-cover h-[300px] w-full"
                    />
                  </div>
                  <CardContent class="">
                    <div class="text-left grid gap-2 h-[100px]">
                      <h4 class="text-2xl">{{ project.title }}</h4>
                      <p class="text-sm font-light italic text-ring p-0">{{ project.category }}</p>
                      <ul class="flex gap-2">
                        <li v-for="keyword in project.keywords" :key="keyword" class="py-0">
                          <Badge variant="secondary">{{ keyword }}</Badge>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent class="p-0 overflow-hidden sm:max-w-[820px] z-[999]">
                <div>
                  <nuxt-img
                    v-if="project.imageUrl"
                    :src="project.imageUrl"
                    format="webp"
                    class="object-cover h-hull"
                    width="920px"
                  />
                </div>

                <div class="text-left grid gap-2 p-4">
                  <div class="flex justify-between">
                    <h4 class="text-2xl">{{ project.title }}</h4>
                    <div class="flex gap-2">
                      <Button variant="outline" v-if="project.url">
                        <a :href="project.url" target="_blank"> <Icon name="mdi:web" /></a>
                      </Button>
                      <Button variant="outline" v-if="project.urlGit">
                        <a :href="project.urlGit" target="_blank" class="flex items-center gap-2"
                          ><Icon name="mdi:github" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p class="text-sm font-light italic text-ring p-0">{{ project.category }}</p>
                  <ul class="flex gap-2">
                    <li v-for="keyword in project.keywords" :key="keyword" class="py-0">
                      <Badge variant="secondary">{{ keyword }}</Badge>
                    </li>
                  </ul>
                  <p>{{ project.description }}</p>
                </div>
              </DialogContent>
            </Dialog>
          </swiper-slide>
        </swiper-container>
      </div>
      <div v-else class="flex-center">
        <NuxtImg src="/images/no-results.png" alt="no-results" format="webp" width="500px" />
      </div>
    </div>
  </ClientOnly>
</template>
