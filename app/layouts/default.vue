<script lang="ts" setup>
import { api } from '../../convex/_generated/api'

onMounted(() => {
  const { mutate: addView } = useConvexMutation(api.views.addView)
  addView({})
})
</script>

<template>
  <Header />
  <slot />
  <Footer />
  <ButtonScrollTop />
</template>
