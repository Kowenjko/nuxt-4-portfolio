<script lang="ts" setup>
const { months, years } = getYearsAtWork()

const endValueY = computed(() => (isMobile.value ? 50 : 180))

onMounted(() => {
  gsapFromTo(
    'h1, p',
    {
      y: 50,
      opacity: 0,
    },
    { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: 'power2.inOut' }
  )

  gsapFromTo(
    '.social-links',
    {
      x: -100,
      opacity: 0,
    },
    { x: 0, opacity: 1, stagger: 1, duration: 1.5, ease: 'power2.inOut' }
  )
  gsapFromTo(
    '.button-resume',
    {
      x: 100,
      opacity: 0,
    },
    { x: 0, opacity: 1, stagger: 0.3, duration: 1, ease: 'power2.inOut' }
  )

  gsapTimeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'center 60%',
      end: 'bottom top',
      scrub: true,
    },
  }).fromTo('.avatar', { y: 0 }, { y: endValueY.value, ease: 'power2.inOut' })
})

watch(endValueY, (value) => {
  gsapTimeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'center 60%',
      end: 'bottom top',
      scrub: true,
    },
  }).fromTo('.avatar', { y: 0 }, { y: value, ease: 'power2.inOut' })
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

          <TechnologiesHero />
        </h1>
        <p class="pt-10">
          <span class="text-zinc-900 dark:text-zinc-500 m-0 font-bold">Frontend Developer</span> with {{ years }} years
          {{ months }} months of commercial experience. Specializing in Vue 3 / Nuxt 3, I build modern web applications
          with API integration and custom functionality. Experienced in working with both Ukrainian and international
          clients. Responsible, collaborative, and motivated to continuously improve skills and learn new technologies.
        </p>
        <div class="flex items-center justify-between mt-16">
          <SocialLinks class="social-links" />
          <ButtonResume class="button-resume" />
        </div>
      </div>
      <div class="wrapper-avatar justify-items-center h-full">
        <div class="avatar rounded-3xl w-60 sm:w-72 md:w-80 lg:w-96">
          <NuxtImg
            src="/images/hero.png"
            format="webp"
            alt="hero"
            width="384px"
            class="rounded-3xl aspect-retro object-cover w-96"
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
