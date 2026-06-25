
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
    if (import.meta.env.DEV) {
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