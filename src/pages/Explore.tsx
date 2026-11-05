import {
  Activity,
  Database,
  Droplets,
  Info,
  Layers,
  MapPin,
  Radar,
  Satellite,
  Search,
  Sprout,
  X,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/cn'
import { CITIES, cityById } from '@/data/cities'
import { OBSERVATION_DATES } from '@/data/observations'
import { SUBSIDENCE_RAMP } from '@/data/overlays'
import type { DataState } from '@/data/types'
import { MapCanvas } from '@/components/map/MapCanvas'
import type { MapLayerId } from '@/components/map/MapCanvas'
import { DataSourcePanel } from '@/components/ui/DataSourcePanel'
import { DataStateBadge, DataStateNotice } from '@/components/ui/DataState'
import { Reveal } from '@/components/ui/Reveal'

type IconType = ComponentType<{ className?: string }>

const LAYERS: {
  id: MapLayerId
  name: string
  desc: string
  icon: IconType
  state: DataState
}[] = [
  {
    id: 'subsidence',
    name: 'Land Subsidence',
    desc: 'Vertical ground motion zones',
    icon: Activity,
    state: 'demo',
  },
  {
    id: 'observations',
    name: 'Satellite Observations',
    desc: 'SAR pass geometry & coverage',
    icon: Satellite,
    state: 'demo',
  },
  {
    id: 'groundwater',
    name: 'Groundwater',
    desc: 'Wells and water-level context',
    icon: Droplets,
    state: 'demo',
  },
  {
    id: 'agriculture',
    name: 'Agricultural Areas',
    desc: 'Irrigated and reclaimed land',
    icon: Sprout,
    state: 'demo',
  },
]

function Legend({ layer }: { layer: MapLayerId }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
        Legend · {LAYERS.find((l) => l.id === layer)?.name}
      </p>

      {layer === 'subsidence' && (
        <>
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/45">
            Land surface change (illustrative gradient)
          </p>
          <ul className="mt-3 space-y-2">
            {SUBSIDENCE_RAMP.map((step) => (
              <li key={step.label} className="flex items-center gap-2.5">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-sm border border-white/20"
                  style={{ backgroundColor: step.color, opacity: 0.35 + step.opacity }}
                />
                <span className="font-mono text-[11px] text-white/65">{step.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-sand">
            Ramp values are placeholders. Real thresholds are set by the processing product, not by
            this interface.
          </p>
        </>
      )}

      {layer === 'observations' && (
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-center gap-2.5">
            <span className="h-0.5 w-6 shrink-0 rounded-full bg-cyan" />
            <span className="text-[11.5px] text-white/65">Sentinel-1 pass (demo)</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-0.5 w-6 shrink-0 rounded-full bg-violet [mask-image:repeating-linear-gradient(90deg,#000_0_3px,transparent_3px_6px)]" />
            <span className="text-[11.5px] text-white/65">NISAR coverage — no data connected</span>
          </li>
        </ul>
      )}

      {layer === 'groundwater' && (
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-teal bg-void" />
            <span className="text-[11.5px] text-white/65">Observation well (demo location)</span>
          </li>
          <li className="text-[11px] leading-relaxed text-sand">
            Live agency well feeds are not connected. Depths shown are illustrative.
          </li>
        </ul>
      )}

      {layer === 'agriculture' && (
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 shrink-0 rounded-sm border border-sand/70 bg-sand/30" />
            <span className="text-[11.5px] text-white/65">Irrigated / reclaimed area (demo)</span>
          </li>
          <li className="text-[11px] leading-relaxed text-sand">
            Extent is inferred from an illustrative land-cover mask, not a metered record.
          </li>
        </ul>
      )}
    </div>
  )
}

export function Explore() {
  const [cityId, setCityId] = useState<'tehran' | 'tokyo'>('tehran')
  const [layer, setLayer] = useState<MapLayerId>('subsidence')
  const [query, setQuery] = useState('')
  const [dateId, setDateId] = useState(OBSERVATION_DATES.tehran[0].id)
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)
  const [mapLoading, setMapLoading] = useState(true)

  const city = cityById(cityId) ?? CITIES[0]
  const dates = OBSERVATION_DATES[cityId]
  const activeDate = dates.find((d) => d.id === dateId) ?? dates[0]
  const renderable = activeDate.state === 'demo' || activeDate.state === 'verified'

  // Simulated fetch so the "Loading data" state is a real part of the UX.
  useEffect(() => {
    setMapLoading(true)
    setSelectedZoneId(null)
    const timer = window.setTimeout(() => setMapLoading(false), 550)
    return () => window.clearTimeout(timer)
  }, [cityId])

  useEffect(() => {
    setSelectedZoneId(null)
  }, [layer, activeDate.id])

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CITIES
    return CITIES.filter((c) =>
      [c.name, c.country, c.region, c.tagline].join(' ').toLowerCase().includes(q),
    )
  }, [query])

  const selectedZone = selectedZoneId
    ? (cityId === 'tehran' ? OVERLAY_ZONES.tehran : OVERLAY_ZONES.tokyo).find(
        (z) => z.id === selectedZoneId,
      )
    : undefined

  return (
    <>
      {/* ------------------------------ Header ------------------------------ */}
      <section className="border-b border-hairline bg-space">
        <div className="shell py-12 sm:py-14">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/8 px-3.5 py-1.5">
            <Radar className="h-3.5 w-3.5 text-cyan" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
              Exploration dashboard
            </span>
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
            Explore the Data
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Choose a region, switch observation layers, and step through acquisition dates. Every
            layer states its own availability — an empty map is a gap in the observations, never
            evidence that the ground is stable.
          </p>
        </div>
      </section>

      {/* ---------------------------- Dashboard ---------------------------- */}
      <section className="bg-space pb-16">
        <div className="shell">
          <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
            {/* ------------------------- Sidebar ------------------------- */}
            <aside className="dark-scroll space-y-4 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
              {/* Search */}
              <div className="rounded-2xl border border-hairline bg-panel/45 p-4">
                <label
                  htmlFor="region-search"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40"
                >
                  Search cities and regions
                </label>
                <div className="relative mt-2.5">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    id="region-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tehran, Tokyo, plain, lowland…"
                    className="h-10 w-full rounded-xl border border-hairline bg-void/50 pl-9 pr-9 text-[13px] text-white placeholder:text-white/30 focus:border-cyan/50 focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Region cards */}
                <div className="mt-3 space-y-2">
                  {filteredCities.map((c) => {
                    const isActive = c.id === cityId
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setCityId(c.id)
                          setDateId(OBSERVATION_DATES[c.id][0].id)
                        }}
                        aria-pressed={isActive}
                        className={cn(
                          'w-full rounded-xl border p-3 text-left transition-all duration-300',
                          isActive
                            ? 'border-cyan/45 bg-cyan/8'
                            : 'border-hairline bg-void/40 hover:border-cyan/25 hover:bg-void/70',
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2">
                            <MapPin
                              className={cn('h-4 w-4', isActive ? 'text-cyan' : 'text-white/40')}
                            />
                            <span className="font-display text-[14px] font-semibold text-white">
                              {c.name}
                            </span>
                          </span>
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/40">
                            {c.country}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[11.5px] leading-relaxed text-white/50">
                          {c.subsidence.headline}
                        </span>
                      </button>
                    )
                  })}

                  {filteredCities.length === 0 && (
                    <p className="rounded-xl border border-dashed border-hairline bg-void/30 px-3.5 py-3 text-[12px] leading-relaxed text-white/45">
                      No region matches “{query}”. Try a city name, a country, or a landscape term
                      such as <em>plain</em> or <em>lowland</em>.
                    </p>
                  )}
                </div>
              </div>

              {/* Layer controls */}
              <div className="rounded-2xl border border-hairline bg-panel/45 p-4">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <Layers className="h-3.5 w-3.5" />
                  Map layers
                </p>
                <div className="mt-3 space-y-2">
                  {LAYERS.map((l) => {
                    const Icon = l.icon
                    const isActive = l.id === layer
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLayer(l.id)}
                        aria-pressed={isActive}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300',
                          isActive
                            ? 'border-cyan/45 bg-cyan/8'
                            : 'border-hairline bg-void/40 hover:border-cyan/25 hover:bg-void/70',
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                            isActive ? 'bg-cyan/15 text-cyan' : 'bg-white/5 text-white/45',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium text-white">{l.name}</span>
                          <span className="block text-[11px] text-white/45">{l.desc}</span>
                        </span>
                        <DataStateBadge state={l.state} tone="dark" />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date selector */}
              <div className="rounded-2xl border border-hairline bg-panel/45 p-4">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <Satellite className="h-3.5 w-3.5" />
                  Observation date
                </p>
                <div className="mt-3 space-y-2">
                  {dates.map((d) => {
                    const isActive = d.id === activeDate.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDateId(d.id)}
                        aria-pressed={isActive}
                        className={cn(
                          'w-full rounded-xl border p-3 text-left transition-all duration-300',
                          isActive
                            ? 'border-cyan/45 bg-cyan/8'
                            : 'border-hairline bg-void/40 hover:border-cyan/25 hover:bg-void/70',
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[12px] font-medium text-white">
                            {d.date}
                          </span>
                          <DataStateBadge state={d.state} tone="dark" />
                        </span>
                        <span className="mt-1.5 block text-[11.5px] text-white/50">{d.label}</span>
                        <span className="mt-0.5 block font-mono text-[10px] text-white/35">
                          {d.mission}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="rounded-2xl border border-hairline bg-panel/45 p-4">
                <Legend layer={layer} />
              </div>
            </aside>

            {/* --------------------------- Map area --------------------------- */}
            <div className="space-y-4">
              {/* Status strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-hairline bg-panel/45 px-4 py-3">
                <span className="flex items-center gap-2 text-[12px] text-white/60">
                  <MapPin className="h-3.5 w-3.5 text-cyan" />
                  {city.name}, {city.country}
                </span>
                <span className="flex items-center gap-2 text-[12px] text-white/60">
                  <Layers className="h-3.5 w-3.5 text-teal" />
                  {LAYERS.find((l) => l.id === layer)?.name}
                </span>
                <span className="flex items-center gap-2 text-[12px] text-white/60">
                  <Satellite className="h-3.5 w-3.5 text-violet" />
                  {activeDate.date}
                </span>
                <span className="ml-auto">
                  <DataStateBadge state={activeDate.state} tone="dark" />
                </span>
              </div>

              {/* Map */}
              <Reveal>
                <div className="relative h-[58vh] min-h-[420px] overflow-hidden rounded-2xl border border-hairline bg-deep lg:h-[calc(100vh-16rem)] lg:min-h-[560px]">
                  {mapLoading ? (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-deep/95 p-6">
                      <div className="w-full max-w-sm">
                        <DataStateNotice state="loading" tone="dark" />
                      </div>
                    </div>
                  ) : !renderable ? (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-deep/95 p-6">
                      <div className="w-full max-w-lg space-y-3">
                        <DataStateNotice state={activeDate.state} tone="dark" message={activeDate.note} />
                        <DataSourcePanel source={activeDate.source} tone="dark" defaultOpen />
                      </div>
                    </div>
                  ) : (
                    <MapCanvas
                      city={city}
                      layer={layer}
                      selectedZoneId={selectedZoneId}
                      onSelectZone={(id) => setSelectedZoneId((prev) => (prev === id ? null : id))}
                    />
                  )}
                </div>

                <p className="mt-2.5 flex items-start gap-2 text-[11.5px] leading-relaxed text-white/40">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  The base map loads from OpenStreetMap / CARTO tiles and needs an internet
                  connection. Overlays are demonstration geometry drawn on top — they are not radar
                  measurements. Select a subsidence zone on the map to inspect its record.
                </p>
              </Reveal>

              {/* Location info panel */}
              {selectedZone && (
                <div className="rounded-2xl border border-cyan/35 bg-panel/60 p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
                        Selected location
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
                        {selectedZone.label}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedZoneId(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label="Close location panel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)]">
                    <div className="rounded-xl border border-hairline bg-void/40 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                        Surface change
                      </p>
                      <p className="mt-1.5 font-display text-2xl font-bold text-teal">
                        {selectedZone.value}
                      </p>
                      <p className="mt-2 text-[11.5px] leading-relaxed text-white/45">
                        Illustrative figure for the demonstration grid.
                      </p>
                      <div className="mt-3">
                        <DataStateBadge state="demo" tone="dark" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <DataSourcePanel source={activeDate.source} tone="dark" defaultOpen />
                    </div>
                  </div>
                </div>
              )}

              {/* Mission note */}
              <div className="flex items-start gap-3 rounded-2xl border border-hairline bg-panel/40 p-4">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
                <p className="text-[12.5px] leading-relaxed text-white/55">
                  <strong className="font-semibold text-white/85">Mission labelling:</strong> every
                  layer here is attributed to Sentinel-1, ENVISAT, ALOS, Landsat or GRACE-FO as
                  appropriate. NISAR is a separate NASA&nbsp;/&nbsp;ISRO mission and no NISAR granules
                  are connected — NISAR entries are explicitly marked “not yet available”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/** Zone lookup kept beside the page so the map and the panel agree. */
const OVERLAY_ZONES = {
  tehran: [
    { id: 'th-z1', label: 'South-west core', value: '≈ 250 mm/yr' },
    { id: 'th-z2', label: 'Agricultural plain', value: '≈ 230 mm/yr' },
    { id: 'th-z3', label: 'Southern districts', value: '≈ 210 mm/yr' },
    { id: 'th-z4', label: 'Western belt', value: '≈ 170 mm/yr' },
    { id: 'th-z5', label: 'City-centre fringe', value: '≈ 90 mm/yr' },
  ],
  tokyo: [
    { id: 'tk-z1', label: 'Koto lowland (historical core)', value: '≈ 5 mm/yr residual' },
    { id: 'tk-z2', label: 'Edogawa lowland', value: '≈ 4 mm/yr residual' },
    { id: 'tk-z3', label: 'Reclaimed bayfront', value: '≈ 6 mm/yr residual' },
    { id: 'tk-z4', label: 'Sumida / Arakawa margin', value: '≈ 3 mm/yr residual' },
    { id: 'tk-z5', label: 'Inner wards (stabilised)', value: '≈ 1 mm/yr residual' },
  ],
} as const
