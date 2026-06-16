import { useState, useEffect, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '@/shared/components/SectionHeader'
import { getAllMatchFeeds, getTeamFlag, getFixtures } from '../../../../service/ipl.api'

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronRight = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
  </svg>
)

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded ml-4" />
    </div>
  </div>
)

// ── Section Title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ title, count }) => (
  <div className="flex items-center gap-2 mb-3">
    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wide">
      {title}
    </h3>
    {count > 0 && (
      <span className="text-[10px] font-bold bg-[#00698c] text-white px-1.5 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </div>
)

// ── Tab Bar ───────────────────────────────────────────────────────────────────
const TabBar = ({ active, onChange, counts }) => {
  const tabs = [
    { key: 'live',     label: 'Live',     emoji: '🔴' },
    { key: 'upcoming', label: 'Upcoming', emoji: '📅' },
    { key: 'recent',   label: 'Results',  emoji: '🏆' },
  ]
  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-[#161b22] p-1 rounded-lg mb-5">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all ${
            active === t.key
              ? 'bg-white dark:bg-[#1c2128] text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          <span>{t.emoji}</span>
          <span>{t.label}</span>
          {counts[t.key] > 0 && (
            <span className={`text-[9px] font-black px-1 py-0.5 rounded-full ${
              active === t.key
                ? t.key === 'live' ? 'bg-red-500 text-white' : 'bg-[#00698c] text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {counts[t.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Live Match Row ────────────────────────────────────────────────────────────
const LiveRow = memo(({ match, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-[#1c2128] border z-40 relative border-red-200/60 dark:border-red-900/30 rounded-lg px-4 py-3 hover:shadow-md transition-all cursor-pointer group"
  >
    {/* Top row: series + LIVE badge */}
    <div className="flex items-center justify-between mb-2">
      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide truncate flex-1 pr-2">
        {match.matchDesc || match.seriesName || ''}
      </p>
      <span className="flex items-center gap-1 flex-shrink-0">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-extrabold text-red-500">LIVE</span>
      </span>
    </div>

    {/* Teams row */}
    <div className="flex items-center gap-3 mb-2">
      {/* Team 1 */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <img
          src={match.team1?.logo || getTeamFlag(match.team1?.name)}
          alt={match.team1?.name}
          className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate">
          {match.team1?.shortName || match.team1?.name || 'TBA'}
        </span>
        <span className="ml-auto text-sm font-extrabold text-gray-900 dark:text-white flex-shrink-0">
          {match.team1?.score || '—'}
        </span>
      </div>

      <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 flex-shrink-0">VS</span>

      {/* Team 2 */}
      <div className="flex items-center gap-2 flex-1 min-w-0 flex-row-reverse">
        <img
          src={match.team2?.logo || getTeamFlag(match.team2?.name)}
          alt={match.team2?.name}
          className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate text-right">
          {match.team2?.shortName || match.team2?.name || 'TBA'}
        </span>
        <span className="mr-auto text-sm font-bold text-gray-500 dark:text-gray-400 flex-shrink-0">
          {match.team2?.score || '—'}
        </span>
      </div>
    </div>

    {/* Status */}
    <div className="flex items-center justify-between">
      {(match.status || match.statusNote) && (
        <p className="text-[11px] font-semibold text-[#00698c] leading-tight truncate flex-1 pr-2">
          {match.status || match.statusNote}
        </p>
      )}
      <ChevronRight />
    </div>
  </div>
))

// ── Upcoming Row ──────────────────────────────────────────────────────────────
const UpcomingRow = memo(({ match, onClick }) => {
  const dateStr = match.date || match.startTime
    ? new Date(match.date || match.startTime).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
      })
    : ''

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Teams logos stacked */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        <img
          src={match.team1?.logo || getTeamFlag(match.team1?.name)}
          alt={match.team1?.name}
          className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <img
          src={match.team2?.logo || getTeamFlag(match.team2?.name)}
          alt={match.team2?.name}
          className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors truncate">
          {match.team1?.name || match.teamInfo?.[0]?.shortname || 'TBA'}
          <span className="text-gray-400 font-normal mx-1">vs</span>
          {match.team2?.name || match.teamInfo?.[1]?.shortname || 'TBA'}
        </p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {match.seriesName || match.matchDesc || ''}
        </p>
        {dateStr && (
          <p className="text-[11px] font-semibold text-[#00698c] mt-0.5">{dateStr}</p>
        )}
      </div>

      <ChevronRight />
    </div>
  )
})

// ── Result Row ────────────────────────────────────────────────────────────────
const ResultRow = memo(({ match, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:shadow-md transition-all cursor-pointer group"
  >
    {/* Series */}
    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2 truncate">
      {match.matchDesc || match.seriesName || ''}
    </p>

    {/* Teams */}
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <img
          src={match.team1?.logo || getTeamFlag(match.team1?.name)}
          alt={match.team1?.name}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate">
          {match.team1?.shortName || match.team1?.name || 'TBA'}
        </span>
        {match.team1?.score && (
          <span className="ml-auto text-xs font-bold text-[#00698c] flex-shrink-0">{match.team1.score}</span>
        )}
      </div>

      <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 flex-shrink-0">VS</span>

      <div className="flex items-center gap-2 flex-1 min-w-0 flex-row-reverse">
        <img
          src={match.team2?.logo || getTeamFlag(match.team2?.name)}
          alt={match.team2?.name}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-gray-600"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate text-right">
          {match.team2?.shortName || match.team2?.name || 'TBA'}
        </span>
        {match.team2?.score && (
          <span className="mr-auto text-xs font-bold text-gray-500 flex-shrink-0">{match.team2.score}</span>
        )}
      </div>
    </div>

    {/* Result */}
    <div className="flex items-center justify-between">
      {match.result && (
        <p className="text-[11px] font-semibold text-[#00698c] truncate flex-1 pr-2">{match.result}</p>
      )}
      <ChevronRight />
    </div>
  </div>
))

// ── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = ({ tab }) => {
const messages = {
  live:     { icon: '📡', text: 'No live matches right now' },
  upcoming: { icon: '📅', text: 'No upcoming fixtures available' },
  recent:   { icon: '🏆', text: 'No recent results available' },
}
  const msg = messages[tab]
  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg py-10 text-center">
      <p className="text-3xl mb-2">{msg.icon}</p>
      <p className="text-sm text-gray-400">{msg.text}</p>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketScoresPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('live')

  const [liveMatches, setLiveMatches]         = useState([])
  const [upcomingMatches, setUpcomingMatches]  = useState([])
  const [recentMatches, setRecentMatches]      = useState([])
  const [loading, setLoading]                  = useState(true)

  const loadAll = useCallback(async () => {
    try {
      const [feeds, fixtures] = await Promise.allSettled([
        getAllMatchFeeds(),
        getFixtures(),
      ])

      if (feeds.status === 'fulfilled' && feeds.value) {
        const data = feeds.value
        setLiveMatches(data.live || data.liveMatches || [])
        setRecentMatches(
          (data.recent || []).filter(
            (m) => m.result || m.status === 'Completed' || m.matchStatus === 'completed'
          )
        )
      }

      if (fixtures.status === 'fulfilled' && fixtures.value) {
        setUpcomingMatches(fixtures.value || [])
      }
    } catch (e) {
      console.error('CricketScoresPage load error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
    // Auto-refresh every 30s for live scores
    const interval = setInterval(loadAll, 30_000)
    return () => clearInterval(interval)
  }, [loadAll])

  const counts = {
    live:     liveMatches.length,
    upcoming: upcomingMatches.length,
    recent:   recentMatches.length,
  }

  const handleMatchClick = (m) => {
    if (m.matchId) navigate(`/cricket/series/${m.seriesId}/scorecard/${m.matchId}/`)
  }

  const skeletonCount = activeTab === 'live' ? 3 : 5

  return (
    <>
      <SectionHeader title="Cricket Scores" />

      <div className="mt-4">
        {/* Tabs */}
       

        {/* Live Tab */}
        {activeTab === 'live' && (
          <div>
           
            {loading ? (
              <div className="space-y-2">
                {[...Array(skeletonCount)].map((_, i) => <SkeletonRow key={i} />)}
              </div>
            ) : liveMatches.length === 0 ? (
              <EmptyState tab="live" />
            ) : (
              <div className="space-y-2">
                {liveMatches.map((m) => (
                  <LiveRow
                    key={m.matchId || m.id}
                    match={m}
                    onClick={() => handleMatchClick(m)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default CricketScoresPage