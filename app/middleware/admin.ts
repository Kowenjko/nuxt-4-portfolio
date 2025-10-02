export default defineNuxtRouteMiddleware(() => {
  const { isSignedIn, userId } = useAuth()
  const { adminUserId } = useRuntimeConfig().public

  if (!isSignedIn.value && userId.value !== adminUserId) {
    return navigateTo('/')
  }
})
