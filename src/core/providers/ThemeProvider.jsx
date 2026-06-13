import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { appConfig } from '@/config/app.config'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (!appConfig.features.darkMode) return 'light'
    return localStorage.getItem('sr_theme') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('sr_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    if (!appConfig.features.darkMode) return
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
