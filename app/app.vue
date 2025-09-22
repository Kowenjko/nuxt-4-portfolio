<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Kovenko` : 'Kovenko'
  },
  meta: [
    {
      name: 'description',
      content:
        'Portfolio Kovenko - Frontend Developer. Showcasing projects, skills, and experience in web development.',
    },
  ],
})
</script>

<template>
  <Suspense>
    <NuxtLayout>
      <NuxtPage />
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </Suspense>
</template>
