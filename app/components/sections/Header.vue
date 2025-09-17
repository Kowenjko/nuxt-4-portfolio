<script lang="ts" setup>
import type { NavigationLink } from '#shared/types'
import { Moon, Sun } from 'lucide-vue-next'

const navLinks: NavigationLink[] = [
  { name: 'Home', url: '/#hero' },
  { name: 'Services', url: '/#services' },
  { name: 'Skills', url: '/#skills' },
  { name: 'Portfolios', url: '/#portfolios' },
  { name: 'Contact', url: '/#contact' },
]

const { y: scrollY } = useWindowScroll()

const scrolled = computed(() => scrollY.value > 10)

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="navbar" :class="[scrolled ? 'scrolled' : 'not-scrolled']">
    <div class="inner">
      <a href="#hero" class="logo"> Kovenko.</a>

      <nav class="desktop">
        <ul>
          <li class="group" v-for="{ url, name } in navLinks" :key="name">
            <a :href="url">
              <span>{{ name }}</span>
              <span class="underline" />
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <Button class="flex px-2 py-1 rounded-md" @click="toggleDark()" variant="outline" size="icon">
          <Sun v-if="isDark" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </header>
</template>
