import type { ComponentType } from 'react'
import { Building, Droplets, FlaskConical, Layers, Sprout, Sun } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/cn'
import { CAUSES } from '@/data/causes'
import { IMAGES } from '@/data/imagery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

type IconType = ComponentType<{ className?: string }>

const ICONS: Record<string, IconType> = {
  droplets: Droplets,
  sprout: Sprout,
  sun: Sun,
  layers: Layers,
  building2: Building,
}

const ILLUSTRATIONS: Record<string, string> = {
  groundwater: IMAGES.causeGroundwater,
  irrigation: IMAGES.causeAgriculture,
  drought: IMAGES.causeDrought,
  geology: IMAGES.causeGeology,
  urban: IMAGES.causeUrban,
}

export function CausesExplorer() {
  const [activeId, setActiveId] = useState(CAUSES[0].id)
  const active = CAUSES.find((c) => c.id === activeId) ?? CAUSES[0]

  return (
    <section id="causes" className="relative border-t border-line bg-mist py-20 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Causes of subsidence"
          title="Five forces that quietly remove the ground from under a city"
          description="Subsidence almost always has more than one cause. Select a mechanism to see how it works, what it looks like in the field, and why it matters for our two case studies."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Selector list */}
          <div className="space-y-3">
            {CAUSES.map((cause, i) => {
              const Icon = ICONS[cause.icon] ?? Droplets
              const isActive = cause.id === activeId
              return (
                <Reveal key={cause.id} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setActiveId(cause.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300',
                      isActive
                        ? 'border-cyan-deep/40 bg-cloud card-shadow'
                        : 'border-line bg-cloud/60 hover:border-cyan-deep/25 hover:bg-cloud',
                    )}
                  >
                    <span
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                      style={{
                        backgroundColor: isActive ? `${cause.accent}22` : 'rgba(10,17,32,0.05)',
                        color: isActive ? cause.accent : '#5b6b86',
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            'font-display text-[15px] font-semibold',
                            isActive ? 'text-ink' : 'text-slate-ink',
                          )}
                        >
                          {cause.title}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 font-mono text-[10px] transition-opacity duration-300',
                            isActive ? 'opacity-100' : 'opacity-0',
                          )}
                          style={{ color: cause.accent }}
                        >
                          {cause.demoShare}%
                        </span>
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                        {cause.short}
                      </span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>

          {/* Detail panel */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-line bg-cloud card-shadow">
              <div className="relative h-52 sm:h-60">
                <img
                  src={ILLUSTRATIONS[active.id]}
                  alt={`Illustration relating to ${active.title}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/25 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full border border-sand/50 bg-void/75 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur">
                  Illustrative image
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                    Mechanism
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-white">{active.title}</h3>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[14.5px] leading-relaxed text-slate-ink">{active.explanation}</p>

                <div className="mt-5 rounded-xl border border-line bg-mist p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    Chain of effects
                  </p>
                  <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-ink">
                    {active.mechanism}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      What to look for
                    </p>
                    <ul className="mt-3 space-y-2">
                      {active.indicators.map((indicator) => (
                        <li key={indicator} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-ink">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: active.accent }}
                          />
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      In our case studies
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-ink">{active.relevance}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-sand/45 bg-amber-500/8 p-3.5">
                  <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-[12px] leading-relaxed text-amber-800">
                    The {active.demoShare}% weighting shown above is a demonstration value used to
                    convey relative emphasis. It is not a measured attribution of subsidence to this
                    factor.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
