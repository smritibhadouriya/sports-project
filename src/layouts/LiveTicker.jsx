import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMatches } from '../service/ipl.api'

const LIVE_POLL_MS = 2 * 60 * 1000
const STATIC_POLL_MS = 10 * 60 * 1000

const ALLOWED_SERIES = [
  'indian premier league',
  'ipl',
  'icc world test championship',
  'icc cricket world cup',
  'icc t20 world cup',
  'icc odi world cup',
  'icc champions trophy',
  'icc mens',
  'icc womens',
  't20 world cup',
  'odi world cup',
  'champions trophy',
  'world test championship',
  'big bash',
  'bbl',
  'psl',
  'cpl',
  'sa20',
  'hundred',
  't20 blast',
  'ilt20',
  'bpl',
  'lpl',
  // ── International teams (standalone, no "vs" required) ──
  'india',
  'australia',
  'england',
  'pakistan',       // ← Pakistan series ab match hoga
  'south africa',
  'new zealand',
  'west indies',
  'sri lanka',
  'bangladesh',     // ← Bangladesh series ab match hoga
  'afghanistan',
  'zimbabwe',
]

// Aur ek BLOCKED_SERIES add karo — ye override karega ALLOWED_SERIES ko
const BLOCKED_SERIES = [
  'world cup league',
  'world cup qualifier',
  'world cup super league',
  'cricket world cup league',
  'u19',
  'under-19',
  'under 19',
  'u-19',
  'emerging',
  ' a tour',        // space pehle — "a tour" exact match, "sa20" safe
  ' a vs ',
  'regional',
]

const TeamLogo = memo(({ logo, name }) =>
  logo ? (
    <img
      src={logo}
      alt={name}
      className="w-10 h-10 object-cover rounded-full border-2 border-white/30 shadow-md"
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white">
      {(name || '?').slice(0, 2).toUpperCase()}
    </div>
  )
)

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

//////////////////////////////////////////////////////
// getMatchType same rahega, bas TickerCard mein label change karo

const getLiveLabel = (match) => {
  const state = (match.state || match.status || '').toLowerCase()
  
  if (state.includes('stumps'))        return { text: 'STUMPS',        color: 'text-yellow-400' }
  if (state.includes('innings break') || state.includes('ings break'))  
                                        return { text: 'INNINGS BREAK', color: 'text-orange-400' }
  if (state.includes('drinks'))        return { text: 'DRINKS',         color: 'text-blue-300' }
  if (state.includes('rain') || state.includes('bad light'))            
                                        return { text: 'RAIN DELAY',    color: 'text-gray-400' }
  if (state.includes('lunch'))         return { text: 'LUNCH',          color: 'text-orange-300' }
  if (state.includes('tea'))           return { text: 'TEA',            color: 'text-orange-300' }
  
  // Default — actual live play
  return { text: 'LIVE', color: 'text-red-400' }
}
///////////////////////////////////////////


const isRecentMatch = (match) => {
  if (match.status === 'Completed' || match.matchStatus === 'completed') return true
  if (match.result) return true
  if (match.state && match.state.toLowerCase().includes('won')) return true
  if (match.startDate && new Date(match.startDate) < new Date()) return true
  return false
}

const isImportantMatch = (match) => {
  if (!match) return false
  const name = (match.seriesName || match.matchDesc || match.series || '').toLowerCase()
  // Pehle block check karo
  if (BLOCKED_SERIES.some((b) => name.includes(b))) return false
  // Phir allow check karo
  return ALLOWED_SERIES.some((s) => name.includes(s))
}
const TickerCard = memo(({ match, onClick }) => {
  const matchType = getMatchType(match)
  const isLive = matchType === 'Live'
  const isRecent = matchType === 'Recent'
  const isUpcoming = matchType === 'Upcoming'

  const dateStr = match.startDate
    ? new Date(match.startDate).toLocaleString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="
        flex-shrink-0
        w-[85vw] sm:w-96 md:w-[420px] lg:w-[440px] xl:w-[460px]
        flex flex-col rounded-xl p-4
        bg-gradient-to-br from-[#002F3F] to-[#001e2b]
        border border-white/10 shadow-md cursor-pointer
        hover:opacity-90 hover:border-white/20
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#3ab4d4]/50
      "
    >
      <div className="h-7 flex items-center gap-2 mb-3">
     {isLive && (() => {
  const { text, color } = getLiveLabel(match)
  const isActuallyLive = text === 'LIVE'
  return (
    <span className={`flex items-center gap-1.5 text-sm font-extrabold tracking-wide ${color}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${isActuallyLive ? 'bg-red-500 animate-pulse' : 'bg-yellow-400'}`} />
      {text}
    </span>
  )
})()}
        {isUpcoming && (
          <span className="text-sm text-[#3ab4d4] font-extrabold tracking-wide">Upcoming</span>
        )}
        {isRecent && (
          <span className="text-sm text-emerald-400 font-extrabold tracking-wide">Recent</span>
        )}
      </div>

      <div className="h-9 mb-4">
        <p className="text-base font-black text-white leading-tight line-clamp-2 tracking-wide">
          {match.seriesName || match.matchDesc || match.series || 'IPL 2025'}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamLogo logo={match.team1?.logo} name={match.team1?.shortName || match.team1?.name} />
          <span className="text-sm font-extrabold text-white/90 text-center line-clamp-1 tracking-wide">
            {match.team1?.shortName || match.team1?.name || 'TBA'}
          </span>
          {(isLive || isRecent) && match.team1?.score && (
            <span className="text-xs font-bold text-[#3ab4d4]">{match.team1.score}</span>
          )}
        </div>

        <div className="flex items-center justify-center w-14">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="text-white/70">
            <line x1="25" y1="8" x2="12" y2="44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <text x="9" y="26" fill="currentColor" fontSize="20" fontWeight="600" fontStyle="italic" dominantBaseline="middle" textAnchor="middle">v</text>
            <text x="25" y="26" fill="currentColor" fontSize="20" fontWeight="600" fontStyle="italic" dominantBaseline="middle" textAnchor="middle">s</text>
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamLogo logo={match.team2?.logo} name={match.team2?.shortName || match.team2?.name} />
          <span className="text-sm font-extrabold text-white/90 text-center line-clamp-1 tracking-wide">
            {match.team2?.shortName || match.team2?.name || 'TBA'}
          </span>
          {(isLive || isRecent) && match.team2?.score && (
            <span className="text-xs font-bold text-[#3ab4d4]">{match.team2.score}</span>
          )}
        </div>
      </div>

      <div className="h-10 flex items-center justify-between pt-3 border-t border-white/10 mt-4">
        {isLive && (
          <div className="flex items-center justify-between w-full gap-3">
            {match.team1?.status ? (
              <span className="text-xs font-bold text-white/70 truncate flex-1 tracking-wide">
                {match.team1.status}
              </span>
            ) : (match.result || match.state) ? (
              <span className="text-xs font-bold text-red-400 truncate flex-1 tracking-wide animate-pulse">
                {match.result || match.state}
              </span>
            ) : null}
            {match.team2?.score && (
              <span className="text-sm font-black text-white flex-shrink-0 tracking-wide">
                {match.team2.score}
              </span>
            )}
          </div>
        )}

        {isUpcoming && (
          <span className="text-sm font-bold text-white/60 w-full text-center truncate tracking-wide">
            {dateStr}
          </span>
        )}

        {isRecent && (
          <span className="text-sm font-extrabold text-emerald-400/90 w-full text-center leading-tight line-clamp-2 tracking-wide">
            {match.result || 'Match Completed'}
          </span>
        )}
      </div>
    </div>
  )
})

