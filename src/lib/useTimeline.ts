import { useCallback, useEffect, useRef, useState } from 'react'

export interface TimelineControls {
  /** Normalised position 0 → 1. */
  progress: number
  playing: boolean
  /** True once the timeline has run to the end. */
  done: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  /** Restart from the beginning. */
  replay: () => void
  /** Jump to a position (clamped to 0–1). */
  seek: (progress: number) => void
}

/** Tracks the user's motion preference so we can skip animation safely. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * A deterministic, pausable animation clock.
 *
 * Scenes drive their SVG geometry from `progress` instead of from CSS
 * keyframes, which is what makes "pause" and "replay" genuinely meaningful —
 * the reader can freeze the mechanism at any moment and step back into it.
 *
 * @param durationMs  How long one full play-through takes.
 * @param enabled     False while the scene is off-screen: the clock idles.
 */
export function useTimeline(
  durationMs = 9000,
  { enabled = true, autoplay = true, steps = 400 }: { enabled?: boolean; autoplay?: boolean; steps?: number } = {},
): TimelineControls {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = useState(autoplay && !reduced ? 0 : 1)
  const [playing, setPlaying] = useState(autoplay && !reduced)

  const progressRef = useRef(progress)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // Motion is decorative here: when the reader has asked for less of it we
  // simply present the finished state.
  useEffect(() => {
    if (!reduced) return
    progressRef.current = 1
    setProgress(1)
    setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing || !enabled || reduced) return

    let cancelled = false
    // Re-anchor on every (re)start so resuming after a pause or after being
    // scrolled off-screen continues from the current position.
    startRef.current = null

    const tick = (t: number) => {
      if (cancelled) return
      if (startRef.current === null) startRef.current = t - progressRef.current * durationMs
      const raw = (t - startRef.current) / durationMs
      const clamped = Math.max(0, Math.min(1, raw))
      const quantised = Math.round(clamped * steps) / steps
      if (quantised !== progressRef.current) {
        progressRef.current = quantised
        setProgress(quantised)
      }
      if (clamped < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPlaying(false)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, enabled, reduced, durationMs, steps])

  const play = useCallback(() => {
    if (progressRef.current >= 1) {
      progressRef.current = 0
      setProgress(0)
    }
    setPlaying(true)
  }, [])

  const pause = useCallback(() => setPlaying(false), [])

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p && progressRef.current >= 1) {
        progressRef.current = 0
        setProgress(0)
      }
      return !p
    })
  }, [])

  const replay = useCallback(() => {
    progressRef.current = 0
    setProgress(0)
    setPlaying(true)
  }, [])

  const seek = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(1, next))
    progressRef.current = clamped
    setProgress(clamped)
  }, [])

  return {
    progress,
    playing,
    done: progress >= 1,
    play,
    pause,
    toggle,
    replay,
    seek,
  }
}

/** Shared easing so every scene accelerates and settles the same way. */
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t

/** Maps a sub-range of progress onto 0→1, clamped. */
export const stage = (progress: number, from: number, to: number) =>
  Math.max(0, Math.min(1, (progress - from) / (to - from)))
