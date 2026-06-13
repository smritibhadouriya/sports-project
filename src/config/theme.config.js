// CENTRALIZED THEME CONFIG
// Changing values here updates the ENTIRE application

export const themeConfig = {
  colors: {
    primary: '#00698c',
    primaryDark: '#005470',
    primaryLight: '#3387a3',
    accent: '#e63946',
    live: '#ef4444',
    liveText: '#ffffff',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',

    light: {
      bg: '#ffffff',
      surface: '#f8fafc',
      card: '#ffffff',
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b',
      textSecondary: '#475569',
      navbar: '#0a3d4f',
      navbarText: '#ffffff',
      tickerBg: '#ffffff',
      tickerBorder: '#e2e8f0',
    },
    dark: {
      bg: '#0d1117',
      surface: '#161b22',
      card: '#1c2128',
      border: '#30363d',
      text: '#e6edf3',
      textMuted: '#8b949e',
      textSecondary: '#c9d1d9',
      navbar: '#0a1628',
      navbarText: '#ffffff',
      tickerBg: '#161b22',
      tickerBorder: '#30363d',
    },
  },

  fonts: {
    sans: "'Inter', system-ui, sans-serif",
    display: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  spacing: {
    containerMaxWidth: '1280px',
    navbarHeight: '56px',
    tickerHeight: '80px',
    sectionPadding: '24px',
    cardPadding: '16px',
    gap: '16px',
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  shadows: {
    card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    cardHover: '0 4px 12px rgba(0,0,0,0.12)',
    navbar: '0 1px 3px rgba(0,0,0,0.2)',
  },

  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    navbar: 100,
    ticker: 99,
    modal: 200,
    tooltip: 300,
  },
}

export default themeConfig
