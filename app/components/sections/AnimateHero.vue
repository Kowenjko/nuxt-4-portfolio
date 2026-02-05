<script lang="ts" setup>
import { technologies } from '@/constants'
</script>

<template>
  <ul
    v-for="(technology, index) in technologies"
    :key="index"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <li
      class="absolute opacity-10 text-sm"
      :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `show-drift  ${15 + Math.random() * 20}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}`,
      }"
    >
      <Icon v-if="technology.icon" :name="technology.icon" class="size-6" />
      {{ technology.title }}
    </li>
  </ul>
</template>
