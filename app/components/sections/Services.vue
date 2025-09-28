<script lang="ts" setup>
const { services } = useConstants()

onMounted(() => {
  gsapFromTo(
    '.tech-card',
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#services',
        start: 'top center',
      },
    }
  )
})
</script>

<template>
  <section class="pt-24 xl:pt-44 sm:py-24" id="services">
    <div class="container mx-auto px-10">
      <TitleCategory :title="$t('nav.title.services')" :category="$t('nav.category.services')" />
      <div class="grid-4-cols pt-8 lg:pt-24 pb-10">
        <GlowCard class="tech-card" v-for="(service, index) in services" :key="index" :card="service" />
      </div>
    </div>

    <MarqueeElement class="pb-24" />
  </section>
</template>
