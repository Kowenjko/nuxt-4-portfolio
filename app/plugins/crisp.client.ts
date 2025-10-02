export default defineNuxtPlugin(() => {
  const { crispWebsiteId } = useRuntimeConfig().public

  const loadCrisp = () => {
    if (window.$crisp) return
    window.$crisp = []
    window.CRISP_WEBSITE_ID = crispWebsiteId!
    const s = document.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }

  // Завантажити після першої взаємодії
  const start = () => {
    window.removeEventListener('scroll', start)
    window.removeEventListener('click', start)
    loadCrisp()
  }

  window.addEventListener('scroll', start, { once: true })
  window.addEventListener('click', start, { once: true })

  return { provide: { loadCrisp } }
})
