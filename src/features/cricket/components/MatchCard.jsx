import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTeamFlag } from '../../../service/ipl.api'

// ── helpers ───────────────────────────────────────────────────────────────────
const getTeamName = (team, teamInfo, index) =>
  team?.teamName ||
  team?.name ||
  team?.shortName ||
  teamInfo?.[index]?.name ||
  teamInfo?.[index]?.shortname ||
  'TBA'

const getTeamLogo = (team, teamInfo, index) =>
  team?.logo ||
  team?.imageUrl ||
  teamInfo?.[index]?.imageUrl ||
  getTeamFlag(getTeamName(team, teamInfo, index))

const formatMatchDate = (match) => {
  const raw =
    match?.startDate ||
    match?.date ||
    match?.startTime ||
    match?.dateTimeGMT ||
    null
  if (!raw) return null
  const d = new Date(isNaN(Number(raw)) ? raw : Number(raw))
  return isNaN(d.getTime())
    ? null
    : d.toLocaleString('en-IN', {
        day: 'numeric', month: 'short',
        hour: '2-digit', minute: '2-digit',
      })
}

const StatusBadge = ({ status }) => {
  if (!status) return null
  const isLive    = /live|in.?progress/i.test(status)
  const isPreview = /preview|upcoming/i.test(status)
  if (isLive) return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
      LIVE
    </span>
  )
  if (isPreview) return (
    <span className="text-[10px] font-bold text-[#00698c] bg-[#00698c]/10 px-2 py-0.5 rounded-full flex-shrink-0">
      Preview
    </span>
  )
  return (
    <span className="text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0 truncate max-w-[100px]">
      {status}
    </span>
  )
}

// ── Main Card ─────────────────────────────────────────────────────────────────
const MatchCard = memo(({ match, showScore = false }) => {
  const navigate     = useNavigate()
  const { teamInfo } = match

  const team1Name = getTeamName(match.team1, teamInfo, 0)
  const team2Name = getTeamName(match.team2, teamInfo, 1)
  const team1Logo = getTeamLogo(match.team1, teamInfo, 0)
  const team2Logo = getTeamLogo(match.team2, teamInfo, 1)
  const dateStr   = formatMatchDate(match)

  const venue = match.venue
    ? [match.venue.ground || match.venue.name, match.venue.city].filter(Boolean).join(', ')
    : null

  const handleClick = () => {
    const seriesId = match.seriesId || match.series?.id
    const matchId  = match.matchId  || match.id
    if (seriesId && matchId)
      navigate(`/cricket/series/${seriesId}/scorecard/${matchId}/`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md hover:border-[#00698c]/30 transition-all cursor-pointer group"
    >
      {/* ── Top strip ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700/60">
        <div className="min-w-0 flex-1 pr-3">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 truncate group-hover:text-[#00698c] transition-colors">
            {match.seriesName || match.matchDesc || match.series || ''}
          </p>
          {(venue || dateStr) && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
              {[venue, dateStr].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* ── Teams row ── */}
      <div className="px-20 py-3 flex items-center gap-2">

        {/* Team 1 — left aligned */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img
            src={team1Logo}
            alt={team1Name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-100 dark:border-gray-700"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate leading-tight">
              {team1Name}
            </p>
            {showScore && match.team1?.score && (
              <p className="text-xs font-bold text-[#00698c]">{match.team1.score}</p>
            )}
          </div>
        </div>

        {/* VS center */}
        <div className="flex-shrink-0 flex flex-col items-center gap-0.5 px-1">
          <span className="text-[11px] font-black text-gray-300 dark:text-gray-600 tracking-widest">VS</span>
        </div>

        {/* Team 2 — right aligned */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate leading-tight">
              {team2Name}
            </p>
            {showScore && match.team2?.score && (
              <p className="text-xs font-bold text-gray-400">{match.team2.score}</p>
            )}
          </div>
          <img
            src={team2Logo}
            alt={team2Name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-100 dark:border-gray-700"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

      </div>

      {/* ── Result strip ── */}
      {match.result && (
        <div className="px-4 py-1.5 bg-[#00698c]/5 border-t border-[#00698c]/10">
          <p className="text-[11px] font-semibold text-[#00698c] truncate">{match.result}</p>
        </div>
      )}
    </div>
  )
})

MatchCard.displayName = 'MatchCard'
export default MatchCard