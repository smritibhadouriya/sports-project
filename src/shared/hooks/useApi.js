import { useState, useEffect, useCallback, useRef } from 'react'
import { get } from '@/core/api/apiClient'

// Centralized API fetch hook with caching, loading & error states
export const useApi = (url, params = {}, options = {}) => {
  const { immediate = true, mockData = null } = options
  const [data, setData] = useState(mockData)
  const [loading, setLoading] = useState(immediate && !mockData)
  const [error, setError] = useState(null)
  const cache = useRef({})

  const fetchData = useCallback(async () => {
    if (!url) return
    const cacheKey = `${url}:${JSON.stringify(params)}`

    // Return cached if available
    if (cache.current[cacheKey]) {
      setData(cache.current[cacheKey])
      setLoading(false)
      return
    }

    // If mockData provided, use it directly (dev mode)
    if (mockData !== null) {
      setData(mockData)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const result = await get(url, params)
      cache.current[cacheKey] = result
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url, JSON.stringify(params)])

  useEffect(() => {
    if (immediate) fetchData()
  }, [fetchData, immediate])

  return { data, loading, error, refetch: fetchData }
}

export default useApi
