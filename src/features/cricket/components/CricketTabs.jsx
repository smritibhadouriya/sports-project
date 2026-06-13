import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { appConfig } from '../../../config/app.config'
import { formatSeriesName } from '../utils/series.utils'
const CricketTabs = memo(({ liveSeries = [] }) => {
  const location = useLocation()
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b22] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center overflow-x-auto scrollbar-hide gap-0">

          {appConfig.cricketTabs.map((tab) => {
             const isActive = location.pathname === tab.path

            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={`flex-shrink-0 px-4 py-3 text-sm  relative z-30 pointer-events-auto flex items-center gap-2 font-medium border-b-2 transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'border-[#00698c] text-[#00698c]'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </NavLink>
            )
          })}

        </div>
      </div>
    </div>
  )
})

CricketTabs.displayName = 'CricketTabs'

export default CricketTabs