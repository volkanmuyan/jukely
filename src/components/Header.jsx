export default function Header({ venue }) {
  return (
    <header className="header">
      <span className="header__logo">JUKELY</span>
      <div className="header__venue">
        <span className="header__venue-name">{venue.name}</span>
        <span className="header__table">{venue.tableLabel}</span>
      </div>
    </header>
  )
}
