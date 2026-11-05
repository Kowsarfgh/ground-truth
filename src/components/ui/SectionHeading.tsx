import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
  actions,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  actions?: ReactNode
}) {
  const isDark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p
            className={cn(
              'mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]',
              isDark ? 'text-cyan' : 'text-cyan-deep',
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            'text-balance text-3xl font-bold leading-[1.1] sm:text-4xl',
            isDark ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-3.5 text-[15px] leading-relaxed',
              isDark ? 'text-white/65' : 'text-muted',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
