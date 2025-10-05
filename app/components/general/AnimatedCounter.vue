<script lang="ts" setup>
const { counter = 0, suffix = '+', type = '' } = defineProps<{ counter: number; suffix?: string; type?: string }>()

const counterNumberRef = useTemplateRef('counterNumberRef')

onMounted(async () => {
  gsapSet(counterNumberRef.value, { innerText: '0' })

  gsapTo(counterNumberRef.value, {
    innerText: counter,
    duration: 1.5,
    ease: 'power2.out',
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: `#counter-${type}`,
      start: 'top center',
      toggleActions: 'play none none none',
    },
    onComplete: () => {
      if (counterNumberRef.value) counterNumberRef.value.textContent = `${counter} ${suffix}`
    },
  })
})
</script>

<template>
  <div class="absolute -right-14 -top-5" ref="counterRef" :id="`counter-${type}`">
    <div ref="counterNumberRef" class="tracking-normal text-primary text-xl font-bold">
      <span> 0 {{ suffix }}</span>
    </div>
  </div>
</template>
