import { ArrowLeftRight, MoveHorizontal } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import type { ComparePair } from '@/data/imagery'

/**
 * Accessible before/after comparison slider.
 * Drag the divider (pointer), or focus it and use the arrow keys.
 */
export function BeforeAfterSlider({ pair, className }: { pair: ComparePair; className?: string }) {
  const [position, setPosition] = useState(52)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const updateFromClientX = useCallback((clientX: number) => {
    const node = containerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragging, updateFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - step))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + step))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPosition(100)
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-cloud card-shadow', className)}>
      <div
        ref={containerRef}
        className="relative aspect-4/3 w-full cursor-ew-resize select-none overflow-hidden bg-space"
        onPointerDown={(e) => {
          setDragging(true)
          updateFromClientX(e.clientX)
        }}
      >
        {/* After (base layer) */}
        <img
          src={pair.after.src}
          alt={`${pair.after.label} — ${pair.after.date}, illustrative rendering`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={pair.before.src}
            alt={`${pair.before.label} — ${pair.before.date}, illustrative rendering`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Corner labels */}
        <div className="pointer-events-none absolute left-3 top-3 z-20 space-y-1.5">
          <span className="block w-fit rounded-md border border-white/25 bg-void/80 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            {pair.before.label}
          </span>
          <span className="block w-fit rounded-md bg-void/70 px-2 py-0.5 font-mono text-[10px] text-white/75 backdrop-blur">
            {pair.before.date}
          </span>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-20 space-y-1.5 text-right">
          <span className="block w-fit rounded-md border border-cyan/40 bg-void/80 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan backdrop-blur">
            {pair.after.label}
          </span>
          <span className="block w-fit rounded-md bg-void/70 px-2 py-0.5 font-mono text-[10px] text-white/75 backdrop-blur">
            {pair.after.date}
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 z-20">
          <span className="rounded-md border border-sand/50 bg-void/80 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur">
            Illustrative rendering — not satellite imagery
          </span>
        </div>

        {/* Divider */}
        <div
          className="absolute inset-y-0 z-30 w-0.5 bg-gradient-to-b from-cyan via-teal to-cyan/40"
          style={{ left: `calc(${position}% - 1px)` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Comparison divider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)} percent of the earlier image visible`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(
              'absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-void/90 text-white shadow-2xl backdrop-blur transition-transform duration-200',
              dragging ? 'scale-110' : 'hover:scale-105',
            )}
          >
            <ArrowLeftRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="grid gap-4 border-t border-line px-4 py-4 sm:grid-cols-2 sm:px-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Geographic region</p>
          <p className="mt-1 text-[13px] text-slate-ink">{pair.region}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Observation type</p>
          <p className="mt-1 text-[13px] text-slate-ink">{pair.observationType}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Earlier panel source
          </p>
          <p className="mt-1 text-[13px] text-slate-ink">
            {pair.before.source} · {pair.before.date}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Later panel source
          </p>
          <p className="mt-1 text-[13px] text-slate-ink">
            {pair.after.source} · {pair.after.date}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-sand/40 bg-amber-500/8 px-4 py-3.5 sm:px-5">
        <MoveHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <p className="text-[12.5px] leading-relaxed text-amber-800">{pair.note}</p>
      </div>
    </div>
  )
}
