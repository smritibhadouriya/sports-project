import { memo } from 'react'

// GLOBAL CARD COMPONENT
// Changing styles here updates ALL cards across the entire app

const Card = memo(({
  children,
  className = '',
  padding = true,
  hover = false,
  border = true,
  onClick,
  ...rest
}) => {
  const baseClasses = 'bg-white dark:bg-[#1c2128] rounded-lg'
  const borderClasses = border ? 'border border-gray-200 dark:border-gray-700' : ''
  const shadowClasses = 'shadow-sm'
  const paddingClasses = padding ? 'p-4' : ''
  const hoverClasses = hover
    ? 'cursor-pointer transition-shadow duration-200 hover:shadow-md'
    : ''

  return (
    <div
      className={`${baseClasses} ${borderClasses} ${shadowClasses} ${paddingClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export const CardHeader = memo(({ children, className = '' }) => (
  <div className={`flex items-center justify-between mb-3 ${className}`}>
    {children}
  </div>
))

export const CardBody = memo(({ children, className = '' }) => (
  <div className={className}>{children}</div>
))

export default Card
