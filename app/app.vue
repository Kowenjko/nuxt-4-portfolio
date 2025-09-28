<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

const { t } = useI18n()

const title = computed(() => t('seo.title'))
const description = computed(() => t('seo.description'))

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${title.value}` : title.value
  },
  meta: [
    {
      name: 'description',
      content: description.value,
    },
    { property: 'og:title', content: title.value },
    {
      property: 'og:description',
      content: description.value,
    },
    { property: 'og:image', content: '/images/logo-dark.png' },
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
