import { useState } from 'react'

import { cn } from '@/lib/cn'
import { CITATIONS, OBSERVATION_SLOTS, STORY_SOURCES, citationList } from '@/data/tehranStory'
import { DataSourcePanel } from '@/components/ui/DataSourcePanel'
import { DataStateBadge, DataStateNotice } from '@/components/ui/DataState'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { DeformationProfileChart } from './DeformationProfileChart'
import { InterferogramConcept } from './InterferogramConcept'
import { OrbitScene } from './OrbitScene'
import { SceneCallout, SceneHeader } from './SceneShell'
import { TimelineBar } from './TimelineBar'
import { useSceneTimeline } from './useSceneTimeline'

const MISSION_TEXT: Record<string, string> = {
  'Sentinel-1': 'text-cyan',
  NISAR: 'text-violet',
}

const LEGEND = [
  { swatch: '#38d6ff', label: 'One full colour cycle = one phase cycle (2π)' },
  { swatch: '#14e0c0', label: 'Tighter fringes = a steeper change across the ground' },
  { swatch: '#f6c667', label: 'The dashed line is the surface position from an earlier pass' },
]

const SPACE_CITATIONS = citationList([
  'nisarMission',
  'nisarProducts',
  'sentinel1',
  'moradi2023',
])

/**
 * Scene 5 — from space: how the changes are detected.
 *
 * The hard rule for this chapter: no NISAR measurement, image, acquisition date
 * or displacement map is invented. The timeline below offers real slots in the
 * lifecycle — including the empty ones — and the NISAR slots are shown as
 * unavailable rather than filled in.
 */
