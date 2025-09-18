<script lang="ts" setup>
import { services } from '@/constants'

onMounted(() => {
  gsapFromTo(
    '.tech-card',
    {
      // Initial values
      y: 50, // Move the cards down by 50px
      opacity: 0, // Set the opacity to 0
    },
    {
      // Final values
      y: 0, // Move the cards back to the top
      opacity: 1, // Set the opacity to 1
      duration: 1, // Duration of the animation
      ease: 'power2.inOut', // Ease of the animation
      stagger: 0.2, // Stagger the animation by 0.2 seconds
      scrollTrigger: {
        trigger: '#services', // Trigger the animation when the user scrolls to the #skills wrapper
        start: 'top center', // Start the animation when the top of the wrapper is at the center of the screen
      },
    }
  )
})
</script>

<template>
  <section class="container mx-auto px-10 pt-24" id="services">
    <TitleCategory title="I specialize in" category="Services" />
    <div class="grid-4-cols py-24">
      <GlowCard class="tech-card" v-for="(service, index) in services" :key="index" :card="service" />
    </div>
  </section>
</template>
