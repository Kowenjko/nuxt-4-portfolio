<script lang="ts" setup>
const { y: scrollY } = useWindowScroll()
const { scrollToId } = useScrollNav()

const scrolled = computed(() => scrollY.value > 10)

const { locale, locales, setLocale } = useI18n()

const localeName = computed(() => locales.value.filter((i: any) => i.code === locale.value)[0]?.name)

const selectLanguage = (code: any) => {
  setLocale(code)
}
</script>

<template>
  <header class="navbar" :class="[scrolled ? 'scrolled' : 'not-scrolled']">
    <div class="inner">
      <a @click="scrollToId('hero')" class="logo cursor-pointer flex-center">
        <NuxtImg src="/my-logo-light.png" width="50px" class="w-9" alt="logo" /> Kovenko
      </a>

      <NavBar />
      <div class="flex items-center gap-4">
        <!--  -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">{{ locale.toLocaleUpperCase() }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="z-[999]">
            <DropdownMenuItem v-for="lang in locales" :key="lang.code" @click="selectLanguage(lang.code)">
              <Icon name="mdi:check" v-if="lang.code === locale" />
              <div v-else class="pl-4"></div>
              <span>{{ lang.name }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <!--  -->
        <ButtonTheme class="hidden lg:block" />
        <SheetNav />
      </div>
    </div>
  </header>
</template>
