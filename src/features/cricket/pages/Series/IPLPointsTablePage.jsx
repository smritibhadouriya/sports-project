// pages/IPLPointsTablePage.jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import {IPLBanner, IPLSubTabs, SkeletonLine, EmptyState, ErrorState} from '../../components/iplshared'
import { getPointsTable, getTeamFlag } from '../../../../service/ipl.api'

const FormBadge = ({ result }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-black ${
    result === 'W' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-400'
  }`}>
    {result}
  </span>
)

const PointsTableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-[#00698c]/20 rounded-t-lg mb-0.5" />
    {[1,2,3,4,5,6,7,8].map(i => (
      <div key={i} className="flex items-center gap-2 px-3 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1c2128]">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
        <SkeletonLine w="w-28" h="h-3" />
        <div className="ml-auto flex gap-4">
          {[1,2,3,4,5].map(j => <SkeletonLine key={j} w="w-6" h="h-3" />)}
        </div>
      </div>
    ))}
  </div>
)

const QUALIFY_LINE = 4

// ── Parse a single raw API team row → standings entry ─────────────────────────
function parseTeamRow(t, idx) {
  return {
    rank:       idx + 1,
    teamId:     String(t.teamId || ''),
    teamName:   t.teamFullName || t.teamName || '',
    shortName:  t.teamName     || '',
    logo:       t.teamImageId
      ? `https://static.cricbuzz.com/a/img/v1/i1/c${t.teamImageId}/i.jpg`
      : null,
    played:     t.matchesPlayed  ?? 0,
    won:        t.matchesWon     ?? 0,
    lost:       t.matchesLost    ?? 0,
    noResult:   t.matchesDrawn   ?? 0,
    points:     t.points         ?? 0,
    netRunRate: parseFloat(t.nrr) || 0,
    // form can be Array ["W","L"] or string "WL"
    form: Array.isArray(t.form)
      ? t.form.filter(c => c === 'W' || c === 'L')
      : String(t.form || '').split('').filter(c => c === 'W' || c === 'L'),
  }
}

// ── Parse raw API response → array of groups ──────────────────────────────────
// Cricbuzz returns `pointsTable` as an ARRAY — one entry per group (Group A/B...).
// We extract EVERY group so multi-group tournaments (World Cup etc.) show fully.
// Returns: [{ groupName, standings: [...teams] }, ...]
// API response shapes handled:
//   { data: { groups: [{ groupName, standings }] } }          (new backend)
//   { data: { standings: [...teams] } }                       (parsed, single group)
//   { data: { rawData: { pointsTable: [{ groupName, pointsTableInfo }] } } } (raw)
function extractGroups(data) {
  if (!data) return []

  // Case 1: new backend shape — already split into groups
  if (Array.isArray(data.groups) && data.groups.length > 0) {
    return data.groups
      .map((g, gi) => ({
        groupName: g.groupName || (data.groups.length > 1 ? `Group ${gi + 1}` : ''),
        standings: Array.isArray(g.standings) ? g.standings : [],
      }))
      .filter(g => g.standings.length > 0)
  }

  // Case 2: backend already parsed but flat (single group)
  if (Array.isArray(data.standings) && data.standings.length > 0) {
    return [{ groupName: '', standings: data.standings }]
  }

  // Case 3: raw API format nested inside rawData — map ALL groups
  const rawGroups = data?.rawData?.pointsTable
  if (Array.isArray(rawGroups) && rawGroups.length > 0) {
    return rawGroups
      .map((g, gi) => ({
        groupName: g?.groupName || (rawGroups.length > 1 ? `Group ${gi + 1}` : ''),
        standings: (g?.pointsTableInfo || []).map(parseTeamRow),
      }))
      .filter(g => g.standings.length > 0)
  }

  return []
}

