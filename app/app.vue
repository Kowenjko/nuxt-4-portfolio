<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'

const { t } = useI18n()
const { clientUrl } = useRuntimeConfig().public

const title = computed(() => t('seo.title'))
const description = computed(() => t('seo.description'))
const keywords = 'Vasyl Kovenko, Frontend Developer, Vue, Nuxt, React, Next, JavaScript, Web Development, Python'

useJsonld(() => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    url: clientUrl,
    name: title.value,
    description: description.value,
    sameAs: ['https://github.com/Kowenjko', clientUrl],
    worksFor: {
      '@type': 'Organization',
      name: 'ABVV.Group',
    },
    knowsAbout: keywords.split(','),
  }
})
</script>

<template>
  <Suspense>
    <NuxtLayout>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" hid="description" :content="description" />
        <Meta name="keywords" :content="keywords" />
        <!-- Open Graph -->
        <Meta property="og:title" :content="title" />
        <Meta property="og:description" :content="description" />
        <Meta property="og:type" content="website" />
        <Meta property="og:url" :content="clientUrl" />
        <Meta property="og:image" content="/images/og-image.png" />
      </Head>
      <NuxtPage />
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </Suspense>
</template>
