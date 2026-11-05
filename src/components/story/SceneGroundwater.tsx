import { cn } from '@/lib/cn'
import { CROSS_SECTION_LABELS, GROUNDWATER_STEPS, STORY_SOURCES } from '@/data/tehranStory'
import { stage } from '@/lib/useTimeline'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { AquiferCrossSection } from './AquiferCrossSection'
import { SceneCallout, SceneHeader, SceneSection } from './SceneShell'
import { TimelineBar } from './TimelineBar'
import { useSceneTimeline } from './useSceneTimeline'

/**
 * Scene 2 — the hidden cause: groundwater extraction.
 *
 * The narration and the cutaway share one clock, so each explanatory step
 * appears exactly as the animation reaches the process it describes.
 */
export function SceneGroundwater() {
  const { ref, timeline } = useSceneTimeline(11000)

  const waterLevel = stage(timeline.progress, 0.1, 0.72)
  const compaction = stage(timeline.progress, 0.38, 1)
  const reached = GROUNDWATER_STEPS.filter((step) => timeline.progress >= step.at)
  const currentStep = reached[reached.length - 1] ?? GROUNDWATER_STEPS[0]

  return (
    <SceneSection id="hidden-cause" tone="void">
      <div ref={ref}>
        <SceneHeader
          id="hidden-cause"
          index={2}
          total={7}
          eyebrow="The hidden cause"
          title="The water under the city, and what happens when it leaves"
          lead="Groundwater is stored beneath the Earth's surface. When people extract more water than nature can replenish, groundwater levels fall. This changes the pressure within underground sediments. Some soil layers become compacted, causing the ground above them to sink."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)] lg:items-start">
          <div>
            <ol className="space-y-2.5">
              {GROUNDWATER_STEPS.map((step, i) => {
                const active = timeline.progress >= step.at
                const current = currentStep.id === step.id
                return (
                  <li
                    key={step.id}
                    className={cn(
                      'rounded-xl border p-4 transition-all duration-500',
                      current
                        ? 'border-cyan/40 bg-cyan/8'
                        : active
                          ? 'border-hairline bg-panel/35'
                          : 'border-hairline/60 bg-transparent opacity-45',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'font-mono text-[10px] font-semibold uppercase tracking-[0.18em]',
                          current ? 'text-cyan' : 'text-white/40',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-display text-[14.5px] font-semibold text-white">
                        {step.title}
                      </p>
                    </div>
                    <p
                      className={cn(
                        'mt-2 pl-8 text-[13px] leading-relaxed transition-opacity duration-500',
                        current ? 'text-white/70' : 'text-white/40',
                      )}
                    >
                      {step.text}
                    </p>
                  </li>
                )
              })}
            </ol>

            <TimelineBar
              timeline={timeline}
              label="Water table and compaction"
              hint="Scrub to hold the mechanism still at any moment. Nothing here collapses suddenly — the settlement is slow, and much of it does not come back."
              className="mt-6"
            />

            <SceneCallout title="One mechanism, many different districts" className="mt-4">
              Groundwater extraction is a major driver of subsidence in parts of the Tehran region —
              but it is not uniform. The geology, the pumping history and the measured rates differ
              from district to district, so this mechanism does not produce the same numbers
              everywhere.
            </SceneCallout>
          </div>

          <div>
            <FigureFrame
              title="Cutaway — the aquifer system beneath the plain"
              caption="A schematic, not a borehole log. Vertical thicknesses and the total drop are exaggerated so the mechanism stays visible."
              source={STORY_SOURCES.subsurfaceConcept}
              tone="dark"
              watermark
            >
              <div className="aspect-[820/520] w-full">
                <AquiferCrossSection
                  compaction={compaction}
                  waterLevel={waterLevel}
                  ariaLabel={`Schematic cutaway of the aquifer. Water table at ${Math.round(
                    waterLevel * 100,
                  )} percent of the way to fully depleted; layers ${Math.round(
                    compaction * 100,
                  )} percent compacted.`}
                />
              </div>
            </FigureFrame>

            <ul className="mt-4 flex flex-wrap gap-2">
              {CROSS_SECTION_LABELS.map((label) => (
                <li
                  key={label.id}
                  className="rounded-full border border-hairline bg-panel/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
                >
                  {label.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SceneSection>
  )
}
