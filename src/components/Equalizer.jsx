export default function Equalizer({ paused = false, color = 'green', bars = 7 }) {
  return (
    <div className={`eq${paused ? ' paused' : ''}${color === 'pink' ? ' pink' : ''}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} className="eq__bar" />
      ))}
    </div>
  )
}
