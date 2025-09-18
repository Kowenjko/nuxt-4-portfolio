<script lang="ts" setup>
import { navLinks } from '@/constants'

const { scrollToId } = useScrollNav()
</script>

<template>
  <nav class="desktop">
    <ul>
      <li class="group" v-for="{ url, title } in navLinks" :key="title">
        <a @click="scrollToId(url)" class="cursor-pointer">
          <span>{{ title }}</span>
          <span class="underline" />
        </a>
      </li>
    </ul>
  </nav>
</template>
