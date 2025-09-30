<script lang="ts" setup>
import { api } from '../../../convex/_generated/api'
import admin from '~/middleware/admin'

const { data: reviews } = useConvexQuery(api.reviews.getAllReviews)
const { mutate: approve } = useConvexMutation(api.reviews.approveReview)
const { mutate: remove } = useConvexMutation(api.reviews.deleteReview)

async function approveReview(id: any) {
  await approve({ id })
}

async function removeReview(id: any) {
  await remove({ id })
}

definePageMeta({
  middleware: admin,
  layout: 'admin',
})
</script>

<template>
  <section class="bg-background">
    <h1 class="text-2xl font-bold mb-6">Модерация отзывов</h1>

    <div v-if="reviews?.length" class="space-y-4">
      <div v-for="review in reviews" :key="review._id" class="p-4 shadow rounded-lg flex justify-between items-center">
        <div>
          <p class="italic">"{{ review.text }}"</p>
          <p class="text-sm text-gray-600 mt-1">{{ review.name }} ({{ review.role }})</p>
          <p v-if="review.approved" class="text-green-600 text-xs mt-1 font-bold">✔️ Одобрен</p>
          <p v-else class="text-yellow-600 text-xs mt-1 font-bold">⏳ На модерации</p>
        </div>
        <div class="space-x-2">
          <button
            v-if="!review.approved"
            @click="approveReview(review._id)"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Одобрить
          </button>
          <button @click="removeReview(review._id)" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Удалить
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">Отзывов пока нет.</p>
  </section>
</template>
