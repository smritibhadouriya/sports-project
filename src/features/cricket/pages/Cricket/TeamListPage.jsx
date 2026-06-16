import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getSeriesTeams, getTeamPlayersById } from '../../../../service/ipl.api'
import { useParams } from 'react-router-dom'

const getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// ─── RoleBadge ────────────────────────────
// Works with normalized short codes: BAT / BOWL / ALL / WK
const RoleBadge = ({ role }) => {
  const r = (role || '').toUpperCase()
  let label = role || '—', cls = 'bg-gray-100 dark:bg-gray-800 text-gray-400'
  if (r === 'WK')   { label = 'WK';   cls = 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' }
  else if (r === 'ALL')  { label = 'ALL';  cls = 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' }
  else if (r === 'BOWL') { label = 'BOWL'; cls = 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' }
  else if (r === 'BAT')  { label = 'BAT';  cls = 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' }
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${cls}`}>{label}</span>
}

// ─── PlayerRow ────────────────────────────
const PlayerRow = ({ player, onClick }) => (
  <button
    onClick={() => onClick(player)}
    className="w-full flex items-center gap-3 p-3 z-40 relative sm:p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-[#00698c]/40 transition-all duration-200 text-left group"
  >
    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-100 to-purple-200 dark:from-yellow-900/30 dark:to-purple-900/30 border border-gray-100 dark:border-gray-700">
      {player.imageUrl ? (
        <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" loading="lazy"
          onError={e => { e.target.onerror = null; e.target.style.display = 'none' }} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate group-hover:text-[#00698c] dark:group-hover:text-[#4dd0ff] transition-colors">
          {player.name}
        </h4>
        <RoleBadge role={player.role} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
        {player.battingStyle && player.battingStyle !== '—' ? player.battingStyle : ''}
        {player.battingStyle && player.battingStyle !== '—' && player.bowlingStyle && player.bowlingStyle !== '—' ? ' · ' : ''}
        {player.bowlingStyle && player.bowlingStyle !== '—' ? player.bowlingStyle : ''}
        {(!player.battingStyle || player.battingStyle === '—') && (!player.bowlingStyle || player.bowlingStyle === '—') ? '—' : ''}
      </p>
    </div>
    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0 group-hover:text-[#00698c] transition-colors"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </button>
)

// ─── Main Page ─────────────────────────────────────────────
const TeamListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { seriesId } = useParams()

  const [teams, setTeams]               = useState([])     // full team objects
  const [selectedTeam, setSelectedTeam] = useState(null)   // full team object
  const [players, setPlayers]           = useState([])
  const [loading, setLoading]           = useState(true)
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  // ── Load IPL teams on mount ──────────────────────────────
// ── Load SERIES teams ──────────────────────────────
useEffect(() => {
  const loadTeams = async () => {
    try {
      if (!seriesId) return

      const seriesTeams = await getSeriesTeams(seriesId)

      if (seriesTeams && seriesTeams.length > 0) {
        setTeams(seriesTeams)

        const teamFromUrl = searchParams.get('team')

        const matched = teamFromUrl
          ? seriesTeams.find(
              t =>
                t.name === teamFromUrl ||
                t.shortName === teamFromUrl
            )
          : null

        setSelectedTeam(matched || seriesTeams[0])
      }
    } catch (error) {
      console.error('Failed to load series teams:', error)
    }
  }

  loadTeams()
}, [seriesId])

  // ── Sync URL param → selectedTeam when teams already loaded ──
  useEffect(() => {
    if (!teams.length) return
    const teamFromUrl = searchParams.get('team')
    if (teamFromUrl) {
      const matched = teams.find(t => t.name === teamFromUrl || t.shortName === teamFromUrl)
      if (matched && matched.teamId !== selectedTeam?.teamId) {
        setSelectedTeam(matched)
      }
    }
  }, [searchParams, teams])

  // ── Load players when selectedTeam changes ───────────────
  useEffect(() => {
    if (!selectedTeam?.teamId) return

    const loadPlayers = async () => {
      setLoading(true)
      try {
        // ✅ Direct call with teamId — no name-to-id lookup
        const teamPlayers = await getTeamPlayersById(selectedTeam.teamId)
        // teamPlayers already formatted by formatPlayer() in ipl.api.js
        const withTeamName = teamPlayers.map(p => ({
          ...p,
          teamName: selectedTeam.name,
        }))
        setPlayers(withTeamName)
      } catch (error) {
        console.error('Failed to load players:', error)
        setPlayers([])
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()
  }, [selectedTeam])

  const handleTeamChange = (team) => {
    setSelectedTeam(team)
    setSearchParams({ team: team.name })
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  const handlePlayerSelect = (player) => {
    navigate(
      `/cricket/player/${getSlug(player.name)}`,
      { state: { player, teamName: selectedTeam?.name || '' } }
    )
    window.scrollTo(0, 0)
  }

  return (
    <>
      {/* Mobile dropdown */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div className="flex items-center gap-2">
            {selectedTeam?.logo && (
              <img src={selectedTeam.logo} alt={selectedTeam.shortName} className="w-5 h-5 rounded-full object-cover" />
            )}
            <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedTeam?.name || 'Select Team'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">{players.length} players</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {sidebarOpen && (
          <div className="mt-1 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-20">
            {teams.map(team => (
              <button key={team.teamId} onClick={() => handleTeamChange(team)}
                className={`w-full text-left px-4 z-40 relative py-3 text-sm border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center justify-between transition-colors ${
                  selectedTeam?.teamId === team.teamId
                    ? 'bg-[#00698c]/5 font-semibold text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {team.logo && <img src={team.logo} alt={team.shortName} className="w-5 h-5 rounded-full object-cover" />}
                  <span>{team.name}</span>
                </div>
                {selectedTeam?.teamId === team.teamId && (
                  <svg className="w-4 h-4 text-[#00698c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* Desktop Teams Sidebar */}
        <div className="hidden lg:block w-56 xl:w-64 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden self-start sticky top-4">
          <div className="px-3 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Series Teams</h3>
          </div>
          {teams.map(team => (
            <button key={team.teamId} onClick={() => handleTeamChange(team)}
              className={`w-full text-left px-3 py-2.5  z-40 relative text-xs border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-2 transition-colors ${
                selectedTeam?.teamId === team.teamId
                  ? 'bg-[#00698c]/5 dark:bg-[#00698c]/10 font-semibold text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-[#1c2128]'
              }`}
            >
              {/* ✅ Team logo from API */}
              {team.logo && (
                <img src={team.logo} alt={team.shortName} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
              )}
              <span className="truncate flex-1">{team.name}</span>
              {selectedTeam?.teamId === team.teamId && (
                <svg className="w-3.5 h-3.5 text-[#00698c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2.5" strokeLinecap="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Players list */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-3">
              {selectedTeam?.logo && (
                <img src={selectedTeam.logo} alt={selectedTeam.shortName}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600" />
              )}
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                  {selectedTeam?.name || '—'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{players.length} players</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00698c]"></div>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Loading players...</p>
              </div>
            ) : players.length > 0 ? (
              players.map(p => (
                <PlayerRow key={p.playerId || p.id || p.name} player={p} onClick={handlePlayerSelect} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                <svg className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No players found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}

export default TeamListPage