<script lang="ts" setup>
const { scrollToId } = useScrollNav()
const { navLinks } = useConstants()
const { isAdmin } = useAdmin()
</script>

<template>
  <nav class="desktop">
    <ul>
      <li class="group" v-for="{ url, title, isShow } in navLinks" :key="title">
        <a @click="scrollToId(url)" class="cursor-pointer" v-if="isShow">
          <span>{{ title }}</span>
          <span class="underline" />
        </a>
      </li>
      <li class="group" v-if="isAdmin">
        <nuxt-link to="/admin">Admin <span class="underline" /></nuxt-link>
      </li>
    </ul>
  </nav>
</template>
