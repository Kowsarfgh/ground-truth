import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/cn'
import { CONSEQUENCES, STORY_SOURCES } from '@/data/tehranStory'
import { IMAGES } from '@/data/imagery'
import { stage } from '@/lib/useTimeline'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { CitySkyline } from './CitySkyline'
import { SceneCallout, SceneHeader, SceneSection } from './SceneShell'
import { TimelineBar } from './TimelineBar'
import { useSceneTimeline } from './useSceneTimeline'
import { storyIcon } from './storyIcons'

const imageFor = (key: string) => (IMAGES as Record<string, string>)[key] ?? IMAGES.impactDamage

/**
 * Scene 4 — what a city feels.
 *
 * Each consequence is presented as a possibility, with its own caveat, because
 * damage at any single address has to be diagnosed on the ground.
 */
export function SceneConsequences() {
  const { ref, timeline } = useSceneTimeline(9000)
  const [selectedId, setSelectedId] = useState(CONSEQUENCES[0].id)
  const selected = CONSEQUENCES.find((item) => item.id === selectedId) ?? CONSEQUENCES[0]
  const SelectedIcon = storyIcon(selected.icon)

  return (
    <SceneSection id="consequences" tone="void">
      <div ref={ref}>
        <SceneHeader
          id="consequences"
          index={4}
          total={7}
          eyebrow="Consequences"
          title="When the Ground Moves, the City Feels It."
          lead="Subsidence is a slow hazard with visible symptoms: surfaces that crack, structures that tilt and networks that are strained. The list below describes possible consequences reported in subsiding districts — not confirmed damage at every location in Tehran."
        />

        <div className="mt-10">
          <FigureFrame
            title="Illustration — how differential settlement can appear at street level"
            caption="A drawing of the kind of damage reported in subsiding districts, not a photograph of a specific street in Tehran."
            source={STORY_SOURCES.landCoverContext}
            tone="dark"
            watermark
          >
            <div className="relative h-[260px] w-full sm:h-[380px]">
              <CitySkyline variant="surface" damage={stage(timeline.progress, 0.12, 0.92)} />
            </div>
          </FigureFrame>
          <TimelineBar
            timeline={timeline}
            label="Damage cues"
            hint="The crack pattern fades in as the chapter plays. It is a visual cue, not a measurement of any real street."
            className="mt-4"
          />
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CONSEQUENCES.map((item) => {
            const Icon = storyIcon(item.icon)
            const isSelected = item.id === selectedId
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex h-full w-full flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300',
                    isSelected
                      ? 'border-cyan/45 bg-cyan/8'
                      : 'border-hairline bg-panel/35 hover:border-white/25 hover:bg-panel/55',
                  )}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: `${item.accent}1f`,
                      color: item.accent,
                      boxShadow: `inset 0 0 0 1px ${item.accent}59`,
                    }}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="font-display text-[13.5px] font-semibold leading-snug text-white">
                    {item.title}
                  </span>
                  <span className="mt-auto font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/35">
                    {item.short}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-5 grid overflow-hidden rounded-2xl border border-hairline bg-panel/35 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <img
            src={imageFor(selected.image)}
            alt={`Illustrative rendering relating to: ${selected.title}`}
            className="h-52 w-full object-cover lg:h-full"
            loading="lazy"
          />
          <div className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: `${selected.accent}1f`,
                      color: selected.accent,
                      boxShadow: `inset 0 0 0 1px ${selected.accent}59`,
                    }}
                  >
                    <SelectedIcon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-[17px] font-bold text-white">{selected.title}</h3>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-white/70">{selected.detail}</p>
                <SceneCallout title="Caveat" className="mt-4">
                  {selected.caveat}
                </SceneCallout>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SceneSection>
  )
}
