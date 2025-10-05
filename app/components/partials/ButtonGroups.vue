<script lang="ts" setup>
import { LogIn } from 'lucide-vue-next'

const open = defineModel('open')
</script>

<template>
  <ButtonLang />
  <ButtonTheme />
  <SignedOut>
    <SignInButton mode="modal">
      <Button variant="outline" size="icon" aria-label="loginIn">
        <LogIn class="w-4 h-4" />
      </Button>
    </SignInButton>
  </SignedOut>
  <SignedIn>
    <div @click="open = false" class="flex-center">
      <UserButton />
    </div>
  </SignedIn>
</template>
