import { io } from 'socket.io-client'
import { appConfig } from '@/config/app.config'

let socket = null

export const getSocket = () => {
  if (!appConfig.features.socket) return null

  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'wss://api.sportyradar.com', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => console.log('[Socket] Connected'))
    socket.on('disconnect', () => console.log('[Socket] Disconnected'))
    socket.on('connect_error', (err) => console.error('[Socket] Error:', err.message))
  }

  return socket
}

export const subscribeToEvent = (event, callback) => {
  const s = getSocket()
  if (!s) return () => {}
  s.on(event, callback)
  return () => s.off(event, callback)
}

export const emitEvent = (event, data) => {
  const s = getSocket()
  if (s) s.emit(event, data)
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default { getSocket, subscribeToEvent, emitEvent, disconnectSocket }
