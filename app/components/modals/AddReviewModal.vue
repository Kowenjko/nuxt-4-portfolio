<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { api } from '../../../convex/_generated/api'
import { Loader2 } from 'lucide-vue-next'

const formSchema = z.object({
  role: z.string(),
  text: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    role: '',
    text: '',
  },
})

const rating = ref(5)
const open = ref(false)
const loading = ref(false)

const { mutate: addReview } = useConvexMutation(api.reviews.addReview)
const { tokenIdentifier } = useGetTokenIdentifier()

const onSubmitReview = form.handleSubmit(async (values) => {
  loading.value = true
  try {
    await addReview({ ...values, rating: rating.value, tokenIdentifier })
    open.value = false
    toast.success('Review sent successfully!')
    form.resetForm()
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong. Please try again later.')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Review</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form class="space-y-4">
        <NuxtRating
          :rating-step="0.5"
          :read-only="false"
          :rounded-corners="true"
          :border-width="5"
          :rating-size="10"
          :rating-value="rating"
          @rating-hovered="(event) => (rating = event)"
        />

        <FormField v-slot="{ componentField }" name="role">
          <FormItem>
            <FormLabel>Должность</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Кем вы являетесь (например, Клиент, Разработчик)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="text">
          <FormItem>
            <FormLabel>Ваш отзыв</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" class="min-h-40" placeholder="Ваш отзыв..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button :disabled="loading" @click="onSubmitReview">
          <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
          <Icon v-else class="w-5 h-5 mr-2" name="carbon:review" /> {{ $t('button.add_review') }}</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
