<script lang="ts" setup>
const isDark = useDark()
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