const LiveTicker = memo(() => {
  const [data, setData] = useState({ live: [], recent: [], upcoming: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pollTimer = useRef(null)
  const navigate = useNavigate()

  const fetchAll = useCallback(async () => {
    try {
      setError(null)
      const result = await getAllMatches()

      let liveMatches = result.live || []
      let recentMatches = result.recent || []
      let upcomingMatches = result.upcoming || []

      liveMatches = liveMatches.filter(isImportantMatch)
      recentMatches = recentMatches.filter(isImportantMatch)
      upcomingMatches = upcomingMatches.filter(isImportantMatch)

      if (upcomingMatches.length > 0) {
        const fromUpcomingRecent = upcomingMatches.filter(isRecentMatch)
        const fromUpcomingFuture = upcomingMatches
          .filter((m) => !isRecentMatch(m))
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

        const merged = [...recentMatches, ...fromUpcomingRecent]
        const seenKeys = new Set()
        recentMatches = merged.filter((m) => {
          const key = m.matchId || m.id
          if (!key || seenKeys.has(key)) return false
          seenKeys.add(key)
          return true
        })

        upcomingMatches = fromUpcomingFuture
      }

      const hasLive = liveMatches.length > 0

      setData({
        live: liveMatches,
        recent: hasLive ? recentMatches : recentMatches.slice(0, 8),
        upcoming: hasLive ? upcomingMatches : upcomingMatches.slice(0, 8),
      })
    } catch (err) {
      console.error('[LiveTicker] fetch error:', err.message)
      setError('Unable to load matches. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  useEffect(() => {
    clearInterval(pollTimer.current)
    const hasLive = data.live.length > 0
    pollTimer.current = setInterval(fetchAll, hasLive ? LIVE_POLL_MS : STATIC_POLL_MS)
    return () => clearInterval(pollTimer.current)
  }, [data.live.length, fetchAll])

  const orderedMatches = [
    ...data.live,
    ...data.recent,
    ...data.upcoming,
  ]

  const seen = new Set()
  const deduped = orderedMatches.filter((m) => {
    const key = m.matchId || m.id
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })

  const handleClick = (match) => {
    const matchType = getMatchType(match)
    if (!match.matchId) {
      navigate('/cricket/ipl')
      return
    }
    if (matchType === 'Upcoming') {
      navigate('/cricket/ipl/matches')
    } else {
      navigate(`/cricket/series/${match.seriesId}/scorecard/${match.matchId}/`)
    }
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
    

        <div className="flex items-center gap-4 py-3">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-2">
              {loading && [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85vw] sm:w-96 md:w-[420px] lg:w-[440px] xl:w-[460px] h-52 rounded-xl bg-white/5 animate-pulse"
                />
              ))}

              {!loading && error && (
                <div className="flex items-center gap-2 text-white/50 text-sm font-bold py-4 px-2">
                  <span>{error}</span>
                  <button
                    onClick={fetchAll}
                    className="text-[#3ab4d4] underline text-xs"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && deduped.length === 0 && (
                <p className="text-white/50 text-sm font-bold py-4 px-2">
                  No matches found
                </p>
              )}

              {!loading && !error && deduped.map((match) => (
                <TickerCard
                  key={match.matchId || match.id}
                  match={match}
                  onClick={() => handleClick(match)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

LiveTicker.displayName = 'LiveTicker'
TickerCard.displayName = 'TickerCard'
TeamLogo.displayName = 'TeamLogo'

export default LiveTicker