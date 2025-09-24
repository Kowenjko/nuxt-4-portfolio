<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

const search = defineModel('search', { default: '' })
</script>

<template>
  <div class="container mx-auto px-10 flex gap-4 flex-col lg:flex-row justify-between items-center pb-2">
    <div>Filters</div>
    <div class="relative max-w-sm w-full items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="search" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
