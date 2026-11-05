import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react'
import { useInView } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

import { cn } from '@/lib/cn'
import { easeInOut, lerp, useTimeline } from '@/lib/useTimeline'
import { useStory } from './StoryProvider'

/**
 * Draggable before / after comparison.
 *
 * The right-hand state is the base layer; the left-hand state is painted over
 * it and clipped at the handle, so dragging simply reveals more or less of the
 * earlier condition. Until the reader touches it, the handle sweeps across
 * slowly on its own so the difference is impossible to miss.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  ariaLabel,
  autoSweep = true,
  className,
}: {
  before: ReactNode
  after: ReactNode
  beforeLabel: string
  afterLabel: string
  ariaLabel: string
  autoSweep?: boolean
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(containerRef, { amount: 0.4 })
  const { paused, replayToken } = useStory()
  const timeline = useTimeline(9000, { enabled: autoSweep && inView && !paused })

  const [manual, setManual] = useState(false)
  const [manualPos, setManualPos] = useState(50)
  const dragging = useRef(false)

  const seenToken = useRef(replayToken)
  useEffect(() => {
    if (seenToken.current === replayToken) return
    seenToken.current = replayToken
    setManual(false)
    setManualPos(50)
    if (inView) timeline.replay()
  }, [replayToken, inView, timeline])

  const pos = manual ? manualPos : lerp(6, 94, easeInOut(timeline.progress))

  const moveTo = (clientX: number) => {
    const element = containerRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setManualPos(Math.max(0, Math.min(100, next)))
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setManual(true)
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    moveTo(event.clientX)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    moveTo(event.clientX)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2
    if (event.key === 'ArrowLeft') {
      setManual(true)
      setManualPos((value) => Math.max(0, value - step))
    } else if (event.key === 'ArrowRight') {
      setManual(true)
      setManualPos((value) => Math.min(100, value + step))
    } else if (event.key === 'Home') {
      setManual(true)
      setManualPos(0)
    } else if (event.key === 'End') {
      setManual(true)
      setManualPos(100)
    } else {
      return
    }
    event.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn('relative touch-pan-y select-none overflow-hidden', className)}
    >
      {/* Base layer — the later state */}
      <div className="absolute inset-0">{after}</div>

      {/* Overlay — the earlier state, clipped at the handle */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} percent of the earlier state shown`}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-20 flex w-9 -translate-x-1/2 cursor-ew-resize items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-cyan/70" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan/60 bg-void/85 text-cyan shadow-[0_0_24px_-4px_rgba(56,214,255,0.7)] backdrop-blur">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-void/75 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-cyan/30 bg-void/75 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan backdrop-blur">
        {afterLabel}
      </span>

      {!manual && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-void/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 backdrop-blur">
          Drag to compare · either side
        </span>
      )}
    </div>
  )
}
