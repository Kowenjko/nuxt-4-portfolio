<script lang="ts" setup>
import type { NavigationLink } from '#shared/types'

const navLinks: NavigationLink[] = [
  { name: 'Home', url: '/#home' },
  { name: 'Services', url: '/#services' },
  { name: 'Skills', url: '/#skills' },
  { name: 'Portfolios', url: '/#portfolios' },
  { name: 'Contact', url: '/#contact' },
]

const { y: scrollY } = useWindowScroll()

const scrolled = computed(() => scrollY.value > 10)
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
      <a href="#contact" class="contact-btn group">
        <div class="inner">
          <span>Contact me</span>
        </div>
      </a>
    </div>
  </header>
</template>
