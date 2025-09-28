<script lang="ts" setup>
const { workProjects, testProjects } = useConstants()
</script>

<template>
  <section class="py-2 lg:py-16" id="portfolios">
    <div class="container mx-auto p-10">
      <TitleCategory
        :title="$t('nav.category.portfolios')"
        :category="$t('nav.title.portfolios')"
        :counter="workProjects.length"
        type="work"
      />
    </div>

    <Slides :projects="workProjects" :delay="3000" />

    <div class="container mx-auto p-10">
      <TitleCategory :category="$t('nav.title.portfolios_test')" :counter="testProjects.length" type="test-work" />
    </div>
    <Slides :projects="testProjects" :delay="4500" />
  </section>
</template>
