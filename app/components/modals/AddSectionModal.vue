<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { api } from '../../../convex/_generated/api'
import { Loader2 } from 'lucide-vue-next'

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    title: '',
    slug: '',
  },
})

const open = ref(false)
const loading = ref(false)

const { mutate: addSections } = useConvexMutation(api.sections.addSections)

const onSubmitSections = form.handleSubmit(async (values) => {
  loading.value = true
  try {
    await addSections(values)
    open.value = false
    toast.success('Section sent successfully!')
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
        <DialogTitle>Добавити Секцію</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <form class="space-y-4">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Назва секції</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Назва секції" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="slug">
          <FormItem>
            <FormLabel>Slug секції</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Slug секції" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button :disabled="loading" @click="onSubmitSections">
          <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
          <Icon v-else class="w-5 h-5 mr-2" name="lucide:layout-template" /> Добавити Секцію</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
