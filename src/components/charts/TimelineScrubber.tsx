import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/cn'
import type { CaseCity, TimelineEvent } from '@/data/types'

const KIND_META: Record<TimelineEvent['kind'], { label: string; color: string; ring: string }> = {
  cause: { label: 'Cause', color: '#ff7a6b', ring: 'rgba(255,122,107,0.35)' },
  observation: { label: 'Observation', color: '#38d6ff', ring: 'rgba(56,214,255,0.35)' },
  policy: { label: 'Policy', color: '#9b8cff', ring: 'rgba(155,140,255,0.35)' },
  impact: { label: 'Impact', color: '#f6c667', ring: 'rgba(246,198,103,0.35)' },
  recovery: { label: 'Recovery', color: '#14e0c0', ring: 'rgba(20,224,192,0.35)' },
}

interface SelectedEvent {
  city: CaseCity
  event: TimelineEvent
}

/**
 * Interactive multi-city timeline. A year scrubber controls how far the story
 * has progressed; event markers can be selected to reveal detail.
 */
export function TimelineScrubber({ cities }: { cities: CaseCity[] }) {
  const { minYear, maxYear } = useMemo(() => {
    const years = cities.flatMap((c) => c.timeline.map((e) => e.year))
    return { minYear: Math.min(...years), maxYear: Math.max(...years) }
  }, [cities])

  const [year, setYear] = useState(maxYear)
  const [selected, setSelected] = useState<SelectedEvent | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [year])

  const pct = (value: number) => ((value - minYear) / (maxYear - minYear)) * 100

  const ticks = useMemo(() => {
    const step = maxYear - minYear > 80 ? 20 : 10
    const list: number[] = []
    for (let y = Math.ceil(minYear / step) * step; y <= maxYear; y += step) list.push(y)
    return list
  }, [minYear, maxYear])

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {Object.entries(KIND_META).map(([kind, meta]) => (
          <span key={kind} className="flex items-center gap-2 text-[12px] text-white/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
            {meta.label}
          </span>
        ))}
      </div>

      {/* Tracks */}
      <div className="space-y-5">
        {cities.map((city) => (
          <div key={city.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-display text-[13px] font-semibold text-white">
                {city.name}
                <span className="ml-2 font-sans text-[11px] font-normal text-white/40">
                  {city.country}
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                {city.timeline.length} recorded milestones
              </span>
            </div>

            <div className="relative pt-5">
              {/* baseline */}
              <div className="relative h-1 rounded-full bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan/60 to-teal/60"
                  style={{ width: `${pct(year)}%` }}
                />
              </div>

              {/* markers */}
              {city.timeline.map((event) => {
                const meta = KIND_META[event.kind]
                const reached = event.year <= year
                const isSelected = selected?.event.year === event.year && selected.city.id === city.id
                return (
                  <button
                    key={`${city.id}-${event.year}-${event.title}`}
                    type="button"
                    onClick={() => setSelected({ city, event })}
                    className={cn(
                      'group absolute top-1.5 -translate-x-1/2 rounded-full transition-all duration-300',
                      reached ? 'opacity-100' : 'opacity-30 hover:opacity-70',
                    )}
                    style={{
                      left: `${pct(event.year)}%`,
                      boxShadow: isSelected ? `0 0 0 5px ${meta.ring}` : undefined,
                    }}
                    aria-label={`${city.name} ${event.year}: ${event.title}`}
                  >
                    <span
                      className={cn(
                        'block rounded-full border-2 transition-transform duration-300 group-hover:scale-125',
                        isSelected ? 'h-4 w-4' : 'h-3.5 w-3.5',
                      )}
                      style={{ backgroundColor: meta.color, borderColor: '#070c1a' }}
                    />
                    <span className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] text-white/45">
                      {event.year}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Year scrubber */}
      <div className="rounded-2xl border border-hairline bg-space/60 p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Timeline scrubber
          </span>
          <span className="font-display text-lg font-bold text-cyan">{year}</span>
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          aria-label="Scrub through time"
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(56,214,255,0.25)]"
        />
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/35">
          <span>{minYear}</span>
          {ticks.slice(1, -1).map((t) => (
            <span key={t} className="hidden sm:inline">
              {t}
            </span>
          ))}
          <span>{maxYear}</span>
        </div>
      </div>

      {/* Selected event detail */}
      {selected ? (
        <div className="rounded-2xl border border-hairline bg-panel/60 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{
                borderColor: `${KIND_META[selected.event.kind].color}66`,
                color: KIND_META[selected.event.kind].color,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: KIND_META[selected.event.kind].color }}
              />
              {KIND_META[selected.event.kind].label}
            </span>
            <span className="font-mono text-[11px] text-white/45">{selected.event.year}</span>
            <span className="text-[11px] text-white/45">·</span>
            <span className="text-[11px] text-white/60">{selected.city.name}</span>
          </div>
          <h4 className="mt-3 font-display text-lg font-semibold text-white">{selected.event.title}</h4>
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-white/65">
            {selected.event.detail}
          </p>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-hairline bg-space/40 px-5 py-6 text-center text-[13px] text-white/45">
          Select a milestone marker above to read its description.
        </p>
      )}
    </div>
  )
}
