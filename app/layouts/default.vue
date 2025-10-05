<script lang="ts" setup>
import { api } from '../../convex/_generated/api'
const { mutate: addView } = useConvexMutation(api.views.addView)
const { tokenIdentifier } = await useGetTokenIdentifier()

onMounted(async () => {
  try {
    await addView({ tokenIdentifier })
  } catch (error) {}
})
</script>

<template>
  <Header />
  <slot />
  <Footer />
  <ButtonScrollTop />
</template>
