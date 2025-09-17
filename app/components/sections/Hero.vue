<script lang="ts" setup>
const words = [
  { text: 'Nuxt 4', imgPath: '/images/ideas.svg' },
  { text: 'Vue 3', imgPath: '/images/concepts.svg' },
  { text: 'React', imgPath: '/images/designs.svg' },
  { text: 'Next', imgPath: '/images/code.svg' },
  { text: 'Python', imgPath: '/images/ideas.svg' },
]

const { months, years } = getYearsAtWork()
</script>

<template>
  <section
    id="home"
    class="relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] flex xl:items-center items-start justify-center"
  >
    <div class="grid-2-cols container px-10">
      <div class="content-center">
        <h1 class="md:text-5xl text-3xl font-semibold relative z-10 pointer-events-none space-x-24">
          Vasya <span class="text-ring">Kovenko</span>
        </h1>
        <p class="pt-10">
          <span class="text-zinc-900 dark:text-zinc-500 m-0 font-bold">Frontend Developer</span> with {{ years }} years
          {{ months }} months of commercial experience. Specializing in Vue 3 / Nuxt 3, I build modern web applications
          with API integration and custom functionality. Experienced in working with both Ukrainian and international
          clients. Responsible, collaborative, and motivated to continuously improve skills and learn new technologies.
        </p>
      </div>
      <div class="justify-items-center">
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
