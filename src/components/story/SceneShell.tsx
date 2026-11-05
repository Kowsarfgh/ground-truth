import type { ReactNode } from 'react'
import { Info } from 'lucide-react'

import { cn } from '@/lib/cn'

/**
 * One chapter of the story. Sections carry the chapter id so the rail can
 * navigate to them directly.
 */
export function SceneSection({
  id,
  children,
  tone = 'void',
  className,
}: {
  id: string
  children: ReactNode
  tone?: 'void' | 'space' | 'deep'
  className?: string
}) {
  const backgrounds = {
    void: 'bg-void',
    space: 'bg-space',
    deep: 'bg-deep',
  } as const

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('scroll-mt-28 border-t border-hairline py-16 sm:py-20', backgrounds[tone], className)}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

/**
 * Shared heading block for a chapter: stage counter, eyebrow, headline and
 * lead paragraph, with an optional slot for playback controls.
 */
export function SceneHeader({
  id,
  index,
  total,
  eyebrow,
  title,
  lead,
  aside,
  className,
}: {
  /** The chapter id — used to label the enclosing section. */
  id: string
  index: number
  total: number
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between', className)}>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan">
            {eyebrow}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <h2
          id={`${id}-title`}
          className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl"
        >
          {title}
        </h2>
        {lead && (
          <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-white/65">{lead}</p>
        )}
      </div>
      {aside && <div className="shrink-0 lg:pb-1">{aside}</div>}
    </header>
  )
}

/**
 * Small explanatory strip used for the caveats the story has to carry — the
 * places where an illustration must not be read as a measurement, or where a
 * mechanism must not be generalised to every district.
 */
export function SceneCallout({
  title,
  children,
  tone = 'note',
  className,
}: {
  title: string
  children: ReactNode
  tone?: 'note' | 'honest'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4',
        tone === 'honest' ? 'border-teal/30 bg-teal/8' : 'border-hairline bg-panel/40',
        className,
      )}
    >
      <Info
        className={cn('mt-0.5 h-4 w-4 shrink-0', tone === 'honest' ? 'text-teal' : 'text-cyan')}
      />
      <div className="min-w-0">
        <p
          className={cn(
            'font-mono text-[10px] font-semibold uppercase tracking-[0.16em]',
            tone === 'honest' ? 'text-teal' : 'text-cyan',
          )}
        >
          {title}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{children}</p>
      </div>
    </div>
  )
}
