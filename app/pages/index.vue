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
    <Hero v-if="sectionsStore.showHero" />
    <LazyServices v-if="sectionsStore.showServices" :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazySkills v-if="sectionsStore.showSkills" :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyExperience v-if="sectionsStore.showExperience" :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyWorks v-if="sectionsStore.showPortfolios" :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyReviews v-if="sectionsStore.showReviews" :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyContacts v-if="sectionsStore.showContact" :hydrate-on-visible="{ rootMargin: '100px' }" />
  </main>
</template>
