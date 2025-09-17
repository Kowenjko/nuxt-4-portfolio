<script lang="ts" setup>
const { months, years } = getYearsAtWork()
</script>

<template>
  <section
    id="home"
    class="relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] flex xl:items-center items-start justify-center"
  >
    <div class="grid-2-cols container px-10">
      <div class="content-center">
        <h1 class="text-left text-5xl">Vasya <span class="text-ring">Kovenko</span></h1>
        <p class="pt-10">
          <span class="text-zinc-900 dark:text-zinc-500 m-0 font-bold">Frontend Developer</span> with {{ years }} years
          {{ months }} months of commercial experience. Specializing in Vue 3 / Nuxt 3, I build modern web applications
          with API integration and custom functionality. Experienced in working with both Ukrainian and international
          clients. Responsible, collaborative, and motivated to continuously improve skills and learn new technologies.
        </p>
      </div>
      <div class="justify-items-center">
        <div class="avatar rounded-3xl">
          <NuxtImg src="/images/hero.png" format="webp" alt="hero" class="rounded-3xl" />
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
    background: red;
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
}

@keyframes autoRotate {
  to {
    --deg: 360deg;
  }
}
</style>
