<script lang="ts" setup>
defineProps<{
  card: { id?: number; title?: string; subtitle?: string; description: string; icon?: string }
}>()

const cardRef = useTemplateRef('cardRef')

const handleMouseMove = (event: MouseEvent) => {
  const rect = cardRef.value?.target?.getBoundingClientRect()

  if (!rect || !cardRef.value) return

  const mouseX = event?.clientX - rect?.left - rect?.width / 2
  const mouseY = event?.clientY - rect?.top - rect?.height / 2

  let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
  angle = (angle + 360) % 360
  //@ts-ignore
  cardRef.value?.target.style.setProperty('--start', `${angle + 60}`)
}
</script>

<template>
  <Card class="card-wrapper" ref="cardRef" @mousemove="handleMouseMove">
    <div class="glow"></div>
    <CardHeader v-if="card.title || card.icon">
      <CardTitle class="flex flex-col justify-center items-center text-lg gap-4">
        <Icon v-if="card.icon" :name="card.icon" class="w-10 h-10 mr-2 inline-block" />
        <span v-if="card.title">{{ card?.title }}</span>
      </CardTitle>
      <CardDescription v-if="card.subtitle">{{ card?.subtitle }}.</CardDescription>
    </CardHeader>
    <CardContent>{{ card?.description }} </CardContent>
  </Card>
</template>
<style lang="scss" scoped>
.card-wrapper {
  --start: 0;
  position: relative;
  z-index: 40;
  overflow: hidden;

  transition: border-color 1s ease-in-out;

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    border: 2px solid transparent;
    background: radial-gradient(circle, var(--card-foreground) 0%, var(--card-foreground) 100%);
    background-attachment: fixed;
    mask:
      linear-gradient(#0000, #0000),
      conic-gradient(from calc((var(--start) - 15) * 1deg), #ffffff1f 0deg, white, #ffffff00 100deg);
    mask-composite: intersect;
    mask-clip: padding-box, border-box;
    opacity: 0;
    transition: 0.5s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  .glow {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: blur(50px);
    filter: saturate(200);
  }
}
</style>
