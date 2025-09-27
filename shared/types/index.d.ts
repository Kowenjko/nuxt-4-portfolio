export interface SendMessageI {
  name: string
  email: string
  message: string
}

export interface ContactI {
  title: string
  icon: string
  info: string
}
export interface NavLinkI {
  title: string
  url: string
}
export interface SocialLinkI {
  icon: string
  url: string
}
export interface TechnologyI {
  title: string
  icon: string | null
}
export interface ServiceI {
  title: string
  icon: string
  description: string
}
export interface ExperienceI {
  title: string
  icon: string
  name: string
  date: string
  description: string
  responsibilities: string[]
}
export interface ProjectI {
  title: string
  urlGit: string | null
  url: string | null
  imageUrl: string | null
  category: string
  description: string
  keywords: string[]
}

interface DeveloperI {
  title: string
  progress: number
}
export interface ProgressI {
  title: string
  icon: string
  developers: DeveloperI[]
}
