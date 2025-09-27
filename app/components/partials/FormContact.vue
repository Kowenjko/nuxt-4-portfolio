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

const sendMessage = async (values: SendMessageI, type: 'email' | 'telegram') => {
  loading.value = true
  try {
    await $fetch(`/api/${type}`, {
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
}

const onSubmitEmail = form.handleSubmit(async (values) => await sendMessage(values, 'email'))
const onSubmitTelegram = form.handleSubmit(async (values) => await sendMessage(values, 'telegram'))
</script>

<template>
  <form class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('form.label.name') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" :placeholder="$t('form.label.name')" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('form.label.email') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" :placeholder="$t('form.label.email')" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="message">
      <FormItem>
        <FormLabel>{{ $t('form.label.message') }}</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" class="min-h-40" :placeholder="$t('form.label.message')" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex gap-4 justify-end">
      <Button :disabled="loading" @click="onSubmitEmail">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <MailIcon v-else class="w-4 h-4 mr-2" />
        {{ $t('button.send_message') }}
      </Button>
      <Button :disabled="loading" @click="onSubmitTelegram">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <Icon v-else class="w-5 h-5 mr-2" name="mdi:telegram" />
        {{ $t('button.send_telegram') }}
      </Button>
    </div>
  </form>
</template>
