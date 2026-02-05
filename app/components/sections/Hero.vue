<script lang="ts" setup>
const { months, years } = getYearsAtWork()

const endValueY = computed(() => (isMobile.value ? 50 : 180))
const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true

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
  }).fromTo('.hero-avatar', { y: 0 }, { y: endValueY.value, ease: 'power2.inOut' })
})

watch(endValueY, (value) => {
  gsapTimeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'center 60%',
      end: 'bottom top',
      scrub: true,
    },
  }).fromTo('.hero-avatar', { y: 0 }, { y: value, ease: 'power2.inOut' })
})
</script>

<template>
  <section
    id="hero"
    class="relative z-10 mt-32 sm:mt-26 xl:mt-20 md:h-dvh h-[80vh] flex xl:items-center items-center justify-center"
  >
    <div class="grid-2-cols container p-5 md:px-10">
      <div class="content-center hero-text">
        <div class="relative">
          <h1
            class="text-xl sm:text-3xl md:text-5xl relative font-semibold z-10 space-x-24 flex justify-between items-center"
          >
            <span>Vasya <span class="text-zinc-500">Kovenko</span> </span>

            <TechnologiesHero />
          </h1>
          <TooltipInfo :info="$t('tooltip.technology')" />
        </div>
        <p class="pt-2 sm:pt-10">
          <span class="text-zinc-900 dark:text-zinc-500 m-0 font-bold">Frontend Developer</span>
          {{ $t('hero.info', { years, months }) }}
        </p>
        <div class="flex items-center justify-between mt-8 md:mt-16">
          <SocialLinks class="social-links" />
          <ButtonResume class="button-resume" />
        </div>
      </div>
      <div class="wrapper-avatar justify-items-center h-full relative">
        <div class="hero-avatar">
          <div class="rounded-3xl w-60 sm:w-72 md:w-80 lg:w-96" :class="{ avatar: isLoaded }">
            <NuxtImg
              src="/images/hero_new.png"
              format="webp"
              alt="hero"
              width="384"
              height="512"
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 384px"
              loading="lazy"
              quality="70"
              class="rounded-3xl aspect-retro object-cover w-96"
            />
          </div>
          <div class="absolute -bottom-4 -right-4 bg-primary px-4 py-3 animate-float rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-primary-foreground text-sm font-medium">{{ $t('hero.open_work') }}</span>
            </div>
          </div>
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
