import type { DataSource, SatelliteMission } from './types'

/**
 * The satellite missions referenced across the platform.
 *
 * This list deliberately separates NISAR from every other mission. NISAR is a
 * joint NASA–ISRO mission; Sentinel-1 is ESA/Copernicus; ENVISAT and ALOS are
 * separate historical missions. Nothing here is "NISAR data" unless the mission
 * field literally says NISAR.
 */
export const MISSIONS: SatelliteMission[] = [
  {
    id: 'nisar',
    name: 'NISAR',
    agency: 'NASA / ISRO',
    sensor: 'Dual-band L-band + S-band SAR',
    band: 'L-band (24 cm) / S-band',
    launch: '2025',
    status: 'commissioning',
    purpose:
      'Global repeat-pass radar imaging designed for measuring centimetre-scale ground deformation, including land subsidence.',
    technique: 'Repeat-pass InSAR & polarimetric SAR',
    availabilityNote:
      'The platform is in its early phase. Products are not yet generally used here — any NISAR layer in this app is marked "Not yet available" until real granules are connected.',
    accent: '#9b8cff',
  },
  {
    id: 'sentinel-1',
    name: 'Sentinel-1 A / C',
    agency: 'ESA (Copernicus)',
    sensor: 'C-SAR, Interferometric Wide swath',
    band: 'C-band (5.6 cm)',
    launch: '2014 (A) · 2024 (C)',
    status: 'operational',
    purpose:
      'The workhorse for operational InSAR subsidence mapping: 6–12 day repeat passes over most land surfaces.',
    technique: 'Repeat-pass InSAR (PS-InSAR / SBAS)',
    availabilityNote:
      'Open and free. Limited sensitivity in dense vegetation and on very fast (>1 m/yr) deformation, where phase decorrelates.',
    accent: '#38d6ff',
  },
  {
    id: 'envisat',
    name: 'ENVISAT',
    agency: 'ESA',
    sensor: 'ASAR',
    band: 'C-band (5.6 cm)',
    launch: '2002 — 2012',
    status: 'archived',
    purpose:
      'Built the long historical deformation record (2002–2010) that lets researchers extend subsidence timelines backwards.',
    technique: 'Repeat-pass InSAR',
    availabilityNote:
      'Mission ended in 2012. Used for historical baselines only; no new acquisitions.',
    accent: '#0d9488',
  },
  {
    id: 'alos',
    name: 'ALOS / ALOS-2',
    agency: 'JAXA',
    sensor: 'PALSAR / PALSAR-2',
    band: 'L-band (24 cm)',
    launch: '2006 / 2014',
    status: 'operational',
    purpose:
      'Long-wavelength radar that maintains coherence over vegetated and agricultural terrain where C-band struggles.',
    technique: 'Repeat-pass InSAR',
    availabilityNote:
      'ALOS-2 data are not fully open; access depends on JAXA research agreements.',
    accent: '#f6c667',
  },
  {
    id: 'landsat',
    name: 'Landsat 8 / 9',
    agency: 'NASA / USGS',
    sensor: 'OLI / OLI-2',
    band: 'Visible — thermal infrared',
    launch: '2013 / 2021',
    status: 'operational',
    purpose:
      'Optical context: urban growth, irrigated agriculture, surface water extent and land-cover change.',
    technique: 'Multi-spectral imaging (not deformation)',
    availabilityNote:
      'Optical sensors cannot measure vertical ground motion — they provide context, never subsidence rates.',
    accent: '#ff7a6b',
  },
  {
    id: 'grace',
    name: 'GRACE-FO',
    agency: 'NASA / GFZ',
    sensor: 'Microwave ranging',
    band: 'Gravity field',
    launch: '2018',
    status: 'operational',
    purpose:
      'Tracks regional changes in total water storage, connecting depletion of aquifers to the deformation observed by radar.',
    technique: 'Satellite gravimetry',
    availabilityNote:
      'Very coarse spatial resolution (hundreds of km); useful for regional water trends, not city-scale detail.',
    accent: '#14e0c0',
  },
]

export const missionById = (id: string): SatelliteMission | undefined =>
  MISSIONS.find((m) => m.id === id)

