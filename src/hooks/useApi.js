import { useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export function useApi(slug) {
  const search = useCallback(async (query) => {
    const res = await fetch(
      `${API_URL}/v/${slug}/search?q=${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) throw new Error(`Search failed: ${res.status}`)
    const { tracks } = await res.json()
    return tracks
  }, [slug])

  const addToQueue = useCallback(async (track, tableToken, sessionToken, isPaid = false) => {
    const res = await fetch(`${API_URL}/v/${slug}/queue`, {
      method:  'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-session-token': sessionToken ?? '',
      },
      body: JSON.stringify({ track, tableId: tableToken ?? null, isPaid }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Şarkı eklenemedi')
    }
    return res.json()
  }, [slug])

  const vote = useCallback(async (queueId, sessionToken) => {
    const res = await fetch(`${API_URL}/v/${slug}/queue/${queueId}/vote`, {
      method:  'POST',
      headers: { 'x-session-token': sessionToken ?? '' },
      signal:  AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Oy verilemedi')
    }
    return res.json()
  }, [slug])

  return { search, addToQueue, vote }
}
