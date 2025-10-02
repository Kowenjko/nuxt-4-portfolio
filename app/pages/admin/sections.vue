<script lang="ts" setup>
import { api } from '../../../convex/_generated/api'
import admin from '~/middleware/admin'
import { toast } from 'vue-sonner'

const { data: sections } = useConvexQuery(api.sections.getSections, {})
const { mutate: changeShow } = useConvexMutation(api.sections.changeShow)

const handleChange = async (show: boolean, id: any) => {
  try {
    await changeShow({ id, show })
    toast.success('Section sent successfully!')
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong. Please try again later.')
  }
}

definePageMeta({
  middleware: admin,
  layout: 'admin',
  colorMode: 'dark',
})
</script>

<template>
  <section class="container mx-auto px-4 pb-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Список секцій</h1>
    <AddSectionModal>
      <Button variant="outline"> <Icon name="mdi:plus" /> Додати </Button>
    </AddSectionModal>
    <ul v-if="sections && sections?.length > 0" class="flex flex-col gap-3 pt-3 border max-w-96 p-5 rounded-lg mt-5">
      <li v-for="section in sections" :key="section._id" class="flex items-center justify-between">
        <p>{{ section.title }}</p>
        <Switch :model-value="section.show" @update:model-value="handleChange($event, section._id)" />
      </li>
    </ul>
    <p v-else class="text-center">Секцій поки немає.</p>
  </section>
</template>
