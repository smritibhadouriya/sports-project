// CricketTeamDetailPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllTeams, getTeamPlayersById } from '../../../service/ipl.api'

const getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// ── Role badge ────────────────────────────────────────────────────────────────
const getRoleBadge = (role) => {
  if (!role) return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
  const r = role.toLowerCase()
  if (r === 'batsman')            return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  if (r === 'bowler')             return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  if (r === 'batting allrounder') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  if (r === 'bowling allrounder') return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
  if (r === 'wk-batsman')         return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  if (r.includes('allrounder'))   return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  if (r.includes('wk'))           return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
}

// ── Team Avatar: flag → logo → initials ───────────────────────────────────────
const TeamAvatar = ({ team, size = 'md' }) => {
  const [imgSrc, setImgSrc] = useState(team?.flag || team?.logo || null)
  const [failed, setFailed]  = useState(false)

  const sizeClass = size === 'lg' ? 'w-16 h-16 text-lg'
    : size === 'sm' ? 'w-9 h-9 text-xs'
    : 'w-12 h-12 text-sm'

  const handleError = () => {
    if (imgSrc === team?.flag && team?.logo && team.logo !== team?.flag) {
      setImgSrc(team.logo)
    } else {
      setImgSrc(null)
      setFailed(true)
    }
  }

  if (!imgSrc || failed) {
    const initials = (team?.shortName || team?.name || '?')
      .split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-br from-[#00698c] to-[#0088b0] flex items-center justify-center font-bold text-white flex-shrink-0`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={team?.name}
      onError={handleError}
      className={`${sizeClass} rounded-full object-cover flex-shrink-0 border-2 border-[#00698c]/30 dark:border-[#00698c]/40 shadow-sm`}
    />
  )
}

// ── Player Card (horizontal row — image left, name right) ─────────────────────
const PlayerCard = ({ player, onClick, index }) => (
  <button
    onClick={() => onClick(player)}
    style={{ animationDelay: `${index * 40}ms` }}
    className="flex flex-row items-center gap-4 w-full px-4 py-3 bg-white dark:bg-[#1c2128] border border-gray-100 dark:border-gray-700/60 rounded-2xl shadow-sm hover:shadow-md hover:border-[#00698c]/40 hover:-translate-y-0.5 transition-all duration-200 text-left group animate-fade-in"
  >
    {/* Avatar — left side */}
    <div className="relative flex-shrink-0">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-yellow-100 to-purple-200 dark:from-yellow-900/30 dark:to-purple-900/30 border-2 border-gray-100 dark:border-gray-700 group-hover:border-[#00698c]/50 transition-colors duration-200">
        {player.imageUrl ? (
          <img
            src={player.imageUrl}
            alt={player.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      {player.jerseyNumber && (
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00698c] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-[#1c2128]">
          {player.jerseyNumber}
        </span>
      )}
    </div>

    {/* Name + Role — right side */}
    <div className="flex flex-col gap-1 min-w-0">
      <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-[#00698c] transition-colors duration-200 truncate">
        {player.name}
      </p>
      {player.role ? (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium self-start ${getRoleBadge(player.role)}`}>
          {player.role}
        </span>
      ) : null}
    </div>
  </button>
)

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex flex-row items-center gap-4 w-full px-4 py-3 bg-white dark:bg-[#1c2128] border border-gray-100 dark:border-gray-700/60 rounded-2xl animate-pulse">
    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-1/3" />
    </div>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketTeamDetailPage = () => {
  const { teamId, seriesId } = useParams()
  const navigate = useNavigate()

  const [team, setTeam]       = useState(null)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const allTeams = await getAllTeams()
        const found    = allTeams.find(t => String(t.teamId) === String(teamId))
        setTeam(found || null)

        const teamPlayers = await getTeamPlayersById(teamId)
        setPlayers(Array.isArray(teamPlayers) ? teamPlayers : [])
      } catch (err) {
        console.error(err)
        setPlayers([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [teamId])

  const handlePlayerClick = (player) => {
    navigate(
      `/cricket/player/${getSlug(player.name)}`,
      { state: { player, teamName: team?.name || '' } }
    )
  }

  const handleBack = () => {
    if (seriesId) navigate(`/cricket/series/${seriesId}/teams`)
    else navigate('/cricket/teams')
  }

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {loading ? (
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
        ) : (
          <TeamAvatar team={team} size="md" />
        )}

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-1.5">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-36 animate-pulse" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full w-20 animate-pulse" />
            </div>
          ) : (
            <>
              <h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight truncate">
                {team?.name || 'Team'}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {players.length} {players.length === 1 ? 'player' : 'players'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-5" />

      {/* ── Player List ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : players.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No players found</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This team has no registered players yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {players.map((p, i) => (
            <PlayerCard
              key={p.playerId || p.id || p.name}
              player={p}
              onClick={handlePlayerClick}
              index={i}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease both; }
      `}</style>
    </div>
  )
}

export default CricketTeamDetailPage