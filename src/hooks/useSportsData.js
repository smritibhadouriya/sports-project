import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'

export const useLiveMatches = () => {
  const [liveMatches, setLiveMatches] = useState([])
  const [recentMatches, setRecentMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ ADD THIS
const extractMatches = (response) => {
  if (!response?.data) return []

  const d = response.data

  if (Array.isArray(d)) return d
  if (Array.isArray(d.matches)) return d.matches
  if (Array.isArray(d.data)) return d.data
  if (Array.isArray(d.data?.matches)) return d.data.matches  // ⭐ IMPORTANT
  if (Array.isArray(d.live)) return d.live
  if (Array.isArray(d.schedule)) return d.schedule

  return []
}

// ✅ ADD THIS
const mapMatch = (m) => ({
  id: m.id || m.matchId || m._id,

  series: m.seriesName || m.series || m.name || 'IPL',

  team1: {
    name: m.team1?.name || m.team1 || m.teams?.[0] || 'Team A',
    flag: m.team1?.logo || m.team1Logo || '',
    status: m.score || m.status || ''
  },

  team2: {
    name: m.team2?.name || m.team2 || m.teams?.[1] || 'Team B',
    flag: m.team2?.logo || m.team2Logo || '',
    score: m.score || ''
  }
})

  // Fetch live matches - GET /cricket/ipl/live
  const fetchLiveMatches = useCallback(async () => {
    try {
      console.log('Tanya: Fetching live matches from:', `${API_BASE_URL}/cricket/ipl/live`)
      const response = await axios.get(`${API_BASE_URL}/cricket/ipl/live`)
      console.log('Tanya: Live matches response:', response.data)
      
      // Handle different response structures
    const matches = extractMatches(response).map(mapMatch)
setLiveMatches(matches)
      
      setLiveMatches(matches)
      return matches
    } catch (error) {
      console.error('❌ Live matches fetch failed:', error.message)
      setLiveMatches([]) // Empty state on error - no error message shown to user
      return []
    }
  }, [])

  // Fetch recent matches - GET /cricket/ipl/recent
  const fetchRecentMatches = useCallback(async () => {
    try {
      console.log('🏏 Fetching recent matches from:', `${API_BASE_URL}/cricket/ipl/recent`)
      const response = await axios.get(`${API_BASE_URL}/cricket/ipl/recent`)
      console.log('📡 Recent matches response:', response.data)
      
      // As per guide: data.matches array use karo
 const matches = extractMatches(response).map(mapMatch)
setRecentMatches(matches)
      
      return matches
    } catch (error) {
      console.error('❌ Recent matches fetch failed:', error.message)
      setRecentMatches([]) // Empty state on error
      return []
    }
  }, [])

  // Fetch upcoming matches - GET /cricket/ipl/schedule
  const fetchUpcomingMatches = useCallback(async () => {
    try {
      console.log('🏏 Fetching upcoming matches from:', `${API_BASE_URL}/cricket/ipl/schedule`)
      const response = await axios.get(`${API_BASE_URL}/cricket/ipl/schedule`)
      console.log('📡 Upcoming matches response:', response.data)
      
   const matches = extractMatches(response).map(mapMatch)
setUpcomingMatches(matches)
      return matches
    } catch (error) {
      console.error('❌ Upcoming matches fetch failed:', error.message)
      setUpcomingMatches([]) // Empty state on error
      return []
    }
  }, [])

  // Page load pe ek baar call - No polling
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      
      console.log('🚀 Starting to fetch all match data...')
      
      // Use allSettled so one failure doesn't block others
      const results = await Promise.allSettled([
        fetchLiveMatches(),
        fetchRecentMatches(),
        fetchUpcomingMatches()
      ])
      
      // Check if all failed
      const allFailed = results.every(result => result.status === 'rejected')
      if (allFailed) {
        setError('Unable to fetch matches')
      }
      
      setLoading(false)
      console.log('✅ Finished fetching all match data')
    }

    fetchAll()
  }, [fetchLiveMatches, fetchRecentMatches, fetchUpcomingMatches])

  return {
    liveMatches,
    recentMatches,
    upcomingMatches,
    loading,
    error
  }
}