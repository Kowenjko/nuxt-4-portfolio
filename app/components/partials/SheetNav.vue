<script lang="ts" setup>
import { Menu } from 'lucide-vue-next'

const { navLinks } = useConstants()
const { scrollToId } = useScrollNav()
</script>

<template>
  <Sheet>
    <SheetTrigger as-child class="block lg:hidden">
      <Button variant="outline" class=""><Menu class="w-4 h-4" /> </Button>
    </SheetTrigger>
    <SheetContent class="z-100">
      <SheetHeader>
        <SheetTitle class="flex gap-2">
          <ButtonLang is-mobile />
          <ButtonTheme />
          <ClientOnly>
            <SignedOut>
              <Button variant="outline">
                <SignInButton mode="modal" />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClientOnly>
        </SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <nav class="p-4">
        <ul class="flex flex-col gap-6">
          <li class="group" v-for="{ url, title } in navLinks" :key="title">
            <a @click="scrollToId(url)" class="cursor-pointer">
              <span>{{ title }}</span>
              <span class="underline" />
            </a>
          </li>
        </ul>
      </nav>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit">{{ $t('button.close') }}</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
