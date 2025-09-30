<script lang="ts" setup>
import admin from '~/middleware/admin'

definePageMeta({
  middleware: admin,
  layout: 'admin',
})
</script>

<template>Index</template>
