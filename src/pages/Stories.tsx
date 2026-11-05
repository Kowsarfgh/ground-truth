import {
  Activity,
  ArrowDown,
  ArrowRight,
  Building,
  CircleCheck,
  Compass,
  MapPin,
  Play,
  Radar,
  Satellite,
  Scale,
  Ship,
  TrainFront,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'
import { CAUSES } from '@/data/causes'
import { TEHRAN, TOKYO } from '@/data/cities'
import { IMAGES } from '@/data/imagery'
import { STORY_STAGES } from '@/data/stories'
import type { StoryStage } from '@/data/types'
import { CauseBreakdown } from '@/components/charts/CauseBreakdown'
import { TrendChart } from '@/components/charts/TrendChart'
import type { TrendSeries } from '@/components/charts/TrendChart'
import { MapCanvas } from '@/components/map/MapCanvas'
import { LinkButton } from '@/components/ui/Button'
import { DataStateNotice } from '@/components/ui/DataState'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STAGE_IDS = STORY_STAGES.map((s) => s.id)

const TREND_SERIES: TrendSeries[] = [
  { id: 'tehran', label: 'Tehran', color: '#38d6ff', points: TEHRAN.trend },
  { id: 'tokyo', label: 'Tokyo', color: '#9b8cff', points: TOKYO.trend },
]

const FIGURE_TITLES: Record<StoryStage['figure']['kind'], string> = {
  chart: 'Subsidence rate over time',
  map: 'Observation coverage (demo map)',
  diagram: 'Relative weighting of mechanisms',
  list: 'Categories of impact',
  compare: 'Two trajectories, side by side',
}

const STAGE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  event: Activity,
  evidence: Radar,
  causes: Scale,
  impact: Building,
  response: Compass,
}

const IMPACTS: { icon: ComponentType<{ className?: string }>; title: string; detail: string }[] = [
  {
    icon: Building,
    title: 'Buildings & foundations',
    detail:
      'Differential settlement tilts and cracks structures designed for a level surface; the damage is uneven and therefore hard to predict.',
  },
  {
    icon: Ship,
    title: 'Coastal & flood exposure',
    detail:
      'Where the land sinks, relative sea level rises twice over — increasing storm-surge and tidal flood risk even without any change in the ocean.',
  },
  {
    icon: TrainFront,
    title: 'Linear infrastructure',
    detail:
      'Pipelines, railways, canals and well casings are bent or ruptured when the ground moves beneath them at different rates.',
  },
  {
    icon: MapPin,
    title: 'Lost aquifer storage',
    detail:
      'Compacted pore space holds less water, so the buffer that could carry a city through drought is permanently reduced.',
  },
]

