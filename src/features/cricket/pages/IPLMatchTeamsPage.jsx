// pages/IPLMatchTeamsPage.jsx
// Note: Teams/players data ab API se aata hai (IPLSquadsPage use karo squad ke liye)
// Yeh page match-specific team view ke liye hai — static match data + API players

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { getMatchInfo, getPlayers } from '../../../service/ipl.api'

const getSlug = (name) => name?.toLowerCase().replace(/\s+/g, '-') || ''

const PlayerItem = ({ player }) => (
  <Link
    to={`/cricket/player/${getSlug(player.name)}`}
    className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg px-2 sm:px-3 -mx-2 sm:-mx-3"
  >
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
      {player.imageUrl
        ? <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
        : (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        )
      }
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white hover:text-[#00698c] dark:hover:text-[#00698c] transition-colors truncate">
        {player.name}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{player.role || '—'}</p>
    </div>
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </Link>
)

const IPLMatchTeamsPage = () => {
  const { matchId } = useParams()
  const navigate    = useNavigate()
  const [activeTab, setActiveTab] = useState('Teams')
  const [match,     setMatch]     = useState(null)
  const [players,   setPlayers]   = useState([])
  const [loading,   setLoading]   = useState(true)

  const tabs = ['Home', 'Live', 'Scorecard', 'Teams', 'Table', 'News', 'Photos', 'Video']

  useEffect(() => {
    const load = async () => {
      try {
        const info = await getMatchInfo(matchId)
        setMatch(info)
        // Load all players (filtered by team if possible)
        const allPlayers = await getPlayers()
        setPlayers(allPlayers)
      } catch { /* silent */ } finally {
        setLoading(false)
      }
    }
    load()
  }, [matchId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00698c] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const t1Name = match?.team1?.name || 'Team 1'
  const t2Name = match?.team2?.name || 'Team 2'

  return (
    <>
      <SeoManager title={`${t1Name} vs ${t2Name} | IPL 2025 | SportyRadar`} />
      <SportsTabs />
      <CricketTabs extraTab={{ label: 'IPL 2025', path: '/cricket/ipl' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">
          <div className="w-full lg:w-[80%] min-w-0">

            {/* Banner */}
            <div className="bg-[#00698c] text-white rounded-t-lg px-3 sm:px-4 py-2.5">
              <h2 className="text-sm sm:text-base font-bold">INDIAN PREMIER LEAGUE 2025</h2>
            </div>

            {/* Match info */}
            <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0 p-3 sm:p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#00698c] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {match?.team1?.shortName?.slice(0, 3) || 'T1'}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{t1Name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-400">VS</span>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {match?.team2?.shortName?.slice(0, 3) || 'T2'}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{t2Name}</span>
                </div>
              </div>

              {match?.venue && (
                <p className="text-xs text-gray-500">{match.venue}{match.city ? `, ${match.city}` : ''}</p>
              )}

              {/* Sub tabs */}
              <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto scrollbar-hide mt-3 -mx-3 sm:-mx-4 px-3 sm:px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (tab === 'Scorecard') navigate(`/cricket/series/${match.seriesId}/scorecard/${matchId}/`)
                      else setActiveTab(tab)
                    }}
                    className={`flex-shrink-0 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-[#00698c] text-[#00698c]'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Teams content */}
            {activeTab === 'Teams' && (
              <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-xs text-gray-400 mb-4">
                  Squad data from DB — grows as more matches are played
                </p>
                {players.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">
                    No squad data yet — players appear after scorecards are saved
                  </p>
                ) : (
                  <div className="space-y-1">
                    {players.map((p) => <PlayerItem key={p.playerId} player={p} />)}
                  </div>
                )}
              </div>
            )}

            {activeTab !== 'Teams' && (
              <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 text-center mb-6">
                <p className="text-gray-400 text-sm">{activeTab} coming soon</p>
              </div>
            )}

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

export default IPLMatchTeamsPage
