export const useGetTokenIdentifier = async () => {
  const { clerkAppDomain } = useRuntimeConfig().public

  try {
    const response = await $fetch<{ userId: string }>('/api/user')

    return { tokenIdentifier: clerkAppDomain + '|' + response?.userId }
  } catch (error) {}
  return { tokenIdentifier: null }
}
