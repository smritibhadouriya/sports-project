import { Link, useLocation } from 'react-router-dom'

const SportTabsList = ({
  sports,
  scrollable = false,
  textSize = 'text-sm',
  activeClass = '',
  inactiveClass = '',
}) => {
  const location = useLocation()

  const isActive = (sport) => {
    if (sport.id === 'all' || sport.path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(sport.path)
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        scrollable
          ? 'overflow-x-auto scrollbar-hide py-2'
          : 'flex-wrap'
      }`}
    >
      {sports.map((sport) => {
        const active = isActive(sport)

        return (
          <Link
            key={sport.id || sport.label}
            to={sport.path || '/'}
            className={`
              flex-shrink-0 flex items-center gap-1.5
              px-4 py-1.5 rounded-full font-medium whitespace-nowrap transition-all
              ${textSize}
              ${active ? activeClass : inactiveClass}
            `}
          >
            {sport.emoji && <span>{sport.emoji}</span>}
            {sport.label}
          </Link>
        )
      })}
    </div>
  )
}

export default SportTabsList