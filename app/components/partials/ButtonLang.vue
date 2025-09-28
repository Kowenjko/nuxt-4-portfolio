<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n()

const selectLanguage = (code: any) => {
  setLocale(code)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="flex-center">{{ locale.toLocaleUpperCase() }}</Button>
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