// ── Single group's standings table ───────────────────────────────────────────
const PointsTableGroup = ({ groupName, standings }) => (
  <div className="mb-6 last:mb-0">
    {groupName && (
      <h3 className="text-sm font-black text-[#00698c] dark:text-cyan-400 mb-1.5 px-1">
        {groupName}
      </h3>
    )}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[540px]">
        <thead>
          <tr className="bg-[#00698c] text-white text-xs">
            <th className="px-3 py-2.5 text-left font-bold w-8">#</th>
            <th className="px-2 py-2.5 text-left font-bold">Team</th>
            <th className="px-2 py-2.5 text-center font-bold">P</th>
            <th className="px-2 py-2.5 text-center font-bold">W</th>
            <th className="px-2 py-2.5 text-center font-bold">L</th>
            <th className="px-2 py-2.5 text-center font-bold">NR</th>
            <th className="px-2 py-2.5 text-center font-bold">Pts</th>
            <th className="px-2 py-2.5 text-right font-bold">NRR</th>
            <th className="px-2 py-2.5 text-right font-bold hidden sm:table-cell">Form</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <>
              {idx === QUALIFY_LINE && (
                <tr key="divider">
                  <td colSpan={9}>
                    <div className="flex items-center gap-2 px-3 py-1">
                      <div className="flex-1 h-px bg-orange-400/50" />
                      <span className="text-[10px] text-orange-400 font-bold whitespace-nowrap">
                        ── Playoff qualification line ──
                      </span>
                      <div className="flex-1 h-px bg-orange-400/50" />
                    </div>
                  </td>
                </tr>
              )}
              <tr
                key={team.teamId || idx}
                className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  idx % 2 === 0 ? 'bg-white dark:bg-[#1c2128]' : 'bg-gray-50/40 dark:bg-[#161b22]'
                } ${idx < QUALIFY_LINE ? 'border-l-2 border-l-green-500/40' : ''}`}
              >
                <td className="px-3 py-2.5 text-xs font-bold text-gray-500 dark:text-gray-400">{idx + 1}</td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center gap-2">
                    <img
                      src={team.logo || getTeamFlag(team.shortName || team.teamName)}
                      alt={team.teamName}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                        {team.shortName || team.teamName}
                      </p>
                      <p className="text-[10px] text-gray-400 hidden sm:block">{team.teamName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-xs text-center text-gray-700 dark:text-gray-300">{team.played}</td>
                <td className="px-2 py-2.5 text-xs text-center text-green-600 dark:text-green-400 font-semibold">{team.won}</td>
                <td className="px-2 py-2.5 text-xs text-center text-red-500 font-semibold">{team.lost}</td>
                <td className="px-2 py-2.5 text-xs text-center text-gray-500">{team.noResult ?? 0}</td>
                <td className="px-2 py-2.5 text-xs text-center font-black text-gray-900 dark:text-white">{team.points}</td>
                <td className="px-2 py-2.5 text-xs text-right">
                  <span className={parseFloat(team.netRunRate) >= 0 ? 'text-green-500' : 'text-red-400'}>
                    {parseFloat(team.netRunRate) >= 0 ? '+' : ''}{Number(team.netRunRate).toFixed(3)}
                  </span>
                </td>
                <td className="px-2 py-2.5 hidden sm:table-cell">
                  <div className="flex gap-0.5 justify-end">
                    {(team.form || []).slice(-5).map((r, fi) => (
                      <FormBadge key={fi} result={r} />
                    ))}
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const IPLPointsTablePage = () => {
  const [groups,    setGroups]    = useState([])
  const [updatedAt, setUpdatedAt] = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

 const { seriesId } = useParams()

const load = async () => {
  setLoading(true)
  setError(null)
  try {
    const data = await getPointsTable(seriesId)
    const grps = extractGroups(data)
    setGroups(grps)
    setUpdatedAt(data?.updatedAt || data?.lastUpdated || null)
  } catch (e) {
    // 404 ya empty response = data nahi hai, error nahi
    const msg = e?.message || ''
    const isNotFound =
      e?.response?.status === 404 ||
      msg.includes('404') ||
      msg.includes('not found') ||
      msg.includes('No points')
    
    if (isNotFound) {
      setGroups([])  // empty dikhao, error nahi
    } else {
      setError(e.message)  // real error tabhi
    }
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { load() }, [seriesId])

  return (
    <>
      

              {loading ? (
                <PointsTableSkeleton />
              ) : error ? (
                <ErrorState onRetry={load} />
              ) : groups.length === 0 ? (
                <EmptyState
  message="Points table is not available for this match"
  icon="📊"
/>
              ) : (
                <>
                  {updatedAt && (
                    <p className="text-[10px] text-gray-400 mb-2 text-right">
                      Updated: {new Date(updatedAt).toLocaleTimeString('en-IN')}
                    </p>
                  )}

                  {groups.map((g, gi) => (
                    <PointsTableGroup
                      key={g.groupName || gi}
                      groupName={g.groupName}
                      standings={g.standings}
                    />
                  ))}

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 border-l-2 border-l-green-500 inline-block" />
                      Top {QUALIFY_LINE} qualify for playoffs
                    </span>
                    <span>P=Played · W=Won · L=Lost · NR=No Result · Pts=Points · NRR=Net Run Rate</span>
                  </div>
                </>
              )}
           

          
    </>
  )
}

export default IPLPointsTablePage