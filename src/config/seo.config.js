// CENTRALIZED SEO CONFIG

export const seoConfig = {
  siteName: 'SportyRadar',
  siteUrl: 'https://sportyradar.com',
  defaultTitle: 'SportyRadar - Live Sports Updates, Scores & News',
  defaultDescription:
    'Your ultimate destination for real-time sports updates, in-depth analysis, and fan stories from around the globe.',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@SportyRadar',
  locale: 'en_US',

  pages: {
    home: {
      title: 'SportyRadar - Live Sports Updates, Scores & News',
      description:
        'Get real-time cricket, football, tennis & more scores. Live updates, news and analysis from around the globe.',
    },
    cricket: {
      title: 'Cricket - Live Scores, Series & Fixtures | SportyRadar',
      description: 'Live cricket scores, series information, fixtures and results from around the world.',
    },
    blogs: {
      title: 'Sports Blogs & Analysis | SportyRadar',
      description: 'Read in-depth sports analysis, guides and stories from our expert writers.',
    },
    contact: {
      title: 'Contact Us | SportyRadar',
      description: 'Get in touch with SportyRadar - contact us for tips, partnerships and feedback.',
    },
  },

  jsonLd: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SportyRadar',
      url: 'https://sportyradar.com',
      logo: 'https://sportyradar.com/logo.png',
      sameAs: [
        'https://twitter.com/SportyRadar',
        'https://instagram.com/SportyRadar',
        'https://facebook.com/SportyRadar',
      ],
    },
  },
}

export default seoConfig
