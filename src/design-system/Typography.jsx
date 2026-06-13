import { memo } from 'react'

// GLOBAL TYPOGRAPHY COMPONENT
// Changing styles here updates ALL text across the entire app

export const H1 = memo(({ children, className = '', ...rest }) => (
  <h1
    className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight ${className}`}
    {...rest}
  >
    {children}
  </h1>
))

export const H2 = memo(({ children, className = '', ...rest }) => (
  <h2
    className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight ${className}`}
    {...rest}
  >
    {children}
  </h2>
))

export const H3 = memo(({ children, className = '', ...rest }) => (
  <h3
    className={`text-xl font-semibold text-gray-900 dark:text-white leading-snug ${className}`}
    {...rest}
  >
    {children}
  </h3>
))

export const H4 = memo(({ children, className = '', ...rest }) => (
  <h4
    className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
    {...rest}
  >
    {children}
  </h4>
))

export const Body = memo(({ children, className = '', size = 'base', ...rest }) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  }
  return (
    <p
      className={`${sizes[size]} text-gray-700 dark:text-gray-300 leading-relaxed ${className}`}
      {...rest}
    >
      {children}
    </p>
  )
})

export const Caption = memo(({ children, className = '', ...rest }) => (
  <span
    className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}
    {...rest}
  >
    {children}
  </span>
))

export const Label = memo(({ children, className = '', ...rest }) => (
  <span
    className={`text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ${className}`}
    {...rest}
  >
    {children}
  </span>
))

const Typography = { H1, H2, H3, H4, Body, Caption, Label }

export default Typography
