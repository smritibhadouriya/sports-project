
import { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SeoManager from '@/core/seo/SeoManager'
import { seoConfig } from '@/config/seo.config'
import { photos, videos } from '@/shared/constants/Vedio.data'
import { footballNewsData } from '@/shared/constants/footballNews.data'
import { otherSportsNewsData } from '@/shared/constants/otherSportsNews.data'
import NewsGrid from '../../features/home/sections/NewsGrid'
import HeroSection from '../../features/home/sections/HeroSection.jsx'
import { getLatestNews } from '../../service/sports.service.js'
import BlogsRow from '../../shared/components/BlogsRow.jsx'
import Category from '../../layouts/Category.jsx'
// Import change karo — getAllMatches add karo
import { getLiveMatches, getRecentMatches, getAllMatches } from '../../service/ipl.api.js'

// ─── Latest News Section ──────────────────────────────────────────────────────
const LatestNewsSection = memo(({ news, loading }) => {
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!news.length) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Latest News</h2>
        <div className="text-center py-8 text-gray-400 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-sm">No articles found</p>
          <p className="text-xs text-gray-400 mt-1">Unable to connect to news server</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Latest News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.slug}`}
            state={{ article: item }}
            className="flex items-start gap-2.5 cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full bg-[#00698c] mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#00698c] transition-colors leading-snug line-clamp-2">
                {item.title}
              </p>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{item.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

// ─── Latest News Sidebar ──────────────────────────────────────────────────────
const LatestNewsSidebar = memo(({ news, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 px-1">Quick Links</h3>
        <ul>
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i}>
              <div className="animate-pulse px-1 py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (!news.length) {
    return (
      <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 px-1">Quick Links</h3>
        <div className="text-center py-6 text-gray-400">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-xs">No articles found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm mb-6">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 px-1">Quick Links</h3>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <Link
              to={`/news/${item.slug}`}
              state={{ article: item }}
              className="flex items-center justify-between px-1 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#00698c] dark:hover:text-[#3387a3] border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors group"
            >
              <span className="line-clamp-2 flex-1 pr-2 group-hover:text-[#00698c]">
                {item.title}
              </span>
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

// ─── Photos Section ───────────────────────────────────────────────────────────
const toSlug = (title) =>
  title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const PhotosSection = memo(() => {
  const latest = photos.slice(0, 3)
  return (
    <div className="mb-12 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Photos</h2>
        <Link to="/photogallary" className="text-sm text-[#00698c] hover:underline font-medium">View all</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {latest.map((item, idx) => (
          <Link to={`/photogallary/${toSlug(item.cardTitle)}`} key={idx} className="group block">
            <div className="relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow" style={{ aspectRatio: '4/3' }}>
              <img src={item.images[0].url} alt={item.cardTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-bold leading-snug line-clamp-2">{item.cardTitle}</p>
                <p className="text-gray-300 text-xs font-medium mt-1">{item.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

// ─── Videos Section ───────────────────────────────────────────────────────────
const VideosSection = memo(() => {
  const latest = videos.slice(0, 3)
  return (
    <div className="mb-12 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Videos</h2>
        <Link to="/vediogallary" className="text-sm text-[#00698c] hover:underline font-medium">View all</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {latest.map((item, idx) => (
          <Link to={`/vediogallary/${toSlug(item.title)}`} key={idx} className="group block">
            <div className="relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow" style={{ aspectRatio: '16/9' }}>
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#111" className="ml-0.5">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">{item.duration}</div>
              )}
            </div>
            <div className="mt-2 px-0.5">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug line-clamp-2 group-hover:text-[#00698c] transition-colors">{item.title}</p>
              <p className="text-xs font-medium text-gray-400 mt-1">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

// ─── Helper: get match type (same logic as LiveTicker) ────────────────────────
const getMatchType = (match) => {
  if (match.type) return match.type

  if (
    match.status === 'Live' ||
    match.state === 'In Progress' ||
    match.isLive === true
  ) return 'Live'

  if (
    match.status === 'Completed' ||
    match.status === 'Recent' ||
    match.matchStatus === 'completed' ||
    match.result ||
    (match.state && match.state.toLowerCase().includes('won'))
  ) return 'Recent'

  if (
    match.status === 'Upcoming' ||
    match.status === 'Not Started' ||
    (match.startDate && new Date(match.startDate) > new Date())
  ) return 'Upcoming'

  if (match.startDate)
    return new Date(match.startDate) < new Date() ? 'Recent' : 'Upcoming'

  return 'Upcoming'
}

// ─── Helper function to check if match is recent ──────────────────────────────
const isRecentMatch = (match) => {
  if (match.status === 'Completed' || match.matchStatus === 'completed') return true
  if (match.result) return true
  if (match.state && match.state.toLowerCase().includes('won')) return true
  if (match.startDate && new Date(match.startDate) < new Date()) return true
  return false
}

// ─── TeamFlag ─────────────────────────────────────────────────────────────────
const TeamFlag = memo(({ logo, name }) =>
  logo
    ? <img
        src={logo}
        alt={name}
        className="w-7 h-5 sm:w-8 sm:h-6 object-cover rounded shadow-sm"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    : <div className="w-7 h-5 sm:w-8 sm:h-6 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[9px] font-bold text-gray-600 dark:text-gray-300 shadow-sm">
        {(name || '?').slice(0, 3).toUpperCase()}
      </div>
)

// ─── RecentMatchCard ──────────────────────────────────────────────────────────
// Matches the screenshot: white card, sport+status badge top-left, score top-right,
// large title, subtitle, team rows with flag, toss info, hero image at bottom.
const RecentMatchCard = memo(({ match, loading, onClick }) => {

  // ── Loading Skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm mb-6 animate-pulse">
        {/* Top bar */}
        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4" />
          <div className="flex gap-4 mb-3">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        </div>
        <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-gray-700" />
      </div>
    )
  }

  // ── No match data ─────────────────────────────────────────────────────────
  if (!match) return null

  const matchType = getMatchType(match)
  const isLive    = matchType === 'Live'

  // Match subtitle line (venue + dates)
const subtitle = [
  match.matchDesc || match.matchFormat,
  match.venue?.ground || (typeof match.venue === 'string' ? match.venue : ''),
  match.city || match.venue?.city || '',
  match.startDate
    ? new Date(match.startDate).toLocaleDateString('en-IN', { 
        day: 'numeric', month: 'short', year: 'numeric' 
      })
    : '',
].filter(Boolean).join(', ')

// Result line — status ya result field
const tossLine = match.result || match.state || match.tossResult || match.toss || ''

 

  // Both team scores (shown separately per team row)
  const team1Score = match.team1?.score || ''
  const team2Score = match.team2?.score || ''

  // Top-right: show the score of the team that batted first (or whichever has score)
  const topScore = team1Score || team2Score

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer mb-6 focus:outline-none focus:ring-2 focus:ring-[#00698c]/40"
    >
      {/* ── Content block ─────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 md:p-6">

        {/* Row 1: Badges (left) + Top Score (right) */}
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
          {/* Left badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sport tag */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l9-9" /><path d="M12.5 7.5L18 2l4 4-5.5 5.5" /><circle cx="6" cy="18" r="2" />
              </svg>
              Cricket
            </span>

            {/* Status badge — only Live or Recent */}
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-xs font-bold text-red-600 dark:text-red-400">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Live
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Recent
              </span>
            )}
          </div>

          {/* Top-right score */}
     
        </div>

        {/* Row 2: Match title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-1 sm:mb-2 line-clamp-2">
          {match.seriesName || match.matchDesc || match.series || 'Cricket Match'}
        </h2>

        {/* Row 3: subtitle */}
        {subtitle ? (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 sm:mb-4 line-clamp-2">
            {subtitle}
          </p>
        ) : null}

        {/* Row 4: Teams with flags + individual scores */}
        <div className="flex flex-col gap-2 mb-3">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TeamFlag logo={match.team1?.logo} name={match.team1?.shortName || match.team1?.name} />
              <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">
                {match.team1?.shortName || match.team1?.name || 'TBA'}
              </span>
            </div>
            {team1Score ? (
              <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white tracking-tight">
                {team1Score}
              </span>
            ) : null}
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TeamFlag logo={match.team2?.logo} name={match.team2?.shortName || match.team2?.name} />
              <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">
                {match.team2?.shortName || match.team2?.name || 'TBA'}
              </span>
            </div>
            {team2Score ? (
              <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white tracking-tight">
                {team2Score}
              </span>
            ) : null}
          </div>
        </div>

        {/* Row 5: toss / result info */}
        {tossLine ? (
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 line-clamp-2">
            {tossLine}
          </p>
        ) : null}

      </div>

      {/* ── Hero Image — reduced height ───────────────────────────────────── */}
      <div className="w-full h-36 sm:h-44 md:h-52 overflow-hidden p-4">
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&q=80"
          alt="Cricket match"
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
    </div>
  )
})

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate()

  // API news state
  const [apiNews, setApiNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(true)

  // Recent match state
  const [recentMatch, setRecentMatch] = useState(null)
  const [matchLoading, setMatchLoading] = useState(true)

  // Fetch API news
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getLatestNews()
        if (res.success) {
          const mapped = res.data.map((item) => ({
            id:            item.id,
            title:         item.title,
            description:   item.description,
            image:         item.image,
            source:        item.source,
            time:          new Date(item.publishedAt).toLocaleDateString(),
            slug:          item.slug,
            category:      'Cricket',
            url:           item.url,
            final_content: item.final_content ?? '',
            tags:          Array.isArray(item.tags) ? item.tags : [],
          }))
          setApiNews(mapped)
        } else {
          setApiNews([])
        }
      } catch (e) {
        console.error(e)
        setApiNews([])
      } finally {
        setNewsLoading(false)
      }
    }
    fetchAll()
  }, [])

  // Fetch latest recent match (same logic as LiveTicker)
useEffect(() => {
  const fetchRecentMatch = async () => {
    try {
      setMatchLoading(true)

      const { live, recent } = await getAllMatches()

      let picked = null

      if (live?.length > 0) {
        // IPL match priority — live mein pehle IPL dhundho
        const iplLive = live.find(m =>
          (m.seriesName || '').toLowerCase().includes('indian premier league') ||
          (m.seriesName || '').toLowerCase().includes('ipl')
        )
        picked = iplLive || live[0]
      } else if (recent?.length > 0) {
        // IPL recent priority
        const iplRecent = recent.find(m =>
          (m.seriesName || '').toLowerCase().includes('indian premier league') ||
          (m.seriesName || '').toLowerCase().includes('ipl')
        )
        // IPL mila toh IPL, nahi toh latest recent
        const sorted = [...recent].sort((a, b) => {
          const da = a.startDate ? new Date(a.startDate) : new Date(0)
          const db = b.startDate ? new Date(b.startDate) : new Date(0)
          return db - da
        })
        picked = iplRecent || sorted[0]
      }

      setRecentMatch(picked || null)
    } catch (err) {
      console.error('[HomePage] Error fetching match:', err.message)
      setRecentMatch(null)
    } finally {
      setMatchLoading(false)
    }
  }
  fetchRecentMatch()
}, [])

  const faCupArticle = footballNewsData.find((a) => a.id === 'fn-8')

  const handleRecentMatchClick = () => {
    if (!recentMatch) return
    const matchType = getMatchType(recentMatch)
    if (matchType === 'Upcoming') {
      navigate('/cricket/ipl/matches')
    } else if (recentMatch.matchId) {
      navigate(`/cricket/series/${recentMatch.seriesId}/scorecard/${recentMatch.matchId}/`)
    } else {
      navigate('/cricket/ipl')
    }
  }

  return (
    <>
      <SeoManager
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
      />
      <HeroSection />

          <div className="relative z-20">
        <Category />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── RecentMatchCard + Sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          {/* Left Side */}
          <div className="flex-1 min-w-0">
            {/* Show card when loading OR match exists */}
            {(matchLoading || recentMatch) && (
              <RecentMatchCard
                match={recentMatch}
                loading={matchLoading}
                onClick={handleRecentMatchClick}
              />
            )}
            
            {/* FALLBACK: Show when no match and not loading */}
            {!matchLoading && !recentMatch && (
              <div 
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1c2128] dark:to-[#15191e] border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden shadow-sm mb-6 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => navigate('/cricket/ipl/matches')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/cricket/ipl/matches')}
              >
                <div className="p-6 sm:p-8 text-center">
                  {/* Animated cricket icon */}
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00698c]/10 dark:bg-[#00698c]/20">
                    <svg className="w-8 h-8 text-[#00698c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No Live Matches Currently
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
                    Check out upcoming matches or browse match highlights from recent games.
                  </p>
                  
                  {/* Two action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/cricket/ipl/matches');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00698c] text-white text-sm font-semibold rounded-lg hover:bg-[#005a7a] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upcoming Matches
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/cricket/series/scorecard');
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Recent Highlights
                    </button>
                  </div>
                </div>
                
                {/* Decorative bottom gradient */}
                <div className="h-1 bg-gradient-to-r from-[#00698c] via-[#3387a3] to-[#00698c]"></div>
              </div>
            )}

            <div
              className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => faCupArticle ? navigate(`/football/news/${faCupArticle.slug}`) : navigate('/football/news')}
            >
              <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                Weekend predictions: Can Wrexham top Chelsea in FA Cup?
              </p>
              <img
                src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=700&q=80"
                alt="FA Cup"
                className="w-full h-40 object-cover rounded-lg mt-2"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <LatestNewsSidebar news={apiNews.slice(0, 9)} loading={newsLoading} />
          </div>
        </div>

        {/* Latest News Section */}
        <div className="flex gap-6 mb-4">
          <div className="w-full lg:w-[80%] min-w-0">
            <LatestNewsSection news={apiNews.slice(0, 9)} loading={newsLoading} />
          </div>
          <div className="hidden lg:block lg:w-[20%]" />
        </div>

        {/* Cricket News Grid */}
        <div className="flex gap-6 mb-4">
          <div className="w-full lg:w-[80%] min-w-0">
            <NewsGrid
              title="Cricket News & Updates"
              viewAllTo="/news"
              items={apiNews}
              loading={newsLoading}
              basePath="/news"
            />
          </div>
          <div className="hidden lg:block lg:w-[20%]" />
        </div>

        {/* Football News Grid */}
        <div className="flex gap-6 mb-4">
          <div className="w-full lg:w-[80%] min-w-0">
            <NewsGrid
              title="Football News & Updates"
              viewAllTo="/football/news"
              items={footballNewsData}
              loading={false}
              basePath="/football/news"
            />
          </div>
          <div className="hidden lg:block lg:w-[20%]" />
        </div>

        {/* Other Sports News Grid */}
        <div className="flex gap-6 mb-4">
          <div className="w-full lg:w-[80%] min-w-0">
            <NewsGrid
              title="Other Sports News & Updates"
              viewAllTo="/sports/news"
              items={otherSportsNewsData}
              loading={false}
              basePath="/sports/news"
            />
          </div>
          <div className="hidden lg:block lg:w-[20%]" />
        </div>

        <PhotosSection />
        <VideosSection />
        <BlogsRow />

      </div>
    </>
  )
}

export default HomePage