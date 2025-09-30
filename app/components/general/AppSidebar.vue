<script setup lang="ts">
import { ViewIcon, Home, Star, UserIcon } from 'lucide-vue-next'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Views',
    url: '/admin',
    icon: ViewIcon,
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
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
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
