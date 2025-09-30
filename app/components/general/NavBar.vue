<script lang="ts" setup>
const { scrollToId } = useScrollNav()
const { navLinks } = useConstants()
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
      <li class="group">
        <nuxt-link to="/admin">admin <span class="underline" /></nuxt-link>
      </li>
    </ul>
  </nav>
</template>
