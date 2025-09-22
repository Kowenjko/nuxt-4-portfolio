<script lang="ts" setup>
const currentYear = new Date().getFullYear()
const nextYear = new Date().getFullYear() + 1
</script>

<template>
  <footer class="px-2 py-12 flex flex-col items-center justify-center">
    <SocialLinks />
    <p class="flex-center text-sm mt-4">
      &copy; {{ currentYear }} - {{ nextYear }}
      <NuxtImg src="/my-logo-light.png" width="50px" class="w-14" alt="logo" />
    </p>
  </footer>
</template>
