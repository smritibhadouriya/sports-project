import { useState, useEffect, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '@/shared/components/SectionHeader'
import { getAllMatchFeeds, getTeamFlag, getFixtures, getSeries } from '../../../service/ipl.api'

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
  </svg>
)
const LocationIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  </svg>
)

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = ({ height = 'h-32' }) => (
  <div className={`bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden animate-pulse ${height}`} />
)

// ── Section Title with "View All" ─────────────────────────────────────────────
const SectionTitle = ({ title, to, onNavigate }) => (
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{title}</h3>
    <button
      onClick={() => onNavigate(to)}
      className="flex items-center gap-1 text-xs font-semibold text-[#00698c] hover:underline"
    >
      View All <ChevronRight />
    </button>
  </div>
)

// ── Live Match Card ───────────────────────────────────────────────────────────
const LiveCard = memo(({ match, onClick }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-80 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer snap-start"
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-[#00698c] to-[#0088b0] px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-white">LIVE</span>
      </div>
      <span className="text-[11px] text-white/80 font-medium truncate max-w-[160px]">
        {match.matchDesc || match.seriesName || ''}
      </span>
    </div>

    <div className="p-3">
      {/* Team 1 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={match.team1?.logo || getTeamFlag(match.team1?.name)}
            alt={match.team1?.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="text-sm font-bold text-gray-800 dark:text-white">
            {match.team1?.shortName || match.team1?.name || 'TBA'}
          </span>
        </div>
        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
          {match.team1?.score || '—'}
        </span>
      </div>

      {/* Team 2 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={match.team2?.logo || getTeamFlag(match.team2?.name)}
            alt={match.team2?.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="text-sm font-bold text-gray-800 dark:text-white">
            {match.team2?.shortName || match.team2?.name || 'TBA'}
          </span>
        </div>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
          {match.team2?.score || '—'}
        </span>
      </div>

      {/* Status */}
      {(match.status || match.statusNote) && (
        <p className="text-[11px] font-semibold text-[#00698c] border-t border-gray-100 dark:border-gray-700 pt-2 leading-tight">
          {match.status || match.statusNote}
        </p>
      )}
    </div>
  </div>
))

// ── Upcoming Match Row ────────────────────────────────────────────────────────
const UpcomingRow = memo(({ match, onClick }) => {
  const rawDate = match.date || match.startTime
  const dateObj = rawDate ? new Date(rawDate) : null
  const dayStr = dateObj
    ? dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    : ''
  const timeStr = dateObj
    ? dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : ''

  const team1 = match.team1?.name || match.team1?.shortName || match.teamInfo?.[0]?.shortname || 'TBA'
  const team2 = match.team2?.name || match.team2?.shortName || match.teamInfo?.[1]?.shortname || 'TBA'
  const team1Logo = match.team1?.logo || getTeamFlag(match.team1?.name)
  const team2Logo = match.team2?.logo || getTeamFlag(match.team2?.name)
  const subtitle = match.seriesName || match.matchDesc || ''

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3 hover:shadow-md hover:border-[#00698c]/30 transition-all cursor-pointer group"
    >
      {/* Date / time chip */}
      {dateObj && (
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 py-1.5 rounded-lg bg-[#00698c]/5 dark:bg-[#00698c]/10 border border-[#00698c]/10">
          <span className="text-[11px] font-bold text-[#00698c] leading-tight">{dayStr}</span>
          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{timeStr}</span>
        </div>
      )}

      {/* Teams */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={team1Logo}
            alt={team1}
            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors truncate">
            {team1}
          </span>
          <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">vs</span>
          <img
            src={team2Logo}
            alt={team2}
            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors truncate">
            {team2}
          </span>
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{subtitle}</p>
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
    className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:shadow-md transition-shadow cursor-pointer group"
  >
    <div className="flex items-center justify-between mb-1.5">
      <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
        <img
          src={match.team1?.logo || getTeamFlag(match.team1?.name)}
          alt={match.team1?.name}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate">
          {match.team1?.shortName || match.team1?.name || 'TBA'}
        </span>
        {match.team1?.score && (
          <span className="ml-auto text-xs font-bold text-[#00698c]">{match.team1.score}</span>
        )}
      </div>
      <span className="text-[10px] font-bold text-gray-400 px-2 flex-shrink-0">VS</span>
      <div className="flex items-center gap-2 flex-1 min-w-0 pl-2 justify-end">
        {match.team2?.score && (
          <span className="mr-auto text-xs font-bold text-gray-500">{match.team2.score}</span>
        )}
        <span className="text-sm font-bold text-gray-800 dark:text-white truncate">
          {match.team2?.shortName || match.team2?.name || 'TBA'}
        </span>
        <img
          src={match.team2?.logo || getTeamFlag(match.team2?.name)}
          alt={match.team2?.name}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
    </div>
    {match.result && (
      <p className="text-[11px] font-semibold text-[#00698c] truncate">{match.result}</p>
    )}
  </div>
))

// ── Series Row ────────────────────────────────────────────────────────────────
const SeriesRowHome = memo(({ series, isOngoing, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-[#1c2128] rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group border ${
      isOngoing ? 'border-[#00698c]/50' : 'border-gray-200 dark:border-gray-700 hover:border-[#00698c]/30'
    }`}
  >
    <div className="min-w-0 flex-1 pr-4">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors truncate">
          {series.name}
        </p>
        {isOngoing && (
          <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
      </div>
    </div>
    <ChevronRight />
  </div>
))

// ── Quick Nav Pills ───────────────────────────────────────────────────────────
const QuickNav = ({ navigate }) => {
  const items = [
    { label: '🔴 Live', to: '/cricket/live' },
    { label: '📅 Fixtures', to: '/cricket/fixtures' },
    { label: '🏆 Results', to: '/cricket/results' },
    { label: '📋 Series', to: '/cricket/series' },
  ]
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-6">
      {items.map((item) => (
        <button
          key={item.to}
          onClick={() => navigate(item.to)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 hover:border-[#00698c] hover:text-[#00698c] transition-colors whitespace-nowrap"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

// ── Hero Banner ───────────────────────────────────────────────────────────────
const HeroBanner = () => (
  <div className="bg-gradient-to-r from-[#00698c] to-[#0088b0] rounded-xl p-5 mb-6 relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
    <div className="absolute -bottom-4 -right-2 w-20 h-20 bg-white/5 rounded-full" />
    <div className="relative z-10">
      <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Welcome to</p>
      <h2 className="text-white text-2xl font-black mb-1">Cricket Hub 🏏</h2>
      <p className="text-white/70 text-sm font-medium">
        Live scores, fixtures, results & more — all in one place
      </p>
    </div>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketHomePage = () => {
  const navigate = useNavigate()

  const [liveMatches, setLiveMatches]       = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [recentMatches, setRecentMatches]   = useState([])
  const [featuredSeries, setFeaturedSeries] = useState([])
  const [loading, setLoading]               = useState(true)

  const loadAll = useCallback(async () => {
    try {
      const [feeds, fixtures, seriesData] = await Promise.allSettled([
        getAllMatchFeeds(),
        getFixtures(),
        getSeries(),
      ])

      // ── Live & Recent from feeds ──────────────────────────────────────────
      if (feeds.status === 'fulfilled' && feeds.value) {
        const data = feeds.value
        const live = (data.live || data.liveMatches || []).slice(0, 5)
        setLiveMatches(live)

        const recent = (data.recent || [])
          .filter((m) => m.result || m.status === 'Completed' || m.matchStatus === 'completed')
          .slice(0, 5)
        setRecentMatches(recent)
      }

      // ── Upcoming from fixtures ────────────────────────────────────────────
      if (fixtures.status === 'fulfilled' && fixtures.value) {
        setUpcomingMatches((fixtures.value || []).slice(0, 5))
      }

      // ── Featured series ───────────────────────────────────────────────────
      if (seriesData.status === 'fulfilled' && seriesData.value) {
        const raw =
          seriesData.value?.data?.seriesMapProto ||
          seriesData.value?.seriesMapProto ||
          (Array.isArray(seriesData.value) ? seriesData.value : [])

        const now = Date.now()
        const allSeries = raw.flatMap((g) => g.series || [])
        const ongoing = allSeries.filter(
          (s) => Number(s.startDt) <= now && Number(s.endDt) >= now
        )
        const upcoming = allSeries
          .filter((s) => Number(s.startDt) > now)
          .sort((a, b) => Number(a.startDt) - Number(b.startDt))

        setFeaturedSeries([...ongoing, ...upcoming].slice(0, 5))
      }
    } catch (e) {
      console.error('CricketHomePage load error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const now = Date.now()

  return (
    <>
      <SectionHeader title="Cricket" />

      <div className="mt-4">
     

        {/* ── LIVE MATCHES ───────────────────────────────────────────────── */}
        <div className="mb-8">
          <SectionTitle title="🔴 Live Now" to="/cricket/live" onNavigate={navigate} />
          {loading ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-72 h-36 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : liveMatches.length === 0 ? (
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg py-8 text-center">
              <p className="text-2xl mb-2">🏏</p>
              <p className="text-sm text-gray-400">No live matches right now</p>
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-none">
              {liveMatches.map((m) => (
                <LiveCard
                  key={m.matchId || m.id}
                  match={m}
                  onClick={() => m.matchId && navigate(`/cricket/series/${m.seriesId}/scorecard/${m.matchId}/`)}
                />
              ))}
            </div>
          )}
        </div>
             {/* ── RECENT RESULTS ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <SectionTitle title="🏆 Recent Results" to="/cricket/results" onNavigate={navigate} />
          {loading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} height="h-20" />)}
            </div>
          ) : recentMatches.length === 0 ? (
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg py-6 text-center">
              <p className="text-sm text-gray-400">No recent results</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentMatches.map((m) => (
                <ResultRow
                  key={m.matchId || m.id}
                  match={m}
                  onClick={() => m.matchId && navigate(`/cricket/series/${m.seriesId}/scorecard/${m.matchId}/`)}
                />
              ))}
            </div>
          )}
        </div>


 {/* ── UPCOMING FIXTURES ──────────────────────────────────────────── */}
<div className="mb-8">
  <SectionTitle title="📅 Upcoming Fixtures" to="/cricket/fixtures" onNavigate={navigate} />
  {loading ? (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => <SkeletonCard key={i} height="h-20" />)}
    </div>
  ) : upcomingMatches.length === 0 ? (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg py-6 text-center">
      <p className="text-sm text-gray-400">No upcoming fixtures</p>
    </div>
  ) : (
    <div className="space-y-2">
      {upcomingMatches.map((m) => (
        <ResultRow
          key={m.id || m.matchId}
          match={m}
          onClick={() => m.matchId && navigate(`/cricket/series/${m.seriesId}/scorecard/${m.matchId}/`)}
        />
      ))}
    </div>
  )}
</div>
   
        {/* ── FEATURED SERIES ────────────────────────────────────────────── */}
        <div className="mb-8">
          <SectionTitle title="📋 Featured Series" to="/cricket/series" onNavigate={navigate} />
          {loading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} height="h-14" />)}
            </div>
          ) : featuredSeries.length === 0 ? (
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg py-6 text-center">
              <p className="text-sm text-gray-400">No series available</p>
            </div>
          ) : (
            <div className="space-y-2">
              {featuredSeries.map((s) => {
                const isOngoing = Number(s.startDt) <= now && Number(s.endDt) >= now
                return (
                  <SeriesRowHome
                    key={s.id}
                    series={s}
                    isOngoing={isOngoing}
                    onClick={() => navigate(`/cricket/series/${s.id}/matches`)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CricketHomePage