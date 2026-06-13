// pages/SeriesMatchesPage.jsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSeriesMatches, getTeamFlag, getTeamLogo } from '../../../service/ipl.api'

const TABS = ['All', 'Live', 'Upcoming', 'Recent']

// ── Resolve team logo: imageId → Cricbuzz CDN → ui-avatars fallback ──────────
const resolveTeamLogo = (team) => {
  if (!team) return getTeamFlag('TM')
  if (team.logo)    return team.logo                          // already resolved
  if (team.imageId) return getTeamLogo(team.imageId)         // Cricbuzz CDN
  return getTeamFlag(team.name || team.teamName || team.shortName || 'TM')
}

const resolveTeamName = (team) =>
  team?.name || team?.teamName || team?.shortName || 'TBA'

// ── Match Card ────────────────────────────────────────────────────────────────
const MatchCard = ({ match, seriesId }) => {
  const navigate = useNavigate()

  const isClickable = match.type !== 'Upcoming'
  const dateStr = match.startDate
    ? new Date(match.startDate).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : ''

  const handleClick = () => {
    if (!isClickable) return
    // Use generic scorecard route — adjust path to match your routing setup
    navigate(`/cricket/series/${seriesId}/scorecard/${match.matchId}`)
  }

  return (
    <div
      className={`bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 sm:mb-4 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={handleClick}
    >
      {/* Status bar */}
      <div className={`text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between flex-wrap gap-2 ${
        match.type === 'Live'     ? 'bg-gradient-to-r from-red-700 to-red-600'
        : match.type === 'Recent' ? 'bg-gradient-to-r from-[#00698c] to-[#0088b0]'
        : 'bg-gradient-to-r from-gray-600 to-gray-500'
      }`}>
        <span className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
          {match.type === 'Live' && (
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          )}
          {match.type === 'Live' ? 'LIVE' : match.type === 'Recent' ? 'Result' : 'Upcoming'}
        </span>
        <div className="text-right">
          <p className="text-xs font-semibold opacity-100 line-clamp-1">{match.seriesName || ''}</p>
          <p className="text-xs opacity-70">{match.matchDesc || ''} · {match.matchFormat || ''}</p>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-5">
        {/* Teams */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Team 1 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={resolveTeamLogo(match.team1)}
                alt={resolveTeamName(match.team1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                onError={(e) => { e.currentTarget.src = getTeamFlag(resolveTeamName(match.team1)) }}
              />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base block">
                  {resolveTeamName(match.team1)}
                </span>
                {match.team1?.score && (
                  <span className="text-xs font-bold text-[#00698c]">{match.team1.score}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 px-2">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={resolveTeamLogo(match.team2)}
                alt={resolveTeamName(match.team2)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                onError={(e) => { e.currentTarget.src = getTeamFlag(resolveTeamName(match.team2)) }}
              />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base block">
                  {resolveTeamName(match.team2)}
                </span>
                {match.team2?.score && (
                  <span className="text-xs font-bold text-[#00698c]">{match.team2.score}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
          {match.venue && (
            <div className="flex items-start gap-1.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="break-words">
                {typeof match.venue === 'object'
                  ? [match.venue?.ground || match.venue?.name, match.venue?.city].filter(Boolean).join(', ')
                  : match.venue || ''}
              </span>
            </div>
          )}
          {dateStr && (
            <div className="flex items-start gap-1.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dateStr}</span>
            </div>
          )}
        </div>

        {/* Result / CTA */}
        {(match.result || isClickable) && (
          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            {match.result ? (
              <p className="text-xs font-semibold text-[#00698c]">{match.result}</p>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#00698c] font-medium">
                View Scorecard
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden animate-pulse mb-3 sm:mb-4">
    <div className="h-10 bg-gray-200 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
      </div>
    </div>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const SeriesMatchesPage = () => {
  const { seriesId }                      = useParams()
  const navigate                          = useNavigate()
  const [activeTab,  setActiveTab]        = useState('All')
  const [data,       setData]             = useState({ live: [], upcoming: [], recent: [] })
  const [seriesName, setSeriesName]       = useState('')
  const [loading,    setLoading]          = useState(true)
  const [error,      setError]            = useState(null)

  const load = useCallback(async () => {
    if (!seriesId) return
    try {
      setError(null)
      const result = await getSeriesMatches(seriesId)
   console.log('FULL RESULT', result)
   console.log(
  'RECENT TYPES',
  result.recent.map(m => ({
    id: m.matchId,
    type: m.type,
    state: m.state,
    status: m.status,
    result: m.result,
  }))
)
      setData(result)

      // Derive series name from first match found
      const firstMatch =
        result.live[0] || result.recent[0] || result.upcoming[0]
      if (firstMatch?.seriesName) setSeriesName(firstMatch.seriesName)
    } catch (e) {
      setError(e.message || 'Failed to load matches')
    } finally {
      setLoading(false)
    }
  }, [seriesId])

  useEffect(() => {
    load()
    // Auto-refresh every 2 min if there are live matches
    const t = setInterval(() => {
      if (data.live.length > 0) load()
    }, 2 * 60 * 1000)
    return () => clearInterval(t)
  }, [load, data.live.length])

  // Build deduped flat list with type labels
const matchMap = new Map()

// Lowest priority
data.upcoming.forEach(match => {
  matchMap.set(match.matchId, match)
})

// Recent overrides upcoming
data.recent.forEach(match => {
  matchMap.set(match.matchId, match)
})

// Live overrides all
data.live.forEach(match => {
  matchMap.set(match.matchId, match)
})

const deduped = Array.from(matchMap.values())

const filtered =
  activeTab === 'All'
    ? [
        ...deduped.filter(m => m.type === 'Live'),
        ...deduped.filter(m => m.type === 'Recent'),
        ...deduped.filter(m => m.type === 'Upcoming'),
      ]
    : deduped.filter((m) => m.type === activeTab)

  return (
    <>
      
 

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-100 dark:border-gray-700 pb-3 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 ${
              activeTab === tab
                ? 'bg-[#00698c] text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab === 'Live' && data.live.length > 0 && (
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            )}
            {tab}
            {tab !== 'All' && (
              <span className="text-[10px] opacity-60">
                ({tab === 'Live' ? data.live.length : tab === 'Upcoming' ? data.upcoming.length : data.recent.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 sm:h-6 bg-[#00698c] rounded-full" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {activeTab} Matches
          </h3>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} Match{filtered.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="py-12 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-gray-400 text-sm">Could not load matches</p>
          <p className="text-gray-300 text-xs mt-1">{error}</p>
          <button
            onClick={load}
            className="mt-3 text-xs text-[#00698c] hover:underline"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-3">🏏</p>
          <p className="text-sm">No {activeTab !== 'All' ? activeTab.toLowerCase() : ''} matches found</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
        {filtered.map((match) => (
  <MatchCard
    key={match.matchId}
    match={match}
    seriesId={seriesId}
  />
))}
        </div>
      )}
    </>
  )
}

export default SeriesMatchesPage