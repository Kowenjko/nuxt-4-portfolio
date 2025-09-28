<script lang="ts" setup>
const LazyServices = defineLazyHydrationComponent('visible', () => import('@/components/sections/Services.vue'))
const LazySkills = defineLazyHydrationComponent('visible', () => import('@/components/sections/Skills.vue'))
const LazyExperience = defineLazyHydrationComponent('visible', () => import('@/components/sections/Experience.vue'))
const LazyWorks = defineLazyHydrationComponent('visible', () => import('@/components/sections/Works.vue'))
const LazyContacts = defineLazyHydrationComponent('visible', () => import('@/components/sections/Contacts.vue'))
</script>

<template>
  <main>
    <Hero />
    <LazyServices :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazySkills :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyExperience :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyWorks :hydrate-on-visible="{ rootMargin: '100px' }" />
    <LazyContacts :hydrate-on-visible="{ rootMargin: '100px' }" />
  </main>
</template>
