import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '@/shared/components/SectionHeader'
import MatchCard from '../components/MatchCard'
import { getFixtures, getSeries } from '../../../service/ipl.api'

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
    <path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
)

// ── Date field extractor — handles every possible API shape ──────────────────
const extractDate = (match) =>
  match?.startDate ||
  match?.date ||
  match?.startTime ||
  match?.startDt ||        // millisecond timestamp string
  match?.dateTimeGMT ||
  null

const groupFixturesByDate = (matches) => {
  const groups = {}

  matches.forEach((match) => {
    const raw = extractDate(match)
    if (!raw) return

    // raw can be ms-timestamp string OR ISO string
    const date = new Date(isNaN(Number(raw)) ? raw : Number(raw))
    if (isNaN(date.getTime())) return

    const label = date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })

    if (!groups[label]) groups[label] = { label, ts: date.getTime(), matches: [] }
    groups[label].matches.push(match)
  })

  // sort date groups ascending
  return Object.values(groups).sort((a, b) => a.ts - b.ts)
}

const CricketFixturesPage = () => {
  const navigate = useNavigate()

  const [fixtures, setFixtures]       = useState([])
  const [seriesList, setSeriesList]   = useState([])   // [{id, name}]
  const [selectedSeries, setSelected] = useState('all')
  const [showDropdown, setDropdown]   = useState(false)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [search, setSearch]           = useState('')

  // ── Load fixtures + series list in parallel ────────────────────────────────
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const [fixturesRes, seriesRes] = await Promise.allSettled([
          getFixtures(),
          getSeries(),
        ])

        if (cancelled) return

        // fixtures
        if (fixturesRes.status === 'fulfilled') {
          setFixtures(fixturesRes.value || [])
        } else {
          setError(fixturesRes.reason?.message || 'Failed to load fixtures')
        }

        // series dropdown list — build from API or derive from fixture data
        if (seriesRes.status === 'fulfilled' && seriesRes.value) {
          const raw =
            seriesRes.value?.data?.seriesMapProto ||
            seriesRes.value?.seriesMapProto ||
            (Array.isArray(seriesRes.value) ? seriesRes.value : [])

          const now = Date.now()
          const flat = raw
            .flatMap((g) => g.series || [])
            .filter((s) => Number(s.endDt) >= now)
            .map((s) => ({ id: String(s.id), name: s.name }))

          setSeriesList(flat)
        } else if (fixturesRes.status === 'fulfilled') {
          // fallback: derive unique series names from fixture data
          const seen = new Set()
          const derived = []
          ;(fixturesRes.value || []).forEach((m) => {
            const id   = String(m.seriesId || m.series?.id || '')
            const name = m.seriesName || m.series?.name || ''
            if (id && name && !seen.has(id)) {
              seen.add(id)
              derived.push({ id, name })
            }
          })
          setSeriesList(derived)
        }
      } catch (e) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = fixtures.filter((m) => {
    // series filter
    if (selectedSeries !== 'all') {
      const matchSeriesId = String(m.seriesId || m.series?.id || '')
      if (matchSeriesId !== selectedSeries) return false
    }

    // text search
    const q = search.toLowerCase()
    if (!q) return true
    return (
      m?.seriesName?.toLowerCase().includes(q) ||
      m?.matchDesc?.toLowerCase().includes(q) ||
      m?.team1?.name?.toLowerCase().includes(q) ||
      m?.team2?.name?.toLowerCase().includes(q) ||
      m?.venue?.ground?.toLowerCase().includes(q) ||
      m?.venue?.city?.toLowerCase().includes(q) ||
      m?.teamInfo?.[0]?.name?.toLowerCase().includes(q) ||
      m?.teamInfo?.[1]?.name?.toLowerCase().includes(q)
    )
  })

  const grouped = groupFixturesByDate(filtered)

  const selectedSeriesName =
    selectedSeries === 'all'
      ? 'All Series'
      : seriesList.find((s) => s.id === selectedSeries)?.name || 'All Series'

  return (
    <>
      <SectionHeader title="Cricket Schedule" />

      <div className="mt-4">
        {/* ── Filters ── */}
        <div className="flex items-center gap-3 mb-6">

          {/* Series dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdown((p) => !p)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-[#00698c] transition-colors bg-white dark:bg-[#1c2128] whitespace-nowrap max-w-[160px]"
            >
              <span className="truncate">{selectedSeriesName}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl w-64 max-h-64 overflow-y-auto">
                {/* All option */}
                <button
                  onClick={() => { setSelected('all'); setDropdown(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    selectedSeries === 'all'
                      ? 'font-bold text-[#00698c]'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All Series
                </button>

                {seriesList.length === 0 && (
                  <p className="px-4 py-3 text-xs text-gray-400">No series available</p>
                )}

                {seriesList.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelected(s.id); setDropdown(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 border-t border-gray-100 dark:border-gray-800 ${
                      selectedSeries === s.id
                        ? 'font-bold text-[#00698c]'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
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
        </div>

        {/* Close dropdown on outside click */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdown(false)}
          />
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading fixtures...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">Failed to load fixtures</div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No fixtures found</div>
        ) : (
          grouped.map((group) => (
            <div key={group.label} className="mb-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                {group.label}
              </h3>
              <div className="space-y-3">
                {group.matches.map((match) => (
                  <MatchCard
                    key={match.matchId || match.id}
                    match={match}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default CricketFixturesPage