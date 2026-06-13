// pages/IPLHomePage.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  IPLBanner, IPLSubTabs, SkeletonList, EmptyState, ErrorState, MatchCard,
} from '../components/iplshared'
import { getAllMatchFeeds } from '../../../service/ipl.api'
import { getIPLNews } from '../../../service/sports.service.js'

// ── Helpers ───────────────────────────────────────────────────────────────────
const createSlug = (title, index) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`

const formatTime = (iso) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })
  } catch { return '' }
}

// ── News Skeleton ─────────────────────────────────────────────────────────────
const NewsSkeleton = () => (
  <div className="space-y-3">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex gap-3 p-3 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800/60 animate-pulse">
        <div className="w-20 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full w-1/4" />
          <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
          <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
        </div>
      </div>
    ))}
  </div>
)

// ── Match Skeleton ────────────────────────────────────────────────────────────
const MatchSkeleton = () => (
  <div className="space-y-3">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="h-28 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800/60 animate-pulse" />
    ))}
  </div>
)

// ── Section Header ─────────────────────────────────────────────────────────────
const SectionHead = ({ label, accent = false, count }) => (
  <div className="flex items-center gap-2.5 mb-4">
    {accent ? (
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
      </span>
    ) : (
      <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#00698c] to-[#0088b0]" />
    )}
    <h3 className={`text-[11px] font-black uppercase tracking-[0.12em] ${
      accent ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
    }`}>
      {label}
    </h3>
    {count != null && (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
        accent
          ? 'bg-red-500/10 text-red-500'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
      }`}>
        {count}
      </span>
    )}
    <div className="flex-1 h-px bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent" />
  </div>
)

