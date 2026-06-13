// CENTRALIZED APP CONFIG
// Feature toggles, sports tabs, nav items - change here to update everywhere

export const appConfig = {
  appName: 'SportyRadar',
  appVersion: '1.0.0',

  // Feature Toggles
  features: {
    darkMode: true,
    liveScoreTicker: true,
    socket: false, // set true when backend is ready
    search: true,
    notifications: true,
    userAuth: false,
  },

  // Navigation
  navItems: [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'Blogs', path: '/blogs' },
  ],

  // Sports tabs in header ticker
  sports: [
    { id: 'all', label: 'All', emoji: null },
    { id: 'cricket', label: 'Cricket', path: '/cricket' },
    { id: 'football', label: 'Football', path: '/football' },
    { id: 'badminton', label: 'Badminton',path: '/badminton' },
    { id: 'tennis', label: 'Tennis',  path: '/tennis' },
    { id: 'formula1', label: 'Formula 1',  path: '/formula1' },
  ],

cricketTabs: [
    {
    id: 'Home',
    label: 'Home',
    path: '/cricket',
  },

  {
    id: 'scores',
    label: 'Scores',
    path: '/cricket/live',
  },
  {
    id: 'series',
    label: 'Series',
    path: '/cricket/series',
  },

  {
    id: 'fixtures',
    label: 'Fixtures',
    path: '/cricket/fixtures',
  },

  {
    id: 'results',
    label: 'Results',
    path: '/cricket/results',
  },

  {
    id: 'news',
    label: 'News',
    path: '/cricket/news',
  },
    {
    id: 'Teams',
    label: 'Teams',
    path: '/cricket/teams',
  },
],
  // Blog categories
  blogCategories: [
    { id: 'all', label: 'All' },
    { id: 'cricket', label: 'Cricket', emoji: '🏏' },
    { id: 'football', label: 'Football', emoji: '⚽' },
    { id: 'badminton', label: 'Badminton', emoji: '🏸' },
    { id: 'tennis', label: 'Tennis', emoji: '🎾' },
    { id: 'formula1', label: 'Formula 1', emoji: '🏎️' },
  ],

  // Footer
  footer: {
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'Live Scores', path: '/cricket' },
      { label: 'News', path: '/news' },
      { label: 'Teams', path: '/cricket/teams' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Community Guidelines', path: '/guidelines' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR Compliance', path: '/gdpr' },
    ],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'facebook', url: 'https://facebook.com' },
    ],
    description: 'Your ultimate destination for real-time sports updates, in-depth analysis, and fan stories from around the globe.',
    copyright: '© 2026 SportRadar. All rights reserved.',
  },
}

export default appConfig
