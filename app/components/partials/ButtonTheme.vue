<script lang="ts" setup>
import { Moon, Sun } from 'lucide-vue-next'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Button class="flex px-2 py-1 rounded-md" @click="toggleDark()" variant="outline" size="icon">
    <Sun v-if="isDark" class="w-4 h-4" />
    <Moon v-else class="w-4 h-4" />
  </Button>
</template>
