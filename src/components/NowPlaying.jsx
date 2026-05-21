import Equalizer from './Equalizer'

function fmtMs(ms) {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function NowPlaying({ track, progress, isPlaying }) {
  const elapsed = track.durationMs * progress
  const pct     = Math.min(100, progress * 100).toFixed(1)

  return (
    <div className="now-playing">
      <div className="now-playing__label">
        <span className="live-dot" />
        NOW PLAYING
      </div>

      <div className="now-playing__body">
        {/* Vinyl disc */}
        <div className="vinyl-wrap">
          <div className="vinyl-ring" />
          <div className="vinyl-ring" />
          <img
            className={`vinyl${!isPlaying ? ' paused' : ''}`}
            src={track.albumArt}
            alt={track.album}
            draggable={false}
          />
          <div className="vinyl-center" />
        </div>

        {/* Track meta */}
        <div className="now-playing__meta">
          <div className="np-track">{track.title}</div>
          <div className="np-artist">{track.artist}</div>
          <div className="np-album">{track.album}</div>
          <div className="np-eq-wrap">
            <Equalizer paused={!isPlaying} bars={7} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-times">
          <span>{fmtMs(elapsed)}</span>
          <span>{fmtMs(track.durationMs)}</span>
        </div>
      </div>
    </div>
  )
}
