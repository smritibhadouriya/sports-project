


import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLatestNews } from '../../../service/sports.service.js'

const resolveSource = (pathname) => {
  if (pathname.includes('/football/news/'))
    return { listPath: '/football/news', label: 'Football News', basePath: '/football/news' }
  if (pathname.includes('/sports/news/'))
    return { listPath: '/sports/news', label: 'Sports News', basePath: '/sports/news' }
  if (pathname.includes('/ipl/news/'))
    return { listPath: '/ipl/news', label: 'IPL News', basePath: '/ipl/news' }
  if (pathname.includes('/news/'))
    return { listPath: '/news', label: 'Cricket News', basePath: '/news' }
  return { listPath: '/news', label: 'News', basePath: '/news' }
}

const ChevronIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-3.5 h-3.5 inline-block ml-1 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const TagIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
  </svg>
)

const NewsDetailPage = () => {
  const { slug } = useParams()
  const location = useLocation()
  const { pathname } = location
  const articleFromState = location.state?.article ?? null

  const [allNews, setAllNews] = useState([])
  const [loading, setLoading] = useState(true)

  const source = useMemo(() => resolveSource(pathname), [pathname])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getLatestNews()
        const apiNews = res.success
          ? res.data.map((item) => ({
              ...item,
              time: new Date(item.updated_at).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
              }),
              basePath: item.basePath ?? '/news',
            }))
          : []
        setAllNews(apiNews)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const article = useMemo(() => {
    if (articleFromState) return articleFromState
    if (!allNews.length) return null
    return allNews.find((a) => a.slug === slug) ?? null
  }, [articleFromState, allNews, slug])

  const latest10 = useMemo(
    () => allNews.filter((a) => a.slug !== slug).slice(0, 10),
    [allNews, slug]
  )

  const contentParagraphs = useMemo(() => {
    if (!article?.final_content) return []

    const hasHTML = /<[a-z][\s\S]*>/i.test(article.final_content)

    if (hasHTML) {
      return article.final_content
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
    }

    return article.final_content
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
  }, [article])

  const tags = Array.isArray(article?.tags) ? article.tags : []

  // Generate meta description from content
  const metaDescription = useMemo(() => {
    if (article?.description) {
      return article.description.length > 160 
        ? article.description.substring(0, 157) + '...' 
        : article.description
    }
    if (contentParagraphs.length > 0) {
      const plainText = contentParagraphs[0].replace(/<[^>]*>/g, '')
      return plainText.length > 160 ? plainText.substring(0, 157) + '...' : plainText
    }
    return `Read the latest ${source.label.toLowerCase()} article about ${article?.title || 'sports'} on our platform`
  }, [article, contentParagraphs, source])

  // Generate canonical URL - FIXED for Vite
  const canonicalUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return `${baseUrl}${source.basePath}/${slug}`
  }, [source.basePath, slug])

  // Generate JSON-LD structured data - FIXED for Vite
  const structuredData = useMemo(() => {
    if (!article) return null

    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    const articleUrl = `${baseUrl}${source.basePath}/${slug}`
    
    const imageUrl = article.image?.startsWith('http') 
      ? article.image 
      : `${baseUrl}${article.image}`

    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': article.title,
      'description': metaDescription,
      'image': imageUrl,
      'datePublished': article.updated_at || new Date().toISOString(),
      'dateModified': article.updatedAt || article.updated_at || new Date().toISOString(),
      'author': {
        '@type': 'Organization',
        'name': article.source || 'Sports News Platform',
        'url': article.sourceUrl || baseUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Sports News Platform',
        'logo': {
          '@type': 'ImageObject',
          'url': `${baseUrl}/logo.png`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': articleUrl
      },
      'keywords': tags.join(', '),
      'articleSection': article.category || article.subCategory || 'Sports News',
      'url': articleUrl
    }
  }, [article, metaDescription, source.basePath, slug, tags])

  // Generate breadcrumb structured data - FIXED for Vite
  const breadcrumbData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    
    return {
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
          'name': source.label,
          'item': `${baseUrl}${source.listPath}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': article?.title || 'Article',
          'item': `${baseUrl}${source.basePath}/${slug}`
        }
      ]
    }
  }, [source, article, slug])

  if (loading && !articleFromState) {
    return (
      <>
        <Helmet>
          <title>Loading Article... | Sports News</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="text-center py-20 text-gray-400">Loading article...</div>
      </>
    )
  }

  if (!article) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Sports News</title>
          <meta name="description" content="The requested article could not be found. Browse our latest sports news articles." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Article not found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/news" className="inline-block bg-[#00698c] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#005a78] transition-colors">
            Back to News
          </Link>
        </div>
      </>
    )
  }

  const { listPath, label: sourceLabel, basePath } = source

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${article.title} | ${sourceLabel} | Sports News Platform`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={tags.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={article.image} />
        <meta property="og:site_name" content="Sports News Platform" />
        <meta property="article:published_time" content={article.updated_at} />
        <meta property="article:section" content={article.category || article.subCategory} />
        {tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={article.image} />
        <meta name="twitter:site" content="@sportsnews" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content={article.source} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Breadcrumb with schema.org markup */}
        <nav className="flex items-center gap-1.5 text-sm mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="text-gray-400 hover:text-[#00698c] transition-colors">Home</Link>
          <ChevronIcon />
          <Link to={listPath} className="text-gray-400 hover:text-[#00698c] transition-colors">{sourceLabel}</Link>
          <ChevronIcon />
          <span className="text-gray-700 dark:text-gray-300 line-clamp-1 max-w-[200px] sm:max-w-xs" aria-current="page">
            {article.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main Article ── */}
          <article className="flex-1 min-w-0">

            {/* Category + Date */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-[#00698c] text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase">
                {article.subCategory || article.category}
              </span>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                <time dateTime={article.updated_at}>{article.time}</time>
              </span>
            </div>

            {/* Title with proper heading hierarchy */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {article.title}
            </h1>

            {/* Hero Image with proper alt text and loading attribute */}
            {article.image && (
              <div className="relative rounded-xl overflow-hidden mb-6 h-56 sm:h-72 md:h-96">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            )}

            {/* Content with HTML rendering support */}
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-[#00698c] pl-4 italic">
                {article.description}
              </p>
              {contentParagraphs.length > 0 ? (
                contentParagraphs.map((para, idx) => {
                  const hasHTML = /<[a-z][\s\S]*>/i.test(para)
                  return hasHTML ? (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed
                                 [&_a]:text-[#00698c] [&_a]:font-medium [&_a:hover]:underline
                                 [&_img]:rounded-lg [&_img]:w-full [&_img]:h-auto [&_img]:my-2
                                 [&_strong]:font-semibold [&_em]:italic
                                 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                                 [&_li]:mb-1 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-semibold"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ) : (
                    <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {para}
                    </p>
                  )
                })
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Stay tuned for further updates, post-match analysis, and exclusive interviews
                  as we continue to bring you comprehensive sports coverage from around the world.
                </p>
              )}
            </div>

            {/* Source with proper attribution */}
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wide font-medium">
                Source
              </p>
              {article.sourceUrl ? (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center text-sm font-semibold text-[#00698c] hover:text-[#005a78] hover:underline transition-colors"
                >
                  {article.source}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {article.source}
                </span>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <TagIcon />
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Tags
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to={"/news/tags/" + encodeURIComponent(tag)}
                      className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full hover:bg-[#00698c] hover:text-white dark:hover:bg-[#00698c] dark:hover:text-white transition-all duration-200"
                      rel="tag"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0" aria-label="Latest news sidebar">
            <div className="sticky top-20">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Latest News
              </h2>
              {latest10.length === 0 && (
                <p className="text-xs text-gray-400">Loading latest articles...</p>
              )}
              {latest10.length > 0 && (
                <div className="space-y-4">
                  {latest10.map((item) => (
                    <Link
                      key={item.id}
                      to={`${item.basePath ?? basePath}/${item.slug}`}
                      state={{ article: item }}
                      className="flex gap-3 items-start group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-14 object-cover rounded flex-shrink-0 group-hover:opacity-80 transition-opacity"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] font-medium text-[#00698c]">{item.source}</span>
                          <span className="text-gray-300 dark:text-gray-600">·</span>
                          <time className="text-[10px] text-gray-400" dateTime={item.updated_at}>{item.time}</time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to={listPath}
                className="mt-6 flex items-center gap-2 text-sm text-[#00698c] font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" d="M15 18l-6-6 6-6" />
                </svg>
                View all {sourceLabel}
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}

export default NewsDetailPage