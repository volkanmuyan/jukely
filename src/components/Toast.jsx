import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const hideTimer   = setTimeout(() => setExiting(true), 2600)
    const removeTimer = setTimeout(onDone, 3000)
    return () => { clearTimeout(hideTimer); clearTimeout(removeTimer) }
  }, [onDone])

  const icon = type === 'success' ? '🎵' : '⚠️'

  return (
    <div className="toast-wrap">
      <div className={`toast toast--${type}${exiting ? ' exiting' : ''}`}>
        <span className="toast__icon">{icon}</span>
        <span>{message}</span>
      </div>
    </div>
  )
}
