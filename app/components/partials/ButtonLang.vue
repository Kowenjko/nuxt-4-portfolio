<script lang="ts" setup>
const { isMobile = false } = defineProps<{ isMobile?: boolean }>()

const { locale, locales, setLocale } = useI18n()

const selectLanguage = (code: any) => {
  setLocale(code)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger :class="[isMobile ? 'block lg:hidden' : 'hidden lg:block']" as-child>
      <Button variant="outline" class="w-10 p-0">{{ locale.toLocaleUpperCase() }}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="z-100">
      <DropdownMenuItem v-for="lang in locales" :key="lang.code" @click="selectLanguage(lang.code)">
        <Icon name="mdi:check" v-if="lang.code === locale" />
        <div v-else class="pl-4"></div>
        <span>{{ lang.name }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
