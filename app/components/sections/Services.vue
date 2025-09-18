<script lang="ts" setup>
import { services } from '@/constants'
</script>

<template>
  <section class="grid-4-cols container mx-auto p-10 pt-24" id="services">
    <GlowCard v-for="(service, index) in services" :key="index" :card="service" />
  </section>
</template>
