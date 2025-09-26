<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const { scrollToId } = useScrollNav()

const isDark = useDark()
const scrolled = computed(() => scrollY.value > 10)
</script>

<template>
  <header class="navbar" :class="[scrolled ? 'scrolled' : 'not-scrolled']">
    <div class="inner">
      <a @click="scrollToId('hero')" class="logo cursor-pointer flex-center">
        <NuxtImg :src="isDark ? '/my-logo-light.png' : '/my-logo-dark.png'" width="50px" class="w-9" alt="logo" />
        Kovenko
      </a>

      <NavBar />
      <div class="flex items-center gap-4">
        <ButtonLang />
        <ButtonTheme class="hidden lg:block" />
        <SheetNav />
      </div>
    </div>
  </header>
</template>
