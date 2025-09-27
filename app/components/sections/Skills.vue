<script lang="ts" setup>
import { progressFrontend, progressBackends } from '@/constants'

onMounted(() => {
  gsapFromTo(
    '.skills-left',
    {
      x: -100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      stagger: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 60%',
      },
    }
  )
  gsapFromTo(
    '.skills-right',
    {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 60%',
      },
    }
  )
})
</script>

<template>
  <section class="container mx-auto p-10 pt-24" id="skills">
    <TitleCategory :title="$t('nav.title.skills')" :category="$t('nav.category.skills')" />
    <div class="grid-2-cols gap-20">
      <AccordionSkills class="skills-left" :skills="progressFrontend" :default-value="progressFrontend.title" />
      <AccordionSkills class="skills-right" :skills="progressBackends" />
    </div>
  </section>
</template>
