// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import SectionHeader from '@/shared/components/SectionHeader'
// import { getSeries } from '../../../service/ipl.api'

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const formatDateRange = (startMs, endMs) => {
//   const fmt = (ms) =>
//     new Date(Number(ms)).toLocaleDateString('en-IN', {
//       day: 'numeric', month: 'short', year: 'numeric',
//     })
//   if (startMs && endMs) return `${fmt(startMs)} – ${fmt(endMs)}`
//   if (startMs) return fmt(startMs)
//   return ''
// }

// // ── Classifier ────────────────────────────────────────────────────────────────
// const DOMESTIC_KEYWORDS = [
//   // existing
//   'ranji', 'vijay hazare', 'syed mushtaq', 'duleep', 'deodhar',
//   'bbl', 'cpl', 'psl', 'sa20', 'lpl', 'ilt20', 'the hundred',
//   'super smash', 'big bash', 'sheffield shield', 'plunket shield',
//   'county', 'ncl', 'bcl', 't20 blast', 'one-day cup', 'vitality',
//   'royal london', 'bob willis', 'npl', 'lanka premier',

//   // ── NEW: ye sab add karo ──
//   't20 mumbai', 'madhya pradesh', 'mp premier',
//   'asian legends', 'legends league',
//   'acc women', 'premier cup',
//   'world cup league', 'world cup qualifier', 'world cup super league',
//   'challenge league',
//   'tri nation a', 'a series',          // India A / Sri Lanka A tours
//   'emerging',
//   'inter-provincial', 'provincial',
//   'east asia pacific',
//   'club', 'grade', 'regional',
//   'board president', 'cricket association',
//   'u19', 'under-19', 'under 19',
//   'warm-up', 'warmup', 'practice',
// ]
// const T20_KEYWORDS = [
//   't20 world cup', "icc men's t20", "icc women's t20", 'wt20', 'indian premier league', 'ipl', 'big bash', 'bbl', 'caribbean premier league', 'cpl', 'pakistan super league', 'psl', 'sa20', 'lpl', 'ilt20', 'the hundred',
//   'world twenty20', 'twenty20 world', 'asia cup t20',
//   't20i tri', 't20 qualifier', 't20 cup', 'east asia pacific',
// ]

// const classifySeries = (name = '') => {
//   const lower = name.toLowerCase()
//   if (T20_KEYWORDS.some((k) => lower.includes(k))) return 't20'
//   if (DOMESTIC_KEYWORDS.some((k) => lower.includes(k))) return 'domestic'
//   return 'international'
// }

// const TABS = [
//   { key: 'all',           label: 'All'           },
//   { key: 'international', label: 'International' },
//   { key: 'domestic',      label: 'Domestic'      },
//   { key: 't20',           label: 'T20'           },
// ]

// // ── SeriesRow ─────────────────────────────────────────────────────────────────
// const SeriesRow = ({ series, isOngoing, onClick }) => (
//   <div
//     onClick={onClick}
//     className={`
//       bg-white dark:bg-[#1c2128] rounded-lg px-4 py-3
//       flex items-center justify-between
//       hover:shadow-md transition-all cursor-pointer group
//       border ${isOngoing
//         ? 'border-[#00698c]/50 dark:border-[#00698c]/40'
//         : 'border-gray-200 dark:border-gray-700 hover:border-[#00698c]/30'}
//     `}
//   >
//     <div className="min-w-0 flex-1 pr-4">
//       <div className="flex items-center gap-2 flex-wrap">
//         <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors line-clamp-1">
//           {series.name}
//         </p>
//         {isOngoing && (
//           <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
//             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
//             Live
//           </span>
//         )}
//       </div>
//       <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
//         {formatDateRange(series.startDt, series.endDt)}
//       </p>
//     </div>
//     <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
//     </svg>
//   </div>
// )

// // ── Skeleton ──────────────────────────────────────────────────────────────────
// const SkeletonRow = () => (
//   <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between animate-pulse">
//     <div className="space-y-2 flex-1 pr-8">
//       <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
//       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
//     </div>
//     <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
//   </div>
// )

// // ── MonthGroup ────────────────────────────────────────────────────────────────
// const MonthGroup = ({ date, series, onSeriesClick }) => {
//   const now = Date.now()
//   const hasOngoing = series.some(
//     (s) => Number(s.startDt) <= now && Number(s.endDt) >= now
//   )
//   return (
//     <div className="mb-6">
//       <h4 className="text-xs font-black tracking-widest uppercase mb-2 px-1 flex items-center gap-2">
//         <span className={hasOngoing ? 'text-[#00698c]' : 'text-gray-400 dark:text-gray-500'}>
//           {date}
//         </span>
//         {hasOngoing && (
//           <span className="text-[10px] font-bold text-emerald-500">● NOW</span>
//         )}
//       </h4>
//       <div className="space-y-2">
//         {series.map((s) => {
//           const isOngoing = Number(s.startDt) <= now && Number(s.endDt) >= now
//           return (
//             <SeriesRow
//               key={s.id}
//               series={s}
//               isOngoing={isOngoing}
//               onClick={() => onSeriesClick(s)}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// // ── Tab Bar ───────────────────────────────────────────────────────────────────
// const TabBar = ({ active, onChange }) => (
//   <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1 mb-5">
//     {TABS.map((tab) => (
//       <button
//         key={tab.key}
//         onClick={() => onChange(tab.key)}
//         className={`
//           flex-1 py-1.5 text-xs font-bold rounded-md transition-all
//           ${active === tab.key
//             ? 'bg-white dark:bg-[#1c2128] text-[#00698c] shadow-sm'
//             : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
//         `}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// )

// // ── Main Page ─────────────────────────────────────────────────────────────────
// const CricketSeriesPage = () => {
//   const navigate               = useNavigate()
//   const [allGroups, setAllGroups] = useState([])
//   const [activeTab, setActiveTab] = useState('all')
//   const [loading,   setLoading]   = useState(true)
//   const [error,     setError]     = useState(null)

//   useEffect(() => {
//     let cancelled = false
//     const load = async () => {
//       try {
//         const result = await getSeries()
//         if (cancelled) return

//         const raw =
//           result?.data?.seriesMapProto ||
//           result?.seriesMapProto        ||
//           (Array.isArray(result) ? result : [])

//         const now = Date.now()

//         // 1. Filter past series out, keep ongoing + future
//         const filtered = raw
//           .map((group) => ({
//             ...group,
//             series: group.series
//               .filter((s) => Number(s.endDt) >= now)
//               .map((s) => ({ ...s, _type: classifySeries(s.name) })),
//           }))
//           .filter((group) => group.series.length > 0)

//         // 2. Sort: ongoing month first, then future asc
//         const sorted = filtered.sort((a, b) => {
//           const aOngoing = a.series.some(
//             (s) => Number(s.startDt) <= now && Number(s.endDt) >= now
//           )
//           const bOngoing = b.series.some(
//             (s) => Number(s.startDt) <= now && Number(s.endDt) >= now
//           )
//           if (aOngoing && !bOngoing) return -1
//           if (!aOngoing && bOngoing) return 1
//           const aMin = Math.min(...a.series.map((s) => Number(s.startDt)))
//           const bMin = Math.min(...b.series.map((s) => Number(s.startDt)))
//           return aMin - bMin
//         })

//         setAllGroups(sorted)
//       } catch (e) {
//         if (!cancelled) setError(e.message || 'Failed to load series')
//       } finally {
//         if (!cancelled) setLoading(false)
//       }
//     }
//     load()
//     return () => { cancelled = true }
//   }, [])

//   // Filter groups by active tab
//   const visibleGroups = activeTab === 'all'
//     ? allGroups
//     : allGroups
//         .map((group) => ({
//           ...group,
//           series: group.series.filter((s) => s._type === activeTab),
//         }))
//         .filter((group) => group.series.length > 0)


//         const now = Date.now()

// const ongoingSeries = visibleGroups
//   .flatMap(g => g.series)
//   .filter(s => Number(s.startDt) <= now && Number(s.endDt) >= now)

// const upcomingGroups = visibleGroups
//   .map(group => ({
//     ...group,
//     series: group.series.filter(
//       s => !(Number(s.startDt) <= now && Number(s.endDt) >= now)
//     ),
//   }))
//   .filter(group => group.series.length > 0)


//   // ── UPDATED: all series → /cricket/series/:id/matches ──────────────────────
//   const handleSeriesClick = (series) => {
//     navigate(`/cricket/series/${series.id}`)
//   }

//  return (
//   <>
//     <SectionHeader title="Cricket Series" />

//     <div className="mt-4">
//       <TabBar active={activeTab} onChange={setActiveTab} />

//       {loading && (
//         <div className="space-y-2">
//           {[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}
//         </div>
//       )}

//       {!loading && !error && (
//         <>
//           {/* ── Ongoing Section ── */}
//           {ongoingSeries.length > 0 && (
//             <div className="mb-6">
//               <h4 className="text-xs font-black tracking-widest uppercase mb-2 px-1 flex items-center gap-2">
//                 <span className="text-[#00698c]">Ongoing</span>
//                 <span className="text-[10px] font-bold text-emerald-500">● LIVE NOW</span>
//               </h4>
//               <div className="space-y-2">
//                 {ongoingSeries.map(s => (
//                   <SeriesRow
//                     key={s.id}
//                     series={s}
//                     isOngoing={true}
//                     onClick={() => handleSeriesClick(s)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ── Upcoming Section ── */}
//           {upcomingGroups.length > 0 && (
//             <div>
//               <h4 className="text-xs font-black tracking-widest uppercase mb-3 px-1 text-gray-400 dark:text-gray-500">
//                 Upcoming
//               </h4>
//               {upcomingGroups.map(group => (
//                 <MonthGroup
//                   key={group.date}
//                   date={group.date}
//                   series={group.series}
//                   onSeriesClick={handleSeriesClick}
//                 />
//               ))}
//             </div>
//           )}

//           {visibleGroups.length === 0 && (
//             <div className="py-10 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
//               <p className="text-gray-400 text-sm">No series found</p>
//             </div>
//           )}
//         </>
//       )}

//       {!loading && error && (
//         <div className="py-10 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
//           <p className="text-gray-400 text-sm">Could not load series</p>
//           <p className="text-gray-300 text-xs mt-1">{error}</p>
//         </div>
//       )}
//     </div>
//   </>
// )
// }

// export default CricketSeriesPage



import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '@/shared/components/SectionHeader'
import { getSeries } from '../../../service/ipl.api'

// ── Date Formatter ────────────────────────────────────────────────────────────
const formatDateRange = (startMs, endMs) => {
  const fmt = (ms) =>
    new Date(Number(ms)).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  if (startMs && endMs) return `${fmt(startMs)} – ${fmt(endMs)}`
  if (startMs) return fmt(startMs)
  return ''
}

// ── Priority Scoring ──────────────────────────────────────────────────────────
function getSeriesPriority(name = '') {
  const lower = name.toLowerCase()

  if (/world cup|champions trophy|asia cup|wtc|world test championship/i.test(lower)) return 100
  if (/\bipl\b|indian premier league|big bash|\bbbl\b|pakistan super league|\bpsl\b|sa20|the hundred|\bmlc\b|\bcpl\b|\bilt20\b|\blpl\b|\bbpl\b/i.test(lower)) return 90
  if (lower.includes('india') && /tour of|vs/i.test(lower)) return 85
  if (/australia|england|pakistan|south africa|new zealand|west indies|sri lanka|bangladesh|afghanistan/i.test(lower) && /tour of/i.test(lower)) return 80
  if (/women/i.test(lower) && /tour of|world cup/i.test(lower)) return 70
  if (/tour of/i.test(lower)) return 50
  if (/premier league|t20 league|cup|trophy/i.test(lower)) return 20

  return 10
}

// ── Classifier ────────────────────────────────────────────────────────────────
const DOMESTIC_KEYWORDS = [
  'ranji', 'vijay hazare', 'syed mushtaq', 'duleep', 'deodhar',
  'big bash', 'bbl', 'cpl', 'psl', 'sa20', 'lpl', 'ilt20', 'the hundred',
  'super smash', 'sheffield shield', 'plunket shield',
  'county', 'ncl', 'bcl', 't20 blast', 'one-day cup', 'vitality',
  'royal london', 'bob willis', 'npl', 'lanka premier',
  't20 mumbai', 'madhya pradesh', 'mp premier',
  'asian legends', 'legends league',
  'acc women', 'premier cup',
  'world cup league', 'world cup qualifier', 'world cup super league',
  'challenge league', 'tri nation a', 'a series',
  'emerging', 'inter-provincial', 'provincial',
  'east asia pacific', 'club', 'grade', 'regional',
  'board president', 'cricket association',
  'u19', 'under-19', 'under 19',
  'warm-up', 'warmup', 'practice',
]

const T20_KEYWORDS = [
  't20 world cup', "icc men's t20", "icc women's t20", 'wt20',
  'indian premier league', 'ipl', 'big bash', 'bbl',
  'caribbean premier league', 'cpl', 'pakistan super league', 'psl',
  'sa20', 'lpl', 'ilt20', 'the hundred',
  'world twenty20', 'twenty20 world', 'asia cup t20',
  't20i tri', 't20 qualifier', 't20 cup',
]

const WOMEN_KEYWORDS = ['women']

function classifySeries(name = '') {
  const lower = name.toLowerCase()
  if (WOMEN_KEYWORDS.some(k => lower.includes(k))) return 'women'
  if (T20_KEYWORDS.some(k => lower.includes(k))) return 't20'
  if (DOMESTIC_KEYWORDS.some(k => lower.includes(k))) return 'domestic'
  return 'international'
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { key: 'all',           label: 'All'           },
  { key: 'international', label: 'International' },
  { key: 'domestic',      label: 'Domestic'      },
  { key: 't20',           label: 'T20'           },
  { key: 'women',         label: 'Women'         },
]

// ── Components ────────────────────────────────────────────────────────────────
const SeriesRow = ({ series, isOngoing, onClick }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-[#1c2128] rounded-lg px-4 py-3
      flex items-center justify-between
      hover:shadow-md transition-all cursor-pointer group
      border ${isOngoing
        ? 'border-[#00698c]/50 dark:border-[#00698c]/40'
        : 'border-gray-200 dark:border-gray-700 hover:border-[#00698c]/30'}
    `}
  >
    <div className="min-w-0 flex-1 pr-4">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#00698c] transition-colors line-clamp-1">
          {series.name}
        </p>
        {isOngoing && (
          <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
        {formatDateRange(series.startDt, series.endDt)}
      </p>
    </div>
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </div>
)

const SkeletonRow = () => (
  <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between animate-pulse">
    <div className="space-y-2 flex-1 pr-8">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
    </div>
    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
  </div>
)

const SectionLabel = ({ title, badge }) => (
  <div className="flex items-center gap-2 mb-2 px-1">
    <h4 className="text-xs font-black tracking-widest uppercase text-[#00698c]">
      {title}
    </h4>
    {badge && (
      <span className="text-[10px] font-bold text-emerald-500">{badge}</span>
    )}
  </div>
)

const TabBar = ({ active, onChange }) => (
  <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-1 mb-5 overflow-x-auto">
    {TABS.map(tab => (
      <button
        key={tab.key}
        onClick={() => onChange(tab.key)}
        className={`
          flex-shrink-0 flex-1 py-1.5 text-xs font-bold rounded-md transition-all
          ${active === tab.key
            ? 'bg-white dark:bg-[#1c2128] text-[#00698c] shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
        `}
      >
        {tab.label}
      </button>
    ))}
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const SHOW_MORE_THRESHOLD = 6

const CricketSeriesPage = () => {
  const navigate = useNavigate()
  const [allSeries,  setAllSeries]  = useState([])
  const [activeTab,  setActiveTab]  = useState('all')
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [showAllLow, setShowAllLow] = useState(false)

  // Reset show more when tab changes
  useEffect(() => { setShowAllLow(false) }, [activeTab])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const result = await getSeries()
        if (cancelled) return

        const raw =
          result?.data?.seriesMapProto ||
          result?.seriesMapProto ||
          (Array.isArray(result) ? result : [])

        const now = Date.now()

        const flat = raw
          .flatMap(group => group.series || [])
          .filter(s => Number(s.endDt) >= now)
          .map(s => ({
            ...s,
            _type:     classifySeries(s.name),
            _priority: getSeriesPriority(s.name),
            _ongoing:  Number(s.startDt) <= now && Number(s.endDt) >= now,
          }))

        // Sort: ongoing first, then by priority desc, then startDt asc
        flat.sort((a, b) => {
          if (a._ongoing && !b._ongoing) return -1
          if (!a._ongoing && b._ongoing) return 1
          if (b._priority !== a._priority) return b._priority - a._priority
          return Number(a.startDt) - Number(b.startDt)
        })

        setAllSeries(flat)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load series')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Tab filter
  const filtered = useMemo(() => {
    if (activeTab === 'all') return allSeries
    return allSeries.filter(s => s._type === activeTab)
  }, [allSeries, activeTab])

  // Split into sections
  const { liveNow, comingSoon, lowPriority } = useMemo(() => {
    const now = Date.now()
    const fourteenDays = now + 14 * 24 * 60 * 60 * 1000

    return {
      liveNow: filtered.filter(s =>
        s._ongoing && s._priority >= 50
      ),
      comingSoon: filtered.filter(s =>
        !s._ongoing &&
        Number(s.startDt) <= fourteenDays &&
        s._priority >= 50
      ),
      lowPriority: filtered.filter(s =>
        s._priority < 50 ||
        Number(s.startDt) > fourteenDays
      ),
    }
  }, [filtered])

  const handleSeriesClick = (series) => {
  navigate(`/cricket/series/${series.id}`, {
    state: { seriesName: series.name }  // ← yeh add karo
  })
}

  const renderRows = (list) =>
    list.map(s => (
      <SeriesRow
        key={s.id}
        series={s}
        isOngoing={s._ongoing}
        onClick={() => handleSeriesClick(s)}
      />
    ))

  return (
    <>
      <SectionHeader title="Cricket Series" />

      <div className="mt-4">
        <TabBar active={activeTab} onChange={setActiveTab} />

        {loading && (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        )}

        {!loading && error && (
          <div className="py-10 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">Could not load series</p>
            <p className="text-gray-300 text-xs mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-10 text-center bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">No series found</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-6">

            {/* ── Live Now ── */}
            {liveNow.length > 0 && (
              <div>
                <SectionLabel title="Live Now" badge="● LIVE" />
                <div className="space-y-2">
                  {renderRows(liveNow)}
                </div>
              </div>
            )}

            {/* ── Coming Soon ── */}
            {comingSoon.length > 0 && (
              <div>
                <SectionLabel title="Coming Soon" />
                <div className="space-y-2">
                  {renderRows(comingSoon)}
                </div>
              </div>
            )}

            {/* ── All Series (low priority + far future) ── */}
            {lowPriority.length > 0 && (
              <div>
                <SectionLabel title="All Series" />
                <div className="space-y-2">
                  {renderRows(
                    showAllLow
                      ? lowPriority
                      : lowPriority.slice(0, SHOW_MORE_THRESHOLD)
                  )}
                </div>

                {lowPriority.length > SHOW_MORE_THRESHOLD && (
                  <button
                    onClick={() => setShowAllLow(v => !v)}
                    className="mt-3 w-full py-2.5 text-xs font-bold text-[#00698c] border border-[#00698c]/30 rounded-lg hover:bg-[#00698c]/5 transition-colors"
                  >
                    {showAllLow
                      ? 'Show Less ▲'
                      : `Show ${lowPriority.length - SHOW_MORE_THRESHOLD} More ▼`}
                  </button>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </>
  )
}

export default CricketSeriesPage