export default defineNuxtPlugin(() => {
  const { crispWebsiteId } = useRuntimeConfig().public

  if (process.client) {
    window.$crisp = window.$crisp || []
    window.CRISP_WEBSITE_ID = crispWebsiteId

    const d = document
    const s = d.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.async = true
    s.defer = true
    d.getElementsByTagName('head')[0].appendChild(s)
  }
})
