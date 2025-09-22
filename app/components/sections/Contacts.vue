<script lang="ts" setup>
const contacts = [
  { name: 'Address', info: 'Rivne', icon: 'uil:location-point' },
  {
    name: 'Telegram',
    info: 'https://t.me/VasyaKow',
    icon: 'uil:telegram-alt',
  },
  { name: 'Email', info: 'ortoswt@gmail.com', icon: 'uil:envelope-alt' },
]

onMounted(() => {
  gsapFromTo(
    '.contact-me',
    {
      y: 200,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      stagger: 0.5,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center',
      },
    }
  )
})
</script>

<template>
  <section class="py-10" id="contact">
    <div class="container mx-auto px-10">
      <TitleCategory title="Contact me" category="Get in Touch" />
      <div class="grid-2-cols gap-20">
        <FormContact class="contact-me" />
        <ul class="flex flex-col gap-5 justify-center contact-me">
          <li v-for="contact in contacts" class="flex items-center gap-10" :key="contact.name">
            <div class="w-14 h-14 rounded-2xl flex justify-center items-center border border-ring p-2">
              <Icon class="" :name="contact.icon" />
            </div>
            <div class="">
              <h5 class="name">{{ contact.name }}</h5>
              <p class="text-ring">
                {{ contact.info }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
