<script lang="ts" setup>
const { experiences } = useConstants()

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
  <section class="container mx-auto m-10 lg:pt-24 overflow-hidden px-10" id="experience">
    <TitleCategory :title="$t('nav.title.experience')" :category="$t('nav.category.experience')" />
    <div class="mt-14 lg:mt-32 relative">
      <div class="relative z-50 xl:space-y-32 space-y-10">
        <div
          class="flex flex-col-reverse xl:flex-row xl:gap-20 gap-10 justify-between"
          v-for="(experience, index) in experiences"
          :key="index"
        >
          <div class="w-3/4 xl:w-[45%]">
            <GlowCard :card="{ description: experience.description, title: experience.name }" class="timeline-card" />
          </div>
          <div class="w-[10%] hidden xl:flex justify-center relative">
            <div class="md:size-20 size-10 rounded-full flex justify-center items-center border bg-ring">
              <img :src="experience.icon" alt="logo" class="rounded p-2" />
            </div>
            <div class="gradient-line absolute -z-[1] w-1 h-[145%]" />
          </div>
          <div class="w-full xl:w-[45%]">
            <div class="flex items-start">
              <div class="absolute top-0 left-5 md:left-10 xl:left-1/2 xl:-translate-x-1/2 h-full">
                <div class="timeline" />
                <div class="gradient-line w-1 h-full xl:hidden" />
              </div>
              <div class="expText flex grow xl:gap-20 md:gap-10 gap-5 relative z-20">
                <div
                  class="size-20 !h-10 sm:!h-20 rounded-full flex xl:hidden justify-center shrink items-center border bg-ring"
                >
                  <img :src="experience.icon" alt="logo" class="rounded p-1 sm:p-2" />
                </div>
                <div>
                  <h1 class="font-semibold text-xl sm:text-3xl">{{ experience.title }}</h1>
                  <p class="my-5 flex gap-4"><Icon name="mdi:calendar-month-outline" /> {{ experience.date }}</p>
                  <p class="text-ring italic">{{ $t('title.responsibilities') }}</p>
                  <ul class="list-disc ms-5 mt-5 flex flex-col gap-4">
                    <li class="text-lg" v-for="(responsibility, i) in experience.responsibilities" :key="i">
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
