


import { memo, useMemo, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLatestNews } from '../../../service/sports.service.js'
import { headlinesData } from '@/shared/constants/headlines.data'

const CONFIG = {
  '/news': {
    label: 'Cricket',
    type: 'cricket',
    // API category segment: GET /api/latest_news/cricket/?limit=1000&offset=0
    apiCategory: 'cricket',
    basePath: '/news',
    emoji: '🏏',
    description: 'Latest cricket news, match updates, scores, and analysis from international and domestic cricket matches.',
    keywords: 'cricket news, cricket updates, match scores, cricket analysis',
  },
  '/ipl/news': {
    label: 'IPL',
    type: 'ipl',
    apiCategory: 'ipl',
    basePath: '/ipl/news',
    emoji: '🔥',
    description: 'Indian Premier League news, team updates, player performances, match results, and IPL 2025 coverage.',
    keywords: 'IPL news, IPL 2025, IPL updates, cricket tournament',
  },
  '/sports/news': {
    label: 'Other Sports',
    type: 'other',
    // No specific category → fetch all
    apiCategory: null,
    basePath: '/sports/news',
    emoji: '🏆',
    description: 'Comprehensive coverage of other sports including football, tennis, basketball, and more.',
    keywords: 'sports news, football news, tennis updates, basketball',
  },
  '/headlines': {
    label: 'Top Headlines',
    type: 'headlines',
    data: headlinesData,
    apiCategory: null,
    basePath: '/headlines',
    emoji: '📰',
    description: 'Breaking sports news, top headlines, and important updates from the world of sports.',
    keywords: 'sports headlines, breaking news, top stories',
  },
}

const NewsCard = memo(({ item, basePath }) => (
  <Link
    to={`${basePath}/${item.slug}`}
    state={{ article: item }}
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group block"
  >
    <div className="relative h-44 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span className="absolute top-2 left-2 bg-[#00698c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
        {item.subCategory || item.category}
      </span>
    </div>
    <div className="p-3">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
        {item.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-[#00698c]">{item.source}</span>
        </div>
        <time className="text-[10px] text-gray-400 dark:text-gray-500" dateTime={item.publishedAt}>
          {item.time}
        </time>
      </div>
    </div>
  </Link>
))

const HeadlineCard = memo(({ item }) => (
  <Link
    to={`/headlines/${item.slug}`}
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex gap-3 p-3 items-start"
  >
    {item.image && (
      <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <span className="inline-block bg-[#00698c]/10 text-[#00698c] text-[10px] font-bold px-2 py-0.5 rounded mb-1">
        {item.category}
      </span>
      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-1">
        {item.title}
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-medium text-[#00698c]">{item.source}</span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <time className="text-[10px] text-gray-400 dark:text-gray-500" dateTime={item.publishedAt}>
          {item.time}
        </time>
      </div>
    </div>
  </Link>
))

const NewsListPage = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  const config = useMemo(() => {
    if (CONFIG[pathname]) return CONFIG[pathname]
    const key = Object.keys(CONFIG).find((k) => pathname.startsWith(k))
    return key ? CONFIG[key] : null
  }, [pathname])

  const isHeadlines = config?.basePath === '/headlines'

  useEffect(() => {
    // Headlines use static data — no API call needed
    if (!config || isHeadlines) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setNews([])
      try {
        /**
         * Pass the apiCategory from config so the correct endpoint is called:
         * cricket  → GET /api/latest_news/cricket/?limit=1000&offset=0
         * ipl      → GET /api/latest_news/ipl/?limit=1000&offset=0
         * null     → GET /api/latest_news/?limit=1000&offset=0
         */
        const res = await getLatestNews(config.apiCategory, { limit: 1000, offset: 0 })

        if (res.success) {
          const formatted = res.data.map((item) => ({
            ...item,
            time: new Date(item.publishedAt).toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric',
            }),
            category: config.label,
          }))
          setNews(formatted)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [config, isHeadlines])

  const metaDescription = useMemo(() => {
    if (config?.description) return config.description
    return `Latest ${config?.label || 'news'} updates, articles, and coverage on our sports news platform.`
  }, [config])

  const canonicalUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return `${baseUrl}${pathname}`
  }, [pathname])

  const structuredData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    const dataToRender = isHeadlines ? config?.data : news

    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `${config?.label} News`,
      'description': metaDescription,
      'url': canonicalUrl,
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Sports News Platform',
        'url': baseUrl,
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': dataToRender?.slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': `${baseUrl}${isHeadlines ? '/headlines' : config?.basePath}/${item.slug}`,
        })),
        'numberOfItems': dataToRender?.length || 0,
      },
    }
  }, [config, metaDescription, canonicalUrl, isHeadlines, news])

  const breadcrumbData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
        { '@type': 'ListItem', 'position': 2, 'name': config?.label || 'News', 'item': `${baseUrl}${pathname}` },
      ],
    }
  }, [config, pathname])

  if (!config) {
    return (
      <>
        <Helmet>
          <title>Page Not Found | Sports News</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">Section not found.</p>
          <Link to="/" className="text-[#00698c] hover:underline mt-2 inline-block text-sm">
            Go Home
          </Link>
        </div>
      </>
    )
  }

  const dataToRender = isHeadlines ? config.data : news

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading {config.label} News... | Sports News</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="text-center py-20 text-gray-400">Loading news...</div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`${config.label} News | Latest Updates & Articles | Sports News Platform`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={config.keywords || `${config.label}, ${config.label} news, sports updates`} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={`${config.label} News | Sports News Platform`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Sports News Platform" />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'}/og-image-${config.type}.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${config.label} News Updates`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:site" content="@sportsnews" />

        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-[#00698c] transition-colors text-sm">
            Home
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-sm font-semibold text-gray-900 dark:text-white" aria-current="page">
            {config.label}
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl" role="img" aria-label={config.label}>
            {config.emoji}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isHeadlines ? 'Top Headlines' : `${config.label} News & Updates`}
          </h1>
          <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
            {dataToRender.length} articles
          </span>
        </div>

        {/* Content Grid */}
        {isHeadlines ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataToRender.map((item) => (
              <HeadlineCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dataToRender.map((item) => (
              <NewsCard key={item.id} item={item} basePath={config.basePath} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default NewsListPage