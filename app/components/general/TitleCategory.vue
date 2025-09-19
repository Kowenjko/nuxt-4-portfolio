<script lang="ts" setup>
interface Props {
  title?: string
  category?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-2 text-ring" v-if="category">
    <Icon name="mdi:minus" class="fill-gray-3 h-5 w-4" />
    <span class="tracking-[7.5px] uppercase text-xs"> {{ category }} </span>
  </div>
  <h3 v-if="title" class="dark:text-white text-center text-2xl md:text-4xl font-bold py-3">{{ title }}</h3>
</template>
