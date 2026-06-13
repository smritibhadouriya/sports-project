// export const IMPORTANT_SERIES_KEYWORDS = [
//   'india',
//   'world cup',
//   'champions trophy',
//   'asia cup',
//   'indian premier league',
//   'ipl',
//   'the hundred',
//   'big bash',
//   'bbl',
//   'psl',
//   'sa20',
//   'major league cricket',
// ]

import { NODE_ENV } from "../../../../config"

// export const IGNORE_SERIES_KEYWORDS = [
//   'qualifier',
//   'sub regional',
//   'league two',
//   'warm-up',
//   'division',
//   'plate',
//   'emerging',
//   'u19',
//   'a tour',
//   'women u19',
// ]

// export const isImportantSeries = (name = '') => {
//   const lower = name.toLowerCase()

//   // Ignore unwanted
//   if (
//     IGNORE_SERIES_KEYWORDS.some(keyword =>
//       lower.includes(keyword)
//     )
//   ) {
//     return false
//   }

//   // Allow important
//   return IMPORTANT_SERIES_KEYWORDS.some(keyword =>
//     lower.includes(keyword)
//   )
// }

// export const getSeriesYear = (name = '') => {
//   // 2023-27
//   const rangeMatch = name.match(/(20\d{2})-(\d{2,4})/)

//   if (rangeMatch) {
//     return `${rangeMatch[1]}-${rangeMatch[2]}`
//   }

//   // single year
//   const yearMatch = name.match(/\b(20\d{2})\b/)

//   return yearMatch ? yearMatch[1] : ''
// }

// export const shortTeamName = (team = '') => {
//   const map = {
//     india: 'IND',
//     england: 'ENG',
//     australia: 'AUS',
//     pakistan: 'PAK',
//     bangladesh: 'BAN',
//     'sri lanka': 'SL',
//     'south africa': 'SA',
//     'new zealand': 'NZ',
//     'west indies': 'WI',
//     afghanistan: 'AFG',
//     ireland: 'IRE',
//     zimbabwe: 'ZIM',
//   }

//   const lower = team
//     .toLowerCase()
//     .replace(/women|a|u19/gi, '')
//     .replace(/[^\w\s]/g, '')
//     .replace(/\s+/g, ' ')
//     .trim()

//   return map[lower] || lower.slice(0, 3).toUpperCase()
// }

// export const formatSeriesName = (name = '') => {
//   const lower = name.toLowerCase()
//   const year = getSeriesYear(name)

//   // IPL
//   if (
//     lower.includes('indian premier league') ||
//     lower.includes('ipl')
//   ) {
//     return `IPL ${year}`
//   }

//   // World Cup
//   if (lower.includes('world cup')) {
//     return `World Cup ${year}`
//   }

//   // Champions Trophy
//   if (lower.includes('champions trophy')) {
//     return `Champions Trophy ${year}`
//   }

//   // Asia Cup
//   if (lower.includes('asia cup')) {
//     return `Asia Cup ${year}`
//   }

//   // Tour series
//   if (lower.includes('tour of')) {
//     const parts = name.split('tour of')

//     const team1 = parts[0]
//       ?.replace(/women|a|u19|,\s*\d+.*/gi, '')
//       .trim()

//     const team2 = parts[1]
//       ?.replace(/women|a|u19|,\s*\d+.*/gi, '')
//       .trim()

//     return `${shortTeamName(team1)} vs ${shortTeamName(team2)} ${year}`
//   }

//   // fallback
//   return `${name.replace(/,\s*\d+.*/g, '').trim()} ${year}`
// }




// ─── Team abbreviation map ────────────────────────────────────────────────────
export const TEAM_ABBR_MAP = {
  'india': 'IND',
  'england': 'ENG',
  'australia': 'AUS',
  'pakistan': 'PAK',
  'bangladesh': 'BAN',
  'afghanistan': 'AFG',
  'sri lanka': 'SL',
  'south africa': 'SA',
  'new zealand': 'NZ',
  'west indies': 'WI',
  'ireland': 'IRE',
  'zimbabwe': 'ZIM',
  'netherlands': 'NED',
  'scotland': 'SCO',
  'namibia': 'NAM',
  'nepal': 'NEP',
  'uae': 'UAE',
  'united arab emirates': 'UAE',
  'kenya': 'KEN',
  'canada': 'CAN',
  'usa': 'USA',
  'united states of america': 'USA',
  'united states': 'USA',
  'oman': 'OMA',
  'hong kong': 'HK',
  'png': 'PNG',
  'papua new guinea': 'PNG',
  'singapore': 'SGP',
  'malaysia': 'MAS',
  'bermuda': 'BER',
  'denmark': 'DEN',
  'italy': 'ITA',
  'germany': 'GER',
  'jersey': 'JER',
  'guernsey': 'GUE',
  'bahrain': 'BHR',
  'kuwait': 'KUW',
  'saudi arabia': 'KSA',
  'east africa': 'EAF',
}

