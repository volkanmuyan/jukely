import { useState, useEffect, useCallback, useRef } from 'react'
import Header       from '../components/Header'
import NowPlaying   from '../components/NowPlaying'
import SearchPanel  from '../components/SearchPanel'
import QueuePanel   from '../components/QueuePanel'
import Toast        from '../components/Toast'
import { useDebounce } from '../hooks/useDebounce'
import { VENUE, NOW_PLAYING, INITIAL_QUEUE, SONG_CATALOG } from '../data/mockData'

export default function JukeboxPage() {
  const [activeTab,     setActiveTab]     = useState('search')
  const [searchQuery,   setSearchQuery]   = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching,   setIsSearching]   = useState(false)
  const [queue,         setQueue]         = useState(INITIAL_QUEUE)
  const [nowPlaying]                      = useState(NOW_PLAYING)
  const [progress,      setProgress]      = useState(
    NOW_PLAYING.progressMs / NOW_PLAYING.durationMs
  )
  const [isPlaying]                       = useState(true)
  const [toast,         setToast]         = useState(null)
  const [addedIds,      setAddedIds]      = useState(new Set())

  const debouncedQuery = useDebounce(searchQuery, 380)
  const toastId        = useRef(0)

  // Simulate live progress tick
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setProgress(p => (p >= 1 ? 1 : p + 1000 / NOW_PLAYING.durationMs))
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying])

  // Simulate Spotify search against mock catalog
  useEffect(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) { setSearchResults([]); setIsSearching(false); return }

    setIsSearching(true)
    const timer = setTimeout(() => {
      const hits = SONG_CATALOG.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.album.toLowerCase().includes(q)
      ).slice(0, 12)
      setSearchResults(hits)
      setIsSearching(false)
    }, 420)
    return () => clearTimeout(timer)
  }, [debouncedQuery])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastId.current
    setToast({ id, message, type })
  }, [])

  const handleAdd = useCallback((track) => {
    setAddedIds(prev => new Set([...prev, track.id]))
    setQueue(prev => [
      ...prev,
      {
        id:        `q-${Date.now()}`,
        position:  prev.length + 1,
        spotifyId: track.spotifyId,
        title:     track.title,
        artist:    track.artist,
        album:     track.album,
        albumArt:  track.albumArt,
        durationMs:track.durationMs,
        isMine:    true,
      },
    ])
    showToast(`"${track.title}" kuyruğa eklendi!`)
  }, [showToast])

  return (
    <div className="jukebox-app">
      <Header venue={VENUE} />
      <NowPlaying track={nowPlaying} progress={progress} isPlaying={isPlaying} />

      {/* Tabs */}
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

      {/* Panel content */}
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

      {/* Toast */}
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
