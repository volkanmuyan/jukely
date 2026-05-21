function fmtMs(ms) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

function SongCard({ track, onAdd, added }) {
  return (
    <div className="song-card" style={{ animationDelay: `${track._idx * 40}ms` }}>
      <img className="song-card__art" src={track.albumArt} alt={track.album} draggable={false} />
      <div className="song-card__info">
        <div className="song-card__title">{track.title}</div>
        <div className="song-card__sub">
          <span>{track.artist}</span>
          <span className="song-card__dot" />
          <span>{fmtMs(track.durationMs)}</span>
        </div>
      </div>
      <button
        className={`add-btn${added ? ' added' : ''}`}
        onClick={() => !added && onAdd(track)}
        aria-label={added ? 'Eklendi' : 'Kuyruğa ekle'}
      >
        {added ? '✓' : '+'}
      </button>
    </div>
  )
}

export default function SearchPanel({ query, onChange, results, isSearching, onAdd, addedIds }) {
  const showEmpty    = !query && !isSearching
  const showLoading  = isSearching
  const showResults  = !isSearching && query && results.length > 0
  const showNoResult = !isSearching && query && results.length === 0

  return (
    <div className="panel">
      {/* Search bar */}
      <div className="search-bar-wrap">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          className="search-input"
          type="text"
          placeholder="Şarkı veya sanatçı ara..."
          value={query}
          onChange={e => onChange(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {query && (
          <button className="clear-btn" onClick={() => onChange('')} aria-label="Temizle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Empty state */}
      {showEmpty && (
        <div className="search-empty">
          <div className="search-empty__icon">🎶</div>
          <div className="search-empty__title">Ne dinlemek istersiniz?</div>
          <div className="search-empty__sub">
            Bir şarkı adı veya sanatçı yazın,<br />kuyruğa ekleyelim.
          </div>
        </div>
      )}

      {/* Loading skeletons */}
      {showLoading && (
        <div className="loading-row">
          {[0, 1, 2].map(i => <div key={i} className="skeleton" style={{ opacity: 1 - i * 0.2 }} />)}
        </div>
      )}

      {/* No results */}
      {showNoResult && (
        <div className="no-results">
          <span>🔍</span>
          "{query}" için sonuç bulunamadı
        </div>
      )}

      {/* Results */}
      {showResults && (
        <>
          <div className="section-label">Sonuçlar — {results.length} şarkı</div>
          <div className="results-list">
            {results.map((track, idx) => (
              <SongCard
                key={track.id}
                track={{ ...track, _idx: idx }}
                onAdd={onAdd}
                added={addedIds.has(track.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
