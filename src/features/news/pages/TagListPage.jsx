

import { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLatestNews } from '../../../service/sports.service.js'

// ─── Icons ──────────────────────────────────────────────────────────────────

const ChevronIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
  </svg>
)

const TagIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
  </svg>
)

// ─── Card Skeleton ───────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
    </div>
  </div>
)

// ─── News Card ───────────────────────────────────────────────────────────────

const categoryColors = {
  ipl: 'bg-yellow-500',
  cricket: 'bg-green-600',
  football: 'bg-red-600',
  sports: 'bg-blue-600',
  guide: 'bg-blue-600',
  explained: 'bg-purple-600',
  analysis: 'bg-orange-600',
}

const NewsCard = ({ article }) => {
  const cat = (article.subCategory || article.category || 'News').toLowerCase()
  const badgeColor = categoryColors[cat] || 'bg-[#00698c]'
  const badgeLabel = (article.subCategory || article.category || 'News').toUpperCase()
  const path = `${article.basePath ?? '/news'}/${article.slug}`

  return (
    <Link
      to={path}
      state={{ article }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <span className={`absolute top-3 left-3 ${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
          {badgeLabel}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-[#00698c] transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-3 flex-1">
            {article.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1.5 min-w-0">
            {article.author ? (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                By <span className="font-semibold text-gray-700 dark:text-gray-300">{article.author}</span>
              </span>
            ) : (
              <span className="text-[11px] font-medium text-[#00698c] truncate">{article.source}</span>
            )}
            {article.time && (
              <>
                <span className="text-gray-300 dark:text-gray-600 flex-shrink-0">·</span>
                <span className="text-[11px] text-gray-400 flex-shrink-0">{article.time}</span>
              </>
            )}
          </div>
          <span className="text-[11px] font-bold text-[#00698c] flex items-center gap-1 group-hover:gap-2 transition-all flex-shrink-0 ml-2">
            Read More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2.5" strokeLinecap="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const TagListPage = () => {
  const { tag } = useParams()
  const decodedTag = decodeURIComponent(tag || '')

  const [allNews, setAllNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getLatestNews()
        if (res.success) {
          setAllNews(
            res.data.map((item) => ({
              ...item,
              time: new Date(item.publishedAt).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
              }),
              basePath: item.basePath ?? '/news',
            }))
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  // ✅ Filter by tag — tags is already a normalized array from service
  const taggedArticles = useMemo(() => {
    if (!decodedTag || !allNews.length) return []
    return allNews.filter((a) =>
      Array.isArray(a.tags) &&
      a.tags.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
    )
  }, [allNews, decodedTag])

  const latest10 = useMemo(() => allNews.slice(0, 10), [allNews])

  // Generate meta description
  const metaDescription = useMemo(() => {
    const count = taggedArticles.length
    if (count === 0) {
      return `Explore articles tagged with "${decodedTag}" on our sports news platform. No articles found yet, but check back soon for updates.`
    }
    return `Browse ${count} article${count !== 1 ? 's' : ''} tagged with "${decodedTag}". Latest news, analysis, and updates about ${decodedTag} in sports.`
  }, [taggedArticles.length, decodedTag])

  // Generate canonical URL
  const canonicalUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return `${baseUrl}/news/tags/${encodeURIComponent(decodedTag)}`
  }, [decodedTag])

  // Generate structured data for tag page
  const structuredData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    
    // Generate CollectionPage schema
    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Articles tagged with "${decodedTag}"`,
      'description': metaDescription,
      'url': canonicalUrl,
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Sports News Platform',
        'url': baseUrl
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': taggedArticles.slice(0, 10).map((article, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': `${baseUrl}${article.basePath ?? '/news'}/${article.slug}`
        })),
        'numberOfItems': taggedArticles.length
      }
    }

    // Generate BreadcrumbList schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': baseUrl
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'News',
          'item': `${baseUrl}/news`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'Tags',
          'item': `${baseUrl}/tags`
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': decodedTag,
          'item': canonicalUrl
        }
      ]
    }

    return { collectionSchema, breadcrumbSchema }
  }, [decodedTag, metaDescription, canonicalUrl, taggedArticles])

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${decodedTag} Articles | Sports News Tag Archive`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${decodedTag}, sports news, ${decodedTag} articles, ${decodedTag} updates`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${decodedTag} - Sports News Articles`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Sports News Platform" />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'}/og-image-tags.jpg`} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${decodedTag} - Sports News Articles`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:site" content="@sportsnews" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData.collectionSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredData.breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Breadcrumb with schema.org markup */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="text-gray-400 hover:text-[#00698c] transition-colors">Home</Link>
          <ChevronIcon />
          <Link to="/news" className="text-gray-400 hover:text-[#00698c] transition-colors">News</Link>
          <ChevronIcon />
          <span className="text-gray-400">Tags</span>
          <ChevronIcon />
          <span className="text-gray-700 dark:text-gray-300 font-medium" aria-current="page">
            {decodedTag}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">

            {/* Page Header */}
            <header className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 bg-[#00698c]/10 rounded-lg text-[#00698c]">
                <TagIcon />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Tag</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {decodedTag}
                </h1>
              </div>
            </header>

            {/* Article count */}
            {!loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {taggedArticles.length > 0
                  ? `${taggedArticles.length} article${taggedArticles.length !== 1 ? 's' : ''} found`
                  : 'No articles found for this tag'}
              </p>
            )}

            {/* Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
              </div>
            ) : taggedArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {taggedArticles.map((article) => (
                  <NewsCard key={article.id || article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <TagIcon className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No articles for #{decodedTag}
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  There are no articles tagged with this keyword yet.
                </p>
                <Link
                  to="/news"
                  className="inline-block bg-[#00698c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#005a78] transition-colors"
                >
                  Browse all news
                </Link>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0" aria-label="Latest news sidebar">
            <div className="sticky top-20">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Latest News
              </h2>

              {loading && <p className="text-xs text-gray-400">Loading latest articles...</p>}

              {!loading && latest10.length > 0 && (
                <div className="space-y-4">
                  {latest10.map((item) => (
                    <Link
                      key={item.id}
                      to={`${item.basePath ?? '/news'}/${item.slug}`}
                      state={{ article: item }}
                      className="flex gap-3 items-start group"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-14 object-cover rounded flex-shrink-0 group-hover:opacity-80 transition-opacity"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] font-medium text-[#00698c]">{item.source}</span>
                          <span className="text-gray-300 dark:text-gray-600">·</span>
                          <time className="text-[10px] text-gray-400" dateTime={item.publishedAt}>{item.time}</time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/news"
                className="mt-6 flex items-center gap-2 text-sm text-[#00698c] font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" d="M15 18l-6-6 6-6" />
                </svg>
                View all Cricket News
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}

export default TagListPage