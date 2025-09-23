export const useConstants = () => {
  const { t } = useI18n()

  const navLinks = computed(() => [
    { title: t('nav.category.services'), url: 'services' },
    { title: t('nav.category.skills'), url: 'skills' },
    { title: t('nav.category.experience'), url: 'experience' },
    { title: t('nav.category.portfolios'), url: 'portfolios' },
    { title: t('nav.category.contact'), url: 'contact' },
  ])

  return { navLinks }
}
