/**
 * Shared data contracts for GROUND TRUTH.
 *
 * IMPORTANT — scientific honesty rules encoded in these types:
 *  - Every dataset carries an explicit `state` so the UI can never imply that
 *    "no data" means "no subsidence".
 *  - Every dataset carries a full `DataSource` record (mission, sensor,
 *    provider, date, processing, resolution, limitations, confidence).
 *  - `provenance: 'demo'` marks illustrative placeholder values that are NOT
 *    verified measurements.
 */

/** Explicit availability states required by the data-transparency spec. */
export type DataState =
  | 'verified' // derived from a published / real dataset
  | 'demo' // illustrative placeholder — clearly labelled DEMO
  | 'loading' // request in flight
  | 'processing' // raw observations being converted to a product
  | 'unavailable' // no suitable acquisition for this place/date yet
  | 'error' // retrieval / processing failure

export type Provenance = 'demonstration' | 'reference'

export interface DataSource {
  /** Satellite mission or platform, e.g. "Sentinel-1 (C-band)". */
  mission: string
  /** Instrument / sensor, e.g. "IW C-SAR". */
  sensor: string
  /** Who curates / distributes the data. */
  provider: string
  /** ISO date or range shown to the user, e.g. "2023-06-14". */
  acquisitionDate: string
  /** Short description of the processing chain. */
  processing: string
  /** Ground sample distance, e.g. "~20 m (InSAR product)". */
  resolution: string
  /** Known caveats the user must read before interpreting the numbers. */
  limitations: string
  /** Quality / confidence statement. */
  confidence: string
  /** Lifecycle state for this dataset. */
  state: DataState
  /** Whether the numbers are illustrative (demo) or drawn from published work. */
  provenance: Provenance
  /** Optional attribution text. */
  attribution?: string
  /** Optional external reference link. */
  reference?: string
}

export interface SatelliteMission {
  id: string
  name: string
  agency: string
  sensor: string
  band: string
  launch: string
  status: 'operational' | 'archived' | 'commissioning' | 'planned'
  purpose: string
  /** The observation technique this mission enables. */
  technique: string
  /** Notes on data availability for subsidence work. */
  availabilityNote: string
  accent: string
}

export interface MetricPoint {
  year: number
  /** Millimetres per year. Negative = subsidence (surface moving down). */
  rateMmPerYear: number
  /** Illustrative uncertainty band, ±mm/yr. */
  uncertainty: number
}

export interface TimelineEvent {
  year: number
  title: string
  detail: string
  kind: 'cause' | 'observation' | 'policy' | 'impact' | 'recovery'
}

export interface CauseFactor {
  id: string
  title: string
  short: string
  explanation: string
  mechanism: string
  indicators: string[]
  relevance: string
  icon: string
  accent: string
  /** Optional illustrative contribution share, clearly a demo value. */
  demoShare: number
}

export interface CaseCity {
  id: 'tehran' | 'tokyo'
  name: string
  country: string
  region: string
  coordinates: { lat: number; lng: number }
  timezone: string
  /** One-line positioning statement. */
  tagline: string
  overview: string
  context: {
    population: string
    elevation: string
    geology: string
    climate: string
    waterSource: string
    landUse: string
  }
  subsidence: {
    /** Headline value shown in the UI. */
    headline: string
    /** Whether the headline number is a published reference or illustrative. */
    headlineProvenance: Provenance
    peakRate: string
    cumulative: string
    firstDetected: string
    affectedArea: string
    monitoringSince: string
  }
  primaryCauses: string[]
  causeIds: string[]
  timeline: TimelineEvent[]
  groundwater: {
    summary: string
    history: { period: string; label: string; detail: string }[]
  }
  policies: { name: string; year: string; effect: string }[]
  evidenceAfterIntervention: string[]
  observationSources: string[]
  /** Chart series — illustrative unless stated otherwise. */
  trend: MetricPoint[]
  /** Camera / map framing for the explore view. */
  map: { center: [number, number]; zoom: number; bounds: [[number, number], [number, number]] }
}

export interface StoryStage {
  id: string
  index: number
  eyebrow: string
  title: string
  lead: string
  body: string[]
  keyPoints: string[]
  figure: {
    kind: 'chart' | 'diagram' | 'map' | 'compare' | 'list'
    caption: string
    source: DataSource
  }
}
