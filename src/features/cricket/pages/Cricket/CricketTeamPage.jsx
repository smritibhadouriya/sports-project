import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllTeams, getSeriesTeams } from '../../../../service/ipl.api'

function classifyTeam(team) {
  const name = team.name?.toLowerCase() || ''
  const short = team.shortName?.toLowerCase() || ''
  const isIntl = team.type === 'international'

  const isWomen =
    name.includes('women') ||
    (short.endsWith('w') && short.length > 2)

  const isA =
    name.match(/ a$/) ||
    name.includes(' lions') ||
    name.includes(' emerging') ||
    name.includes(' shadow')

  const IPL_SHORTS = new Set(['mi','csk','rcb','kkr','rr','pbks','srh','gt','lsg','dc'])
  const isIPL = IPL_SHORTS.has(short)

  const COUNTY_SHORTS = new Set([
    'yorks','warks','som','sur','lancs','kent','notts','ess','mdx',
    'dur','derby','sus','leic','gloucs','ham','worcs','nhnts','glam',
  ])
  const isCounty = COUNTY_SHORTS.has(short)

  if (isIPL)    return 'ipl'
  if (isCounty) return 'county'
  if (isA)      return 'a-teams'
  if (isWomen && isIntl)  return 'women-intl'
  if (isWomen && !isIntl) return 'women-other'
  if (isIntl)   return 'international'
  return 'domestic'
}

const FILTER_TABS = [
  { id: 'all',          label: 'All' },
  { id: 'international', label: 'International' },
  { id: 'ipl',         label: 'IPL Franchises' },
  { id: 'women-intl',  label: 'Women — Intl' },
  // { id: 'women-other', label: 'Women — Others' },
  // { id: 'a-teams',     label: 'A Teams' },
  // { id: 'county',      label: 'County' },
  // { id: 'domestic',    label: 'Domestic' },
]

// ── Team Avatar — flag (rectangular) > logo > initials fallback ───────────────
const TeamAvatar = ({ team }) => {
  const [failed, setFailed] = useState(false)
  const src = team.flag || null

  if (!src || failed) {
    const initials = (team.shortName || team.name || '?')
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase()
    return (
      <div className="w-12 h-8 rounded bg-gradient-to-br from-[#00698c] to-[#0088b0] flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={team.name}
      onError={() => setFailed(true)}
      className="w-12 h-8 rounded object-cover flex-shrink-0 border border-gray-200 dark:border-gray-700"
    />
  )
}

// ── Filter Tab ────────────────────────────────────────────────────────────────
const FilterTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
      active
        ? 'bg-[#00698c] text-white'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
)

// ── Team Row — flag | name | chevron (list-style) ─────────────────────────────
const TeamCard = ({ team, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3.5 w-full text-left relative z-10 
               bg-white dark:bg-[#1c2128]
               border-b border-r border-gray-100 dark:border-gray-800
               hover:bg-gray-50 dark:hover:bg-[#22292f]
               transition-colors group"
  >
    <TeamAvatar team={team} />
    <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-[#00698c] transition-colors">
      {team.name}
    </span>
    <svg
      className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
)

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-[#1c2128] border-b border-r border-gray-100 dark:border-gray-800 animate-pulse">
    <div className="w-12 h-8 rounded bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded flex-shrink-0" />
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const CricketTeamsPage = () => {
  const { seriesId } = useParams()
  const navigate = useNavigate()

  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = seriesId ? await getSeriesTeams(seriesId) : await getAllTeams()
        setTeams(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [seriesId])

  const categorized = teams.map(t => ({ ...t, _cat: classifyTeam(t) }))

  const tabCounts = useMemo(() =>
    Object.fromEntries(
      FILTER_TABS.map(tab => [
        tab.id,
        categorized.filter(t => tab.id === 'all' || t._cat === tab.id).length,
      ])
    ),
  [categorized])

const filtered = categorized.filter(t => {
  const HIDDEN_IN_ALL = new Set(['women-other', 'county','domestic'])
  const matchesFilter = 
    filter === 'all' 
      ? !HIDDEN_IN_ALL.has(t._cat)
      : t._cat === filter
  const q = search.trim().toLowerCase()
  const matchesSearch = !q ||
    t.name?.toLowerCase().includes(q) ||
    t.shortName?.toLowerCase().includes(q)
  return matchesFilter && matchesSearch
})

  const handleTeamClick = (team) => {
    if (seriesId) {
      navigate(`/cricket/series/${seriesId}/teams/${team.teamId}`)
    } else {
      navigate(`/cricket/teams/${team.teamId}`)
    }
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4 z-40 ">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search teams..."
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#00698c]/60 focus:ring-2 focus:ring-[#00698c]/10 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter tabs — global page only */}
      {!seriesId && (
        <div className="flex gap-2 mb-5 flex-wrap z-40 relative">
          {FILTER_TABS.map(tab => (
            <FilterTab
              key={tab.id}
              label={`${tab.label} (${tabCounts[tab.id] ?? 0})`}
              active={filter === tab.id}
              onClick={() => setFilter(tab.id)}
            />
          ))}
        </div>
      )}

      {/* 3-column list grid */}
      {loading ? (
        <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-2xl mb-2">🏏</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No teams found</p>
          {search && (
            <p className="text-xs text-gray-400 mt-1">
              No results for "<span className="font-medium">{search}</span>"
            </p>
          )}
        </div>
      ) : (
        <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(team => (
            <TeamCard
              key={team.teamId}
              team={team}
              onClick={() => handleTeamClick(team)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CricketTeamsPage