// pages/IPLSquadsPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import {
  IPLBanner, IPLSubTabs, SkeletonList, EmptyState,
} from '../components/iplshared'
import { getPlayers, getTeamFlag } from '../../../service/ipl.api'

const IPL_TEAMS = [
  'Mumbai Indians',
  'Chennai Super Kings',
  'Royal Challengers Bengaluru',
  'Kolkata Knight Riders',
  'Delhi Capitals',
  'Punjab Kings',
  'Rajasthan Royals',
  'Sunrisers Hyderabad',
  'Lucknow Super Giants',
  'Gujarat Titans',
]

const ROLES = ['All', 'Batters', 'Bowlers', 'All-rounders', 'Wicket-keepers']

const roleMatch = (role = '', filter) => {
  const r = role.toLowerCase()
  if (filter === 'Batters')        return r.includes('bat')
  if (filter === 'Bowlers')        return r.includes('bowl')
  if (filter === 'All-rounders')   return r.includes('all')
  if (filter === 'Wicket-keepers') return r.includes('keeper') || r.includes('wk')
  return true
}

const QuickStats = ({ players }) => {
  const s = {
    total:    players.length,
    batters:  players.filter(p => roleMatch(p.role, 'Batters')).length,
    bowlers:  players.filter(p => roleMatch(p.role, 'Bowlers')).length,
    allround: players.filter(p => roleMatch(p.role, 'All-rounders')).length,
  }
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {[['Total', s.total], ['Batters', s.batters], ['Bowlers', s.bowlers], ['All-rounders', s.allround]].map(([label, val]) => (
        <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
          <p className="text-lg font-black text-gray-900 dark:text-white">{val}</p>
        </div>
      ))}
    </div>
  )
}

const PlayerRow = ({ player }) => {
  const slug = player.name?.toLowerCase().replace(/\s+/g, '-') || player.playerId
  return (
    <Link
      to={`/cricket/player/${slug}`}
      className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#00698c] transition-all group"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#00698c]/20 to-blue-900/20">
        {player.imageUrl
          ? <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
          : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          )
        }
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate group-hover:text-[#00698c] transition-colors">
          {player.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{player.role || '—'}</p>
        <div className="flex flex-wrap gap-x-3 mt-1">
          {player.battingStyle && (
            <p className="text-xs text-gray-400">Bat: <span className="font-medium text-gray-600 dark:text-gray-300">{player.battingStyle}</span></p>
          )}
          {player.bowlingStyle && (
            <p className="text-xs text-gray-400">Bowl: <span className="font-medium text-gray-600 dark:text-gray-300">{player.bowlingStyle}</span></p>
          )}
          {player.nationality && (
            <p className="text-xs text-gray-400">🌍 {player.nationality}</p>
          )}
        </div>
      </div>
      <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
      </svg>
    </Link>
  )
}

const IPLSquadsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState(IPL_TEAMS[0])
  const [roleFilter,   setRoleFilter]   = useState('All')
  const [players,      setPlayers]      = useState([])
  const [loading,      setLoading]      = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadPlayers = useCallback(async (team) => {
    setLoading(true)
    try {
      const data = await getPlayers(team)
      setPlayers(data || [])
    } catch {
      setPlayers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadPlayers(selectedTeam) }, [selectedTeam, loadPlayers])

  const handleTeamSelect = (team) => {
    setSelectedTeam(team)
    setShowDropdown(false)
    setRoleFilter('All')
  }

  const filtered = roleFilter === 'All'
    ? players
    : players.filter(p => roleMatch(p.role, roleFilter))

  return (
    <>
      <SeoManager title={`${selectedTeam} Squad | IPL 2025 | SportyRadar`} />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2025', path: '/cricket/ipl' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">
          <div className="w-full lg:w-[80%] min-w-0">

            <IPLBanner />
            <IPLSubTabs active="Squads" />

            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg p-3 sm:p-4">

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                {/* Team dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(v => !v)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] transition-all min-w-[220px]"
                  >
                    <img src={getTeamFlag(selectedTeam)} className="w-5 h-5 rounded-full object-cover" alt="" />
                    <span className="flex-1 text-left truncate font-semibold">{selectedTeam}</span>
                    <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-full mt-1 left-0 z-30 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-64 max-h-72 overflow-y-auto">
                      {IPL_TEAMS.map(team => (
                        <button
                          key={team}
                          onClick={() => handleTeamSelect(team)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            selectedTeam === team ? 'text-[#00698c] font-semibold' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <img src={getTeamFlag(team)} className="w-5 h-5 rounded-full object-cover" alt="" />
                          <span className="flex-1 text-left">{team}</span>
                          {selectedTeam === team && (
                            <svg className="w-4 h-4 text-[#00698c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeWidth="2" strokeLinecap="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Role filter */}
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        roleFilter === role
                          ? 'bg-[#00698c] text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team header */}
              <div className="mb-4 pb-3 border-b-2 border-[#00698c]/30">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#00698c] rounded-full" />
                  <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">{selectedTeam}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 ml-3">IPL 2025 Full Squad</p>
              </div>

              {loading ? (
                <SkeletonList count={6} />
              ) : filtered.length === 0 ? (
                <EmptyState
                  message={players.length === 0
                    ? 'Squad data loading — players appear after matches are played'
                    : `No ${roleFilter} found in this team`
                  }
                  icon="👤"
                />
              ) : (
                <>
                  <QuickStats players={players} />
                  <div className="space-y-2">
                    {filtered.map(p => <PlayerRow key={p.playerId || p._id} player={p} />)}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden lg:block lg:w-[20%]">{/* sidebar */}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsSection />
      </div>
    </>
  )
}

export default IPLSquadsPage
