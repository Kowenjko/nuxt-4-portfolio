<script lang="ts" setup>
const { info } = defineProps<{ info: string }>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger class="absolute -top-3 -right-3 hidden md:block" aria-label="show tooltip">
        <Icon name="mdi:information" class="w-4 h-4 animate-bounce" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ info }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
