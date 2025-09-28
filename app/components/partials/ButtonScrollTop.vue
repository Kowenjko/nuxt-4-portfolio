<script lang="ts" setup>
import { ArrowUp } from 'lucide-vue-next'
const { y: scrollY } = useWindowScroll()
</script>

<template>
  <div
    class="fixed right-3 bottom-3 xl:right-5 xl:bottom-3 animate-bounce opacity-0 transition-all duration-300 z-[100]"
    :class="{ 'opacity-100': scrollY > 500 }"
  >
    <Button variant="outline" @click="scrollY = 0" class="rounded-full w-14 h-14 p-0 cursor-pointer">
      <ArrowUp />
    </Button>
  </div>
</template>
