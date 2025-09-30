<script setup lang="ts">
import { ViewIcon, Home, Star, UserIcon } from 'lucide-vue-next'

const isDark = useDark()
// Menu items.
const items = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },

  {
    title: 'Users',
    url: '/admin/users',
    icon: UserIcon,
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
          <nuxt-link to="/" class="flex items-center gap-2">
            <NuxtImg :src="isDark ? '/my-logo-light.png' : '/my-logo-dark.png'" width="30px" class="w-7" alt="logo" />
            Kovenko
          </nuxt-link>
        </SidebarGroupLabel>
        <Separator />
        <SidebarGroupContent class="pt-5">
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <nuxt-link :to="item.url">
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
