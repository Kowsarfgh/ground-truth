import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/cn'
import { CHAPTERS } from '@/data/tehranStory'
import { useStory } from './StoryProvider'

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Chapter rail: the story's progress indicator, its chapter navigation, and the
 * single control that pauses or replays every animated chapter at once.
 */
export function StoryRail() {
  const { paused, togglePaused, replay } = useStory()
  const [activeId, setActiveId] = useState(CHAPTERS[0].id)

  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    CHAPTERS.forEach((chapter) => {
      const element = document.getElementById(chapter.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(
    0,
    CHAPTERS.findIndex((chapter) => chapter.id === activeId),
  )
  const active = CHAPTERS[activeIndex]
  const step = (delta: number) => {
    const next = CHAPTERS[activeIndex + delta]
    if (next) goTo(next.id)
  }

  const iconButton =
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white/5 text-white/75 transition-colors hover:border-cyan/40 hover:text-cyan disabled:opacity-35 disabled:hover:border-hairline disabled:hover:text-white/75'

  return (
    <div className="sticky top-16 z-40 border-b border-hairline bg-void/88 backdrop-blur-xl">
      <div className="shell">
        <div className="flex items-center gap-3 py-2.5">
          <button
            type="button"
            onClick={togglePaused}
            aria-label={paused ? 'Resume the story animations' : 'Pause the story animations'}
            aria-pressed={paused}
            className={iconButton}
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={replay}
            aria-label="Replay the current chapter's animation"
            className={iconButton}
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 md:block">
            Stage {active.index} / {CHAPTERS.length}
            <span className="ml-2 text-white/30">{active.short}</span>
          </p>

          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ol className="flex items-center gap-1.5">
              {CHAPTERS.map((chapter) => {
                const isActive = chapter.id === activeId
                return (
                  <li key={chapter.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(chapter.id)}
                      aria-current={isActive ? 'true' : undefined}
                      title={chapter.label}
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-300',
                        isActive
                          ? 'border-cyan/45 bg-cyan/12 text-cyan'
                          : 'border-transparent text-white/45 hover:border-hairline hover:text-white/80',
                      )}
                    >
                      <span className="font-mono text-[10px]">
                        {String(chapter.index).padStart(2, '0')}
                      </span>
                      {chapter.short}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous chapter"
              className={iconButton}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={activeIndex === CHAPTERS.length - 1}
              aria-label="Next chapter"
              className={iconButton}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full overflow-hidden rounded-full bg-hairline">
          <motion.div
            style={{ scaleX: progressX }}
            className="h-full origin-left bg-gradient-to-r from-teal to-cyan"
          />
        </div>
      </div>
    </div>
  )
}
