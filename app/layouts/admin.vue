<script lang="ts" setup>
const mode = useColorMode()
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
