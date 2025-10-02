<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { api } from '../../../convex/_generated/api'
import { Loader2 } from 'lucide-vue-next'

const { t } = useI18n()

const formSchema = z.object({
  role: z.string(),
  text: z.string().min(10, {
    message: t('form.errors.min', { min: 10 }),
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
    toast.success(t('toast.send_review'))
    form.resetForm()
  } catch (error) {
    console.log(error)
    toast.error(t('toast.send_error'))
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
        <DialogTitle>{{ $t('button.add_review') }}</DialogTitle>
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
            <FormLabel>{{ $t('form.label.position') }}</FormLabel>
            <FormControl>
              <Input v-bind="componentField" :placeholder="$t('form.placeholder.position')" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="text">
          <FormItem>
            <FormLabel>{{ $t('form.label.review') }}</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" class="min-h-40" :placeholder="$t('form.placeholder.review')" />
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
