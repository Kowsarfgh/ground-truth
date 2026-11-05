import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Compass,
  Database,
  Globe,
  Info,
  Radar,
  Satellite,
  ShieldCheck,
} from 'lucide-react'

import { cn } from '@/lib/cn'
import { MISSIONS, missionById } from '@/data/satellites'
import type { DataState } from '@/data/types'
import { LinkButton } from '@/components/ui/Button'
import { DATA_STATE_CONFIG, DataStateBadge } from '@/components/ui/DataState'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Required explicit states, ordered the way a user meets them. */
const STATE_ORDER: DataState[] = [
  'loading',
  'processing',
  'demo',
  'unavailable',
  'error',
  'verified',
]

const POLICY: { title: string; detail: string }[] = [
  {
    title: 'Every number carries a source',
    detail:
      'Each chart, map and figure ships with a data-source panel listing mission, sensor, provider, acquisition date, processing method, resolution, confidence and limitations.',
  },
  {
    title: 'Demo data is always labelled',
    detail:
      'Illustrative values are marked as demonstration content wherever they appear. They are never presented as verified measurements.',
  },
  {
    title: 'Missing data is stated, never smoothed',
    detail:
      'An empty layer means the observation is missing. It never means the ground is stable, and the interface says so explicitly.',
  },
  {
    title: 'Missions are never conflated',
    detail:
      'NISAR is a distinct mission from Sentinel-1, ENVISAT, ALOS, Landsat and GRACE-FO. Nothing here is called NISAR data unless the source field literally says NISAR.',
  },
  {
    title: 'Comparisons expose their own limits',
    detail:
      'Where two records rest on different methods or eras, the interface rates how comparable they really are instead of implying equivalence.',
  },
]

