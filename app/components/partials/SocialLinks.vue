<script lang="ts" setup>
import { socialLinks } from '@/constants'
</script>

<template>
  <ul class="flex gap-4">
    <li v-for="(link, index) in socialLinks" :key="index">
      <Button as-child size="icon" variant="ghost">
        <a :href="link.url" target="_blank" class="text-2xl">
          <Icon :name="link.icon" class="text-2xl" />
        </a>
      </Button>
    </li>
  </ul>
</template>
