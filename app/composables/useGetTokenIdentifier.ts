export const useGetTokenIdentifier = async () => {
  const { clerkAppDomain } = useRuntimeConfig().public

  const response = await $fetch<{ userId: string }>('/api/user')

  return { tokenIdentifier: clerkAppDomain + '|' + response?.userId }
}
