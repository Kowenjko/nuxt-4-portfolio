<script lang="ts" setup>
import { workProjects, testProjects } from '@/constants'
</script>

<template>
  <section class="py-16" id="portfolios">
    <div class="container mx-auto p-10">
      <TitleCategory :title="$t('nav.category.portfolios')" :category="$t('nav.title.portfolios')" />
    </div>
    <Slides :projects="workProjects" :delay="3000" />
    <div class="container mx-auto p-10"><TitleCategory :category="$t('nav.title.portfolios_test')" /></div>
    <Slides :projects="testProjects" :delay="4500" />
  </section>
</template>
