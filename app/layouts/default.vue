<script lang="ts" setup>
import { api } from '../../convex/_generated/api'
const { tokenIdentifier } = await useGetTokenIdentifier()

onMounted(async () => {
  const { mutate: addView } = useConvexMutation(api.views.addView)
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
