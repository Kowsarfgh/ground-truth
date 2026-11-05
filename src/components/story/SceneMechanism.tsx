import { STORY_SOURCES } from '@/data/tehranStory'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { AquiferCrossSection } from './AquiferCrossSection'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { SceneCallout, SceneHeader, SceneSection } from './SceneShell'

const CHANGES = [
  {
    term: 'Water table',
    before: 'High — pores are full, pressure holds the layers apart',
    after: 'Lower — the saturated zone has moved deeper down',
  },
  {
    term: 'Fine sediment layers',
    before: 'Thick, still holding their pore space',
    after: 'Thinner — grains have rearranged under the new load',
  },
  {
    term: 'Ground surface',
    before: 'At its constructed elevation',
    after: 'Settled, and settled unevenly across the district',
  },
]

/**
 * Scene 3 — how subsidence happens.
 *
 * Two states of one section, compared with a draggable handle. The illustration
 * is deliberately calm: this is a process measured in millimetres to centimetres
 * a year, so there is no collapse, no shaking and no sudden failure.
 */
export function SceneMechanism() {
  return (
    <SceneSection id="how-it-happens" tone="space">
      <SceneHeader
        id="how-it-happens"
        index={3}
        total={7}
        eyebrow="How subsidence happens"
        title="The same ground, before and after"
        lead="Land subsidence occurs when the ground gradually sinks due to changes beneath the surface. In areas with compressible sediments, excessive groundwater extraction can cause underground layers to compact."
      />

      <div className="mt-10">
        <FigureFrame
          title="Before / after — one section, years apart"
          caption="Drag the handle, or use the arrow keys, to compare the two states. The buildings sit on the moving surface, so they tilt with it."
          source={STORY_SOURCES.subsurfaceConcept}
          tone="dark"
          watermark
        >
          <BeforeAfterSlider
            className="aspect-[820/520] w-full"
            ariaLabel="Comparison slider between the uncompacted section and the compacted, settled section"
            beforeLabel="Before · higher water table"
            afterLabel="After · compacted & lower"
            before={
              <AquiferCrossSection
                compaction={0}
                waterLevel={0}
                showReference={false}
                showLabels={false}
                ariaLabel="Before: higher water table and uncompacted sediment layers"
              />
            }
            after={
              <AquiferCrossSection
                compaction={1}
                waterLevel={1}
                showReference
                showLabels={false}
                ariaLabel="After: lower water table, compacted sediment layers and a settled ground surface"
              />
            }
          />
        </FigureFrame>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {CHANGES.map((change) => (
          <div key={change.term} className="rounded-xl border border-hairline bg-panel/35 p-4">
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan">
              {change.term}
            </dt>
            <dd className="mt-3 space-y-2.5">
              <p className="text-[12.5px] leading-relaxed text-white/45">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                  Before ·
                </span>{' '}
                {change.before}
              </p>
              <p className="text-[12.5px] leading-relaxed text-white/75">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal">
                  After ·
                </span>{' '}
                {change.after}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SceneCallout title="Slow by nature">
          Published rates for the Tehran plain are measured in millimetres to centimetres per year.
          Subsidence is not an event — it is a slow, uneven settling that continues long after the
          cause begins, which is why the damage is usually noticed years after it started.
        </SceneCallout>
        <SceneCallout title="Difference, not distance">
          A structure does not fail simply because the ground drops. It fails when one part of its
          foundation drops more than another. That differential movement, spread along a road or a
          pipeline, is what produces cracks and steps.
        </SceneCallout>
      </div>
    </SceneSection>
  )
}
