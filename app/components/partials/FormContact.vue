<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { MailIcon, Loader2 } from 'lucide-vue-next'

const formSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.email(),
  message: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    name: '',
    email: '',
    message: '',
  },
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true
  try {
    const response = await $fetch('/api/message', {
      method: 'POST',
      body: values,
    })

    toast.success('Message sent successfully!')
    form.resetForm()
  } catch (error) {
    toast.error('Something went wrong. Please try again later.')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Name" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="message">
      <FormItem>
        <FormLabel>Message</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" class="min-h-40" placeholder="Message" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-end">
      <Button type="submit" :disabled="loading">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <MailIcon v-else class="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </div>
  </form>
</template>
