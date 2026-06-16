
import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import {
  IPLBanner, IPLSubTabs, SkeletonList, EmptyState,
} from '../../components/iplshared'
import { getScorecard, getMatchInfo, getAllMatches } from '../../../../service/ipl.api'

// ─── Fall of Wickets ──────────────────────────────────────────────────────────
const FallOfWickets = ({ wickets }) => {
  if (!wickets?.length) return null
  return (
    <div className="mt-3 px-3 sm:px-4 py-2 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Fall of Wickets</p>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {wickets.map((w, i) => (
          <span key={i}>
            {w.batName} {w.wktRuns}/{w.wktNbr} ({w.wktOvr}){i < wickets.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
    </div>
  )
}

// ─── Batting Table ────────────────────────────────────────────────────────────
const BattingTable = ({ innings, onPlayerClick }) => {
  if (!innings) return null
  const { batters = [], bowlers = [], extras, score, wickets, overs, wicketsFall = [] } = innings

  return (
    <div className="mb-6">
      {/* Innings score header */}
      <div className="flex   items-center justify-between bg-[#00698c]/10 z-40 relative dark:bg-[#00698c]/20 px-3 sm:px-4 py-2 border border-gray-200 dark:border-gray-700 mb-0.5">
        <span className="text-xs  font-bold text-gray-600 dark:text-gray-400 z-40 relative">
          {innings.teamName}
        </span>
        <span className="text-sm font-black text-gray-900 dark:text-white">
          {score}/{wickets} <span className="font-normal text-gray-500 text-xs">({overs} Ov)</span>
        </span>
      </div>

      {/* Batting header */}
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-t-0">
        <div className="grid px-3 sm:px-4 py-2" style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 52px' }}>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Batting</span>
          {['R','B','4s','6s','SR'].map(h => (
            <span key={h} className="text-xs font-bold text-gray-600 dark:text-gray-300 text-center">{h}</span>
          ))}
        </div>
      </div>

      {/* Batter rows */}
      <div className="border border-gray-200 dark:border-gray-700 border-t-0">
        {batters.length === 0 ? (
          <div className="px-4 py-3 text-xs text-gray-400 text-center">No batting data</div>
        ) : batters.map((p, idx) => (
          <div
            key={p.id || idx}
            className={`grid px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
              idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
            }`}
            style={{ gridTemplateColumns: '1fr 36px 36px 36px 36px 52px' }}
          >
            <div className="min-w-0 pr-2">
             <button
  onClick={() => onPlayerClick?.(p)}
  className="text-xs sm:text-sm font-semibold text-gray-900 z-40 relative dark:text-white hover:text-[#00698c] transition-colors text-left"
>
  {p.name}
</button>
              {p.dismissal === 'not out'
                ? <p className="text-xs text-green-500 mt-0.5">not out</p>
                : p.dismissal
                  ? <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{p.dismissal}</p>
                  : null
              }
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white text-center self-center">{p.runs}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{p.balls}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{p.fours}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{p.sixes}</span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right self-center">
              {p.strikeRate ? Number(p.strikeRate).toFixed(2) : '0.00'}
            </span>
          </div>
        ))}

        {/* Extras */}
        {extras !== undefined && (
          <div className="flex justify-between px-3 sm:px-4 py-2 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1c2128]">
            <span className="text-xs text-gray-500">Extras</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{extras}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between px-3 sm:px-4 py-2.5 bg-gray-50 dark:bg-[#161b22] font-semibold">
          <span className="text-xs sm:text-sm text-gray-900 dark:text-white">Total</span>
          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">
            {score}/{wickets} ({overs} Ov)
          </span>
        </div>
      </div>

      {/* Fall of wickets */}
      {wicketsFall.length > 0 && <FallOfWickets wickets={wicketsFall} />}

      {/* Bowling */}
    {bowlers?.length > 0 && (
  <BowlingTable
    bowlers={bowlers}
    onPlayerClick={onPlayerClick}
  />
)}
    </div>
  )
}

// ─── Bowling Table ────────────────────────────────────────────────────────────
const BowlingTable = ({ bowlers, onPlayerClick }) => (
  <div className="mt-4">
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg">
      <div className="grid px-3 sm:px-4 py-2" style={{ gridTemplateColumns: '1fr 40px 36px 36px 40px 52px' }}>
        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Bowler</span>
        {['O','M','R','W','ECO'].map(h => (
          <span key={h} className="text-xs font-bold text-gray-600 dark:text-gray-300 text-center">{h}</span>
        ))}
      </div>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {bowlers.map((b, idx) => (
        <div
          key={b.id || idx}
          className={`grid px-3 sm:px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
            idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
          }`}
          style={{ gridTemplateColumns: '1fr 40px 36px 36px 40px 52px' }}
        >
   <button
  onClick={() => onPlayerClick?.(b)}
  className="text-xs sm:text-sm text-gray-900 dark:text-white truncate pr-2 self-center text-left hover:text-[#00698c] transition-colors"
>
  {b.name}
</button>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.overs}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.maidens}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center self-center">{b.runs}</span>
          <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white text-center self-center">{b.wickets}</span>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right self-center">
            {b.economy ? Number(b.economy).toFixed(2) : '0.00'}
          </span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Match Selector ───────────────────────────────────────────────────────────
const MatchSelector = ({ matches, selectedId, onSelect }) => {
  if (!matches?.length) return null

  // Group by status for better UX
  const live     = matches.filter(m => m.type === 'Live')
  const recent   = matches.filter(m => m.type === 'Recent')
  const upcoming = matches.filter(m => m.type === 'Upcoming')
  const ordered  = [...live, ...recent, ...upcoming]

  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <div className="px-3 sm:px-4 py-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Select Match</span>
        <span className="text-[10px] text-gray-400">{matches.length} matches</span>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {ordered.map((m) => {
            const t1 = m?.team1?.shortName || 'T1'
            const t2 = m?.team2?.shortName || 'T2'
            const isSelected = String(selectedId) === String(m.matchId)
            const isLive = m.type === 'Live'
            return (
              <button
                key={m.matchId}
                onClick={() => m.type !== 'Upcoming' && onSelect(m.matchId)}
                disabled={m.type === 'Upcoming'}
                className={`flex-shrink-0 px-3 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'border-[#00698c] text-[#00698c] bg-[#00698c]/5'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <span className="flex items-center gap-1">
                  {isLive && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                  <span className="font-bold">{t1}</span>
                  <span className="text-gray-400 text-[10px]">vs</span>
                  <span className="font-bold">{t2}</span>
                </span>
                <span className={`text-[10px] ${
                  isLive ? 'text-red-400' : m.type === 'Recent' ? 'text-emerald-500' : 'text-gray-400'
                }`}>
                  {m.matchDesc || m.type}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Live refresh indicator ───────────────────────────────────────────────────
const LiveBadge = ({ isLive, lastUpdated }) => {
  if (!isLive) return null
  return (
    <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
      LIVE
      {lastUpdated && (
        <span className="text-gray-400 font-normal ml-1">
          · Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const IPLScorecardPage = () => {
  const { matchId } = useParams()
  const navigate    = useNavigate()

  const [scorecard,     setScorecard]     = useState(null)
  const [matchInfo,     setMatchInfo]     = useState(null)
  const [allMatches,    setAllMatches]    = useState([])
  const [activeInnings, setActiveInnings] = useState(0)
  const [loading,       setLoading]       = useState(true)
  const [lastUpdated,   setLastUpdated]   = useState(null)
  const pollTimer = useRef(null)

  const getSlug = (name = '') =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const navigateToPlayer = (player) => {
  if (!player?.name) return

  navigate(
    `/cricket/player/${getSlug(player.name)}`,
    {
      state: {
        player: {
          playerId: player.id,
          name: player.name,
        },
      },
    }
  )
}

  const isLive = matchInfo?.type === 'Live' || matchInfo?.state === 'In Progress'

  // ── Load match data ────────────────────────────────────────────────────────
const loadMatch = useCallback(async (id) => {
  if (!id) return
  try {
    const [sc, info, matches] = await Promise.allSettled([
      getScorecard(id),
      getMatchInfo(id),
      getAllMatches(),
    ])
    if (sc.status      === 'fulfilled') setScorecard(sc.value)
    if (info.status    === 'fulfilled') setMatchInfo(info.value)
    if (matches.status === 'fulfilled') setAllMatches(matches.value || [])

    // ← ADD THIS: status from scorecard if matchInfo doesn't have result
    if (sc.status === 'fulfilled' && sc.value?.status) {
      setMatchInfo(prev => prev
        ? { ...prev, result: prev.result || sc.value.status }
        : { result: sc.value.status }
      )
    }

    setLastUpdated(new Date())
  } catch { /* silent */ } finally {
    setLoading(false)
  }
}, [])

  // ── Initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true)
    setScorecard(null)
    setMatchInfo(null)
    setActiveInnings(0)
    loadMatch(matchId)
  }, [matchId, loadMatch])

  // ── Live polling: refresh scorecard every 2 min if match is live ──────────
  useEffect(() => {
    clearInterval(pollTimer.current)
    if (isLive && matchId) {
      pollTimer.current = setInterval(() => loadMatch(matchId), 2 * 60 * 1000)
    }
    return () => clearInterval(pollTimer.current)
  }, [isLive, matchId, loadMatch])

  const innings = scorecard?.innings || []
  const inning  = innings[activeInnings]
  const t1Name  = matchInfo?.team1?.name || innings[0]?.teamName || 'Team 1'
  const t2Name  = matchInfo?.team2?.name || innings[1]?.teamName || 'Team 2'
  const pageTitle = matchInfo
    ? `${matchInfo.team1?.shortName || t1Name} vs ${matchInfo.team2?.shortName || t2Name} Scorecard | IPL 2025`
    : 'Scorecard | IPL 2025 | SportyRadar'

  return (
    <>
      

              {/* Match title bar */}
              {matchInfo && (
                <div className="bg-[#004d66] dark:bg-[#003344] text-white px-3 sm:px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-medium">
                    {t1Name} vs {t2Name}
                    {matchInfo.matchDesc ? `, ${matchInfo.matchDesc}` : ', IPL 2025'}
                  </p>
                  <LiveBadge isLive={isLive} lastUpdated={lastUpdated} />
                </div>
              )}

              {/* Match meta */}
              {matchInfo && (
                <div className="px-3 sm:px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
                    {matchInfo.venue && <>
                      <span className="text-xs font-semibold text-gray-400">Venue</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200">{matchInfo.venue}</span>
                    </>}
                    {matchInfo.city && <>
                      <span className="text-xs font-semibold text-gray-400">City</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200">{matchInfo.city}</span>
                    </>}
                    {scorecard?.toss && <>
                      <span className="text-xs font-semibold text-gray-400">Toss</span>
                      <span className="text-xs text-gray-800 dark:text-gray-200">{scorecard.toss}</span>
                    </>}
                    {matchInfo.result && <>
                      <span className="text-xs font-semibold text-gray-400">Result</span>
                      <span className="text-xs font-bold text-[#00698c]">{matchInfo.result}</span>
                    </>}
                    {scorecard?.playerOfMatch?.name && <>
                      <span className="text-xs font-semibold text-gray-400">Player of Match</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        ⭐ {scorecard.playerOfMatch.name}
                      </span>
                    </>}
                  </div>
                </div>
              )}

              <div className="p-3 sm:p-4 z-40 relative">
                {/* Match selector */}
                <MatchSelector
                  matches={allMatches}
                  selectedId={matchId}
                  onSelect={(id) => navigate(`/cricket/series/${seriesId}/scorecard/${id}/`)}
                />

                {loading ? (
                  <SkeletonList count={6} />
                ) : !scorecard ? (
                  <EmptyState
                    message={isLive
                      ? "Scorecard loading... match is live, retry in 2 minutes"
                      : "Scorecard not available yet"
                    }
                    icon="📋"
                  />
                ) : innings.length === 0 ? (
                  <EmptyState message="No innings data found" icon="🏏" />
                ) : (
                  <>
                    {/* Innings tabs */}
                    <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                      {innings.map((inn, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveInnings(idx)}
                          className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                            idx > 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''
                          } ${
                            activeInnings === idx
                              ? 'bg-[#00698c] text-white'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="hidden sm:inline">{inn.teamName || (idx === 0 ? t1Name : t2Name)} — </span>
                          <span>{inn.score}/{inn.wickets}</span>
                          <span className="hidden sm:inline text-[10px] opacity-70 ml-1">({inn.overs} ov)</span>
                        </button>
                      ))}
                    </div>

                    {/* Scorecard content */}
                  {inning && (
  <BattingTable
    innings={inning}
    onPlayerClick={navigateToPlayer}
  />
)}
                  </>
                )}
              </div>
          

    </>
  )
}

export default IPLScorecardPage

