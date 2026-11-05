import {
  ArrowRight,
  CircleCheck,
  Compass,
  Droplets,
  Globe,
  Info,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { TEHRAN, TOKYO } from '@/data/cities'
import { COMPARABILITY_LABEL, COMPARISON_ROWS } from '@/data/comparison'
import type { ComparisonRow } from '@/data/comparison'
import { IMAGES } from '@/data/imagery'
import { SOURCES } from '@/data/satellites'
import { LEARNINGS } from '@/data/stories'
import type { CaseCity } from '@/data/types'
import { TimelineScrubber } from '@/components/charts/TimelineScrubber'
import { TrendChart } from '@/components/charts/TrendChart'
import type { TrendSeries } from '@/components/charts/TrendChart'
import { LinkButton } from '@/components/ui/Button'
import { DataSourcePanel } from '@/components/ui/DataSourcePanel'
import { DataStateBadge } from '@/components/ui/DataState'
import { FigureFrame } from '@/components/ui/FigureFrame'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const TREND_SERIES: TrendSeries[] = [
  { id: 'tehran', label: 'Tehran', color: '#38d6ff', points: TEHRAN.trend },
  { id: 'tokyo', label: 'Tokyo', color: '#9b8cff', points: TOKYO.trend },
]

const CITY_IMAGE: Record<CaseCity['id'], string> = {
  tehran: IMAGES.causeGroundwater,
  tokyo: IMAGES.responseRoom,
}

const CONTEXT_LABELS: { key: keyof CaseCity['context']; label: string }[] = [
  { key: 'population', label: 'Population' },
  { key: 'elevation', label: 'Elevation' },
  { key: 'geology', label: 'Geology' },
  { key: 'climate', label: 'Climate' },
  { key: 'waterSource', label: 'Water source' },
  { key: 'landUse', label: 'Land use' },
]

const COMPARABILITY_STYLE: Record<ComparisonRow['comparability'], string> = {
  comparable: 'border-teal-deep/30 bg-teal-deep/10 text-teal-deep',
  partial: 'border-amber-500/35 bg-amber-500/10 text-amber-700',
  'not-comparable': 'border-slate-400/40 bg-slate-500/10 text-slate-600',
}

function ComparabilityBadge({ value }: { value: ComparisonRow['comparability'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em]',
        COMPARABILITY_STYLE[value],
      )}
    >
      {COMPARABILITY_LABEL[value]}
    </span>
  )
}

