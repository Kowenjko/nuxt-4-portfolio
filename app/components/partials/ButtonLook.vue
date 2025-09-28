<script lang="ts" setup>
import { api } from '../../../convex/_generated/api'

const { data: count } = useConvexQuery(api.views.getViews, {})

const contRef = useTemplateRef('contRef')

const { y: scrollY } = useWindowScroll()

onMounted(() => {
  setTimeout(() => {
    if (contRef.value) {
      contRef.value!.style.right = '12px'
    }
  }, 700)
})

watch(scrollY, (value) => {
  if (value > 600 && contRef.value) {
    return (contRef.value!.style.right = '-340px')
  }
  contRef.value!.style.right = '12px'
})
</script>

<template>
  <div ref="contRef" class="fixed top-28 -right-96 transition-all duration-1000 hidden lg:block animate-pulse">
    <Button variant="ghost" class="gap-4 justify-between">
      <div>👀</div>
      <div>{{ count }}</div>
    </Button>
  </div>
</template>
