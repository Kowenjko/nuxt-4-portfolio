export const useScrollNav = () => {
  /**
   * scroll by id
   * @param id
   */
  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return { scrollToId }
}
