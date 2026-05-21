import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header      from '../components/Header'
import NowPlaying  from '../components/NowPlaying'
import SearchPanel from '../components/SearchPanel'
import QueuePanel  from '../components/QueuePanel'
import Toast       from '../components/Toast'
import { useDebounce } from '../hooks/useDebounce'
import { useSocket }   from '../hooks/useSocket'
import { useApi }      from '../hooks/useApi'
import { VENUE, NOW_PLAYING, INITIAL_QUEUE, SONG_CATALOG } from '../data/mockData'

// ─── Normalise backend queue item → component shape ───────────
function normaliseItem(item, myToken) {
  return {
    id:        item.id,
    position:  item.position,
    spotifyId: item.spotify_track_id,
    title:     item.track_name,
    artist:    item.artist_name,
    album:     item.album_name  || '',
    albumArt:  item.album_art_url
               || `https://picsum.photos/seed/${item.spotify_track_id}/300/300`,
    durationMs: item.duration_ms,
    upvotes:   item.upvotes  || 0,
    isPaid:    item.is_paid  || false,
    isMine:    !!myToken && item.session_token === myToken,
  }
}

function normaliseNowPlaying(item) {
  if (!item) return null
  return {
    id:         item.id,
    spotifyId:  item.spotify_track_id,
    title:      item.track_name,
    artist:     item.artist_name,
    album:      item.album_name  || '',
    albumArt:   item.album_art_url
                || `https://picsum.photos/seed/${item.spotify_track_id}/300/300`,
    durationMs: item.duration_ms,
    progressMs: 0,
  }
}

// ──────────────────────────────────────────────────────────────

export default function JukeboxPage() {
  const { slug }         = useParams()                              // undefined → demo mode
  const [searchParams]   = useSearchParams()
  const tableToken       = searchParams.get('t') ?? null

  // Session token: persisted per-venue in localStorage
  const [sessionToken, setSessionToken] = useState(
    () => (slug ? localStorage.getItem(`jukely_session_${slug}`) : null)
  )

  // ── Real-time layer ────────────────────────────────────────
  const { queue: liveQueue, nowPlaying: liveNow, connected } = useSocket(slug, sessionToken)
  const { search: apiSearch, addToQueue: apiAdd }            = useApi(slug)

  // ── UI state ───────────────────────────────────────────────
  const [activeTab,     setActiveTab]     = useState('search')
  const [searchQuery,   setSearchQuery]   = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching,   setIsSearching]   = useState(false)
  const [addedIds,      setAddedIds]      = useState(new Set())
  const [toast,         setToast]         = useState(null)
  const [progress,      setProgress]      = useState(
    NOW_PLAYING.progressMs / NOW_PLAYING.durationMs
  )
  const toastId = useRef(0)

  // ── Derived data: live → fallback to mock ──────────────────
  // Once connected (even with empty queue), stop showing mock queue
  const queue = connected
    ? liveQueue.map(item => normaliseItem(item, sessionToken))
    : INITIAL_QUEUE

  const nowPlaying = liveNow
    ? normaliseNowPlaying(liveNow)
    : NOW_PLAYING

  // ── Progress ticker (offline / demo only) ─────────────────
  useEffect(() => {
    if (liveNow) return              // SDK-driven in production
    const id = setInterval(() => {
      setProgress(p => (p >= 1 ? 1 : p + 1000 / NOW_PLAYING.durationMs))
    }, 1000)
    return () => clearInterval(id)
  }, [liveNow])

  // ── Search ─────────────────────────────────────────────────
  const debouncedQuery = useDebounce(searchQuery, 380)

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) { setSearchResults([]); setIsSearching(false); return }

    setIsSearching(true)

    if (slug) {
      // Real Spotify search via backend
      apiSearch(q)
        .then(tracks => { setSearchResults(tracks); setIsSearching(false) })
        .catch(() => mockSearch(q))    // graceful fallback
    } else {
      // Demo mode: filter mock catalog
      const timer = setTimeout(() => mockSearch(q), 420)
      return () => clearTimeout(timer)
    }
  }, [debouncedQuery, slug])          // apiSearch stable (useCallback)

  function mockSearch(q) {
    const ql = q.toLowerCase()
    const hits = SONG_CATALOG.filter(s =>
      s.title.toLowerCase().includes(ql) ||
      s.artist.toLowerCase().includes(ql) ||
      s.album.toLowerCase().includes(ql)
    ).slice(0, 12)
    setSearchResults(hits)
    setIsSearching(false)
  }

  // ── Add to queue ───────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: ++toastId.current, message, type })
  }, [])

  const handleAdd = useCallback(async (track) => {
    setAddedIds(prev => new Set([...prev, track.id]))

    if (!slug) {
      // Demo mode: optimistic local add
      showToast(`"${track.title}" kuyruğa eklendi!`)
      return
    }

    try {
      const result = await apiAdd(track, tableToken, sessionToken)

      // Backend may return (or renew) our session token
      const newToken = result.sessionToken
      if (newToken && newToken !== sessionToken) {
        setSessionToken(newToken)
        localStorage.setItem(`jukely_session_${slug}`, newToken)
      }

      showToast(`"${track.title}" kuyruğa eklendi!`)
    } catch (err) {
      setAddedIds(prev => { const s = new Set(prev); s.delete(track.id); return s })
      showToast(err.message || 'Şarkı eklenemedi', 'error')
    }
  }, [slug, tableToken, sessionToken, apiAdd, showToast])

  // ── Venue metadata ─────────────────────────────────────────
  const venue = {
    name:       VENUE.name,
    tableLabel: tableToken
      ? `Masa ${tableToken.slice(0, 6).toUpperCase()}`
      : VENUE.tableLabel,
  }

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="jukebox-app">
      <Header venue={venue} />

      <NowPlaying track={nowPlaying} progress={progress} isPlaying={!liveNow || true} />

      <div className="tabs">
        <button
          className={`tab-btn${activeTab === 'search' ? ' active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Şarkı Ara
        </button>
        <button
          className={`tab-btn${activeTab === 'queue' ? ' active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          Sıra
          {queue.length > 0 && <span className="badge">{queue.length}</span>}
        </button>
      </div>

      {activeTab === 'search' ? (
        <SearchPanel
          query={searchQuery}
          onChange={setSearchQuery}
          results={searchResults}
          isSearching={isSearching}
          onAdd={handleAdd}
          addedIds={addedIds}
        />
      ) : (
        <QueuePanel queue={queue} />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  )
}