export function About() {
  const nisar = missionById('nisar')
  const sentinel = missionById('sentinel-1')

  return (
    <div className="bg-mist">
      {/* ------------------------------- HERO ------------------------------- */}
      <header className="relative overflow-hidden border-b border-hairline bg-void">
        <div className="absolute inset-0 grid-overlay opacity-[0.18]" />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-teal/12 blur-[110px]"
          aria-hidden
        />
        <div className="shell relative py-16 sm:py-20">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/35 bg-teal/10 px-3.5 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-teal" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">
              About &amp; data policy
            </span>
          </span>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl">
            How this platform handles evidence
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/65">
            GROUND TRUTH is an educational Earth observation demonstration built around land
            subsidence in Tehran and Tokyo. It is designed to show how satellite evidence is
            assembled — and to be explicit about the moment where the evidence stops.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12.5px] text-white/50">
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-teal/80" />
              Not an official NASA product
            </span>
            <span className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-teal/80" />
              Two case studies, one method
            </span>
            <span className="flex items-center gap-2">
              <Database className="h-4 w-4 text-teal/80" />
              Ready for real NISAR integration
            </span>
          </div>
        </div>
      </header>

      {/* -------------------------- WHAT IT IS / IS NOT -------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Scope"
            title="What GROUND TRUTH is — and what it is not"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-cloud p-6 card-shadow">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-deep/10 text-teal-deep">
                  <CircleCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">It is</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'An educational demonstration of how land subsidence is observed, explained and compared.',
                    'A structure built so that real datasets — including future NISAR products — can be dropped in without redesign.',
                    'A platform that documents its own uncertainty instead of hiding it.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-ink">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-line bg-cloud p-6 card-shadow">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                  <Info className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">It is not</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'A source of verified measurements for any specific location, district or address.',
                    'An official NASA, ESA or JAXA product, nor an operational monitoring service.',
                    'A claim that any particular city is subsiding based on the demo overlays shown here.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-ink">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------- NISAR VS SENTINEL --------------------------- */}
      <section className="border-t border-hairline bg-space py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            tone="dark"
            eyebrow="Mission distinction"
            title="NISAR is not Sentinel-1"
            description="The two are separate missions with separate radars, separate agencies and separate data timelines. Treating them as interchangeable is one of the most common errors in public discussion of Earth observation."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[nisar, sentinel].map((mission, i) =>
              mission ? (
                <Reveal key={mission.id} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-hairline bg-panel/40 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10"
                          style={{ backgroundColor: `${mission.accent}22` }}
                        >
                          <Satellite className="h-5 w-5" style={{ color: mission.accent }} />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-bold text-white">{mission.name}</h3>
                          <p className="text-[12px] text-white/50">{mission.agency}</p>
                        </div>
                      </div>
                      <span
                        className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{ borderColor: `${mission.accent}55`, color: mission.accent }}
                      >
                        {mission.status}
                      </span>
                    </div>

                    <dl className="mt-5 space-y-3">
                      {[
                        { label: 'Sensor', value: mission.sensor },
                        { label: 'Band', value: mission.band },
                        { label: 'Launch', value: mission.launch },
                        { label: 'Technique', value: mission.technique },
                      ].map((row) => (
                        <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-2.5">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                            {row.label}
                          </dt>
                          <dd className="text-[12.5px] text-white/80">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-4 text-[12.5px] leading-relaxed text-white/55">
                      {mission.availabilityNote}
                    </p>
                  </div>
                </Reveal>
              ) : null,
            )}
          </div>

          <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-violet/30 bg-violet/8 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
            <p className="text-[13px] leading-relaxed text-white/70">
              <strong className="font-semibold text-white">Our rule:</strong> no layer, chart or claim
              in this platform is attributed to NISAR unless the mission field says NISAR. Where a layer
              would need NISAR data that is not yet connected, it is marked{' '}
              <span className="font-mono text-[12px] text-violet">No suitable data available</span> —
              never quietly filled with another mission's numbers.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------ DATA STATES ------------------------------ */}
      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Data states"
            title="Six states every visualisation can be in"
            description="The interface never leaves a blank space unexplained. Each visualisation resolves to one of these states, and the state is shown to the reader."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATE_ORDER.map((state, i) => {
              const config = DATA_STATE_CONFIG[state]
              return (
                <Reveal key={state} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-cloud p-5 card-shadow">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl border',
                        config.light,
                      )}
                    >
                      {config.icon}
                    </div>
                    <div className="mt-4">
                      <DataStateBadge state={state} />
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-ink">
                      {config.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-sand/45 bg-amber-500/8 p-4 text-[12.5px] leading-relaxed text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              "No suitable data available" never means "no subsidence". A missing observation is a
              limitation of the measurement system for that place and date — not evidence that the
              ground is stable.
            </span>
          </p>
        </div>
      </section>

      {/* ------------------------------- MISSIONS ------------------------------- */}
      <section className="border-t border-line bg-cloud py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Instruments"
            title="Missions referenced in this platform"
            description="Each entry lists what the mission can and cannot do for subsidence work. None of them is presented as a source of live data here."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONS.map((mission, i) => (
              <Reveal key={mission.id} delay={i * 50}>
                <div className="h-full rounded-2xl border border-line bg-mist p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[15.5px] font-bold text-ink">{mission.name}</h3>
                      <p className="mt-0.5 text-[12px] text-muted">{mission.agency}</p>
                    </div>
                    <span
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{ borderColor: `${mission.accent}66`, color: mission.accent }}
                    >
                      {mission.status}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2.5">
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                        Sensor
                      </dt>
                      <dd className="text-[12.5px] text-slate-ink">{mission.sensor}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                        Technique
                      </dt>
                      <dd className="text-[12.5px] text-slate-ink">{mission.technique}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 border-t border-line pt-3.5 text-[12.5px] leading-relaxed text-muted">
                    {mission.availabilityNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ DATA POLICY ------------------------------ */}
      <section className="relative overflow-hidden border-t border-hairline bg-void py-16 sm:py-20">
        <div className="absolute inset-0 grid-overlay opacity-[0.16]" />
        <div className="shell relative">
          <SectionHeading
            tone="dark"
            eyebrow="Our commitments"
            title="Five rules we hold ourselves to"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {POLICY.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full gap-4 rounded-2xl border border-hairline bg-panel/40 p-5">
                  <span className="font-mono text-[11px] font-bold text-cyan">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">{item.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- CTA -------------------------------- */}
      <section className="border-t border-line bg-mist py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-cloud p-6 card-shadow sm:p-8 lg:flex-row lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-deep">
                Explore with the caveats in view
              </p>
              <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-ink">
                Open the dashboard and read a data-source panel for yourself.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton to="/explore" size="lg">
                <Compass className="h-4.5 w-4.5" />
                Explore the Data
                <ArrowRight className="h-4.5 w-4.5" />
              </LinkButton>
              <LinkButton to="/stories" size="lg" variant="outline">
                <BookOpen className="h-4.5 w-4.5" />
                Read the stories
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
