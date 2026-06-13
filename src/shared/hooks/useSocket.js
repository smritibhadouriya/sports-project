import { useState, useEffect, useCallback } from 'react'
import { subscribeToEvent } from '@/core/socket/socketClient'
import { appConfig } from '@/config/app.config'

// Hook for subscribing to live score socket events
export const useLiveScores = (matchId) => {
  const [score, setScore] = useState(null)

  useEffect(() => {
    if (!appConfig.features.socket) return
    const unsubscribe = subscribeToEvent(`score:${matchId}`, (data) => {
      setScore(data)
    })
    return unsubscribe
  }, [matchId])

  return score
}

// Generic socket subscription hook
export const useSocket = (event, initialValue = null) => {
  const [data, setData] = useState(initialValue)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!appConfig.features.socket) return

    const unsubscribeData = subscribeToEvent(event, (payload) => {
      setData(payload)
    })
    const unsubscribeConnect = subscribeToEvent('connect', () => setIsConnected(true))
    const unsubscribeDisconnect = subscribeToEvent('disconnect', () => setIsConnected(false))

    return () => {
      unsubscribeData()
      unsubscribeConnect()
      unsubscribeDisconnect()
    }
  }, [event])

  return { data, isConnected }
}
