import axios from 'axios'
import { VITE_API_BASE_URL } from '../../config'

const BASE = `${VITE_API_BASE_URL}/cricket`

const TTL = {
  live: 2 * 60 * 1000,
  recent: 5 * 60 * 1000,
  schedule: 10 * 60 * 1000,
  matches: 10 * 60 * 1000,
  pointsTable: 5 * 60 * 1000,
  scorecard: 30 * 1000,
  matchInfo: 2 * 60 * 1000,
  players: 30 * 60 * 1000,
  photos: 10 * 60 * 1000,
  fixtures: 10 * 60 * 1000,
  series: 15 * 60 * 1000,
}

const _cache = new Map()

async function cachedGet(url, ttlMs = 60_000, params = {}) {
  const key = url + JSON.stringify(params)
  const hit = _cache.get(key)
  if (hit && Date.now() - hit.ts < ttlMs) return hit.data

  const res = await axios.get(url, { params, timeout: 12000 })
  const data = res.data?.data ?? res.data
  _cache.set(key, { data, ts: Date.now() })
  return data
}

export function clearCache(urlPattern = '') {
  if (!urlPattern) {
    _cache.clear()
    return
  }
  for (const key of _cache.keys()) {
    if (key.includes(urlPattern)) _cache.delete(key)
  }
}

export const getTeamLogo = (imageId) =>
  imageId ? `https://static.cricbuzz.com/a/img/v1/i1/c${imageId}/i.jpg` : null

const TEAM_FLAGS = {
  'Mumbai Indians': 'https://static.cricbuzz.com/a/img/v1/i1/c66951/i.jpg',
  'Chennai Super Kings': 'https://static.cricbuzz.com/a/img/v1/i1/c66952/i.jpg',
  'Royal Challengers Bengaluru': 'https://static.cricbuzz.com/a/img/v1/i1/c66953/i.jpg',
  'Royal Challengers Bangalore': 'https://static.cricbuzz.com/a/img/v1/i1/c66953/i.jpg',
  'Kolkata Knight Riders': 'https://static.cricbuzz.com/a/img/v1/i1/c66954/i.jpg',
  'Delhi Capitals': 'https://static.cricbuzz.com/a/img/v1/i1/c66955/i.jpg',
  'Punjab Kings': 'https://static.cricbuzz.com/a/img/v1/i1/c66956/i.jpg',
  'Rajasthan Royals': 'https://static.cricbuzz.com/a/img/v1/i1/c66957/i.jpg',
  'Sunrisers Hyderabad': 'https://static.cricbuzz.com/a/img/v1/i1/c66958/i.jpg',
  'Lucknow Super Giants': 'https://static.cricbuzz.com/a/img/v1/i1/c82768/i.jpg',
  'Gujarat Titans': 'https://static.cricbuzz.com/a/img/v1/i1/c82769/i.jpg',
}