// ── Live Match Card (custom, more premium than shared MatchCard) ───────────────
const LiveMatchCard = ({ match, onClick }) => {
  const t1 = match.team1 || {}
  const t2 = match.team2 || {}
  const t1Name = t1.name || t1.teamName || t1.shortName || 'TBA'
  const t2Name = t2.name || t2.teamName || t2.shortName || 'TBA'

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group relative overflow-hidden rounded-2xl border border-red-200/60 dark:border-red-900/30 bg-gradient-to-br from-white to-red-50/30 dark:from-[#1c2128] dark:to-red-950/10 shadow-sm hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-[10px] font-black text-white tracking-widest uppercase">Live</span>
        </div>
        <span className="text-[10px] text-white/80 font-medium">{match.matchDesc || ''}</span>
      </div>

      {/* Teams */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Team 1 */}
        <div className="flex-1 flex items-center gap-2.5">
          {t1.imageId ? (
            <img src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${t1.imageId}/i.jpg`}
              alt={t1Name}
              className="w-9 h-9 rounded-full object-cover bg-gray-100 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-800"
              onError={e => e.currentTarget.style.display = 'none'} />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00698c]/20 to-[#00698c]/5 flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
              <span className="text-xs font-black text-[#00698c]">{t1Name.slice(0,2)}</span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{t1Name}</p>
            {t1.score && <p className="text-xs font-bold text-red-500 mt-0.5">{t1.score}</p>}
          </div>
        </div>

        <div className="text-[10px] font-black text-gray-300 dark:text-gray-600 px-2">VS</div>

        {/* Team 2 */}
        <div className="flex-1 flex items-center gap-2.5 flex-row-reverse">
          {t2.imageId ? (
            <img src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${t2.imageId}/i.jpg`}
              alt={t2Name}
              className="w-9 h-9 rounded-full object-cover bg-gray-100 dark:bg-gray-800 ring-2 ring-white dark:ring-gray-800"
              onError={e => e.currentTarget.style.display = 'none'} />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00698c]/20 to-[#00698c]/5 flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
              <span className="text-xs font-black text-[#00698c]">{t2Name.slice(0,2)}</span>
            </div>
          )}
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{t2Name}</p>
            {t2.score && <p className="text-xs font-bold text-red-500 mt-0.5">{t2.score}</p>}
          </div>
        </div>
      </div>

      {/* Status */}
      {match.status && (
        <div className="px-4 pb-3">
          <p className="text-[10px] font-semibold text-[#00698c] bg-[#00698c]/8 dark:bg-[#00698c]/10 rounded-lg px-2.5 py-1.5 line-clamp-1">
            {match.status}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Primary News Card ─────────────────────────────────────────────────────────
const PrimaryNewsCard = ({ article, index }) => {
  const slug = createSlug(article.title, index)
  const source = typeof article.source === 'string' ? article.source : article.source?.name
  const author = typeof article.author === 'string' ? article.author : article.author?.name

  return (
    <Link
      to={`/news/${slug}`}
      state={{ article }}
      className="group block bg-white dark:bg-[#161b22] rounded-2xl border border-gray-100 dark:border-gray-800/60 overflow-hidden hover:shadow-xl hover:shadow-[#00698c]/5 hover:border-[#00698c]/20 transition-all duration-300"
    >
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {source && (
            <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
              {source}
            </span>
          )}
          {article.publishedAt && (
            <time className="absolute top-3 right-3 text-[10px] text-white/80 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {formatTime(article.publishedAt)}
            </time>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors duration-200">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
            {article.description}
          </p>
        )}
        {author && (
          <p className="text-[10px] text-gray-400 mt-2">By {author}</p>
        )}
      </div>
    </Link>
  )
}

// ── Compact News Card ──────────────────────────────────────────────────────────
const CompactNewsCard = ({ article, index, style }) => {
  const slug = createSlug(article.title, index)
  const source = typeof article.source === 'string' ? article.source : article.source?.name

  return (
    <Link
      to={`/news/${slug}`}
      state={{ article }}
      style={style}
      className="group flex gap-3 p-3 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800/60 hover:border-[#00698c]/20 hover:shadow-md hover:shadow-[#00698c]/5 transition-all duration-200 animate-slide-up"
    >
      {/* Thumbnail */}
      <div className="w-[68px] h-[56px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-800/50">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl opacity-15">🏏</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <h4 className="text-[12.5px] font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors duration-200">
          {article.title}
        </h4>
        <div className="flex items-center justify-between mt-1">
          {source && (
            <span className="text-[10px] font-bold text-[#00698c]/80 truncate">{source}</span>
          )}
          {article.publishedAt && (
            <time className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
              {formatTime(article.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── News Section ───────────────────────────────────────────────────────────────
const NewsSection = ({ news, loading, error }) => {
  const [showAll, setShowAll] = useState(false)
  const INITIAL = 6
  const visible = showAll ? news : news.slice(0, INITIAL)
  const [primary, ...rest] = visible

  if (loading) return (
    <section>
      <SectionHead label="Latest News" />
      <NewsSkeleton />
    </section>
  )

  if (error) return (
    <section>
      <SectionHead label="Latest News" />
      <div className="py-10 text-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
        <p className="text-gray-400 text-sm">Could not load news</p>
      </div>
    </section>
  )

  if (!news.length) return (
    <section>
      <SectionHead label="Latest News" />
      <div className="py-12 text-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
        <p className="text-3xl mb-2">📰</p>
        <p className="text-gray-400 text-sm">No news available</p>
      </div>
    </section>
  )

  return (
    <section>
      <SectionHead label="Latest News" count={news.length} />

      <div className="space-y-2.5">
        {primary && <PrimaryNewsCard article={primary} index={0} />}

        {rest.map((article, i) => (
          <CompactNewsCard
            key={article.url || i}
            article={article}
            index={i + 1}
            style={{ animationDelay: `${i * 35}ms` }}
          />
        ))}
      </div>

      {news.length > INITIAL && (
        <button
          onClick={() => setShowAll(p => !p)}
          className="mt-4 w-full py-3 text-xs font-bold text-[#00698c] border border-[#00698c]/15 rounded-2xl hover:bg-[#00698c]/5 hover:border-[#00698c]/30 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {showAll ? (
            <><span>↑</span> Show Less</>
          ) : (
            <><span>Show {news.length - INITIAL} More</span> <span>↓</span></>
          )}
        </button>
      )}
    </section>
  )
}

// ── Live Section ───────────────────────────────────────────────────────────────
const LiveSection = ({ matches, loading, navigate }) => {
  if (loading) return (
    <section>
      <SectionHead label="Live Now" accent />
      <MatchSkeleton />
    </section>
  )

  if (!matches.length) return null

  return (
    <section>
      <SectionHead label="Live Now" accent count={matches.length} />
      <div className="space-y-3">
        {matches.map(m => (
          <LiveMatchCard
            key={m.matchId}
            match={m}
            onClick={() => navigate(`/cricket/series/${m.seriesId}/scorecard/${m.matchId}/`)}
          />
        ))}
      </div>
    </section>
  )
}

// IPL ke series IDs — inhe apni ipl.api.js se match karo
const IPL_SERIES_IDS = ['9237', '7607', '8048', '3718', '2919'] // common IPL series IDs

const isIPLMatch = (match) => {
  if (!match) return false
  const name = (match.seriesName || match.series || '').toLowerCase()
  const id   = String(match.seriesId || '')
  return name.includes('indian premier league') ||
         name.includes('ipl') ||
         IPL_SERIES_IDS.includes(id)
}

// ── Main Page ──────────────────────────────────────────────────────────────────
const IPLHomePage = () => {
  const navigate = useNavigate()

  const [liveMatches,  setLiveMatches]  = useState([])
  const [matchLoading, setMatchLoading] = useState(true)

  const [news,        setNews]        = useState([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsError,   setNewsError]   = useState(null)

  // ── Matches ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const feeds = await getAllMatchFeeds()
        if (!cancelled) {
          const allLive = feeds.live || []
          // Sirf IPL series ke live matches dikhao
          const iplLive = allLive.filter(isIPLMatch)
          setLiveMatches(iplLive)
        }
      } catch { /* silent */ }
      finally { if (!cancelled) setMatchLoading(false) }
    })()
    return () => { cancelled = true }
  }, [])

  // ── News ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const result = await getIPLNews()
        if (cancelled) return
        const articles = Array.isArray(result)
          ? result
          : Array.isArray(result?.data) ? result.data : []
        setNews(articles)
      } catch (e) {
        if (!cancelled) setNewsError(e.message)
      } finally {
        if (!cancelled) setNewsLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return (
    <>
      <div className="space-y-8">
        <LiveSection
          matches={liveMatches}
          loading={matchLoading}
          navigate={navigate}
        />
        <NewsSection
          news={news}
          loading={newsLoading}
          error={newsError}
        />
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease both; }
      `}</style>
    </>
  )
}

export default IPLHomePage