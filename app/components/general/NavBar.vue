<script lang="ts" setup>
const { scrollToId } = useScrollNav()
const { filteredNavLink } = useConstants()
const { isAdmin } = useAdmin()
</script>

<template>
  <nav class="desktop">
    <ul>
      <li class="group" v-for="{ url, title, isShow } in filteredNavLink" :key="title">
        <a @click="scrollToId(url)" class="cursor-pointer">
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
