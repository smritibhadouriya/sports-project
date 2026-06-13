import { memo } from 'react'

// GLOBAL BUTTON COMPONENT
// Changing variants here updates ALL buttons across the entire app

const variants = {
  primary:
    'bg-[#00698c] hover:bg-[#005470] text-white font-semibold transition-colors duration-200',
  secondary:
    'bg-transparent border border-[#00698c] text-[#00698c] hover:bg-[#00698c] hover:text-white font-semibold transition-colors duration-200',
  outline:
    'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-200',
  ghost:
    'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors duration-200',
  danger:
    'bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200',
  live:
    'bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200',
}

const sizes = {
  xs: 'px-2 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-2.5 text-base rounded-lg',
  xl: 'px-8 py-3 text-lg rounded-xl',
}

const Button = memo(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00698c] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'
  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md
  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
