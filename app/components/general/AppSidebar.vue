<script setup lang="ts">
import { LayoutTemplateIcon, Home, Star } from 'lucide-vue-next'

const isDark = useDark()
const route = useRoute()

const items = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },

  {
    title: 'Sections',
    url: '/admin/sections',
    icon: LayoutTemplateIcon,
  },
  {
    title: 'Reviews',
    url: '/admin/reviews',
    icon: Star,
  },
]
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>
          <nuxt-link to="/" class="flex items-center text-xl gap-2 pb-2 hover:scale-105 transition-all">
            <NuxtImg :src="isDark ? '/my-logo-light.png' : '/my-logo-dark.png'" width="30px" class="w-8" alt="logo" />
            Kovenko
          </nuxt-link>
        </SidebarGroupLabel>
        <Separator />
        <SidebarGroupContent class="pt-5">
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <nuxt-link :to="item.url" :class="{ 'bg-sidebar-ring/20': route.path === item.url }">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </nuxt-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