function useActiveStage(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function FigureBody({ stage }: { stage: StoryStage }) {
  const { kind } = stage.figure

  if (kind === 'map') {
    return (
      <div className="h-[380px] w-full sm:h-[440px]">
        <MapCanvas city={TEHRAN} layer="observations" />
      </div>
    )
  }

  if (kind === 'diagram') {
    return (
      <div className="px-3 py-5 sm:px-5">
        <CauseBreakdown causes={CAUSES} height={280} />
        <p className="mt-2 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          Bar length = illustrative emphasis · not a measured attribution
        </p>
      </div>
    )
  }

  if (kind === 'list') {
    return (
      <div>
        <img
          src={IMAGES.impactDamage}
          alt="Illustrative rendering of cracked road surface and tilted foundation"
          className="h-44 w-full object-cover sm:h-52"
          loading="lazy"
        />
        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
          {IMPACTS.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="rounded-xl border border-hairline bg-panel/40 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-cyan ring-1 ring-inset ring-hairline">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 font-display text-[14px] font-semibold text-white">{title}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // chart | compare → both use the trend chart
  return (
    <div className="px-3 py-5 sm:px-5">
      <DataStateNotice
        state="demo"
        tone="dark"
        className="mb-3"
        message="Both curves are illustrative shapes drawn to show the documented pattern. They are not digitised measurements."
      />
      <TrendChart series={TREND_SERIES} height={300} />
    </div>
  )
}

function StageSection({ stage, flip }: { stage: StoryStage; flip: boolean }) {
  const Icon = STAGE_ICONS[stage.id] ?? Activity

  return (
    <section
      id={stage.id}
      className="scroll-mt-24 border-t border-hairline py-16 sm:py-20"
      aria-labelledby={`${stage.id}-title`}
    >
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14">
        <Reveal className={cn(flip && 'lg:order-2')}>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 ring-1 ring-inset ring-white/10">
              <Icon className="h-5.5 w-5.5 text-cyan" />
            </span>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan">
                {stage.eyebrow}
              </p>
              <p className="font-display text-[13px] font-semibold text-white/50">
                {String(stage.index).padStart(2, '0')} / 05
              </p>
            </div>
          </div>

          <h2
            id={`${stage.id}-title`}
            className="mt-5 text-balance font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl"
          >
            {stage.title}
          </h2>

          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-white/70">{stage.lead}</p>

          <div className="mt-5 space-y-4">
            {stage.body.map((paragraph) => (
              <p key={paragraph} className="text-[14.5px] leading-relaxed text-white/55">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 space-y-3 rounded-2xl border border-hairline bg-panel/40 p-5">
            {stage.keyPoints.map((point) => (
              <li key={point} className="flex gap-3 text-[13.5px] leading-relaxed text-white/75">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className={cn(flip && 'lg:order-1')}>
          <FigureFrame
            title={FIGURE_TITLES[stage.figure.kind]}
            caption={stage.figure.caption}
            source={stage.figure.source}
            tone="dark"
            watermark={stage.figure.source.provenance === 'demonstration'}
          >
            <FigureBody stage={stage} />
          </FigureFrame>
        </Reveal>
      </div>
    </section>
  )
}

export function Stories() {
  const active = useActiveStage(STAGE_IDS)

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-void">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="relative isolate overflow-hidden border-b border-hairline">
        <img
          src={IMAGES.evidenceRadar}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/85 to-void" />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="shell relative py-20 sm:py-28">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/8 px-3.5 py-1.5 backdrop-blur">
            <Satellite className="h-3.5 w-3.5 text-cyan" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
              Our stories · five stages
            </span>
          </span>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl">
            How a city slowly loses its ground
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-white/65">
            Scroll through the same five questions that researchers ask about any subsiding city —
            from the first hint of movement to the policy decisions that could stop it.
          </p>
          <div className="mt-8 flex items-center gap-2 text-white/40">
            <ArrowDown className="h-4 w-4 animate-pulse-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll to begin</span>
          </div>
        </div>
      </header>

      {/* --------------------------- STAGE RAIL --------------------------- */}
      <div className="sticky top-16 z-40 border-b border-hairline bg-void/85 backdrop-blur-xl">
        <div className="shell">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STORY_STAGES.map((stage) => {
              const isActive = active === stage.id
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goTo(stage.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-300',
                    isActive
                      ? 'border-cyan/45 bg-cyan/12 text-cyan'
                      : 'border-transparent text-white/50 hover:border-hairline hover:text-white/80',
                  )}
                >
                  <span className="font-mono text-[10px]">{String(stage.index).padStart(2, '0')}</span>
                  {stage.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ----------------------------- STAGES ----------------------------- */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-violet/8 blur-[130px]"
          aria-hidden
        />
        <div className="relative shell">
          {STORY_STAGES.map((stage, i) => (
            <StageSection key={stage.id} stage={stage} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      {/* ------------------------------ CTA ------------------------------ */}
      <section className="border-t border-hairline bg-space py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Continue"
            title="See the evidence for yourself"
            description="Move the story into the exploration dashboard, then read the full Tehran–Tokyo comparison — including where the two records are not comparable at all."
          />
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <LinkButton to="/stories/tehran" size="lg">
              <Play className="h-4.5 w-4.5" />
              Play the animated story
            </LinkButton>
            <LinkButton to="/explore" size="lg" variant="secondary">
              <Compass className="h-4.5 w-4.5" />
              Explore the Data
            </LinkButton>
            <LinkButton to="/compare" size="lg" variant="secondary">
              Compare the cities
              <ArrowRight className="h-4.5 w-4.5" />
            </LinkButton>
          </div>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            Every figure above carries a full data-source panel
          </p>
        </div>
      </section>
    </div>
  )
}
