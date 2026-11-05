import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Compact statistic card. `note` is required by design so a number can never
 * appear without stating what it is and where it came from.
 */
export function StatCard({
  value,
  label,
  note,
  icon,
  badge,
  tone = 'dark',
  accent = 'teal',
  className,
}: {
  value: string
  label: string
  note: string
  icon?: ReactNode
  badge?: ReactNode
  tone?: 'light' | 'dark'
  accent?: 'teal' | 'cyan' | 'violet' | 'sand'
  className?: string
}) {
  const isDark = tone === 'dark'
  const accentText = {
    teal: isDark ? 'text-teal' : 'text-teal-deep',
    cyan: isDark ? 'text-cyan' : 'text-cyan-deep',
    violet: isDark ? 'text-violet' : 'text-violet-deep',
    sand: isDark ? 'text-sand' : 'text-amber-600',
  }[accent]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1',
        isDark
          ? 'border-hairline bg-panel/50 hover:border-cyan/35 hover:bg-panel/80'
          : 'border-line bg-cloud card-shadow hover:border-cyan-deep/30',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60',
          accent === 'teal' && 'bg-teal/25',
          accent === 'cyan' && 'bg-cyan/25',
          accent === 'violet' && 'bg-violet/25',
          accent === 'sand' && 'bg-sand/25',
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={cn('font-mono text-[10px] uppercase tracking-[0.18em]', isDark ? 'text-white/45' : 'text-muted')}>
            {label}
          </p>
          <p className={cn('mt-2 font-display text-2xl font-bold leading-tight', accentText)}>{value}</p>
        </div>
        {icon && (
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
              isDark ? 'border-hairline bg-white/5 text-white/70' : 'border-line bg-mist text-slate-ink',
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className={cn('relative mt-3 text-[12px] leading-relaxed', isDark ? 'text-white/55' : 'text-muted')}>
        {note}
      </p>
      {badge && <div className="relative mt-3">{badge}</div>}
    </div>
  )
}
