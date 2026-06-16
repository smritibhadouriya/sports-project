// components/ipl.shared.jsx
// ─── Shared UI pieces used across all 6 IPL pages ────────────────────────────

// ─── IPL Banner ───────────────────────────────────────────────────────────────
export const IPLBanner = ({ title, subtitle }) => (
  <div className="bg-[#00698c] text-white rounded-t-lg px-3 sm:px-4 py-2.5 flex items-center justify-between">
    <h2 className="text-sm sm:text-base font-bold tracking-wide">
      {title || 'INDIAN PREMIER LEAGUE 2026'}
    </h2>
    {subtitle && <span className="text-xs text-white/70">{subtitle}</span>}
  </div>
)

export const IPLSubTabs = ({ active, seriesId }) => {
  const navigate = useNavigate()

  // seriesId ho toh dynamic paths, warna fallback to hardcoded IPL paths
  const base = seriesId ? `/cricket/series/${seriesId}` : '/cricket/ipl'

  const SUB_TABS = [
    { label: 'Home',      path: base },
    { label: 'Matches',   path: `${base}/matches` },
    { label: 'Table',     path: `${base}/points-table` },
    { label: 'Teams',     path: `${base}/teams` },
  ]

  return (
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0">
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        {SUB_TABS.map(({ label, path }) => (
          <button
            key={label}
            type="button"
            onClick={() => path && label !== active && navigate(path)}
            className={`relative z-30 pointer-events-auto flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              active === label
                ? 'border-[#00698c] text-[#00698c]'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page shell (banner + subtabs + content slot) ─────────────────────────────
export const IPLPageShell = ({ activeTab, children }) => (
  <>
    <IPLBanner />
    <IPLSubTabs active={activeTab} />
    <div className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
      {children}
    </div>
  </>
)

// ─── Skeleton blocks ──────────────────────────────────────────────────────────
export const SkeletonLine = ({ w = 'w-full', h = 'h-4' }) => (
  <div className={`${w} ${h} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`} />
)

export const SkeletonCard = ({ rows = 3 }) => (
  <div className="p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg space-y-2 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonLine key={i} w={i === 0 ? 'w-3/4' : i === 1 ? 'w-1/2' : 'w-2/3'} />
    ))}
  </div>
)

export const SkeletonList = ({ count = 4 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
)

// ─── Empty state ──────────────────────────────────────────────────────────────
export const EmptyState = ({ message = 'No data available', icon = '📭' }) => (
  <div className="py-16 text-center">
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{message}</p>
  </div>
)

// ─── Error state (retry) ──────────────────────────────────────────────────────
export const ErrorState = ({ onRetry }) => (
  <div className="py-12 text-center">
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Something went wrong</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-[#00698c] text-sm font-semibold underline"
      >
        Try again
      </button>
    )}
  </div>
)

// ─── Match status badge ───────────────────────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const cfg = {
    live:      { label: 'Live',      cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
    upcoming:  { label: 'Upcoming',  cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    completed: { label: 'Completed', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
  }
  const { label, cls } = cfg[status?.toLowerCase()] ?? cfg.upcoming
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cls}`}>
      {status === 'live' && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />}
      {label}
    </span>
  )
}

import { useNavigate } from 'react-router-dom'
// ─── Match card (used in Matches page) ───────────────────────────────────────
import { getTeamFlag } from '../services/ipl.api.js'

export const MatchCard = ({ match, onClick }) => {
  const t1 = match?.teams?.team1 ?? {}
  const t2 = match?.teams?.team2 ?? {}
  const dateStr = match?.startTime
    ? new Date(match.startTime).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : ''

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:border-[#00698c] transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1 mr-2">
          {match?.seriesName || 'IPL 2026'} {match?.matchDesc ? `• ${match.matchDesc}` : ''}
        </span>
        <StatusBadge status={match?.status} />
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* Team 1 */}
        <div className="flex items-center gap-2 flex-1 min-w-0 ">
          <img
            src={getTeamFlag(t1.name)}
            alt={t1.name}
            className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/32/1a2a3a/FFF?text=?' }}
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{t1.shortName || t1.name}</p>
            {t1.score && <p className="text-xs text-gray-500 dark:text-gray-400">{t1.score}</p>}
          </div>
        </div>

        <span className="text-xs font-bold text-gray-400 flex-shrink-0">vs</span>

        {/* Team 2 */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{t2.shortName || t2.name}</p>
            {t2.score && <p className="text-xs text-gray-500 dark:text-gray-400">{t2.score}</p>}
          </div>
          <img
            src={getTeamFlag(t2.name)}
            alt={t2.name}
            className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/32/1a2a3a/FFF?text=?' }}
          />
        </div>
      </div>

      {/* Result / date */}
      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        {match?.result ? (
          <p className="text-xs font-semibold text-[#00698c] dark:text-[#3ab4d4] line-clamp-1">{match.result}</p>
        ) : (
          <p className="text-xs text-gray-400">{dateStr}</p>
        )}
        {match?.venue?.name && (
          <p className="text-xs text-gray-400 truncate mt-0.5">📍 {match.venue.name}</p>
        )}
      </div>
    </div>
  )
}