<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const { scrollToId } = useScrollNav()

const scrolled = computed(() => scrollY.value > 10)
</script>

<template>
  <header class="navbar" :class="[scrolled ? 'scrolled' : 'not-scrolled']">
    <div class="inner">
      <a @click="scrollToId('hero')" class="logo cursor-pointer"> Kovenko.</a>

      <NavBar />
      <div class="flex items-center gap-4">
        <ButtonTheme class="hidden lg:block" />
        <SheetNav />
      </div>
    </div>
  </header>
</template>
