<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const { scrollToId } = useScrollNav()

const scrolled = computed(() => scrollY.value > 10)
</script>

<template>
  <header class="navbar" :class="[scrolled ? 'scrolled' : 'not-scrolled']">
    <div class="inner">
      <div @click="scrollToId('hero')" class="logo cursor-pointer flex-center">
        <NuxtImg
          :src="$colorMode.preference === 'dark' ? '/my-logo-light.png' : '/my-logo-dark.png'"
          format="webp"
          width="50px"
          class="w-9"
          alt="logo"
          loading="lazy"
        />
        Kovenko
      </div>

      <NavBar />
      <div class="hidden lg:flex items-center gap-2">
        <ButtonGroups />
      </div>
      <SheetNav class="block lg:hidden" />
    </div>
  </header>
</template>
