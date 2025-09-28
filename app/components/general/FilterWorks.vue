<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

const { categories = [] } = defineProps<{ categories: string[] }>()

const search = defineModel('search', { default: '' })
const category = defineModel('category', { default: 'All' })
</script>

<template>
  <div class="container mx-auto px-10 flex gap-4 flex-col lg:flex-row justify-between items-start pb-2">
    <ul class="flex flex-wrap gap-2">
      <li>
        <Button class="cursor-pointer" :variant="category === 'All' ? 'default' : 'outline'" @click="category = 'All'">
          {{ $t('button.all') }}
        </Button>
      </li>
      <li v-for="(item, index) in categories" :key="index">
        <Button class="cursor-pointer" :variant="category === item ? 'default' : 'outline'" @click="category = item">
          {{ item }}
        </Button>
      </li>
    </ul>
    <div class="relative max-w-sm w-full">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" v-model="search" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
