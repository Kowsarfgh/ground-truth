import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-teal to-cyan text-void font-semibold shadow-[0_10px_30px_-10px_rgba(20,224,192,0.55)] hover:shadow-[0_16px_40px_-12px_rgba(20,224,192,0.7)] hover:-translate-y-0.5',
  secondary:
    'border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/12 hover:border-white/35 hover:-translate-y-0.5',
  light:
    'bg-ink text-white font-semibold shadow-lg shadow-ink/20 hover:bg-deep hover:-translate-y-0.5',
  outline:
    'border border-line bg-white text-slate-ink hover:border-cyan-deep/50 hover:text-cyan-deep hover:-translate-y-0.5',
  ghost: 'text-slate-ink hover:bg-black/5',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-13 px-7 text-[15px] gap-2.5 rounded-xl',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

interface LinkButtonProps extends BaseProps {
  to: string
  onClick?: () => void
  'aria-label'?: string
}

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap transition-all duration-300',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
