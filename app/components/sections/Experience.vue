<script lang="ts" setup>
const works = [
  {
    title: 'Frontend Developer',
    name: 'ABVV.Group',

    date: '2023 - Present',
    icon: '/svg/abvv.svg',
    responsibilities: [
      'Developed and maintained projects with Nuxt 3 / Vue 3',
      'Integrated APIs and third-party services',
      'Implemented UI/UX features based on client requirements',
      'Collaborated with team members using Git, Jira, Trello',
    ],
    description:
      'ABVV.Group is a Ukrainian digital agency specializing in web development and e-commerce solutions. The company builds and maintains online stores, corporate websites, and landing pages, integrating CRM systems and delivering ongoing support.',
  },
  {
    title: 'Frontend Development',
    name: 'Nexoft UG',

    date: '2021 - 2023',
    icon: '/svg/nexoft.svg',
    responsibilities: [
      'Built e-commerce solutions on Shopify and Shopware',
      'Worked on Vue 3 / Nuxt 3 projects with Pinia, Tailwind, Vuetify',
      'Integrated APIs, Firebase, JWT, and openAPI services',
      'Participated in agile teamwork using Git, Jira, Slack, ClickUp',
    ],
    description:
      'Nexoft UG is an international software development company delivering custom web applications, e-commerce solutions, and scalable SaaS platforms for clients worldwide.',
  },
  {
    title: 'Full Stack Developer',
    name: 'Python Online Marathon — SoftServe IT Academy',

    date: '2021',
    icon: '/svg/softserve.svg',
    description:
      'An intensive 2-month training program focused on Python and Django development, including teamwork and practical exercises.',
    responsibilities: [
      'Completed theoretical and practical tasks assigned by mentors',
      'Built a web project using Django',
      'Collaborated in small development teams (2–3 people)',
      'Practiced version control with Git and agile methodology with Scrum',
    ],
  },
]

onMounted(() => {
  gsapUtils.toArray('.timeline-card').forEach((card: any) => {
    gsapFrom(card, {
      xPercent: -100,
      opacity: 0,
      transformOrigin: 'left left',
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
    })
  })

  gsapTo('.timeline', {
    // Set the origin of the animation to the bottom of the timeline
    transformOrigin: 'bottom bottom',
    // Animate the timeline height over 1 second
    ease: 'power1.inOut',
    // Trigger the animation when the timeline is at the top of the screen
    // and end it when the timeline is at 70% down the screen
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top center',
      end: '70% center',
      // Update the animation as the user scrolls
      onUpdate: (self) => {
        // Scale the timeline height as the user scrolls
        // from 1 to 0 as the user scrolls up the screen
        gsapTo('.timeline', {
          scaleY: 1 - self.progress,
        })
      },
    },
  })

  gsapUtils.toArray('.expText').forEach((text: any) => {
    // Animate the text opacity from 0 to 1
    // and move it from the left to its final position
    // over 1 second with a power2 ease-in-out curve
    gsapFrom(text, {
      // Set the opacity of the text to 0
      opacity: 0,
      // Move the text from the left to its final position
      // (xPercent: 0 means the text is at its final position)
      xPercent: 0,
      // Animate over 1 second
      duration: 1,
      // Use a power2 ease-in-out curve
      ease: 'power2.inOut',
      // Trigger the animation when the text is 60% down the screen
      scrollTrigger: {
        // The text is the trigger element
        trigger: text,
        // Trigger the animation when the text is 60% down the screen
        start: 'top 60%',
      },
    })
  }, '<')
})
</script>

<template>
  <section class="container mx-auto p-10 pt-24" id="experience">
    <TitleCategory title="My Career Overview" category="Experience" />
    <div class="mt-32 relative">
      <div class="relative z-50 xl:space-y-32 space-y-10">
        <div
          class="flex flex-col-reverse xl:flex-row xl:gap-20 gap-10 justify-between"
          v-for="(work, index) in works"
          :key="index"
        >
          <div class="w-3/4 xl:w-[45%]">
            <GlowCard :card="{ description: work.description, title: work.name }" class="timeline-card" />
          </div>
          <div class="w-[10%] relative hidden xl:flex justify-center">
            <div class="absolute z-10 md:size-20 size-10 rounded-full flex justify-center items-center border bg-ring">
              <img :src="work.icon" alt="logo" class="rounded p-2" />
            </div>
          </div>
          <div class="w-full xl:w-[45%]">
            <div class="flex items-star">
              <div class="absolute top-0 left-5 md:left-10 xl:left-1/2 xl:-translate-x-1/2 h-full">
                <div class="timeline" />
                <div class="gradient-line w-1 h-full" />
              </div>
              <div class="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                <div class="md:size-20 size-10 rounded-full flex xl:hidden justify-center items-center border bg-ring">
                  <img :src="work.icon" alt="logo" class="rounded p-2" />
                </div>
                <div>
                  <h1 class="font-semibold text-3xl">{{ work.title }}</h1>
                  <p class="my-5 flex gap-4"><Icon name="mdi:calendar-month-outline" /> {{ work.date }}</p>
                  <p class="text-ring italic">Responsibilities</p>
                  <ul class="list-disc ms-5 mt-5 flex flex-col gap-4">
                    <li class="text-lg" v-for="(responsibility, i) in work.responsibilities" :key="i">
                      {{ responsibility }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.gradient-line {
  width: 2px;
  // background: linear-gradient(
  //   0deg,
  //   rgba(69, 222, 196, 0) 0%,
  //   #62e0ff 25%,
  //   #52aeff 37.51%,
  //   #fd5c79 62.83%,
  //   #6d45ce 92.91%
  // );
  background: var(--ring);
}
</style>
