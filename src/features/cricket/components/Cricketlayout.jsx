import { Outlet } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import SportsTabs from '../../../layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import BlogsSection from '@/shared/components/BlogsSection'

import { getSeries } from '../../../service/ipl.api'
import { isImportantSeries } from '../utils/series.utils'

const CricketLayout = () => {
  const [seriesData, setSeriesData] = useState([])

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getSeries()

        setSeriesData(data?.seriesMapProto || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchSeries()
  }, [])




const liveSeries = useMemo(() => {
  if (!seriesData.length) return []

  const now = Date.now()

  const allSeries = seriesData.flatMap(
    group => group.series || []
  )

  return allSeries
    .filter(series => {
      return (
        now >= Number(series.startDt) &&
        now <= Number(series.endDt)
      )
    })
    .filter(series =>
      isImportantSeries(series.name)
    )
}, [seriesData])

  return (
    <>
      <SportsTabs hideTickerOnTop={true} />

     <CricketTabs liveSeries={liveSeries} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          <div className="w-full lg:w-[90%] min-w-0">
            <Outlet />
          </div>

          <div className="hidden lg:block lg:w-[10%]">
            {/* Sidebar */}
          </div>
        </div>
      </div>

   
    </>
  )
}

export default CricketLayout