<script lang="ts" setup>
import { api } from '../../../convex/_generated/api'

const { data: count } = useConvexQuery(api.views.getViews, {})

const currentYear = new Date().getFullYear()
const nextYear = new Date().getFullYear() + 1
</script>

<template>
  <footer class="px-2 py-12 flex flex-col items-center justify-center">
    <SocialLinks />
    <p class="flex-center text-sm mt-4">
      &copy; {{ currentYear }} - {{ nextYear }}
      <NuxtImg
        :src="$colorMode.preference === 'dark' ? '/my-logo-light.png' : '/my-logo-dark.png'"
        format="webp"
        width="50px"
        class="w-14"
        alt="logo"
        loading="lazy"
      />
      <ClientOnly>
        <div class="flex-center gap-4">
          <div>👀</div>
          <div>{{ count }}</div>
        </div>
      </ClientOnly>
    </p>
  </footer>
</template>
