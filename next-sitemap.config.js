/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://cintasadhesivaspersonalizadas.com.ar',
  generateRobotsTxt: true,
  exclude: ['/gracias', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/gracias', '/api/'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/cinta-adhesiva-personalizada': 0.9,
      '/cinta-de-embalaje-personalizada': 0.9,
      '/cotizar': 0.8,
      '/blog': 0.7,
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    }
  },
}
