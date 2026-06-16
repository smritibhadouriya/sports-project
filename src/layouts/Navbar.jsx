import { memo, useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useTheme } from '@/core/providers/ThemeProvider'
import { appConfig } from '@/config/app.config'

import navLogo from '@/assets/NavLogo.png'

import { formatSeriesName } from '@/features/cricket/utils/series.utils'
import { getAllMatches } from '@/service/ipl.api'

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth="2" />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
    />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeWidth="2"
      strokeLinecap="round"
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

const BLOCKED = [
  'county', 'sheffield shield', 'plunket shield',
  'inter-provincial', 'provincial', 'four-day franchise',
  'ncl', 'east asia pacific', 'club', 'grade', 'regional',
  'world cup league', 'world cup qualifier',
  'world cup super league', 'challenge league',
  'u19', 'under-19', 'under 19', 'u-19',
  'emerging', 'a tour', 'warm-up', 'warmup',
  'practice match', 'intra-squad',
  'vitality blast', 't20 blast', 'one-day cup',
  'royal london', 'domestic',
  'acc women', 'premier cup',
  'malaysia', 'singapore', 'thailand',
]

const ALLOWED = [
  'world cup', 'champions trophy', 'asia cup',
  'world test championship', 'wtc', 't20 world cup',
  'indian premier league', 'ipl', 'big bash', 'bbl',
  'pakistan super league', 'psl', 'sa20', 'the hundred',
  'major league cricket', 'mlc', 'cpl', 'ilt20', 'lpl', 'bpl',
  'india', 'australia', 'england', 'pakistan',
  'south africa', 'new zealand', 'west indies',
  'sri lanka', 'bangladesh', 'afghanistan',
  'zimbabwe', 'ireland',
]

function getNavLabel(series) {
  const formatted = formatSeriesName(series.name)

  const KNOWN_SHORT = [
    'IPL','BBL','PSL','WTC','SA20','CPL','MLC','ILT20','LPL','BPL',
    'World Cup','Champions Trophy','Asia Cup','T20 World Cup',
    "Women's T20 WC","Women's WC",'The Hundred'
  ]

  const isRawName =
    formatted.length > 15 ||
    (!formatted.includes('vs') && !KNOWN_SHORT.includes(formatted))

  if (isRawName && series.team1ShortName && series.team2ShortName) {
    return `${series.team1ShortName} vs ${series.team2ShortName}`
  }

  return formatted
}


function isNavbarSeries(seriesName = '') {
  const name = seriesName.toLowerCase()

  // Pehle hard block karo — ye kabhi nahi aane chahiye
  const hardBlocked = [
    'warm-up', 'warmup', 'practice match', 'intra-squad',
    'u19', 'under-19', 'a tour', 'emerging',
  ]
  if (hardBlocked.some(b => name.includes(b))) return false

  // Soft block — county, regional etc
  const softBlocked = [
    'county', 'sheffield shield', 'plunket shield',
    'inter-provincial', 'provincial', 'four-day franchise',
    'ncl', 'east asia pacific', 'club', 'grade', 'regional',
    'world cup league', 'world cup qualifier',
    'world cup super league', 'challenge league',
    'vitality blast', 't20 blast', 'one-day cup',
    'royal london', 'domestic',
    'acc women', 'premier cup',
    'malaysia', 'singapore', 'thailand',
  ]
  if (softBlocked.some(b => name.includes(b))) return false

  return ALLOWED.some(a => name.includes(a))
}

// ─── Series priority (World Cup > IPL > Bilateral) ────────────────────────────
const PRIORITY_KEYWORDS = [
  'world cup',           // priority 0 — sabse upar
  't20 world cup',
  'champions trophy',
  'asia cup',
  'world test championship', 'wtc',
  'indian premier league', 'ipl',
  'big bash', 'bbl',
  'pakistan super league', 'psl',
  'sa20', 'cpl', 'ilt20', 'lpl', 'bpl', 'the hundred',
]

function getSeriesPriority(name = '') {
  const n = name.toLowerCase()
  const idx = PRIORITY_KEYWORDS.findIndex(k => n.includes(k))
  return idx === -1 ? 999 : idx
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const Navbar = memo(() => {
  const { theme, toggleTheme } = useTheme()

  const [menuOpen, setMenuOpen] = useState(false)
  const [seriesData, setSeriesData] = useState([])

  // ───────────────────────────────────────────────────────────
  // Fetch
  // ───────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { live, recent, upcoming } = await getAllMatches()

        // Live pehle, phir recent, phir upcoming — priority order
        const all = [...live, ...recent, ...upcoming]

        const seen = new Set()
        const uniqueSeries = []

        for (const match of all) {
          if (!match.seriesId || seen.has(match.seriesId)) continue
          if (!isNavbarSeries(match.seriesName)) continue

          seen.add(match.seriesId)
       uniqueSeries.push({
  id: match.seriesId,
  name: match.seriesName,
  team1ShortName: match.team1?.shortName || '',
  team2ShortName: match.team2?.shortName || '',
})
        }

        uniqueSeries.sort((a, b) => getSeriesPriority(a.name) - getSeriesPriority(b.name))
setSeriesData(uniqueSeries)
      } catch (err) {
        console.error('[Navbar] Failed to fetch matches:', err)
      }
    }

    fetchMatches()
  }, [])

  // ───────────────────────────────────────────────────────────
  // Nav Items
  // ───────────────────────────────────────────────────────────

  const navItems = useMemo(() => {
    const seriesItems = seriesData
      .slice(0, 4)
      .map(series => ({
        label: getNavLabel(series),
        path: `/cricket/series/${series.id}`,
      }))

    return [...seriesItems, ...appConfig.navItems]
  }, [seriesData])

  // ───────────────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────────────

  return (
    <nav className="sticky top-0 left bg-[#0a3d4f] dark:bg-[#0a1628] text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img
              src={navLogo}
              alt="SportlyRadar"
              className="h-9 w-auto object-contain sm:h-10"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 hover:text-white/90 ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {appConfig.features.darkMode && (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors duration-150"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {appConfig.features.darkMode && (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

      </div>
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar