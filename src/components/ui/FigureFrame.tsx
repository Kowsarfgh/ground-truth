import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import type { DataSource } from '@/data/types'
import { DataSourcePanel } from './DataSourcePanel'

/**
 * Standard frame for any scientific visualisation. Guarantees that the
 * figure ships with a caption and a full data-source panel, and can stamp a
 * "DEMO" watermark over illustrative content.
 */
export function FigureFrame({
  title,
  caption,
  source,
  tone = 'light',
  watermark = false,
  actions,
  children,
  className,
}: {
  title: string
  caption?: string
  source: DataSource
  tone?: 'light' | 'dark'
  watermark?: boolean
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  const isDark = tone === 'dark'

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border',
        isDark ? 'border-hairline bg-space/60' : 'border-line bg-cloud card-shadow',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-start justify-between gap-3 border-b px-4 py-3.5 sm:px-5',
          isDark ? 'border-hairline' : 'border-line',
        )}
      >
        <div className="min-w-0">
          <figcaption
            className={cn(
              'font-display text-[15px] font-semibold',
              isDark ? 'text-white' : 'text-ink',
            )}
          >
            {title}
          </figcaption>
          {caption && (
            <p
              className={cn(
                'mt-1 max-w-2xl text-[12.5px] leading-relaxed',
                isDark ? 'text-white/60' : 'text-muted',
              )}
            >
              {caption}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className={cn('relative', isDark ? 'bg-space/40' : 'bg-mist/60')}>
        {watermark && (
          <div className="pointer-events-none absolute right-3 top-3 z-20">
            <span className="rounded-full border border-sand/50 bg-void/70 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur">
              Demo visual
            </span>
          </div>
        )}
        {children}
      </div>

      <div className={cn('border-t px-4 py-3.5 sm:px-5', isDark ? 'border-hairline' : 'border-line')}>
        <DataSourcePanel source={source} tone={isDark ? 'dark' : 'light'} />
      </div>
    </figure>
  )
}