export const shortTeamName = (team = '') => {
  const raw = team.trim()

  const isWomen = /\bwomen\b/i.test(raw)
  const isU19   = /\bu-?19\b/i.test(raw)
  const isA     = /\b[Aa]\b/.test(raw) && !isWomen && !isU19

  const baseName = raw
    .replace(/\bwomen\b/gi, '')
    .replace(/\bu-?19\b/gi, '')
    .replace(/\s+[Aa]\s*$/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

  const abbr = TEAM_ABBR_MAP[baseName]

  if (!abbr) {
    if (NODE_ENV !== 'production') {
      console.warn(`[shortTeamName] Unrecognized team: "${raw}" (normalized: "${baseName}")`)
    }
    return null
  }

  let result = abbr
  if (isWomen) result += '-W'
  if (isU19)   result += '-U19'
  if (isA)     result += '-A'

  return result
}

export const getSeriesYear = (name = '') => {
  const rangeMatch = name.match(/(20\d{2})[–\-](\d{2,4})/)
  if (rangeMatch) return `${rangeMatch[1]}-${rangeMatch[2]}`
  const yearMatch = name.match(/\b(20\d{2})\b/)
  return yearMatch ? yearMatch[1] : ''
}

const ICC_RULES = [
  { test: /\bwtc\b|world test championship/i,                        label: 'WTC'              },
  { test: /icc.{0,20}women.{0,10}t20.{0,10}world cup/i,             label: "Women's T20 WC"   },
  { test: /icc.{0,20}women.{0,10}world cup/i,                        label: "Women's WC"       },
  { test: /\bt20 world cup\b|icc.{0,10}men.{0,10}t20 world cup/i,   label: 'T20 World Cup'    },
  { test: /world cup/i,                                               label: 'World Cup'        },
  { test: /champions trophy/i,                                        label: 'Champions Trophy' },
  { test: /\basia cup\b/i,                                            label: 'Asia Cup'         },
  { test: /u-?19.{0,10}world cup/i,                                  label: 'U19 World Cup'    },
  { test: /women.{0,10}world cup/i,                                   label: "Women's WC"       },
]

const LEAGUE_RULES = [
  { test: /indian premier league|\bipl\b/i,    label: 'IPL'           },
  { test: /big bash league|\bbbl\b/i,           label: 'BBL'           },
  { test: /pakistan super league|\bpsl\b/i,     label: 'PSL'           },
  { test: /\bsa20\b/i,                          label: 'SA20'          },
  { test: /the hundred/i,                       label: 'The Hundred'   },
  { test: /major league cricket|\bmlc\b/i,      label: 'MLC'           },
  { test: /\bcpl\b|caribbean premier league/i,  label: 'CPL'           },
  { test: /\bilt20\b/i,                         label: 'ILT20'         },
  { test: /lanka premier league|\blpl\b/i,      label: 'LPL'           },
  { test: /bangladesh premier league|\bbpl\b/i, label: 'BPL'           },
  { test: /super smash/i,                       label: 'Super Smash'   },
  { test: /sheffield shield/i,                  label: 'Sheffield Shield' },
  { test: /vitality blast/i,                    label: 'Vitality Blast'   },
]

const parseTriseries = (name) => {
  const triMatch = name.match(
    /^(.+?),\s*(.+?)\s+(?:and|&)\s+(.+?)\s+(?:tri[-\s]?(?:series|nation)|series)/i
  )
  if (!triMatch) return null
  const teams = [triMatch[1], triMatch[2], triMatch[3]].map(shortTeamName).filter(Boolean)
  if (teams.length < 2) return null
  return teams.join(' vs ')
}

const truncateSeriesName = (name = '', maxLen = 22) => {
  const cleaned = name.replace(/,\s*\d+.*/g, '').trim()
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen - 1).trimEnd() + '…' : cleaned
}

export const formatSeriesName = (name = '') => {
  for (const rule of ICC_RULES) {
    if (rule.test.test(name)) return rule.label
  }

  for (const rule of LEAGUE_RULES) {
    if (rule.test.test(name)) return rule.label
  }

  const tri = parseTriseries(name)
  if (tri) return tri

 if (/tour of/i.test(name)) {
  const [visitorRaw, hostRaw] = name.split(/tour of/i)

 const visitor = shortTeamName(
  visitorRaw?.replace(/\b20\d{2}\b/, '').trim() ?? ''
)
const host = shortTeamName(
  hostRaw?.replace(/,.*$/, '').replace(/\b20\d{2}\b/, '').trim() ?? ''
)

  if (!visitor || !host) return truncateSeriesName(name)

  return `${visitor} vs ${host}`
}
  return truncateSeriesName(name)
}

export const IGNORE_SERIES_KEYWORDS = [
  'qualifier',
  'sub regional',
  'league two',
  'warm-up',
  'warmup',
  'division two',
  'division 2',
  'plate ',
  'emerging',
  'women u19',
  'u19',
  'a tour',
  'practice match',
  'intra-squad',
]

export const IMPORTANT_SERIES_KEYWORDS = [
  'world cup', 'champions trophy', 'asia cup', 'world test championship', 'wtc',
  't20 world cup',
  'indian premier league', 'ipl', 'big bash', 'bbl', 'pakistan super league',
  'psl', 'sa20', 'the hundred', 'major league cricket', 'mlc', 'cpl', 'lpl',
  'bpl', 'ilt20',
]

const RECOGNISED_NATIONS = new Set(Object.keys(TEAM_ABBR_MAP))

export const isImportantSeries = (name = '') => {
  const lower = name.toLowerCase()

  if (IGNORE_SERIES_KEYWORDS.some(kw => lower.includes(kw))) return false

  if (IMPORTANT_SERIES_KEYWORDS.some(kw => lower.includes(kw))) return true

  if (/tour of/i.test(lower)) {
    const [visitorRaw, hostRaw] = lower.split(/tour of/i)
    const visitorBase = visitorRaw
      .replace(/\bwomen\b/gi, '').replace(/\bu-?19\b/gi, '').replace(/\b[Aa]\b/g, '').trim()
    const hostBase = (hostRaw ?? '')
      .replace(/,.*$/, '').replace(/\bwomen\b/gi, '').replace(/\bu-?19\b/gi, '').trim()
    if (RECOGNISED_NATIONS.has(visitorBase) && RECOGNISED_NATIONS.has(hostBase)) return true
  }

  return false
}