<script lang="ts" setup>
import type { ReviewI } from '~~/shared/types'
import { api } from '../../../convex/_generated/api'
import { Autoplay } from 'swiper/modules'

const reviews = ref<ReviewI[]>([])

const { data } = useConvexQuery(api.reviews.getReviews, {})

watch(data, (value) => {
  // @ts-ignore
  reviews.value = value

  setTimeout(equalizeSlides, 500)
})
</script>

<template>
  <section id="reviews">
    <div class="container mx-auto px-5 md:px-10 text-center">
      <TitleCategory
        :title="$t('nav.title.reviews')"
        :category="$t('nav.category.reviews')"
        :counter="reviews.length"
        type="reviews"
      />
      <div class="flex justify-end">
        <SignedIn>
          <AddReviewModal>
            <Button variant="outline"> {{ $t('button.add_review') }} </Button>
          </AddReviewModal>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline"> {{ $t('button.sign_review') }}</Button>
          </SignInButton>
        </SignedOut>
      </div>

      <ClientOnly>
        <div class="relative mt-10">
          <div class="absolute w-full top-0 right-0 xl:right-0 flex justify-end gap-2 z-10">
            <Button class="swiper-button-prev-custom cursor-pointer" variant="outline"
              ><Icon name="mdi:chevron-left"
            /></Button>
            <Button class="swiper-button-next-custom cursor-pointer" variant="outline"
              ><Icon name="mdi:chevron-right"
            /></Button>
          </div>
          <swiper-container
            class="pt-16 lg:py-16"
            :modules="[Autoplay]"
            :slides-per-view="1"
            :space-between="20"
            :loop="true"
            :autoplay="{ delay: 3000 }"
            :breakpoints="{
              768: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              980: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }"
            :navigation="{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }"
          >
            <swiper-slide class="review-slide px-2" v-for="(review, index) in reviews" :key="review._id">
              <GardReviews :card="review" />
            </swiper-slide>
          </swiper-container>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>
