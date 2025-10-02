<script lang="ts" setup>
import { Moon, Sun } from 'lucide-vue-next'

const mode = useColorMode()
const toggleColor = () => {
  mode.preference = mode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button class="flex px-2 py-1 rounded-md" @click="toggleColor" variant="outline" size="icon">
    <Sun v-if="$colorMode.preference === 'dark'" class="w-4 h-4" />
    <Moon v-else class="w-4 h-4" />
  </Button>
</template>
