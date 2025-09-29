<script lang="ts" setup>
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const reviews = [
  {
    text: 'Очень приятно было работать! Всё сделал быстро и качественно.',
    name: 'Иван Петров',
    rating: 5,
    role: 'CEO Startup',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    text: 'Классный разработчик, помог с проектом на Nuxt.',
    name: 'Анна Смирнова',
    rating: 4,
    role: 'Frontend Dev',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    text: 'Всегда на связи и даёт полезные советы по проекту!',
    name: 'John Doe',
    rating: 3,
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/100?img=8',
  },
]
</script>

<template>
  <section class="py-16" id="reviews">
    <div class="container mx-auto px-5 md:px-10 text-center">
      <TitleCategory :title="$t('nav.title.reviews')" :category="$t('nav.category.reviews')" />
      <div class="flex justify-end">
        <SignedIn>
          <AddReviewModal>
            <Button variant="outline"> {{ $t('button.add_review') }} </Button>
          </AddReviewModal>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline"> Войти, чтобы оставить отзыв </Button>
          </SignInButton>
        </SignedOut>
      </div>

      <swiper-container
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="2"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 5000 }"
        pagination
        navigation
        class="pt-16 lg:py-16"
      >
        <swiper-slide v-for="(review, index) in reviews" :key="index">
          <GardReviews :card="review" />
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>