function CityCard({ city }: { city: CaseCity }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cloud card-shadow">
      <div className="relative h-40 overflow-hidden bg-deep">
        <img src={CITY_IMAGE[city.id]} alt="" className="h-full w-full object-cover opacity-70" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">{city.region}</p>
          <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
            {city.name}
            <span className="ml-2 text-[13px] font-medium text-white/50">{city.country}</span>
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-display text-[15px] font-semibold text-ink">{city.tagline}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-ink">{city.overview}</p>

        <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-mist">
          {CONTEXT_LABELS.map(({ key, label }) => (
            <div key={key} className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</dt>
              <dd className="text-[12.5px] leading-relaxed text-slate-ink">{city.context[key]}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Main causes
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {city.primaryCauses.map((cause) => (
            <span
              key={cause}
              className="rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] text-slate-ink"
            >
              {cause}
            </span>
          ))}
        </div>

        <div className="mt-5 flex-1" />
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Observation sources referenced
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {city.observationSources.map((source) => (
            <li key={source} className="flex items-start gap-2 text-[12.5px] text-slate-ink">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-deep" />
              {source}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ManagementColumn({ city, accent }: { city: CaseCity; accent: string }) {
  return (
    <div className="rounded-2xl border border-line bg-cloud p-5 card-shadow sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-ink">{city.name}</h3>
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em]"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          {city.country}
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-ink">{city.groundwater.summary}</p>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Groundwater management history
      </p>
      <ol className="mt-3 space-y-3">
        {city.groundwater.history.map((phase) => (
          <li key={phase.period} className="relative border-l-2 border-line pl-4">
            <span
              className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-mono text-[11px] text-muted">{phase.period}</span>
              <span className="font-display text-[13.5px] font-semibold text-ink">{phase.label}</span>
            </div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-ink">{phase.detail}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Policy responses
      </p>
      <div className="mt-3 space-y-2.5">
        {city.policies.map((policy) => (
          <div key={policy.name} className="rounded-xl border border-line bg-mist p-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-[13.5px] font-semibold text-ink">{policy.name}</span>
              <span className="font-mono text-[10px] text-muted">{policy.year}</span>
            </div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-ink">{policy.effect}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Evidence of change after intervention
      </p>
      <ul className="mt-3 space-y-2.5">
        {city.evidenceAfterIntervention.map((item) => (
          <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-ink">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Callout({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-panel/40 p-4 sm:p-5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan ring-1 ring-inset ring-hairline">
        {icon}
      </span>
      <div>
        <p className="font-display text-[14px] font-semibold text-white">{title}</p>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-white/60">{children}</p>
      </div>
    </div>
  )
}

export function Compare() {
  return (
    <div className="bg-mist">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="relative overflow-hidden border-b border-hairline bg-space">
        <div className="absolute inset-0 grid-overlay opacity-[0.18]" />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-violet/12 blur-[110px]"
          aria-hidden
        />
        <div className="shell relative py-16 sm:py-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-violet/35 bg-violet/10 px-3.5 py-1.5">
            <Scale className="h-3.5 w-3.5 text-violet" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet">
              Compare cities
            </span>
          </span>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl">
            Tehran and Tokyo, side by side
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/65">
            Two cities on compressible ground, separated by half a century of policy. This page places
            their evidence next to each other — and states plainly where the two records cannot be
            compared at all.
          </p>

          <div className="mt-8">
            <Callout
              icon={<Info className="h-4.5 w-4.5" />}
              title="No winner is declared here"
            >
              Tokyo is further along the curve than Tehran, but the two are not running the same race.
              They differ in geology, in the era of their peak, and in how the ground was measured. We
              compare the evidence and explain the differences; we do not score them.
            </Callout>
          </div>
        </div>
      </header>

      {/* --------------------------- CITY OVERVIEW --------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="City profiles"
            title="Overview and environmental context"
            description="The physical setting decides how much a city can sink. The management history decides whether it keeps sinking."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <CityCard city={TEHRAN} />
            </Reveal>
            <Reveal delay={100}>
              <CityCard city={TOKYO} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------- OBSERVATIONS ---------------------------- */}
      <section className="border-t border-hairline bg-space py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            tone="dark"
            eyebrow="Observation timeline"
            title="When the ground moved — and when it stopped"
            description="Scrub through the recorded milestones for both cities. Marker colour shows the type of event: cause, observation, policy, impact or recovery."
          />

          <Reveal className="mt-10">
            <FigureFrame
              tone="dark"
              title="Subsidence rate over time"
              caption="Tokyo's curve rises to a peak in the 1960s and flattens after groundwater laws take effect; Tehran's rises through the 2000s and remains elevated. Both shapes are illustrative."
              source={SOURCES.tehranTrend}
              watermark
            >
              <div className="px-3 py-5 sm:px-5">
                <TrendChart series={TREND_SERIES} height={320} />
              </div>
            </FigureFrame>
            <DataSourcePanel source={SOURCES.tokyoTrend} tone="dark" className="mt-3" />
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-2xl border border-hairline bg-panel/30 p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-white">
                  Recorded milestones
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Interactive · select a marker
                </span>
              </div>
              <TimelineScrubber cities={[TEHRAN, TOKYO]} />
            </div>
          </Reveal>

          <p className="mt-6 flex items-start gap-3 text-[12.5px] leading-relaxed text-white/50">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
            <span>
              Tokyo's early record comes from survey levelling; Tehran's from satellite radar. The two
              methods have different densities and uncertainties, so the markers are shown on a shared
              time axis for narrative clarity — not as directly equivalent measurements.
            </span>
          </p>
        </div>
      </section>

      {/* --------------------------- COMPARISON TABLE --------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Feature by feature"
            title="A comparison that flags its own limits"
            description="Each row carries a comparability rating. Where a direct comparison would mislead, the table says so instead of silently inviting one."
          />

          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line bg-cloud card-shadow">
            {/* Header row (desktop) */}
            <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.25fr)] gap-6 border-b border-line bg-mist px-6 py-4 lg:grid">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Dimension
              </span>
              <span className="flex items-center gap-2 font-display text-[14px] font-bold text-ink">
                <MapPin className="h-4 w-4 text-cyan-deep" />
                Tehran
              </span>
              <span className="flex items-center gap-2 font-display text-[14px] font-bold text-ink">
                <MapPin className="h-4 w-4 text-violet-deep" />
                Tokyo
              </span>
            </div>

            <div className="divide-y divide-line">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-4 px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.25fr)] lg:gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-[13.5px] font-semibold text-ink">
                      {row.label}
                    </span>
                    <ComparabilityBadge value={row.comparability} />
                  </div>

                  <div className="lg:border-l lg:border-line lg:pl-6">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-deep lg:hidden">
                      Tehran
                    </span>
                    <p className="text-[13px] leading-relaxed text-slate-ink">{row.tehran}</p>
                  </div>

                  <div className="lg:border-l lg:border-line lg:pl-6">
                    <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-violet-deep lg:hidden">
                      Tokyo
                    </span>
                    <p className="text-[13px] leading-relaxed text-slate-ink">{row.tokyo}</p>
                  </div>

                  <p className="text-[12px] leading-relaxed text-muted lg:col-span-3 lg:border-t lg:border-dashed lg:border-line lg:pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      Note ·{' '}
                    </span>
                    {row.note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------- MANAGEMENT HISTORY ------------------------- */}
      <section className="border-t border-line bg-cloud py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Water & policy"
            title="How each city managed the water beneath it"
            description="Groundwater history, the policies that responded to it, and the available evidence of what changed afterwards."
            actions={<DataStateBadge state="demo" />}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <ManagementColumn city={TEHRAN} accent="#0284c7" />
            </Reveal>
            <Reveal delay={100}>
              <ManagementColumn city={TOKYO} accent="#6d5ce0" />
            </Reveal>
          </div>

          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-sand/45 bg-amber-500/8 p-4 text-[12.5px] leading-relaxed text-amber-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              The policy names and dates above reflect well-documented historical milestones. The
              surrounding detail — and every figure elsewhere on this page — is demonstration content
              prepared for this educational platform.
            </span>
          </p>
        </div>
      </section>

      {/* ---------------------------- LEARNINGS ---------------------------- */}
      <section className="relative overflow-hidden border-t border-hairline bg-void py-16 sm:py-20">
        <div className="absolute inset-0 grid-overlay opacity-[0.16]" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]"
          aria-hidden
        />
        <div className="shell relative">
          <SectionHeading
            tone="dark"
            eyebrow="Synthesis"
            title="What can we learn?"
            description="Five transferable lessons that hold regardless of which city you are looking at."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNINGS.map((lesson, i) => (
              <Reveal key={lesson.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-hairline bg-panel/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-teal/30 hover:bg-panel/70">
                  <span className="font-mono text-[11px] font-bold text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[15.5px] font-bold text-white">
                    {lesson.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/60">{lesson.detail}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={LEARNINGS.length * 70}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-cyan/25 bg-gradient-to-br from-cyan/10 to-violet/10 p-5">
                <div>
                  <Droplets className="h-5 w-5 text-cyan" />
                  <h3 className="mt-3 font-display text-[15.5px] font-bold text-white">
                    The honest bottom line
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/65">
                    Tokyo shows that subsidence can be arrested. Tehran shows what it costs to keep
                    measuring while you try. Neither outcome is guaranteed — both depend on decisions
                    that are still being made.
                  </p>
                </div>
                <LinkButton to="/explore" size="sm" className="mt-5 w-fit">
                  Open the data
                  <ArrowRight className="h-3.5 w-3.5" />
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------ */}
      <section className="border-t border-line bg-mist py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-cloud p-6 card-shadow sm:p-8 lg:flex-row lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
                Read the full narrative
              </p>
              <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-ink">
                Follow the five stages from first movement to policy response.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton to="/stories" size="lg">
                <Compass className="h-4.5 w-4.5" />
                Read Our Stories
              </LinkButton>
              <LinkButton to="/about" size="lg" variant="outline">
                <Globe className="h-4.5 w-4.5" />
                Data policy
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
