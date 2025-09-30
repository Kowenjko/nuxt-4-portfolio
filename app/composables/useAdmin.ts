export const useAdmin = () => {
  const { isSignedIn, userId } = useAuth()
  const { adminUserId } = useRuntimeConfig().public

  const isAdmin = computed(() => isSignedIn.value && userId.value === adminUserId)

  return { isAdmin }
}
