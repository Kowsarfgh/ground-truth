/**
 * DEMO overlay geometry for the Explore map.
 *
 * These shapes are hand-placed illustrations of the kind of pattern each layer
 * would show. They are NOT derived from satellite measurements and must never
 * be read as data. Every layer that renders them is labelled "Demo data".
 */

export type LatLng = [number, number]

export interface DemoZone {
  id: string
  label: string
  value: string
  center: LatLng
  radiusM: number
  /** 0–1, drives the visual intensity (illustrative only). */
  intensity: number
}

export interface DemoPath {
  id: string
  label: string
  path: LatLng[]
  meta: string
}

export interface DemoArea {
  id: string
  label: string
  points: LatLng[]
  meta: string
}

export interface DemoPoint {
  id: string
  label: string
  position: LatLng
  meta: string
}

export interface CityOverlays {
  subsidence: DemoZone[]
  passes: DemoPath[]
  groundwater: DemoPoint[]
  agriculture: DemoArea[]
}

export const OVERLAYS: Record<'tehran' | 'tokyo', CityOverlays> = {
  tehran: {
    subsidence: [
      { id: 'th-z1', label: 'South-west core', value: '≈ 250 mm/yr', center: [35.616, 51.331], radiusM: 7200, intensity: 1 },
      { id: 'th-z2', label: 'Agricultural plain', value: '≈ 230 mm/yr', center: [35.578, 51.302], radiusM: 6100, intensity: 0.92 },
      { id: 'th-z3', label: 'Southern districts', value: '≈ 210 mm/yr', center: [35.552, 51.383], radiusM: 5400, intensity: 0.84 },
      { id: 'th-z4', label: 'Western belt', value: '≈ 170 mm/yr', center: [35.663, 51.302], radiusM: 5200, intensity: 0.68 },
      { id: 'th-z5', label: 'City-centre fringe', value: '≈ 90 mm/yr', center: [35.702, 51.382], radiusM: 4600, intensity: 0.36 },
    ],
    passes: [
      {
        id: 'th-pass-desc',
        label: 'Descending pass · Sentinel-1 (illustrative)',
        path: [
          [35.86, 51.14],
          [35.75, 51.27],
          [35.65, 51.4],
          [35.55, 51.53],
        ],
        meta: 'Repeat cycle: 12 days · acquisition dates illustrative',
      },
      {
        id: 'th-pass-asc',
        label: 'Ascending pass · Sentinel-1 (illustrative)',
        path: [
          [35.53, 51.2],
          [35.64, 51.31],
          [35.75, 51.42],
          [35.86, 51.53],
        ],
        meta: 'Repeat cycle: 12 days · acquisition dates illustrative',
      },
      {
        id: 'th-pass-nisar',
        label: 'NISAR coverage — data not yet available',
        path: [
          [35.9, 51.25],
          [35.7, 51.39],
          [35.5, 51.53],
        ],
        meta: 'NISAR is a separate mission. No granules are connected to this platform.',
      },
    ],
    groundwater: [
      { id: 'th-gw1', label: 'Plain observation well', position: [35.601, 51.324], meta: 'Depth to water: deep and declining (demo value)' },
      { id: 'th-gw2', label: 'Agricultural cluster', position: [35.572, 51.294], meta: 'Heavy seasonal abstraction (demo value)' },
      { id: 'th-gw3', label: 'Municipal well field', position: [35.641, 51.355], meta: 'Supply wells (demo value)' },
      { id: 'th-gw4', label: 'Southern monitoring point', position: [35.545, 51.394], meta: 'Monitoring since 2003 (demo value)' },
    ],
    agriculture: [
      {
        id: 'th-ag1',
        label: 'Irrigated plain (south-west)',
        points: [
          [35.63, 51.25],
          [35.62, 51.37],
          [35.54, 51.4],
          [35.52, 51.28],
        ],
        meta: 'Irrigated cropland mask (demo)',
      },
      {
        id: 'th-ag2',
        label: 'Market-garden belt (south)',
        points: [
          [35.54, 51.4],
          [35.53, 51.51],
          [35.47, 51.5],
          [35.48, 51.4],
        ],
        meta: 'Seasonal irrigation (demo)',
      },
    ],
  },
  tokyo: {
    subsidence: [
      { id: 'tk-z1', label: 'Koto lowland (historical core)', value: '≈ 5 mm/yr residual', center: [35.672, 139.817], radiusM: 6200, intensity: 0.5 },
      { id: 'tk-z2', label: 'Edogawa lowland', value: '≈ 4 mm/yr residual', center: [35.706, 139.868], radiusM: 5200, intensity: 0.42 },
      { id: 'tk-z3', label: 'Reclaimed bayfront', value: '≈ 6 mm/yr residual', center: [35.63, 139.795], radiusM: 5000, intensity: 0.56 },
      { id: 'tk-z4', label: 'Sumida / Arakawa margin', value: '≈ 3 mm/yr residual', center: [35.73, 139.81], radiusM: 4400, intensity: 0.3 },
      { id: 'tk-z5', label: 'Inner wards (stabilised)', value: '≈ 1 mm/yr residual', center: [35.685, 139.75], radiusM: 5200, intensity: 0.12 },
    ],
    passes: [
      {
        id: 'tk-pass-desc',
        label: 'Descending pass · Sentinel-1 (illustrative)',
        path: [
          [35.9, 139.66],
          [35.79, 139.75],
          [35.68, 139.84],
          [35.57, 139.93],
        ],
        meta: 'Repeat cycle: 12 days · acquisition dates illustrative',
      },
      {
        id: 'tk-pass-asc',
        label: 'Ascending pass · Sentinel-1 (illustrative)',
        path: [
          [35.56, 139.64],
          [35.67, 139.73],
          [35.78, 139.82],
          [35.89, 139.91],
        ],
        meta: 'Repeat cycle: 12 days · acquisition dates illustrative',
      },
    ],
    groundwater: [
      { id: 'tk-gw1', label: 'Municipal monitoring well', position: [35.681, 139.79], meta: 'Water level partly recovered (demo value)' },
      { id: 'tk-gw2', label: 'Lowland observation point', position: [35.712, 139.855], meta: 'Stable since regulation (demo value)' },
      { id: 'tk-gw3', label: 'Bayfront well cluster', position: [35.638, 139.808], meta: 'Residual settlement recorded (demo value)' },
    ],
    agriculture: [
      {
        id: 'tk-ag1',
        label: 'Historic paddy & reclaimed land',
        points: [
          [35.74, 139.79],
          [35.73, 139.9],
          [35.64, 139.92],
          [35.64, 139.8],
        ],
        meta: 'Historical low-lying / reclaimed ground (demo)',
      },
    ],
  },
}

/** Colour ramp for the land-surface change legend. */
export const SUBSIDENCE_RAMP = [
  { label: '0 – 50 mm/yr', color: '#facc15', opacity: 0.22 },
  { label: '50 – 100 mm/yr', color: '#fb923c', opacity: 0.32 },
  { label: '100 – 150 mm/yr', color: '#f87171', opacity: 0.42 },
  { label: '150 – 200 mm/yr', color: '#e11d48', opacity: 0.5 },
  { label: '200 mm/yr or more', color: '#9b1c4a', opacity: 0.62 },
]

export function rampColor(intensity: number) {
  if (intensity < 0.25) return SUBSIDENCE_RAMP[0]
  if (intensity < 0.45) return SUBSIDENCE_RAMP[1]
  if (intensity < 0.65) return SUBSIDENCE_RAMP[2]
  if (intensity < 0.85) return SUBSIDENCE_RAMP[3]
  return SUBSIDENCE_RAMP[4]
}
