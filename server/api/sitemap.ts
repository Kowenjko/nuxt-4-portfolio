import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { clientUrl: host } = useRuntimeConfig(event)

  const urls = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },
    { url: '/#services', changefreq: 'yearly', priority: 0.7 },
    { url: '/#skills', changefreq: 'yearly', priority: 0.8 },
    { url: '/#experience', changefreq: 'yearly', priority: 0.9 },
    { url: '/#portfolios', changefreq: 'yearly', priority: 0.9 },
    { url: '/#contact', changefreq: 'yearly', priority: 0.6 },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${host}${u.url}</loc>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
      </url>`
      )
      .join('')}
  </urlset>`

  event.node.res.setHeader('content-type', 'application/xml')
  return xml
})
