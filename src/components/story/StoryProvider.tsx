import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface StoryContextValue {
  /** Global pause requested from the chapter rail. Governs every scene clock. */
  paused: boolean
  togglePaused: () => void
  /** Increments each time the reader asks the current chapter to replay. */
  replayToken: number
  replay: () => void
}

const StoryContext = createContext<StoryContextValue | null>(null)

/**
 * Carries the story-wide playback state so the chapter rail can pause, resume
 * and replay the animated chapters from a single control.
 */
export function StoryProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  const [replayToken, setReplayToken] = useState(0)

  const togglePaused = useCallback(() => setPaused((value) => !value), [])
  const replay = useCallback(() => {
    setPaused(false)
    setReplayToken((token) => token + 1)
  }, [])

  const value = useMemo(
    () => ({ paused, togglePaused, replayToken, replay }),
    [paused, togglePaused, replayToken, replay],
  )

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

export function useStory(): StoryContextValue {
  const context = useContext(StoryContext)
  if (!context) throw new Error('useStory must be used inside <StoryProvider>')
  return context
}
