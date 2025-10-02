<script lang="ts" setup>
import { api } from '../../../convex/_generated/api'
import admin from '~/middleware/admin'

const { data: views } = useConvexQuery(api.views.getUsersViews)
const { data: anonymousViews } = useConvexQuery(api.views.getViewsByUserId, { user_id: 'anonymous' })
const { data: count } = useConvexQuery(api.views.getViews, {})
const { data: reviews } = useConvexQuery(api.reviews.getAllReviews)

definePageMeta({
  middleware: admin,
  layout: 'admin',
  colorMode: 'dark',
})
</script>

<template>
  <section class="container mx-auto px-4 pb-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Загальна інформація</h1>
    <div class="flex items-center gap-2 border rounded-lg p-5">
      <p class="flex items-center gap-2 pr-2 border-r-2">
        👀 <span>{{ count }}</span>
      </p>

      <p class="flex items-center gap-2">
        <Icon class="text-yellow-500" name="mdi:star" /> <span>{{ reviews?.length }}</span>
      </p>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 py-10 gap-2">
      <li class="flex flex-col p-4 border rounded-2xl relative">
        <div class="flex items-center gap-2 pb-4">
          <span> Anonymous</span>
        </div>

        <div class="flex items-center gap-2 pt-3">
          <p class="flex gap-2">
            👀 <span class="text-primary">{{ anonymousViews?.count }}</span>
          </p>
        </div>
      </li>
      <li
        v-for="view in views"
        :key="view._id"
        class="flex flex-col p-4 border rounded-2xl relative"
        :class="{ 'border-green-500': view.isOnline }"
      >
        <Icon v-if="view.isOnline" class="text-green-500 absolute right-3 top-3" name="oui:online" />
        <Icon v-else class="text-red-500 absolute right-3 top-3" name="oui:offline" />
        <div class="flex items-center gap-2 pb-4">
          <Avatar v-if="view.avatar">
            <AvatarImage :src="view.avatar" alt="avatar" />
          </Avatar>
          <span> {{ view.name }}</span>
        </div>
        <p class="">
          <span class="text-primary">{{ view.email }}</span>
        </p>
        <div class="flex items-center gap-2 pt-3">
          <p class="flex gap-2">
            👀 <span class="text-primary">{{ view.viewsCount }}</span>
          </p>
          <p class="flex items-center gap-2">
            <Icon class="text-yellow-500" name="mdi:star" /> <span class="text-primary">{{ view.reviewsCount }}</span>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
