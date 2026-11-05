import { ChevronDown, Database } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'
import type { DataSource } from '@/data/types'
import { DataStateBadge, DataStateNotice } from './DataState'

const ROWS: { key: keyof DataSource; label: string }[] = [
  { key: 'mission', label: 'Satellite mission' },
  { key: 'sensor', label: 'Sensor / instrument' },
  { key: 'provider', label: 'Data provider' },
  { key: 'acquisitionDate', label: 'Acquisition date' },
  { key: 'processing', label: 'Processing method' },
  { key: 'resolution', label: 'Spatial resolution' },
  { key: 'confidence', label: 'Confidence / quality' },
  { key: 'limitations', label: 'Data limitations' },
]

/**
 * The mandatory "data-source panel" that accompanies every scientific
 * visualisation in GROUND TRUTH.
 */
export function DataSourcePanel({
  source,
  tone = 'light',
  defaultOpen = false,
  className,
}: {
  source: DataSource
  tone?: 'light' | 'dark'
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border',
        isDark ? 'border-hairline bg-space/70' : 'border-line bg-mist',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors',
          isDark ? 'hover:bg-white/5' : 'hover:bg-white',
        )}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Database
            className={cn('h-4 w-4 shrink-0', isDark ? 'text-cyan' : 'text-cyan-deep')}
          />
          <span
            className={cn(
              'truncate font-mono text-[10px] font-semibold uppercase tracking-[0.16em]',
              isDark ? 'text-white/70' : 'text-muted',
            )}
          >
            Data source &amp; provenance
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <DataStateBadge state={source.state} tone={isDark ? 'dark' : 'light'} />
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              open && 'rotate-180',
              isDark ? 'text-white/50' : 'text-muted',
            )}
          />
        </span>
      </button>

      {open && (
        <div className={cn('border-t px-3.5 pb-3.5 pt-3', isDark ? 'border-hairline' : 'border-line')}>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {ROWS.map(({ key, label }) => {
              const value = source[key]
              if (typeof value !== 'string' || value.trim() === '') return null
              return (
                <div key={String(key)} className="min-w-0">
                  <dt
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.14em]',
                      isDark ? 'text-white/45' : 'text-muted',
                    )}
                  >
                    {label}
                  </dt>
                  <dd
                    className={cn(
                      'mt-1 text-[13px] leading-relaxed',
                      isDark ? 'text-white/85' : 'text-slate-ink',
                    )}
                  >
                    {value}
                  </dd>
                </div>
              )
            })}
          </dl>

          {(source.attribution || source.reference) && (
            <p
              className={cn(
                'mt-3 border-t pt-3 text-[11px] leading-relaxed',
                isDark ? 'border-hairline text-white/50' : 'border-line text-muted',
              )}
            >
              {source.attribution}
              {source.attribution && source.reference ? ' · ' : ''}
              {source.reference}
            </p>
          )}

          {(source.state === 'unavailable' || source.state === 'error') && (
            <DataStateNotice
              state={source.state}
              tone={isDark ? 'dark' : 'light'}
              className="mt-3"
            />
          )}
        </div>
      )}
    </div>
  )
}
