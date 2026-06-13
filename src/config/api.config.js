// CENTRALIZED API CONFIG
// Change baseURL here to switch environments

export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.sportyradar.com/v1',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,

  endpoints: {
    // Cricket
    cricket: {
      scores: '/cricket/scores',
      liveScores: '/cricket/live',
      series: '/cricket/series',
      fixtures: '/cricket/fixtures',
      results: '/cricket/results',
      players: '/cricket/players',
      teams: '/cricket/teams',
      ipl: '/cricket/ipl',
      news: '/cricket/news',
    },
    // Blogs
    blogs: '/blogs',
    // Contact
    contact: '/contact',
    // Homepage
    home: {
      liveTicker: '/home/ticker',
      featured: '/home/featured',
      news: '/home/news',
    },
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  cdn: {
    baseUrl: 'https://cdn.sportyradar.com',
    images: '/images',
    flags: '/flags',
    teams: '/teams',
    players: '/players',
  },
}

export default apiConfig
