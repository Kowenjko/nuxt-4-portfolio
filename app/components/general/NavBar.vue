<script lang="ts" setup>
import { navLinks } from '@/constants'

const { scrollToId } = useScrollNav()
</script>

<template>
  <nav class="desktop">
    <ul>
      <li class="group" v-for="{ url, name } in navLinks" :key="name">
        <a @click="scrollToId(url)" class="cursor-pointer">
          <span>{{ name }}</span>
          <span class="underline" />
        </a>
      </li>
    </ul>
  </nav>
</template>
