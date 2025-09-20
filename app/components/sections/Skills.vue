<script lang="ts" setup>
const progressFrontend = {
  value: 'Frontend developer',
  icon: 'fluent:position-to-front-24-filled',
  developers: [
    { title: 'HTML', progress: 90 },
    { title: 'CSS', progress: 85 },
    { title: 'JavaScript', progress: 80 },
    { title: 'React', progress: 60 },
    { title: 'Vue 3', progress: 85 },
  ],
}
const progressBackends = {
  value: 'Backend developer',
  icon: 'carbon:data-backup',
  developers: [
    { title: 'Python', progress: 60 },
    { title: 'Node', progress: 40 },
    { title: 'Deno', progress: 40 },
    { title: 'Firebase', progress: 70 },
    { title: 'PostgresSQL', progress: 75 },
  ],
}

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
    <TitleCategory title="My technical level" category="Skills" />
    <div class="grid-2-cols gap-20">
      <Accordion class="skills-left" type="single" collapsible :default-value="progressFrontend.value">
        <AccordionItem :value="progressFrontend.value">
          <AccordionTrigger>
            <div class="flex items-center gap-4 text-3xl font-bold">
              <Icon :name="progressFrontend.icon" class="w-7 h-7" />
              <span> {{ progressFrontend.value }} </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            ><ul class="space-y-4">
              <li v-for="item in progressFrontend.developers" :key="item.title" class="">
                <span class="inline-block whitespace-nowrap pb-1">{{ item.title }}</span>
                <Progress v-model="item.progress" />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion class="skills-right" type="single" collapsible>
        <AccordionItem :value="progressBackends.value">
          <AccordionTrigger>
            <div class="flex items-center gap-4 text-3xl font-bold">
              <Icon :name="progressBackends.icon" class="w-7 h-7" />
              <span> {{ progressBackends.value }} </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            ><ul class="space-y-4">
              <li v-for="item in progressBackends.developers" :key="item.title" class="">
                <span class="inline-block whitespace-nowrap pb-1">{{ item.title }}</span>
                <Progress v-model="item.progress" />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>
