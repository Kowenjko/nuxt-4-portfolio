<script lang="ts" setup>
interface Props {
  title?: string
  category?: string
  counter?: number
  type?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-2 text-ring" v-if="category">
    <Icon name="mdi:minus" class="fill-gray-3 h-5 w-4" />
    <div class="tracking-[7.5px] uppercase text-xs relative">
      {{ category }} <AnimatedCounter v-if="counter" :counter :type />
    </div>
  </div>
  <h2 v-if="title" class="text-center text-2xl md:text-4xl font-bold py-3">{{ title }}</h2>
</template>
