import {
  ArrowRight,
  Activity,
  BookOpen,
  Compass,
  Globe,
  Layers,
  MapPin,
  Radar,
  Satellite,
  Scale,
  Telescope,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { TEHRAN, TOKYO } from '@/data/cities'
import { IMAGES } from '@/data/imagery'
import { MISSIONS } from '@/data/satellites'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { CausesExplorer } from '@/components/sections/CausesExplorer'
import { LinkButton } from '@/components/ui/Button'
import { DataStateBadge } from '@/components/ui/DataState'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatCard } from '@/components/ui/StatCard'

const MILESTONES = [
  {
    icon: Satellite,
    title: 'Measure',
    body: 'Repeat-pass radar interferometry turns millimetre ground motion into a mapped time series.',
  },
  {
    icon: Telescope,
    title: 'Interpret',
    body: 'Optical and gravity observations add the context: water storage, land cover and urban growth.',
  },
  {
    icon: Scale,
    title: 'Decide',
    body: 'Cities that measure consistently can regulate groundwater and see whether policy works.',
  },
]

export function Home() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative isolate overflow-hidden bg-void">
        <img
          src={IMAGES.heroEarth}
          alt="Illustration of Earth seen from orbit at night"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/70 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 grid-overlay opacity-25" />

        {/* Animated orbital element */}
        <div
          className="pointer-events-none absolute -right-32 top-1/2 hidden h-[42rem] w-[42rem] -translate-y-1/2 md:block"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full border border-cyan/15" />
          <div className="absolute inset-10 rounded-full border border-teal/12" />
          <div className="absolute inset-24 rounded-full border border-violet/12" />
          <div className="absolute inset-0 animate-orbit">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_20px_4px_rgba(56,214,255,0.6)]" />
          </div>
          <div className="absolute inset-10 animate-orbit [animation-duration:22s] [animation-direction:reverse]">
            <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_16px_3px_rgba(20,224,192,0.55)]" />
          </div>
          <div className="absolute inset-24 animate-pulse-soft rounded-full bg-gradient-to-br from-cyan/10 via-teal/5 to-violet/10 blur-2xl" />
        </div>

        {/* Scan sweep */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-sweep bg-gradient-to-b from-transparent via-cyan/8 to-transparent"
          aria-hidden
        />

        <div className="shell relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/8 px-3.5 py-1.5 backdrop-blur">
              <Radar className="h-3.5 w-3.5 text-cyan" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
                Earth observation · land subsidence
              </span>
            </span>

            <h1 className="mt-7 text-balance font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.9rem]">
              The Ground Beneath Us
              <br />
              <span className="bg-gradient-to-r from-teal via-cyan to-violet bg-clip-text text-transparent">
                Is Changing.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-white/70 sm:text-[17.5px]">
              Discover how satellite observations reveal land subsidence, uncover its causes, and help
              cities build a more sustainable future.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <LinkButton to="/explore" size="lg">
                <Compass className="h-4.5 w-4.5" />
                Explore the Data
              </LinkButton>
              <LinkButton to="/stories" size="lg" variant="secondary">
                <BookOpen className="h-4.5 w-4.5" />
                Discover Our Stories
              </LinkButton>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                { icon: Globe, text: 'Tehran & Tokyo case studies' },
                { icon: Satellite, text: 'InSAR-based evidence' },
                { icon: Layers, text: 'Every visual is labelled' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-[12.5px] text-white/50">
                  <Icon className="h-4 w-4 text-teal/80" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ STATS ------------------------------ */}
      <section className="relative z-10 border-b border-line bg-mist pb-16 pt-14 sm:pb-20">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal>
              <StatCard
                tone="light"
                accent="cyan"
                value={TEHRAN.subsidence.headline.replace('Up to ', '≈ ').replace(' in the most affected districts', '')}
                label="Tehran · reported peak rate"
                note="Published InSAR studies report roughly 20–25 cm/yr in the most affected south-western districts."
                icon={<Activity className="h-5 w-5" />}
                badge={<DataStateBadge state="verified" />}
              />
            </Reveal>
            <Reveal delay={90}>
              <StatCard
                tone="light"
                accent="violet"
                value="≈ 4 m"
                label="Tokyo · cumulative settlement"
                note="Historic lowland settlement documented by levelling surveys before groundwater regulation."
                icon={<MapPin className="h-5 w-5" />}
                badge={<DataStateBadge state="verified" />}
              />
            </Reveal>
            <Reveal delay={180}>
              <StatCard
                tone="light"
                accent="sand"
                value="4 layers"
                label="Map overlays in this demo"
                note="Land subsidence, satellite observations, groundwater and agricultural areas — all illustrative placeholders."
                icon={<Layers className="h-5 w-5" />}
                badge={<DataStateBadge state="demo" />}
              />
            </Reveal>
          </div>

          <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-muted">
            Two cards above carry published reference values and are attributed as such. Everything
            else on this platform — map zones, curves and percentages — is{' '}
            <strong className="font-semibold text-slate-ink">demonstration data</strong> built to show
            how the analysis works.
          </p>
        </div>
      </section>

      {/* --------------------------- WHAT & WHY --------------------------- */}
      <section className="border-b border-line bg-cloud py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="The problem"
            title="Slow enough to ignore. Permanent once it happens."
            description="Land subsidence is the gradual sinking of the ground, usually caused by withdrawing water from the sediments beneath a city. It is measured in millimetres per year and accumulates over decades."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-line bg-mist">
                <img
                  src={IMAGES.evidenceRadar}
                  alt="Illustrative radar interferogram showing ground deformation fringes"
                  className="h-64 w-full object-cover sm:h-80"
                  loading="lazy"
                />
                <div className="border-t border-line bg-cloud p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Illustrative interferogram
                    </p>
                    <DataStateBadge state="demo" />
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-ink">
                    In a real interferogram, each colour fringe represents a fixed amount of
                    displacement along the satellite’s line of sight. Dense fringe packs mean fast
                    movement; breaks in the pattern mean the data could not be trusted there. This
                    image is a rendering, not a processed product.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {MILESTONES.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 80}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-cloud p-5 card-shadow">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal/15 to-violet/15 text-teal-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Step {i + 1}
                      </p>
                      <h3 className="mt-1 font-display text-[17px] font-semibold text-ink">{title}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- CAUSES ----------------------------- */}
      <CausesExplorer />

      {/* ---------------------------- MISSIONS ---------------------------- */}
      <section className="relative overflow-hidden border-t border-hairline bg-space py-20 sm:py-24">
        <div className="absolute inset-0 grid-overlay opacity-[0.16]" />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-violet/10 blur-[100px]"
          aria-hidden
        />
        <div className="shell relative">
          <SectionHeading
            tone="dark"
            eyebrow="Instruments"
            title="Different satellites answer different questions"
            description="NISAR is not Sentinel-1. Each mission has its own wavelength, resolution and limits — and mixing them up is one of the most common errors in public discussion of Earth observation."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONS.map((mission, i) => (
              <Reveal key={mission.id} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-hairline bg-panel/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/30 hover:bg-panel/70">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-[16px] font-bold text-white">{mission.name}</h3>
                      <p className="mt-0.5 text-[12px] text-white/50">{mission.agency}</p>
                    </div>
                    <span
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{
                        borderColor: `${mission.accent}55`,
                        color: mission.accent,
                      }}
                    >
                      {mission.status}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2.5">
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/35">
                        Sensor
                      </dt>
                      <dd className="text-[12.5px] text-white/75">{mission.sensor}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/35">
                        Technique
                      </dt>
                      <dd className="text-[12.5px] text-white/75">{mission.technique}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 border-t border-hairline pt-3.5 text-[12.5px] leading-relaxed text-white/55">
                    {mission.availabilityNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {mission0Note()}
        </div>
      </section>

      {/* --------------------------- BEFORE / AFTER --------------------------- */}
      <BeforeAfterSection />

      {/* ---------------------------- TWO CITIES ---------------------------- */}
      <section className="border-t border-line bg-mist py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Case studies"
            title="Two cities, two very different chapters"
            description="One is still sinking while it searches for a way out. The other found its way out — and can show what that took."
            actions={
              <LinkButton to="/compare" variant="light" size="sm">
                Compare in detail
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            }
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[TEHRAN, TOKYO].map((city, i) => (
              <Reveal key={city.id} delay={i * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cloud card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-lg">
                  <div className="relative h-44 overflow-hidden bg-deep">
                    <img
                      src={i === 0 ? IMAGES.causeAgriculture : IMAGES.impactDamage}
                      alt=""
                      className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                        {city.region}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
                        {city.name}
                        <span className="ml-2 text-[13px] font-medium text-white/50">
                          {city.country}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[14px] leading-relaxed text-slate-ink">{city.tagline}</p>

                    <dl className="mt-5 space-y-3">
                      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                          Current status
                        </dt>
                        <dd className="text-right text-[13px] font-medium text-ink">
                          {i === 0 ? 'Ongoing' : 'Largely stabilised'}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                          Monitoring since
                        </dt>
                        <dd className="text-right text-[13px] font-medium text-ink">
                          {i === 0 ? '≈ 2003' : '≈ 1900'}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {city.primaryCauses.slice(0, 3).map((cause) => (
                        <span
                          key={cause}
                          className="rounded-full border border-line bg-mist px-2.5 py-1 text-[11.5px] text-slate-ink"
                        >
                          {cause}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex-1" />
                    <div className="flex flex-wrap gap-2.5">
                      <LinkButton to="/compare" size="sm" variant="outline">
                        Compare
                      </LinkButton>
                      <LinkButton to="/stories" size="sm" variant="ghost">
                        Read the story
                        <ArrowRight className="h-3.5 w-3.5" />
                      </LinkButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------ */}
      <section className="relative overflow-hidden bg-void py-20 sm:py-24">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-teal/12 blur-[110px]"
          aria-hidden
        />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan">
              Start exploring
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold text-white sm:text-4xl">
              Look at the ground through a satellite’s eyes.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
              Open the exploration dashboard, switch between observation layers, and trace how the
              evidence for subsidence is assembled — with every source stated.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <LinkButton to="/explore" size="lg">
                <Compass className="h-4.5 w-4.5" />
                Explore the Data
              </LinkButton>
              <LinkButton to="/about" size="lg" variant="secondary">
                How we handle data
              </LinkButton>
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              Educational demonstration · not an official NASA product
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function mission0Note() {
  return (
    <p className="mt-8 flex items-start gap-3 rounded-2xl border border-hairline bg-panel/40 p-4 text-[12.5px] leading-relaxed text-white/55">
      <Link to="/about" className="flex items-start gap-3">
        <Scale className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
        <span>
          <strong className="font-semibold text-white/85">Why this distinction matters:</strong> NISAR
          is a joint NASA–ISRO mission with its own L-band radar and its own data timeline. Nothing in
          this platform is presented as NISAR data. Sentinel-1, ENVISAT, ALOS, Landsat and GRACE-FO are
          separate systems and are always named as such. Read our data policy →
        </span>
      </Link>
    </p>
  )
}
