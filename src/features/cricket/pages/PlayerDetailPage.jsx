import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { IPLBanner, IPLSubTabs } from '../components/iplshared'
import {
  getAllTeams,
  getTeamPlayersById,
  getIPLPlayerDetail,
  mergePlayerDetail,
} from '../../../service/ipl.api'

const getSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// ─── RoleBadge ───────────────────────────
const RoleBadge = ({ role }) => {
  const r = (role || '').toUpperCase()
  let label = role || '—', cls = 'bg-gray-100 dark:bg-gray-800 text-gray-400'
  if (r === 'WK')   { label = 'WK';   cls = 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' }
  else if (r === 'ALL')  { label = 'ALL';  cls = 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' }
  else if (r === 'BOWL') { label = 'BOWL'; cls = 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' }
  else if (r === 'BAT')  { label = 'BAT';  cls = 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' }
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${cls}`}>{label}</span>
}

// ─── TeammateCard ────────────────────────
const TeammateCard = ({ player, onClick }) => (
  <button onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700
               hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-left w-full"
  >
    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0
                    bg-gradient-to-br from-yellow-100 to-purple-200
                    dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
      {player.imageUrl ? (
        <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover"
          onError={e => { e.target.onerror = null; e.target.style.display = 'none' }} />
      ) : (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate
                    group-hover:text-[#00698c] dark:group-hover:text-[#4dd0ff] transition-colors">
        {player.name}
      </p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <RoleBadge role={player.role} />
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{player.battingStyle || '—'}</span>
      </div>
    </div>
    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0
                    opacity-0 group-hover:opacity-100 transition-opacity"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </button>
)

// ─── Hero Player Card ─────────────────────────────────────
const PlayerHeroCard = ({ player, currentTeam, teamName }) => {
  const name         = player.name         || 'Unknown Player'
  const image        = player.imageUrl     || ''
  const role         = player.role         || 'N/A'
  const rawRole      = player.rawRole      || role
  const battingStyle = player.battingStyle || 'N/A'
  const bowlingStyle = player.bowlingStyle || 'N/A'

  const battingStats = player.battingStats
  const bowlingStats = player.bowlingStats

  const heroPills = battingStats ? [
    { label: 'MATCHES',      value: battingStats.innings  ?? '—' },
    { label: 'RUNS',         value: battingStats.runs     ?? '—' },
    { label: 'AVERAGE',      value: battingStats.avg      ?? '—' },
    { label: 'STRIKE RATE',  value: battingStats.sr       ?? '—' },
  ] : bowlingStats ? [
    { label: 'INNINGS',  value: bowlingStats.innings  ?? '—' },
    { label: 'WICKETS',  value: bowlingStats.wickets  ?? '—' },
    { label: 'AVERAGE',  value: bowlingStats.avg      ?? '—' },
    { label: 'ECONOMY',  value: bowlingStats.economy  ?? '—' },
  ] : null

  const infoRows = [
    ['Role',          rawRole],
    ['Batting Style', battingStyle],
    ['Bowling Style', bowlingStyle],
    ...(player.nationality ? [['Nationality', player.nationality]] : []),
  ]

  return (
    <div className="rounded-xl overflow-hidden shadow-lg mb-6 border border-gray-200 dark:border-gray-700">

      {/* ── HERO SECTION ── */}
      <div
        className="relative flex flex-col sm:flex-row items-end sm:items-end gap-0"
        style={{
          background: 'linear-gradient(135deg, #0d2233 0%, #0a3d5c 50%, #0d2233 100%)',
          minHeight: '280px',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,180,255,0.25) 0%, transparent 60%),
                              radial-gradient(circle at 80% 20%, rgba(0,105,140,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Player image — anchored to bottom, position unchanged */}
        <div className="relative z-10 flex-shrink-0 self-end sm:self-end">
          <div
            className="w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-72 overflow-hidden"
            style={{ marginBottom: 0 }}
          >
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                onError={e => { e.target.onerror = null; e.target.src = '/fallback-player.png' }}
              />
            ) : (
              <div className="w-full h-full flex items-end justify-center pb-4">
                <svg className="w-28 h-28 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Text block */}
        <div className="relative z-10 flex-1 px-6 pb-7 pt-6 sm:pt-4 sm:pb-8 flex flex-col justify-end">

          {/* 1. Team name pill */}
          {teamName && (
            <div className="flex items-center gap-2 mb-3">
            
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(77,208,255,0.15)', color: '#4dd0ff', border: '1px solid rgba(77,208,255,0.25)' }}
              >
                {teamName}
              </span>
            </div>
          )}

          {/* 2. Player name */}
          <h1 className="text-2xl sm:text-3xl md:text-[2.25rem] font-extrabold text-white leading-tight tracking-tight mb-3">
            {name}
          </h1>

          {/* 3. Info rows inside frosted box */}
          <div
            className="mb-5 rounded-lg overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {infoRows.map(([label, value], i) => (
              <div
                key={label}
                className="flex items-center px-3 py-1.5"
                style={{ borderBottom: i < infoRows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 w-28 flex-shrink-0">
                  {label}
                </span>
                <span className="text-xs font-semibold text-white/75">
                  {value || 'N/A'}
                </span>
              </div>
            ))}
          </div>

          {/* 4. Stat pills */}
          {heroPills && (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-2">
                Player Overview
              </p>
              <div className="flex flex-wrap gap-2">
                {heroPills.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-start px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      minWidth: '72px',
                    }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-0.5">{label}</span>
                    <span className="text-lg font-extrabold text-white leading-none">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── WHITE INFO + ABOUT SECTION ── */}
      <div className="bg-white dark:bg-[#1c2128]">

        {/* Bowling stats if batting stats already shown as hero pills */}
        {battingStats && bowlingStats && (
          <div className="px-5 pt-4 pb-1 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[#00698c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Bowling Stats
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pb-4">
              {[
                ['Inn',  bowlingStats.innings],
                ['Wkts', bowlingStats.wickets],
                ['Avg',  bowlingStats.avg],
                ['Eco',  bowlingStats.economy],
                ['BBI',  bowlingStats.bbi],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{val ?? '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Batting stats if no hero pills */}
        {!heroPills && battingStats && (
          <div className="px-5 pt-4 pb-1 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[#00698c] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Batting Stats
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pb-4">
              {[
                ['Inn',  battingStats.innings],
                ['Runs', battingStats.runs],
                ['Avg',  battingStats.avg],
                ['SR',   battingStats.sr],
                ['HS',   battingStats.hs],
                ['100s', battingStats['100s'] ?? battingStats.hundreds],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{val ?? '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About / Bio — bracket wali cheeze removed */}
        <div className="px-5 pt-5 pb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h2>
          {player.bio ? (
            <div
              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed
                         prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: player.bio.replace(/<br\s*\/?>/gi, '<br/>')
              }}
            />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
              Career statistics and summary will be available soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────
const PlayerDetailPage = () => {
   const { slug, seriesId } = useParams()   
  const { state } = useLocation()
  const navigate  = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teams, setTeams]             = useState([])
  const [player, setPlayer]           = useState(null)
  const [teammates, setTeammates]     = useState([])
  const [currentTeam, setCurrentTeam] = useState(null)
  const [loading, setLoading]         = useState(true)

 useEffect(() => {
  getAllTeams()
    .then(setTeams)
    .catch(err => console.error('Failed to load teams:', err))
}, [])

  useEffect(() => {
    if (teams.length === 0 && !state?.player) return

    const loadPlayer = async () => {
      setLoading(true)
      try {
        let playerData  = null
        let foundTeam   = null

        if (state?.player) {
          playerData = state.player

          if (state.teamName && teams.length > 0) {
            foundTeam = teams.find(t =>
              t.name?.toLowerCase() === state.teamName.toLowerCase()
            ) || null
          }

          if (!foundTeam && playerData.teamId && teams.length > 0) {
            foundTeam = teams.find(t => t.teamId === playerData.teamId) || null
          }
        }

        if (!playerData && teams.length > 0) {
          for (const team of teams) {
            const teamPlayers = await getTeamPlayersById(team.teamId)
            const found = teamPlayers.find(p => getSlug(p.name) === slug)
            if (found) {
              playerData = found
              foundTeam  = team
              break
            }
          }
        }

        if (playerData) {
          if (playerData.playerId || playerData.id) {
            try {
              const detail = await getIPLPlayerDetail(playerData.playerId || playerData.id)
              if (detail) playerData = mergePlayerDetail(playerData, detail)
            } catch { /* use existing data */ }
          }

          setPlayer(playerData)
          setCurrentTeam(foundTeam)

          if (foundTeam?.teamId) {
            const teamPlayers = await getTeamPlayersById(foundTeam.teamId)
            const filtered = teamPlayers.filter(p => getSlug(p.name) !== slug)
            setTeammates(filtered)
          }
        }
      } catch (error) {
        console.error('Failed to load player:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPlayer()
  }, [slug, state, teams])

 const handleTeamChange = (team) => {
  setSidebarOpen(false)
  window.scrollTo(0, 0)
  navigate(`/cricket/teams/${team.teamId}`)
}

  const handleTeammateClick = (teammate) => {
    navigate(`/cricket/player/${getSlug(teammate.name)}`, {
      state: { player: teammate, teamName: currentTeam?.name || '' }
    })
    window.scrollTo(0, 0)
  }

  if (loading) {
    return (
      <>
       
          <p className="mt-2 text-gray-500 dark:text-gray-400">Loading player details...</p>
      
      </>
    )
  }
if (!player) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-5xl mb-4">🏏</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Player not found.</p>
        <button onClick={() => navigate(-1)}
          className="text-sm text-[#00698c] underline">
          Back to Teams
        </button>
      </div>
    </>
  )
}
  const teamName = currentTeam?.name || state?.teamName || ''

  return (
    <>
          
              {/* ── Content Area ── */}
              <div className="flex-1 min-w-0">

                <PlayerHeroCard
                  player={player}
                  currentTeam={currentTeam}
                  teamName={teamName}
                />

                {/* Teammates */}
                {teammates.length > 0 && (
                  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700
                                  rounded-lg p-4 sm:p-5 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-[#00698c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        {teamName} Squad
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {teammates.map(tm => (
                        <TeammateCard key={tm.playerId || tm.name} player={tm} onClick={() => handleTeammateClick(tm)} />
                      ))}
                    </div>
                  </div>
                )}

              </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsSection />
      </div>
    </>
  )
}

export default PlayerDetailPage