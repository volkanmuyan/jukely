function fmtMs(ms) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

function QueueItem({ item }) {
  return (
    <div className={`queue-item${item.isMine ? ' is-mine' : ''}`} style={{ animationDelay: `${item.position * 50}ms` }}>
      <span className="queue-item__pos">#{item.position}</span>
      <img className="queue-item__art" src={item.albumArt} alt={item.album} draggable={false} />
      <div className="queue-item__info">
        <div className="queue-item__title">{item.title}</div>
        <div className="queue-item__artist">{item.artist}</div>
        {item.isMine && <div className="mine-badge">SEN EKLEDİN</div>}
      </div>
      <span className="queue-item__dur">{fmtMs(item.durationMs)}</span>
    </div>
  )
}

export default function QueuePanel({ queue }) {
  if (queue.length === 0) {
    return (
      <div className="panel">
        <div className="queue-empty">
          <div className="queue-empty__icon">🎼</div>
          <div className="queue-empty__title">Kuyruk boş</div>
          <div className="queue-empty__sub">İlk şarkıyı sen ekle!</div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="section-label">Sırada — {queue.length} şarkı</div>
      <div className="queue-list">
        {queue.map(item => (
          <QueueItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
