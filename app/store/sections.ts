import { defineStore } from 'pinia'
import { api } from '../../convex/_generated/api'

export const useSectionsStore = defineStore('sections', () => {
  const { data: showHero } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'hero' })
  const { data: showSkills } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'skills' })
  const { data: showServices } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'services' })
  const { data: showExperience } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'experience' })
  const { data: showPortfolios } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'portfolios' })
  const { data: showContact } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'contact' })
  const { data: showReviews } = useConvexQuery(api.sections.showSectionBySlug, { slug: 'reviews' })

  return { showReviews, showHero, showSkills, showExperience, showPortfolios, showContact, showServices }
})
