<script lang="ts" setup>
import { Autoplay } from 'swiper/modules'

const words = [
  { text: 'Nuxt 4', icon: 'cib:nuxt-js' },
  { text: 'Vue 3', icon: 'cib:vue-js' },
  { text: 'React', icon: 'cib:react' },
  { text: 'Next', icon: 'cib:next-js' },
  { text: 'Python', icon: 'cib:python' },
  { text: 'Django', icon: 'cib:django' },
  { text: 'JavaScript', icon: 'cib:javascript' },
  { text: 'TypeScript', icon: 'cib:typescript' },
  { text: 'Tailwind', icon: 'mdi:tailwind' },
  { text: 'Sass', icon: 'cib:sass' },
  { text: 'HTML5', icon: 'cib:html5' },
  { text: 'CSS3', icon: 'cib:css3' },
]

const socialLinks = [
  { icon: 'uil:linkedin-alt', url: 'https://www.linkedin.com/in/kovenko' },
  { icon: 'uil:github-alt', url: 'https://github.com/kowenjko' },
]

const { months, years } = getYearsAtWork()

onMounted(() => {
  gsapFromTo(
    'h1, p',
    {
      y: 50,
      opacity: 0,
    },
    { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: 'power2.inOut' }
  )

  gsapTimeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top 60%',
      end: 'bottom top',
      scrub: true,
    },
  }).fromTo('.avatar', { y: 0 }, { y: 180, ease: 'power2.inOut' })
})
</script>

<template>
  <section
    id="hero"
    class="relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] flex xl:items-center items-start justify-center"
  >
    <div class="grid-2-cols container px-10">
      <div class="content-center hero-text">
        <h1
          class="md:text-5xl text-3xl font-semibold relative z-10 pointer-events-none space-x-24 flex justify-between items-center"
        >
          <span>Vasya <span class="text-ring">Kovenko</span> </span>

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
                v-for="(word, index) in words"
                :key="index"
              >
                <Icon :name="word.icon" class="w-7 h-7" /> <span> {{ word.text }} </span>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>
        </h1>
        <p class="pt-10">
          <span class="text-zinc-900 dark:text-zinc-500 m-0 font-bold">Frontend Developer</span> with {{ years }} years
          {{ months }} months of commercial experience. Specializing in Vue 3 / Nuxt 3, I build modern web applications
          with API integration and custom functionality. Experienced in working with both Ukrainian and international
          clients. Responsible, collaborative, and motivated to continuously improve skills and learn new technologies.
        </p>
        <div class="flex items-center justify-between mt-16">
          <ul class="flex gap-4">
            <li v-for="(link, index) in socialLinks" :key="index">
              <Button as-child size="icon" variant="ghost">
                <a :href="link.url" target="_blank" class="text-2xl">
                  <Icon :name="link.icon" class="text-2xl" />
                </a>
              </Button>
            </li>
          </ul>
          <Button as-child size="lg" class="cursor-pointer">
            <a href="/files/resume.pdf" target="_blank"
              >Resume
              <Icon name="uil:file-download" class="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
      <div class="wrapper-avatar justify-items-center h-full">
        <div class="avatar rounded-3xl">
          <NuxtImg
            src="/images/hero.png"
            format="webp"
            alt="hero"
            class="rounded-3xl aspect-retro object-cover"
            width="396px"
            loading="lazy"
            placeholder
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@property --deg {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

p {
  &::first-letter {
    font-family: 'Times New Roman', serif;
    initial-letter: 2;
    --webkit-initial-letter: 2;
    margin-right: 10px;
  }
}

.avatar {
  max-width: 396px;
  aspect-ratio: 3/4;
  position: relative;

  &::after,
  &::before {
    content: '';
    position: absolute;
    height: 101%;
    width: 101%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background: conic-gradient(from var(--deg) at center, transparent 80%, var(--ring));
    border-radius: inherit;
    z-index: -1;
    animation: autoRotate 2s linear infinite;
  }
  &::before {
    filter: blur(1rem);
    opacity: 0.5;
  }
  img {
    filter: sepia(100%) saturate(10%) hue-rotate(0deg);
  }
}

@keyframes autoRotate {
  to {
    --deg: 360deg;
  }
}
</style>
