// CricketNewsPage.jsx
// Cricket-specific news page — same API as NewsPage but hardlocked to cricket category
// Infinite scroll, skeleton loaders, sub-category filter tabs

import { memo, useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLatestNews } from '../../../../service/sports.service.js'

// ── Sub-category tabs ─────────────────────────────────────────────────────────
const SUB_TABS = [
  { id: 'cricket', label: 'All Cricket', emoji: '🏏' },
  { id: 'ipl',     label: 'IPL',         emoji: '🔥' },
  { id: 'intl',    label: 'International', emoji: '🌍' },
]

const PAGE_SIZE = 9

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function normaliseCategory(item, subTab) {
  if (subTab === 'ipl') return 'IPL'
  const t = (item.subCategory || item.category || '').toLowerCase()
  const title = (item.title || '').toLowerCase()
  if (t === 'ipl' || title.includes('ipl')) return 'IPL'
  if (t === 'cricket') return 'Cricket'
  return 'Cricket'
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-200 dark:bg-gray-700" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
    </div>
  </div>
)

// ── News card ─────────────────────────────────────────────────────────────────
const NewsCard = memo(({ item, index }) => (
  <Link
    to={`/news/${item.slug}`}
    state={{ article: item }}
    style={{ animationDelay: `${(index % PAGE_SIZE) * 50}ms` }}
    className="bg-white dark:bg-[#1c2128] border relative z-10  border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group block animate-fade-in  "
  >
    {/* Image */}
    <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={e => { e.target.style.display = 'none' }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl opacity-30">🏏</span>
        </div>
      )}
      {/* Category badge */}
      <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${
        item._cat === 'IPL'
          ? 'bg-orange-500 text-white'
          : 'bg-[#00698c] text-white'
      }`}>
        {item._cat}
      </span>
    </div>

    {/* Content */}
    <div className="p-3">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors mb-1.5">
        {item.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
        {item.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-[#00698c] truncate">{item.source}</span>
        <time className="text-[10px] text-gray-400 flex-shrink-0 ml-2" dateTime={item.publishedAt}>
          {item.time}
        </time>
      </div>
    </div>
  </Link>
))



// ── Sub-tab bar ───────────────────────────────────────────────────────────────
const SubTabBar = memo(({ active, onChange }) => (
  <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-none pb-1">
    {SUB_TABS.map(tab => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex-shrink-0 ${
          active === tab.id
            ? 'bg-[#00698c] border-[#00698c] text-white shadow-sm'
            : 'bg-white dark:bg-[#1c2128] border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#00698c] hover:text-[#00698c]'
        }`}
      >
        <span>{tab.emoji}</span>
        {tab.label}
      </button>
    ))}
  </div>
))

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketNewsPage = () => {
  const [subTab, setSubTab]     = useState('cricket')
  const [news, setNews]         = useState([])
  const [page, setPage]         = useState(0)
  const [hasMore, setHasMore]   = useState(true)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const loadingRef     = useRef(false)
  const initialDone    = useRef(false)
  const observerRef    = useRef(null)
  const triggerRef     = useRef(null)

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchNews = useCallback(async (tab, currentPage, isLoadMore = false) => {
    if (loadingRef.current) return
    loadingRef.current = true
    if (!isLoadMore) setLoading(true)
    setError(null)

    try {
      // Always pass cricket as category; ipl/intl as subCategory filter
      const category    = tab === 'ipl' ? 'ipl' : 'cricket'
      const subCategory = tab === 'intl' ? 'international' : undefined

      const res = await getLatestNews(category, {
        limit:       PAGE_SIZE,
        offset:      currentPage * PAGE_SIZE,
        ...(subCategory ? { subCategory } : {}),
      })

      if (res.success) {
        const formatted = res.data.map(item => ({
          ...item,
          time: formatDate(item.publishedAt),
          _cat: normaliseCategory(item, tab),
        }))

        if (currentPage === 0) {
          setNews(formatted)
        } else {
          setNews(prev => {
            const ids = new Set(prev.map(i => i.id))
            return [...prev, ...formatted.filter(i => !ids.has(i.id))]
          })
        }
        setHasMore(res.data.length === PAGE_SIZE)
      } else {
        setError('Failed to fetch news')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      if (!isLoadMore) setLoading(false)
      loadingRef.current = false
    }
  }, [])

  // ── Reset on tab change ─────────────────────────────────────────────────────
  useEffect(() => {
    setPage(0)
    setNews([])
    setHasMore(true)
    setError(null)
    initialDone.current  = false
    loadingRef.current   = false
  }, [subTab])

  // ── Fetch on page/tab change ────────────────────────────────────────────────
  useEffect(() => {
    if (page === 0 && initialDone.current) return
    if (page > 0 && !hasMore) return
    fetchNews(subTab, page, page > 0)
    if (page === 0) initialDone.current = true
  }, [subTab, page, fetchNews, hasMore])

  // ── Infinite scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasMore || loading) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          setPage(p => p + 1)
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    )

    if (triggerRef.current) observerRef.current.observe(triggerRef.current)
    return () => observerRef.current?.disconnect()
  }, [hasMore, loading, news.length])



  const metaTitle = `Cricket News | Latest Cricket Updates & Match Analysis`
  const metaDesc  = `Stay updated with the latest cricket news, IPL updates, international matches, player performance, and in-depth cricket analysis.`

  // ── Initial load skeleton ───────────────────────────────────────────────────
  if (loading && page === 0 && news.length === 0) {
    return (
      <>
        <Helmet>
          <title>Loading Cricket News...</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(PAGE_SIZE)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </>
    )
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error && news.length === 0) {
    return (
      <div>
        <div className="text-center py-20">
          <p className="text-4xl mb-3">⚠️</p>
          <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              setPage(0)
              setNews([])
              initialDone.current = false
              fetchNews(subTab, 0, false)
            }}
            className="px-4 py-2 bg-[#00698c] text-white rounded-lg text-sm hover:bg-[#005a7a] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
      </Helmet>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
       
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Cricket News</h1>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {news.length} article{news.length !== 1 ? 's' : ''}
          </span>
        </div>


        {/* Empty state */}
        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">No cricket articles found.</p>
          </div>
        ) : (
          <>
            {/* News grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {news.map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={triggerRef} className="h-10 mt-4" />

            {/* Load more spinner */}
            {(loading || loadingRef.current) && hasMore && news.length >= PAGE_SIZE && (
              <div className="flex items-center justify-center gap-2 py-8">
                <div className="w-5 h-5 rounded-full border-2 border-[#00698c] border-t-transparent animate-spin" />
                <span className="text-sm text-gray-400">Loading more...</span>
              </div>
            )}

            {/* End of feed */}
            {!hasMore && news.length > 0 && (
              <div className="text-center py-8">
                <p className="text-xs text-gray-400 dark:text-gray-600">— You're all caught up —</p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.35s ease both; }
      `}</style>
    </>
  )
}

export default CricketNewsPage