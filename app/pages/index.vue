<script lang="ts" setup>
const LazyServices = defineLazyHydrationComponent('visible', () => import('@/components/sections/Services.vue'))
const LazySkills = defineLazyHydrationComponent('visible', () => import('@/components/sections/Skills.vue'))
const LazyExperience = defineLazyHydrationComponent('visible', () => import('@/components/sections/Experience.vue'))
const LazyWorks = defineLazyHydrationComponent('visible', () => import('@/components/sections/Works.vue'))
const LazyContacts = defineLazyHydrationComponent('visible', () => import('@/components/sections/Contacts.vue'))
const LazyReviews = defineLazyHydrationComponent('visible', () => import('@/components/sections/Reviews.vue'))

const sectionsStore = useSectionsStore()
</script>

<template>
  <main>
    <Hero />
    <LazyServices :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazySkills :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyExperience :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyWorks :hydrate-on-visible="{ rootMargin: '100px' }" />
    <ClientOnly>
      <LazyReviews v-if="sectionsStore.showReviews" :hydrate-on-visible="{ rootMargin: '100px' }" />
    </ClientOnly>
    <LazyContacts :hydrate-on-visible="{ rootMargin: '100px' }" />
    <AnimateHero />
  </main>
</template>
