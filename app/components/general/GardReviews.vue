<script lang="ts" setup>
defineProps<{ card: ReviewI }>()

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
    <CardHeader v-if="card.name">
      <CardTitle class="flex justify-center items-center text-lg gap-4">
        <Avatar v-if="card.avatar">
          <AvatarImage :src="card.avatar" alt="avatar" />
        </Avatar>
        <span v-if="card?.name">{{ card.name }}</span>
      </CardTitle>
      <CardDescription>{{ card.role }} </CardDescription>
    </CardHeader>
    <CardContent class="text-start font-light mb-4">{{ card?.text }} </CardContent>
    <CardFooter class="flex justify-end text-ring italic text-xs absolute bottom-3 right-0 w-full">
      <div class="flex justify-between w-full">
        <NuxtRating :rating-value="card.rating" />
        <NuxtTime :datetime="card.createdAt!" />
      </div>
    </CardFooter>
  </Card>
</template>
<style lang="scss" scoped>
.card-wrapper {
  --start: 0;
  position: relative;
  z-index: 40;
  overflow: hidden;
  transition: border-color 1s ease-in-out;
  height: 100%;

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
