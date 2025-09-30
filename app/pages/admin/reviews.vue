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
  <section class="container mx-auto px-4 pb-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Модерація відгуків</h1>

    <div v-if="reviews?.length" class="space-y-5">
      <div
        v-for="review in reviews"
        :key="review._id"
        class="px-4 py-5 shadow rounded-lg flex justify-between items-center border relative"
        :class="{ 'bg-emerald-900/10': review.approved }"
      >
        <div>
          <div class="text-sm text-gray-600 mt-1 flex items-center gap-2">
            <Avatar v-if="review.avatar">
              <AvatarImage :src="review.avatar" alt="avatar" />
            </Avatar>
            {{ review.name }} ({{ review.role }})
          </div>
          <p class="italic py-4">"{{ review.text }}"</p>
          <div class="absolute left-2 -top-3">
            <p v-if="review.approved" class="text-green-600 text-xs mt-1 font-bold bg-green-900/50 px-1 rounded">
              ✔️ Схвалено
            </p>
            <p v-else class="text-yellow-600 text-xs mt-1 font-bold bg-yellow-900/50 px-1 rounded">⏳ На модерації</p>
          </div>
          <div class="flex items-center gap-4 pt-4">
            <NuxtRating :rating-value="review.rating" :border-width="0" :rating-size="10" />
            <NuxtTime :datetime="review.createdAt!" class="text-xs text-ring italic" />
          </div>
        </div>
        <div class="flex gap-2">
          <Button
            v-if="!review.approved"
            @click="approveReview(review._id)"
            size="icon"
            class="px-4 py-2 bg-emerald-700 text-white hover:bg-emerald-800 transition-all"
          >
            <Icon name="mdi:check-all" />
          </Button>
          <Button
            v-else
            @click="approveReview(review._id)"
            class="px-4 py-2 bg-amber-700 text-white hover:bg-amber-800 transition-all"
            size="icon"
          >
            <Icon name="mdi:cancel" />
          </Button>
          <Button @click="removeReview(review._id)" variant="destructive" size="icon">
            <Icon name="mdi:trash-can-outline" />
          </Button>
        </div>
      </div>
    </div>

    <p v-else class="text-center">Відгуків поки немає.</p>
  </section>
</template>
