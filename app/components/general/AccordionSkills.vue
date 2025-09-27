<script lang="ts" setup>
const { skills, defaultValue = '' } = defineProps<{
  skills: ProgressI
  defaultValue?: string
}>()
</script>

<template>
  <Accordion type="single" collapsible :default-value="defaultValue">
    <AccordionItem :value="skills.title">
      <AccordionTrigger>
        <div class="flex items-center gap-4 text-3xl font-bold">
          <Icon :name="skills.icon" class="w-7 h-7" />
          <span> {{ skills.title }} </span>
        </div>
      </AccordionTrigger>
      <AccordionContent
        ><ul class="space-y-4">
          <li v-for="item in skills.developers" :key="item.title" class="">
            <span class="inline-block whitespace-nowrap pb-1">{{ item.title }}</span>
            <Progress v-model="item.progress" />
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
