<script lang="ts" setup>
const { contacts } = useConstants()

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
    <div class="container mx-auto p-5 md:px-10">
      <TitleCategory :title="$t('nav.title.contact')" :category="$t('nav.category.contact')" />
      <div class="grid-2-cols gap-20">
        <FormContact class="contact-me" />
        <ul class="flex flex-col gap-5 justify-center contact-me">
          <li v-for="(contact, index) in contacts" class="flex items-center gap-10" :key="index">
            <div class="w-14 h-14 rounded-2xl flex justify-center items-center border border-ring p-2">
              <Icon class="" :name="contact.icon" />
            </div>
            <div class="">
              <h5 class="name">{{ contact.title }}</h5>
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
