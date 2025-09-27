<script setup lang="ts">
import { technologies } from '@/constants'

const marqueeLeft = useTemplateRef('marqueeLeft')
const marqueeRight = useTemplateRef('marqueeRight')

const animations: any = []

const setupMarquee = (el: any, direction = 'left', duration = 10) => {
  // el.innerHTML += el.innerHTML
  const distance = el.scrollWidth / 2

  let fromX = direction === 'left' ? 0 : -distance
  let toX = direction === 'left' ? -distance : 0

  const anim = gsapFromTo(
    el,
    { x: fromX },
    {
      x: toX,
      duration,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: gsapUtils.unitize((x) => parseFloat(x) % distance),
      },
    }
  )

  animations.push(anim)
}

const pauseAll = () => {
  animations.forEach((a: any) => a.pause())
}

const playAll = () => {
  animations.forEach((a: any) => a.play())
}

onMounted(() => {
  setupMarquee(marqueeLeft.value, 'left', 50)
  setupMarquee(marqueeRight.value, 'right', 50)
})
</script>

<template>
  <div class="marquee text-5xl text-ring" @mouseenter="pauseAll" @mouseleave="playAll">
    <div class="marquee__inner" ref="marqueeLeft">
      <div
        v-for="technology in technologies"
        :key="'top-' + technology.title"
        class="flex items-center justify-center gap-4"
      >
        <Icon :name="technology.icon" class="w-10 h-10" /><span class="whitespace-nowrap"> {{ technology.title }}</span>
      </div>
    </div>

    <div class="marquee__inner" ref="marqueeRight">
      <div
        v-for="technology in technologies"
        :key="'bottom-' + technology.title"
        class="flex items-center justify-center gap-4"
      >
        <Icon :name="technology.icon" class="w-10 h-10" /><span class="whitespace-nowrap"> {{ technology.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  cursor: pointer;
  user-select: none;
}

.marquee__inner {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
}
</style>
