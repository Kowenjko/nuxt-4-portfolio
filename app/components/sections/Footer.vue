<script lang="ts" setup>
const currentYear = new Date().getFullYear()
const nextYear = new Date().getFullYear() + 1
</script>

<template>
  <footer class="px-2 py-12 flex flex-col items-center justify-center">
    <SocialLinks />
    <p class="text-sm mt-4">&copy; {{ currentYear }} - {{ nextYear }} @Kovenko</p>
  </footer>
</template>