/** Reusable data-source records used by the transparency panels. */
export const SOURCES = {
  nisarPending: {
    mission: 'NISAR (L-band)',
    sensor: 'Dual-band SAR',
    provider: 'NASA / ISRO — data products pending public release',
    acquisitionDate: '—',
    processing: 'Not applicable — no granules ingested',
    resolution: 'Expected ~3–10 m for deformation products',
    limitations:
      'NISAR is a separate mission from Sentinel-1 and other SAR systems. No NISAR measurement is shown anywhere in this app because none is connected yet.',
    confidence: 'No data — a blank layer here does NOT mean the ground is stable.',
    state: 'unavailable',
    provenance: 'demonstration',
    attribution: 'Availability notice only — not a measurement.',
  },
  sentinelDemoTehran: {
    mission: 'Sentinel-1 (C-band)',
    sensor: 'IW C-SAR',
    provider: 'ESA Copernicus — layer rendered as DEMO',
    acquisitionDate: '2023-06-14 (illustrative)',
    processing: 'SBAS-style line-of-sight velocity, vertical component assumed',
    resolution: '~20 m posting (demo grid)',
    limitations:
      'Demo grid. Real Sentinel-1 velocities require full interferometric processing, atmospheric correction and a stable reference point.',
    confidence: 'Illustrative only — not a verified measurement.',
    state: 'demo',
    provenance: 'demonstration',
  },
  sentinelDemoTokyo: {
    mission: 'Sentinel-1 (C-band)',
    sensor: 'IW C-SAR',
    provider: 'ESA Copernicus — layer rendered as DEMO',
    acquisitionDate: '2023-09-02 (illustrative)',
    processing: 'SBAS-style line-of-sight velocity, vertical component assumed',
    resolution: '~20 m posting (demo grid)',
    limitations:
      'Demo grid. Tokyo is largely stabilised since the 1970s, so present-day signals are near the detection threshold.',
    confidence: 'Illustrative only — not a verified measurement.',
    state: 'demo',
    provenance: 'demonstration',
  },
  groundwaterDemo: {
    mission: 'GRACE-FO + in-situ well records',
    sensor: 'Microwave ranging / piezometers',
    provider: 'NASA/GFZ gravity · national water agencies (illustrative blend)',
    acquisitionDate: '2018–2023 (illustrative composite)',
    processing: 'Terrestrial water-storage anomaly downscaled for display',
    resolution: 'Regional (~100–300 km) for gravity; point data for wells',
    limitations:
      'Gravity data cannot resolve a single city. Well hydrographs are not shown because live agency feeds are not connected.',
    confidence: 'Directional trend only — do not read city-scale values from this layer.',
    state: 'demo',
    provenance: 'demonstration',
  },
  agricultureDemo: {
    mission: 'Landsat 8 / 9 (OLI)',
    sensor: 'Multi-spectral optical',
    provider: 'NASA / USGS — layer rendered as DEMO',
    acquisitionDate: '2023 growing season composite (illustrative)',
    processing: 'NDVI seasonal composite, irrigated-area mask',
    resolution: '30 m',
    limitations:
      'Cloud cover reduces coverage in some months; irrigation status is inferred, not metered.',
    confidence: 'Context layer — not a deformation measurement.',
    state: 'demo',
    provenance: 'demonstration',
  },
  tokyoHistorical: {
    mission: 'ENVISAT ASAR + leveling surveys',
    sensor: 'C-band SAR / optical levelling',
    provider: 'ESA / Japanese national geodetic records (referenced)',
    acquisitionDate: '1900–2010 range',
    processing: 'Published cumulative-subsidence compilation',
    resolution: 'Benchmark points — metres to kilometres apart',
    limitations:
      'Historical records mix survey methods across decades; values are cited from literature, not recomputed here.',
    confidence: 'Well-documented history; numbers are rounded reference values.',
    state: 'verified',
    provenance: 'reference',
    attribution: 'Cumulative subsidence figures summarised from published Japanese geodetic literature.',
  },
  tehranTrend: {
    mission: 'Sentinel-1 / ENVISAT (compiled)',
    sensor: 'C-band SAR',
    provider: 'Published InSAR studies — trend shown as DEMO curve',
    acquisitionDate: '2003–2023 (illustrative series)',
    processing: 'Annualised velocity curve for the southwestern Tehran plain',
    resolution: 'City-scale summary',
    limitations:
      'The plotted curve is a demonstration shape. Published studies report varying rates by method, period and sub-region.',
    confidence: 'Order-of-magnitude only.',
    state: 'demo',
    provenance: 'demonstration',
  },
  tokyoTrend: {
    mission: 'Levelling surveys + ENVISAT ASAR (compiled)',
    sensor: 'Optical levelling / C-band SAR',
    provider: 'Published geodetic compilations — trend shown as DEMO curve',
    acquisitionDate: '1900–2023 (illustrative series)',
    processing: 'Annualised rate curve for eastern Tokyo lowlands',
    resolution: 'District-scale summary',
    limitations:
      'The plotted curve is a demonstration shape built to illustrate the known pattern: rapid early subsidence, then stabilisation after groundwater regulation.',
    confidence: 'Order-of-magnitude only.',
    state: 'demo',
    provenance: 'demonstration',
  },
  gleamPlaceholder: {
    mission: 'Awaiting ingest',
    sensor: '—',
    provider: 'No provider connected',
    acquisitionDate: '—',
    processing: '—',
    resolution: '—',
    limitations:
      'A blank or unavailable layer means the observations are missing — it never means the ground is not moving.',
    confidence: 'Unknown until data is connected.',
    state: 'unavailable',
    provenance: 'demonstration',
  },
} satisfies Record<string, DataSource>
