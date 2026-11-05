import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useInView } from 'framer-motion'

import { useTimeline } from '@/lib/useTimeline'
import type { TimelineControls } from '@/lib/useTimeline'
import { useStory } from './StoryProvider'

export interface SceneTimeline {
  /** Attach to the element that scopes this scene's clock. */
  ref: RefObject<HTMLDivElement | null>
  inView: boolean
  timeline: TimelineControls
}

/**
 * A scene clock that only runs while its section is on screen, stops when the
 * chapter rail asks for a pause, and restarts when the rail asks to replay.
 *
 * Scenes derive their SVG geometry from `timeline.progress`, so pausing really
 * freezes the mechanism rather than just halting a decorative loop.
 */
export function useSceneTimeline(durationMs: number): SceneTimeline {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const { paused, replayToken } = useStory()
  const timeline = useTimeline(durationMs, { enabled: inView && !paused })

  const seenToken = useRef(replayToken)
  useEffect(() => {
    if (seenToken.current === replayToken) return
    seenToken.current = replayToken
    if (inView) timeline.replay()
  }, [replayToken, inView, timeline])

  return { ref, inView, timeline }
}
