import { useEffect, useRef, useState, useCallback } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000'

export function useSocket(companySlug, sessionToken) {
  const socketRef             = useRef(null)
  const [queue,      setQueue]      = useState([])
  const [nowPlaying, setNowPlaying] = useState(null)
  const [connected,  setConnected]  = useState(false)

  useEffect(() => {
    if (!companySlug) return

    const socket = io(SOCKET_URL, {
      auth:       { companySlug, sessionToken: sessionToken ?? undefined },
      transports: ['websocket', 'polling'],
      reconnectionDelay: 2000,
    })

    socketRef.current = socket

    socket.on('connect',               () => setConnected(true))
    socket.on('disconnect',            () => setConnected(false))
    socket.on('connect_error',         ()  => setConnected(false))
    socket.on('queue:sync',            setQueue)
    socket.on('queue:updated',         setQueue)
    socket.on('now_playing:changed',   setNowPlaying)

    return () => { socket.disconnect(); socketRef.current = null }
  }, [companySlug, sessionToken])

  const emit = useCallback((event, data) => {
    socketRef.current?.emit(event, data)
  }, [])

  return { queue, nowPlaying, connected, emit }
}
