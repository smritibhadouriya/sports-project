import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { getAllMatchFeeds, getTeamFlag } from '../../../../service/ipl.api'

// ── Search Icon ───────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
    <path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
)

// ── ResultCard — same style as IPLMatchCard ───────────────────────────────────
const ResultCard = ({ match, onClick }) => {
  const dateStr = match.startDate
    ? new Date(Number(match.startDate)).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : ''

  return (
    <div
      onClick={onClick}
      className="bg-white z-40 relative dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      {/* Status bar */}
      <div className="bg-gradient-to-r from-[#00698c] to-[#0088b0] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs sm:text-sm font-semibold">Result</span>
        <span className="text-xs font-medium opacity-80">
          {match.matchDesc || match.seriesName || ''}
        </span>
      </div>

      <div className="p-3 sm:p-4">
        {/* Teams */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Team 1 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={match.team1?.logo || getTeamFlag(match.team1?.name)}
                alt={match.team1?.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base block">
                  {match.team1?.name || match.team1?.shortName || 'TBA'}
                </span>
                {match.team1?.score && (
                  <span className="text-xs font-bold text-[#00698c]">{match.team1.score}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 px-2">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={match.team2?.logo || getTeamFlag(match.team2?.name)}
                alt={match.team2?.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base block">
                  {match.team2?.name || match.team2?.shortName || 'TBA'}
                </span>
                {match.team2?.score && (
                  <span className="text-xs font-bold text-[#00698c]">{match.team2.score}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meta: venue + date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
         {(match.venue || match.city) && (
            <div className="flex items-start gap-1.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="break-words">
               {typeof match.venue === 'object'
  ? [match.venue.ground, match.venue.city].filter(Boolean).join(', ')
  : match.venue}
{typeof match.venue !== 'object' && match.city ? `, ${match.city}` : ''}
              </span>
            </div>
          )}
          {dateStr && (
            <div className="flex items-start gap-1.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dateStr}</span>
            </div>
          )}
        </div>

        {/* Result text */}
        {match.result && (
          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-[#00698c]">{match.result}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden animate-pulse">
    <div className="h-10 bg-[#00698c]/20" />
    <div className="p-4 space-y-3">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketResultsPage = () => {
  const navigate            = useNavigate()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [search,  setSearch]  = useState('')

  const load = useCallback(async () => {
    try {
      setError(null)
      const feeds = await getAllMatchFeeds()
      const now   = Date.now()

      // Recent = completed matches from both recent + upcoming arrays
    const recentMatches = (feeds.recent || []).filter((m) => {
  // extra safety (optional, API already gives completed)
  if (m.status === 'Completed' || m.matchStatus === 'completed') return true
  if (m.result) return true
  if (m.state && m.state.toLowerCase().includes('won')) return true
  return false
})

      // Dedupe by matchId
      const seen    = new Set()
   const deduped = recentMatches.filter((m) => {
  const key = m.matchId || m.id
  if (!key || seen.has(key)) return false
  seen.add(key)
  return true
})

      // Sort: most recent first
      deduped.sort((a, b) => Number(b.startDate || 0) - Number(a.startDate || 0))

      setMatches(deduped)
    } catch (e) {
      setError(e.message || 'Failed to load results')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Search filter
  const filtered = matches.filter((m) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      m.team1?.name?.toLowerCase().includes(q)     ||
      m.team1?.shortName?.toLowerCase().includes(q) ||
      m.team2?.name?.toLowerCase().includes(q)     ||
      m.team2?.shortName?.toLowerCase().includes(q) ||
      m.seriesName?.toLowerCase().includes(q)       ||
      m.venue?.toLowerCase().includes(q)
    )
  })

  const handleClick = (match) => {
    if (match.matchId) {
      navigate(`/cricket/series/${match.seriesId}/scorecard/${match.matchId}/`)
    }
  }

  return (
    <>
    
            <SectionHeader title="Cricket Results" />

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search Team, Series, Ground"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm bg-white dark:bg-[#1c2128] text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#00698c] transition-colors"
                />
              </div>
              {!loading && (
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="py-10 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm">{error}</p>
                <button onClick={load} className="mt-2 text-xs text-[#00698c] underline">Retry</button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="py-12 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-3xl mb-3">🏏</p>
                <p className="text-sm text-gray-400">
                  {search ? 'No matches found for your search' : 'No recent results available'}
                </p>
              </div>
            )}

            {/* Results */}
            {!loading && !error && filtered.length > 0 && (
              <div className="space-y-3">
                {filtered.map((match) => (
                  <ResultCard
                    key={match.matchId || match.id}
                    match={match}
                    onClick={() => handleClick(match)}
                  />
                ))}
              </div>
            )}
         
    </>
  )
}

export default CricketResultsPage