export const getTeamFlag = (teamName) =>
  TEAM_FLAGS[teamName] ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName || 'TM')}&background=00698c&color=fff&size=64`

const LIVE_STATES = new Set([
  'in progress',
  'live',
  'stumps',
  'innings break',
  'ings break',
  'drinks',
  'rain',
])

const COMPLETE_STATES = new Set([
  'complete',
  'completed',
  'finished',
  'result',
])

function hasResultInStatus(status = '') {
  const s = status.toLowerCase()
  return (
    s.includes(' won') ||
    s.includes('won by') ||
    s.includes('drawn') ||
    s.includes('no result') ||
    s.includes('abandoned') ||
    s.includes('tied')
  )
}

function resolveMatchType(infoState, infoStatus, resultField, startDate) {
  const state = (infoState || '').toLowerCase()

  if (LIVE_STATES.has(state)) return 'Live'
  if (COMPLETE_STATES.has(state)) return 'Recent'

  if (hasResultInStatus(infoStatus)) return 'Recent'
  if (resultField) return 'Recent'

  if (startDate) {
    const ms = isNaN(Number(startDate))
      ? new Date(startDate).getTime()
      : Number(startDate)

    if (!isNaN(ms)) {
      const now = Date.now()
      if (ms > now) return 'Upcoming'
      if (ms < now - 12 * 60 * 60 * 1000) return 'Recent'
    }
  }

  return 'Upcoming'
}

function fmtScore(teamScore) {
  if (!teamScore) return null
  if (typeof teamScore === 'string') return teamScore
  if (typeof teamScore.score === 'string') return teamScore.score

  const parts = []
  ;['inngs1', 'inngs2'].forEach(key => {
    const inn = teamScore[key]
    if (!inn || inn.runs == null) return
    const wkts = inn.wickets != null ? `/${inn.wickets}` : ''
    const ovs = inn.overs != null ? ` (${inn.overs})` : ''
    parts.push(`${inn.runs}${wkts}${ovs}`)
  })

  return parts.length ? parts.join(' & ') : null
}

function normalizeMatch(raw) {
  if (!raw) return null

  if (raw.matchId && raw.team1 && raw.rawData) {
    const info = raw.rawData.matchInfo || {}
    const score = raw.rawData.matchScore || {}
    const matchType = resolveMatchType(info.state, info.status, raw.result, raw.startDate)

    return {
      matchId: String(raw.matchId),
      seriesId: raw.seriesId,
      seriesName: raw.seriesName || info.seriesName || '',
      matchDesc: raw.matchDesc || info.matchDesc || '',
      matchFormat: raw.matchFormat || info.matchFormat || '',
      startDate: raw.startDate || null,
      state: info.state || '',
      status: info.status || '',
      result: matchType === 'Recent'
        ? (raw.result || info.status || null)
        : null,
      type: matchType,
      team1: {
        teamId: raw.team1.teamId,
        name: info.team1?.teamName || raw.team1.teamName || raw.team1.teamSName || '',
        shortName: info.team1?.teamSName || raw.team1.teamSName || '',
        logo: getTeamLogo(raw.team1.imageId || info.team1?.imageId),
        score: fmtScore(score.team1Score),
      },
      team2: {
        teamId: raw.team2.teamId,
        name: info.team2?.teamName || raw.team2.teamName || raw.team2.teamSName || '',
        shortName: info.team2?.teamSName || raw.team2.teamSName || '',
        logo: getTeamLogo(raw.team2.imageId || info.team2?.imageId),
        score: fmtScore(score.team2Score),
      },
      venue: raw.venue
        ? { ground: raw.venue.name, city: raw.venue.city }
        : info.venueInfo
          ? { ground: info.venueInfo.ground, city: info.venueInfo.city }
          : null,
    }
  }

  const info = raw.matchInfo || {}
  const score = raw.matchScore || {}
  const toISO = (ms) => ms ? new Date(Number(ms)).toISOString() : null

  const matchType = resolveMatchType(
    info.state,
    info.status,
    info.result,
    info.startDate
  )

  return {
    matchId: info.matchId,
    seriesId: info.seriesId,
    seriesName: info.seriesName || '',
    matchDesc: info.matchDesc || '',
    matchFormat: info.matchFormat || '',
    startDate: toISO(info.startDate),
    endDate: toISO(info.endDate),
    state: info.state || '',
    status: info.status || '',
    result: matchType === 'Recent'
      ? (info.result || info.status || null)
      : null,
    type: matchType,
    team1: {
      teamId: info.team1?.teamId,
      name: info.team1?.teamName || '',
      shortName: info.team1?.teamSName || '',
      logo: getTeamLogo(info.team1?.imageId),
      score: fmtScore(score.team1Score),
    },
    team2: {
      teamId: info.team2?.teamId,
      name: info.team2?.teamName || '',
      shortName: info.team2?.teamSName || '',
      logo: getTeamLogo(info.team2?.imageId),
      score: fmtScore(score.team2Score),
    },
    venue: info.venueInfo
      ? { ground: info.venueInfo.ground, city: info.venueInfo.city }
      : null,
  }
}

function normalizeMatches(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(normalizeMatch).filter(Boolean)
  if (Array.isArray(raw.matches)) return raw.matches.map(normalizeMatch).filter(Boolean)

  if (Array.isArray(raw.typeMatches)) {
    const matches = []
    raw.typeMatches.forEach(typeGroup => {
      typeGroup.seriesMatches?.forEach(series => {
        ;(series.seriesAdWrapper?.matches || []).forEach(m => matches.push(m))
      })
    })
    return matches.map(normalizeMatch).filter(Boolean)
  }

  return []
}

function splitByType(matches) {
  return {
    live: matches.filter(m => m.type === 'Live'),
    recent: matches.filter(m => m.type === 'Recent'),
    upcoming: matches.filter(m => m.type === 'Upcoming'),
  }
}

const SKIP_SERIES = [
  'county championship',
  'county division',
  'sheffield shield',
  'inter-provincial',
  'provincial',
  'national cricket league',
  'plunket shield',
  'four-day franchise',
  'csa t20',
  'ncl ',
  'east asia pacific',
  'club',
  'grade',
  'world cup league',        // ← NEW
  'world cup qualifier',     // ← NEW
  'world cup super league',  // ← NEW
  'u19',                     // ← NEW
  'under-19',                // ← NEW
  'under 19',                // ← NEW
  'emerging',                // ← NEW
  'a tour',                  // ← NEW
]

function isImportantMatch(match) {
  if (!match) return false
  const name = (match.seriesName || match.matchDesc || '').toLowerCase()
  
  // Block karo ye sab
  const blocked = [
    'u19', 'under-19', 'under 19', 'u-19',
    'emerging', 'a tour', ' a vs ',
    'world cup league', 'world cup qualifier', 'world cup super league',
    'county championship', 'county division', 'sheffield shield',
    'inter-provincial', 'provincial', 'plunket shield',
    'four-day franchise', 'ncl ', 'east asia pacific',
    'club', 'grade', 'regional',
  ]
  if (blocked.some(b => name.includes(b))) return false

  // Allow karo ye sab
  const allowed = [
    // Leagues
    'indian premier league', 'ipl',
    'big bash', 'bbl', 'psl', 'cpl', 'sa20',
    'hundred', 't20 blast', 'ilt20', 'bpl', 'lpl',
    // ICC events
    'icc', 't20 world cup', 'odi world cup', 'champions trophy',
    'world test championship', 'world cup',
    // International teams — inke matches automatically aayenge
    'india', 'australia', 'england', 'pakistan',
    'south africa', 'new zealand', 'west indies',
    'sri lanka', 'bangladesh', 'afghanistan',
    'zimbabwe', 'ireland', 'scotland', 'netherlands',
  ]
  return allowed.some(s => name.includes(s))
}

export async function getAllMatches() {
  const [liveRaw, recentRaw, upcomingRaw, iplRaw] = await Promise.all([
    cachedGet(`${BASE}/live`, TTL.live).catch(() => null),
    cachedGet(`${BASE}/recent`, TTL.recent).catch(() => null),
    cachedGet(`${BASE}/upcoming`, TTL.schedule).catch(() => null),
    cachedGet(`${BASE}/ipl/live`, TTL.live).catch(() => null),
  ])

  const liveMatches = normalizeMatches(liveRaw).filter(isImportantMatch)
  const recentMatches = normalizeMatches(recentRaw).filter(isImportantMatch)
  const upcomingMatches = normalizeMatches(upcomingRaw).filter(isImportantMatch)

  const iplRecent = normalizeMatches(iplRaw?.recent || [])
  const finalRecent = recentMatches.length
    ? recentMatches
    : iplRecent.filter(isImportantMatch)

  return { live: liveMatches, recent: finalRecent, upcoming: upcomingMatches }
}

export async function getAllMatchFeeds() { return getAllMatches() }
export async function getLiveMatches() { return normalizeMatches(await cachedGet(`${BASE}/live`, TTL.live)) }
export async function getRecentMatches(limit) {
  return normalizeMatches(
    await cachedGet(`${BASE}/recent`, TTL.recent, limit ? { limit } : {})
  )
}
export async function getSchedule(limit) {
  return normalizeMatches(
    await cachedGet(`${BASE}/upcoming`, TTL.schedule, limit ? { limit } : {})
  )
}
export async function getIPLMatches() {
  const raw = await cachedGet(`${BASE}/ipl/live`, TTL.live)
  return {
    live: normalizeMatches(raw?.live || []),
    recent: normalizeMatches(raw?.recent || []),
    upcoming: normalizeMatches(raw?.upcoming || []),
  }
}
export async function getIPLTeams() {
  const data = await cachedGet(`${BASE}/ipl/teams`, TTL.players)
  return data?.teams || data || []
}
export async function getPlayers(team = '') {
  const data = await cachedGet(`${BASE}/ipl/players`, TTL.players, team ? { team } : {})
  return data?.players || data || []
}
export async function getPhotos(matchId = '') {
  const url = matchId ? `${BASE}/ipl/photos/${matchId}` : `${BASE}/ipl/photos`
  return (await cachedGet(url, TTL.photos))?.photos || []
}
export async function getIPLPlayerDetail(playerId) {
  return cachedGet(`${BASE}/ipl/player/${playerId}`, TTL.players)
}
export async function getPointsTable(seriesId) {
  return seriesId
    ? cachedGet(`${BASE}/series/${seriesId}/points-table`, TTL.pointsTable)
    : cachedGet(`${BASE}/ipl/points-table`, TTL.pointsTable)
}
export async function getSeriesMatches(seriesId) {
  const data = await cachedGet(`${BASE}/series/${seriesId}`, TTL.matches)

  if (data?.live || data?.recent || data?.upcoming) {
    const liveMatches = normalizeMatches(data.live || [])
    const recentMatches = normalizeMatches(data.recent || [])
    const upcomingMatches = normalizeMatches(data.upcoming || [])

    return {
      live: liveMatches.filter(m => m.type === 'Live'),
      recent: [
        ...recentMatches.filter(m => m.type === 'Recent'),
        ...upcomingMatches.filter(m => m.type === 'Recent'),
      ],
      upcoming: upcomingMatches.filter(m => m.type === 'Upcoming'),
    }
  }

  return splitByType(normalizeMatches(data))
}

export async function getSeriesDetail(seriesId) {
  const data = await cachedGet(`${BASE}/series/${seriesId}`, TTL.matches)

  const { live, recent, upcoming } = (data?.live || data?.recent || data?.upcoming)
    ? {
        live: normalizeMatches(data.live || []),
        recent: normalizeMatches(data.recent || []),
        upcoming: normalizeMatches(data.upcoming || []),
      }
    : splitByType(normalizeMatches(data))

  // ── seriesName nikalo matches se ──────────────────────
  const allMatches = [...live, ...recent, ...upcoming]
  const seriesName =
    data?.seriesName ||
    allMatches[0]?.seriesName ||  // ← pehle match se lo
    ''

  return {
    seriesId: data?.seriesId || seriesId,
    seriesName,
    matchFormat: data?.matchFormat || '',
    live,
    recent,
    upcoming,
    total: data?.total || (live.length + recent.length + upcoming.length),
  }
}
export async function getSeriesTeams(seriesId) {
  try {
    const { live, recent, upcoming } = await getSeriesMatches(seriesId)
    const teamsMap = new Map()

    ;[...live, ...recent, ...upcoming].forEach(match => {
      ;[match.team1, match.team2].forEach(team => {
        if (!team?.name) return
        const key = team.teamId || team.name
        if (!teamsMap.has(key)) {
          teamsMap.set(key, {
            teamId: team.teamId || team.name,
            name: team.name,
            shortName: team.shortName || team.name,
            logo: team.logo || getTeamFlag(team.name),
          })
        }
      })
    })

    return Array.from(teamsMap.values())
  } catch (err) {
    console.error('Failed to fetch series teams:', err)
    return []
  }
}
export async function getSeries() {
  const data = await cachedGet(`${BASE}/series`, TTL.series)
  return data?.series || data || []
}
export async function getMatchInfo(matchId) {
  if (!matchId) return null
  return cachedGet(`${BASE}/match/${matchId}`, TTL.matchInfo)
}
export async function getScorecard(matchId) {
  const res = await axios.get(`${BASE}/scorecard/${matchId}`, { timeout: 12000 })
  const raw = res.data?.data
  if (!raw?.scorecard?.length) return null

  return {
    innings: raw.scorecard.map(inn => ({
      teamName: inn.batteamname || '',
      score: inn.score ?? 0,
      wickets: inn.wickets ?? 0,
      overs: inn.overs ?? 0,
      extras: inn.extras?.total ?? 0,
      batters: (inn.batsman || [])
        .filter(b => b.balls > 0 || (b.outdec && b.outdec !== ''))
        .map(b => ({
          id: b.id,
          name: b.name,
          runs: b.runs,
          balls: b.balls,
          fours: b.fours,
          sixes: b.sixes,
          strikeRate: b.strkrate,
          dismissal: b.outdec === 'not out' ? 'not out' : (b.outdec || ''),
        })),
      bowlers: (inn.bowler || []).map(b => ({
        id: b.id,
        name: b.name,
        overs: b.overs,
        maidens: b.maidens,
        runs: b.runs,
        wickets: b.wickets,
        economy: b.economy,
      })),
      wicketsFall: (inn.fow?.fow || []).map((w, i) => ({
        batName: w.batsmanname,
        wktRuns: w.runs,
        wktNbr: i + 1,
        wktOvr: w.overnbr,
      })),
    })),
    status: raw.status || null,
    toss: raw.toss || null,
    playerOfMatch: raw.playerOfMatch || null,
  }
}
export async function getAllTeams() {
  const data = await cachedGet(`${BASE}/teams`, TTL.players)
  return data?.teams || data || []
}
export async function getSeriesTeamsById(seriesId) {
  if (!seriesId) return []
  const data = await cachedGet(`${BASE}/series/${seriesId}/teams`, TTL.players)
  return (data?.teams || data || []).map(team => ({
    ...team,
    logo:
      team.logo ||
      getTeamLogo(team.imageId) ||
      getTeamFlag(team.teamName || team.name),
  }))
}
export async function getTeamPlayers(teamId) {
  if (!teamId) return []
  const data = await cachedGet(`${BASE}/teams/${teamId}/players`, TTL.players)
  return (data?.players || data || []).map(player => ({
    ...player,
    imageUrl:
      player.imageUrl ||
      player.faceImageId
        ? `https://static.cricbuzz.com/a/img/v1/152x152/i1/c${player.faceImageId}/i.jpg`
        : null,
  }))
}
export async function getTeamPlayersById(teamId) {
  const data = await cachedGet(`${BASE}/teams/${teamId}/players`, TTL.players)
  return data?.players || data || []
}
export function mergePlayerDetail(base, detail) {
  if (!detail) return base
  return { ...base, ...detail, imageUrl: detail.imageUrl || base.imageUrl, role: detail.role || base.role }
}
export async function getRankings(matchType = 't20') {
  return cachedGet(`${BASE}/rankings/all`, TTL.matches, { matchType })
}

export async function getFixtures() {
  const raw = await cachedGet(`${BASE}/upcoming`, TTL.fixtures)

  return normalizeMatches(raw)
    .filter(Boolean)
    .filter(match => match.type === 'Upcoming')
}
