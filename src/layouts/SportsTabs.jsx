import { memo } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { appConfig } from '@/config/app.config'
import LiveTicker from './LiveTicker'
import SportTabsList from './SportsTabList'

const SportsTabs = memo(({ hideTickerOnTop = false }) => {
  const location = useLocation()
  const [tickerVisible, setTickerVisible] = useState(!hideTickerOnTop)
  const [manuallyHidden, setManuallyHidden] = useState(false)

  useEffect(() => {
    if (!hideTickerOnTop) return

    const handleScroll = () => {
      if (!manuallyHidden) {
        setTickerVisible(window.scrollY < 10)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideTickerOnTop, manuallyHidden])

  const handleToggleTicker = () => {
    setManuallyHidden((prev) => !prev)
    setTickerVisible((prev) => !prev)
  }

  return (
    <div className="bg-[#011E28] dark:bg-[#011E28]">

      {/* Ticker + Hide Button Row */}
      <div className="relative">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            tickerVisible ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <LiveTicker />
        </div>
      </div>
  

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
         {/* Toggle Button */}
        <button
          onClick={handleToggleTicker}
          title={tickerVisible ? 'Hide Live Ticker' : 'Show Live Ticker'}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <span>{tickerVisible ? '▲ Hide' : '▼ Live'}</span>
        </button>
        
        <SportTabsList
          sports={appConfig.sports}
          scrollable
          textSize="text-sm"
          activeClass="bg-[#00698c] text-white"
          inactiveClass="text-white/80 hover:bg-white/10 hover:text-white"
        />
        
      </div>
    </div>
  )
})

SportsTabs.displayName = 'SportsTabs'
export default SportsTabs