export function SceneFromSpace() {
  const { ref, timeline } = useSceneTimeline(12000)
  const [slotId, setSlotId] = useState(OBSERVATION_SLOTS[0].id)
  const slot = OBSERVATION_SLOTS.find((item) => item.id === slotId) ?? OBSERVATION_SLOTS[0]

  return (
    <section
      id="from-space"
      aria-labelledby="from-space-title"
      className="relative isolate scroll-mt-28 overflow-hidden border-t border-hairline bg-void py-16 sm:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-[420px] sm:h-[600px]" aria-hidden>
        <OrbitScene progress={timeline.progress} />
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/70 to-void" />
      </div>

      <div ref={ref} className="shell relative">
        <SceneHeader
          id="from-space"
          index={5}
          total={7}
          eyebrow="From space"
          title="Seeing What the Human Eye Cannot."
          lead="Radar satellites can observe Earth's surface repeatedly, helping scientists detect subtle changes in ground elevation over time."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <TimelineBar
            timeline={timeline}
            label="Orbit and radar beam"
            hint="Play the pass to see how a satellite builds a repeat observation. The animation is a diagram of the geometry — nothing here is a real acquisition."
          />

          <div className="rounded-2xl border border-violet/30 bg-violet/8 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet">
              The mission
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
              <strong className="font-semibold text-white">NISAR</strong> — NASA-ISRO Synthetic
              Aperture Radar — uses L-band and S-band radar observations to study changes in Earth's
              land and ice surfaces.
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/50">
              {CITATIONS.nisarMission.institution} · {CITATIONS.nisarMission.date}
            </p>
            <a
              href={CITATIONS.nisarMission.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-violet underline decoration-violet/40 underline-offset-4 hover:decoration-violet"
            >
              {CITATIONS.nisarMission.url}
            </a>
          </div>
        </div>

        <DataSourcePanel source={STORY_SOURCES.radarConcept} tone="dark" className="mt-4" />

        {/* ------------------- Availability, stated plainly ------------------- */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-hairline bg-panel/35 p-5">
            <DataStateNotice
              state="unavailable"
              tone="dark"
              message="NISAR data not currently available for this analysis."
            />
            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
              No calibrated NISAR displacement product for the Tehran study area has been retrieved,
              validated and connected to this platform. Rather than fill that gap with something that
              looks like a measurement, the gap is shown as a gap.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/60">
              A missing NISAR layer does <strong className="font-semibold text-white">not</strong> mean
              the ground in Tehran is stable. It means this particular observation is absent.
            </p>
            <DataSourcePanel source={STORY_SOURCES.nisarTehran} tone="dark" className="mt-4" />
          </div>

          <div className="rounded-2xl border border-hairline bg-panel/35 p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
              What is shown instead
            </p>
            <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-white/65">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                A schematic of the observation geometry — how a radar satellite measures distance.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                An illustrative acquisition cadence, so the timeline interaction can be explored.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                Published rates for the Tehran plain, quoted from the studies and attributed to them.
              </li>
            </ul>
            <SceneCallout title="Measured, interpreted, hypothesised" className="mt-4" tone="honest">
              The shift of the ground along the satellite's line of sight is a measurement. That the
              shift was caused by pumping is an interpretation, reached by combining radar with
              groundwater records, geology and land-use data. This story keeps the two apart.
            </SceneCallout>
          </div>
        </div>

        {/* ------------------- Interactive observation timeline ------------------- */}
        <div className="mt-12">
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
            Explore the observations
          </h3>
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-white/55">
            Every slot below is labelled with the mission that would provide it and with its current
            state. Sentinel-1 and NISAR are different missions and are never shown as one dataset.
          </p>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {OBSERVATION_SLOTS.map((item) => {
              const isSelected = item.id === slot.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSlotId(item.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex w-[168px] shrink-0 flex-col items-start gap-2 rounded-xl border px-3.5 py-3 text-left transition-all duration-300',
                    isSelected
                      ? 'border-white/35 bg-white/8'
                      : 'border-hairline bg-panel/35 hover:border-white/25 hover:bg-panel/55',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[10px] font-semibold uppercase tracking-[0.16em]',
                      MISSION_TEXT[item.mission] ?? 'text-white/60',
                    )}
                  >
                    {item.mission}
                  </span>
                  <span className="font-display text-[14.5px] font-semibold text-white">
                    {item.date}
                  </span>
                  <DataStateBadge state={item.state} tone="dark" />
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid gap-5 rounded-2xl border border-hairline bg-panel/35 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-display text-lg font-bold text-white">{slot.mission}</h4>
                <DataStateBadge state={slot.state} tone="dark" />
              </div>
              <dl className="mt-4 space-y-3">
                {[
                  { term: 'Acquisition date', value: slot.date },
                  { term: 'Sensor', value: slot.sensor },
                  { term: 'Coverage', value: slot.coverage },
                ].map((row) => (
                  <div key={row.term}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                      {row.term}
                    </dt>
                    <dd className="mt-1 text-[13.5px] text-white/80">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[13px] leading-relaxed text-white/60">{slot.note}</p>
              {(slot.state === 'unavailable' || slot.state === 'error') && (
                <DataStateNotice state={slot.state} tone="dark" message={slot.note} className="mt-4" />
              )}
            </div>
            <DataSourcePanel source={slot.source} tone="dark" defaultOpen />
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            Dates describe an illustrative acquisition cadence · not a claim about specific real
            acquisitions
          </p>
        </div>

        {/* ------------------- Interferometry and the profile ------------------- */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <FigureFrame
            title="How two passes reveal movement"
            caption="Two acquisitions of the same point, and the fringe pattern their phase difference produces. A teaching diagram, not an interferogram from any mission."
            source={STORY_SOURCES.interferogramConcept}
            tone="dark"
            watermark
          >
            <div className="aspect-[820/420] w-full">
              <InterferogramConcept />
            </div>
          </FigureFrame>

          <FigureFrame
            title="Illustrative deformation profile across the plain"
            caption="The shape follows the published description of the pattern; the curve itself is a schematic and is not a digitised measurement."
            source={STORY_SOURCES.sentinelTehranSchematic}
            tone="dark"
            watermark
          >
            <div className="p-3">
              <DeformationProfileChart height={260} />
            </div>
          </FigureFrame>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {LEGEND.map((entry) => (
            <li
              key={entry.label}
              className="flex items-start gap-2.5 rounded-xl border border-hairline bg-panel/35 px-3.5 py-3"
            >
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: entry.swatch }}
              />
              <span className="text-[12px] leading-relaxed text-white/60">{entry.label}</span>
            </li>
          ))}
        </ul>

        {/* ------------------- Sources ------------------- */}
        <div className="mt-10 rounded-2xl border border-hairline bg-panel/30 p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
            Sources for this chapter
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {SPACE_CITATIONS.map((citation) => (
              <li key={citation.id} className="border-t border-hairline pt-3">
                <p className="font-display text-[13.5px] font-semibold text-white">
                  {citation.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/55">
                  {citation.authors} · {citation.institution}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  {citation.date}
                </p>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-block break-all font-mono text-[10px] text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
                >
                  {citation.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
