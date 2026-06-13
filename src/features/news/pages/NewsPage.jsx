


import { memo, useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLatestNews, getNewsByCategory } from '../../../service/sports.service.js'

const TABS = [
  { id: 'all',     label: 'All',     emoji: '🏆', description: 'Complete coverage of all sports news, updates, and analysis from around the world.' },
  { id: 'cricket', label: 'Cricket', emoji: '🏏', description: 'Latest cricket news, match scores, player updates, and international cricket coverage.' },
  { id: 'ipl',     label: 'IPL',     emoji: '🔥', description: 'IPL 2025 news, team standings, player performances, and exclusive tournament coverage.' },
]

const NewsCard = memo(({ item }) => (
  <Link
    to={`/news/${item.slug}`}
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
        {item.category}
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
        <span className="text-[10px] font-semibold text-[#00698c] truncate">{item.source}</span>
        <time className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2" dateTime={item.publishedAt}>
          {item.time}
        </time>
      </div>
    </div>
  </Link>
))

const TabBar = memo(({ active, onChange }) => (
  <div className="flex items-center gap-2 mb-6" role="tablist" aria-label="News categories">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        role="tab"
        aria-selected={active === tab.id}
        aria-label={`Show ${tab.label} news`}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
          active === tab.id
            ? 'bg-[#00698c] border-[#00698c] text-white shadow-sm'
            : 'bg-white dark:bg-[#1c2128] border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#00698c] hover:text-[#00698c]'
        }`}
      >
        <span className="text-base leading-none" role="img" aria-label={tab.label}>
          {tab.emoji}
        </span>
        {tab.label}
      </button>
    ))}
  </div>
))

const NewsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [allNews, setAllNews] = useState([]) // accumulated news
  const [loading, setLoading] = useState(false) // changed to false initially
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0) // current offset page
  const [hasMore, setHasMore] = useState(true)
  const initialLoadDone = useRef(false) // track initial load
  const loadingRef = useRef(false) // prevent multiple simultaneous loads
  const observerRef = useRef(null) // intersection observer ref
  const loadMoreTriggerRef = useRef(null) // element to observe for infinite scroll
  const PAGE_SIZE = 8

  /**
   * Fetch news based on selected tab and page.
   */
  const fetchNews = useCallback(async (tab, currentPage, isLoadMore = false) => {
    // Prevent multiple simultaneous loads
    if (loadingRef.current) return
    
    if (!isLoadMore) {
      setLoading(true)
    }
    loadingRef.current = true
    setError(null)
    
    try {
      const category = tab === 'all' ? null : tab
      const res = await getLatestNews(category, { limit: PAGE_SIZE, offset: currentPage * PAGE_SIZE })

      if (res.success) {
        const formatted = res.data.map((item) => ({
          ...item,
          time: new Date(item.publishedAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
          }),
          // Fix badge: Pass activeTab to force correct category
          category: tab === 'cricket' 
            ? 'Cricket' 
            : normaliseCategory(item.category, item.subCategory, item.title, tab),
        }))
        
        if (currentPage === 0) {
          setAllNews(formatted) // fresh load
        } else {
          setAllNews(prev => {
            // Prevent duplicate entries by checking IDs
            const existingIds = new Set(prev.map(item => item.id))
            const newItems = formatted.filter(item => !existingIds.has(item.id))
            return [...prev, ...newItems]
          })
        }
        
        // Set hasMore: if we got less than PAGE_SIZE items, no more data
        setHasMore(res.data.length === PAGE_SIZE)
      } else {
        setError('Failed to fetch news')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again later.')
    } finally {
      if (!isLoadMore) {
        setLoading(false)
      }
      loadingRef.current = false
    }
  }, [])

  // Reset everything when tab changes
  useEffect(() => {
    setPage(0)
    setAllNews([])
    setHasMore(true)
    setError(null)
    initialLoadDone.current = false
    loadingRef.current = false
  }, [activeTab])

  // Fetch news when page changes
  useEffect(() => {
    // Skip if already loaded initial data
    if (page === 0 && initialLoadDone.current) return
    
    // Don't fetch if no more data and trying to load beyond
    if (page > 0 && !hasMore) return
    
    const isLoadMore = page > 0
    fetchNews(activeTab, page, isLoadMore)
    
    if (page === 0) {
      initialLoadDone.current = true
    }
  }, [activeTab, page, fetchNews, hasMore])

  // Setup infinite scroll with Intersection Observer
  useEffect(() => {
    // Only setup observer if we have more data and not currently loading
    if (!hasMore || loading || loadingRef.current) return
    
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore && !loadingRef.current && !loading) {
          // Load next page when trigger element is visible
          setPage(prevPage => prevPage + 1)
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Trigger when 10% visible, with 100px offset
    )
    
    // Observe the trigger element
    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current)
    }
    
    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, allNews.length]) // Re-run when dependencies change

  // Get current tab info
  const currentTab = useMemo(() => TABS.find((tab) => tab.id === activeTab) || TABS[0], [activeTab])

  const metaDescription = useMemo(() => currentTab.description, [currentTab])

  const canonicalUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return activeTab === 'all'
      ? `${baseUrl}/news`
      : `${baseUrl}/news?tab=${activeTab}`
  }, [activeTab])

  const structuredData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `${currentTab.label} News`,
      'description': metaDescription,
      'url': canonicalUrl,
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Sports News Platform',
        'url': baseUrl,
      },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': allNews.slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'url': `${baseUrl}/news/${item.slug}`,
        })),
        'numberOfItems': allNews.length,
      },
    }
  }, [currentTab, metaDescription, canonicalUrl, allNews])

  const breadcrumbData = useMemo(() => {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
        { '@type': 'ListItem', 'position': 2, 'name': 'News', 'item': `${baseUrl}/news` },
        ...(activeTab !== 'all' ? [{
          '@type': 'ListItem',
          'position': 3,
          'name': currentTab.label,
          'item': canonicalUrl,
        }] : []),
      ],
    }
  }, [activeTab, currentTab, canonicalUrl])

  // Show full page loader only on initial load
  if (loading && page === 0 && allNews.length === 0) {
    return (
      <>
        <Helmet>
          <title>Loading News... | Sports News Platform</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00698c] mb-4"></div>
            <p className="text-gray-400 dark:text-gray-500">Loading latest news...</p>
          </div>
        </div>
      </>
    )
  }

  if (error && allNews.length === 0) {
    return (
      <>
        <Helmet>
          <title>Error | Sports News Platform</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center py-20">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <button
              onClick={() => {
                setPage(0)
                setAllNews([])
                initialLoadDone.current = false
                fetchNews(activeTab, 0, false)
              }}
              className="mt-4 px-4 py-2 bg-[#00698c] text-white rounded-lg hover:bg-[#005a7a] transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`${currentTab.label} News | Latest Sports Updates & Articles`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${currentTab.label} news, sports news, ${currentTab.label.toLowerCase()} updates, match coverage`} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={`${currentTab.label} News - Sports Updates`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Sports News Platform" />
        <meta property="og:image" content={`${import.meta.env.VITE_SITE_URL || 'https://yourdomain.com'}/og-image-news.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentTab.label} News Updates`} />
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
        <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
          <Link to="/" className="text-gray-400 dark:text-gray-500 hover:text-[#00698c] transition-colors text-sm">
            Home
          </Link>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-sm font-semibold text-gray-900 dark:text-white" aria-current="page">
            News
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center gap-2 mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="mr-2" role="img" aria-label={currentTab.label}>{currentTab.emoji}</span>
            {currentTab.label === 'All' ? 'All Sports News' : `${currentTab.label} News`}
          </h1>
          <span className="text-sm text-gray-400 dark:text-gray-500 ml-auto">
            {allNews.length} {allNews.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Tab Bar */}
        <TabBar active={activeTab} onChange={setActiveTab} />

        {/* Content Grid */}
        <div className="flex-1 min-w-0">
          {allNews.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-400 dark:text-gray-500 text-base">
                No {currentTab.label === 'All' ? '' : currentTab.label} articles found.
              </p>
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-4 px-4 py-2 bg-[#00698c] text-white rounded-lg hover:bg-[#005a7a] transition-colors text-sm"
                >
                  View all news
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {allNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
              
              {/* Infinite scroll trigger element and loading indicator */}
              <div ref={loadMoreTriggerRef} className="h-10" />
              
              {/* Loading indicator for subsequent pages */}
              {(loading || loadingRef.current) && hasMore && allNews.length >= PAGE_SIZE && (
                <div className="flex justify-center py-8">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#00698c]"></div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Loading more articles...</span>
                </div>
              )}
              
          
            </>
          )}
        </div>
      </div>
    </>
  )
}

/**
 * Normalise the category label for display purposes.
 */
function normaliseCategory(category, subCategory, title, activeTab) {
  const sub = subCategory?.toLowerCase()
  const cat = category?.toLowerCase()
  const ttl = title?.toLowerCase() ?? ''

  // If activeTab is 'ipl', force IPL badge
  if (activeTab === 'ipl') return 'IPL'
  
  // If activeTab is 'cricket', force Cricket badge
  if (activeTab === 'cricket') return 'Cricket'
  
  // For 'all' tab, normalise based on content
  if (sub === 'ipl' || cat === 'ipl' || ttl.includes('ipl')) return 'IPL'
  if (sub === 'cricket' || cat === 'cricket') return 'Cricket'
  if (cat) return category
  return 'Cricket'
}

export default NewsPage