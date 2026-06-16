import { useRef, useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import BlogsSection from '../../../shared/components/BlogsSection'
import { IPLBanner, IPLSubTabs } from '../components/iplshared'
import { getSeriesDetail } from '../../../service/ipl.api'

const getActiveTab = (pathname) => {
  if (pathname.includes('/scorecard'))    return 'Scorecard'
  if (pathname.includes('/matches'))      return 'Matches'
  if (pathname.includes('/points-table')) return 'Table'
  if (pathname.includes('/photos'))       return 'Photos'
  if (pathname.includes('/teams'))        return 'Teams'
  return 'Home'
}

const IPLLayout = () => {
  const location = useLocation()
  const { pathname, state } = location
  const { seriesId } = useParams()

  const [seriesName, setSeriesName] = useState('')

  // fallback name
  const fallbackSeriesName =
    location.state?.seriesName ||
    sessionStorage.getItem(`series-${seriesId}`) ||
    `Series ${seriesId}`

  const active = getActiveTab(pathname)
  const outletRef = useRef(null)

  // Load actual series name
  useEffect(() => {
    const loadSeries = async () => {
      try {
        const data = await getSeriesDetail(seriesId)

        if (data?.seriesName) {
          setSeriesName(data.seriesName)

          // save for refresh support
          sessionStorage.setItem(
            `series-${seriesId}`,
            data.seriesName
          )
        }
      } catch (err) {
        console.error('Failed to load series name', err)
      }
    }

    if (seriesId) {
      loadSeries()
    }
  }, [seriesId])



  return (
    <>
      <IPLBanner


// NAYA
title={seriesName || fallbackSeriesName || `Series ${seriesId}`}
      />

      <IPLSubTabs
        active={active}
        seriesId={seriesId}
      />

      <div
        ref={outletRef}
        className="bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg p-3 sm:p-4"
      >
       <Outlet context={{ seriesId }} />
      </div>

      <div className="hidden lg:block lg:w-[20%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsSection />
      </div>
    </>
  )
}

export default IPLLayout