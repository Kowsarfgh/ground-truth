/**
 * Content + provenance for "The Story of Land Subsidence in Tehran".
 *
 * SCIENTIFIC HONESTY RULES OBSERVED HERE
 *  - Every quantitative claim about Tehran is attached to a real, published
 *    study (see CITATIONS). Nothing is invented.
 *  - No NISAR measurement, image, acquisition date or displacement map is
 *    fabricated. Where the story would need NISAR data for the Tehran region,
 *    the state is 'unavailable' and the UI says so.
 *  - Sentinel-1 is always presented as a separate mission and is never
 *    labelled NISAR.
 *  - Any animation geometry (cross-sections, fringes, curves) is declared as a
 *    schematic with state 'demo'. The user is never invited to read a number
 *    off an illustration.
 */

import type { DataSource, DataState } from './types'

/* ------------------------------------------------------------------ */
/*  Chapters                                                          */
/* ------------------------------------------------------------------ */

export interface Chapter {
  id: string
  /** Scene number shown in the rail. */
  index: number
  label: string
  short: string
}

export const CHAPTERS: Chapter[] = [
  { id: 'opening', index: 1, label: 'A city above a changing ground', short: 'Opening' },
  { id: 'hidden-cause', index: 2, label: 'The hidden cause', short: 'Groundwater' },
  { id: 'how-it-happens', index: 3, label: 'How subsidence happens', short: 'Mechanism' },
  { id: 'consequences', index: 4, label: 'When the ground moves', short: 'Consequences' },
  { id: 'from-space', index: 5, label: 'From space', short: 'Satellites' },
  { id: 'evidence', index: 6, label: 'What the evidence tells us', short: 'Evidence' },
  { id: 'what-we-can-do', index: 7, label: 'What can we do', short: 'Response' },
]

/* ------------------------------------------------------------------ */
/*  Real references                                                   */
/* ------------------------------------------------------------------ */

export interface Citation {
  id: string
  /** Short label used inline, e.g. "Moradi et al. 2023". */
  label: string
  title: string
  authors: string
  institution: string
  date: string
  url: string
  kind: 'study' | 'mission' | 'dataset' | 'agency'
}

export const CITATIONS: Record<string, Citation> = {
  moradi2023: {
    id: 'moradi2023',
    label: 'Moradi et al. 2023',
    title: 'Assessments of land subsidence in Tehran metropolitan, Iran, using Sentinel-1A InSAR',
    authors: 'A. Moradi, S. Emadodin, A. Beitollahi, H. Abdolazimi, B. Ghods',
    institution:
      'Shahid Beheshti University · Road, Housing & Urban Development Research Center (BHRC) · Sharif University of Technology',
    date: 'Published 15 November 2023 — Environmental Earth Sciences 82:569',
    url: 'https://doi.org/10.1007/s12665-023-11225-2',
    kind: 'study',
  },
  mahmoudpour2013: {
    id: 'mahmoudpour2013',
    label: 'Mahmoudpour et al. 2013',
    title:
      'Characterization of regional land subsidence induced by groundwater withdrawals in Tehran, Iran',
    authors: 'M. Mahmoudpour, M. Khamehchiyan, M. R. Nikudel, M. R. Ghassemi',
    institution: 'Tarbiat Modares University · Geological Survey of Iran (GSI)',
    date: 'Journal of Geope (JGeope) 3(2), 49–62 — 2013',
    url: 'https://journal.ut.ac.ir/article_36014.html',
    kind: 'study',
  },
  haghighi2024: {
    id: 'haghighi2024',
    label: 'Haghshenas Haghighi & Motagh 2024',
    title: 'Uncovering the impacts of depleting aquifers: A remote sensing analysis of land subsidence in Iran',
    authors: 'M. Haghshenas Haghighi, M. Motagh',
    institution: 'Leibniz University Hannover · GFZ German Research Centre for Geosciences',
    date: 'Science Advances — 2024',
    url: 'https://www.ipi.uni-hannover.de/fileadmin/ipi/publications/2024/paper_motagh_2024.pdf',
    kind: 'study',
  },
  arjomandi2018: {
    id: 'arjomandi2018',
    label: 'Arjomandi et al. 2018',
    title:
      'Predicting land subsidence rate due to groundwater exploitation in the district 19 of Tehran using MODFLOW and InSAR',
    authors: 'M. Arjomandi, A. Saremi, A. Sarraf, H. Sedghi, M. Roustaei',
    institution: 'Islamic Azad University (Science & Research Branch) · Geological Survey of Iran',
    date: 'Available online 17 March 2018',
    url: 'https://www.sid.ir/en/VEWSSID/J_pdf/831201810608.pdf',
    kind: 'study',
  },
  nisarTehranReview2026: {
    id: 'nisarTehranReview2026',
    label: 'Journal of Mountain Science 2026 (review)',
    title:
      'Groundwater over-exploitation and land subsidence in Tehran, Iran: A comprehensive assessment of causes and impacts',
    authors: 'Peer-reviewed review article',
    institution: 'Journal of Mountain Science — vol. 23, p. 1476',
    date: '2026',
    url: 'https://scixplorer.org/abs/2026JMouS..23.1476R/abstract',
    kind: 'study',
  },
  nisarMission: {
    id: 'nisarMission',
    label: 'NASA — NISAR mission',
    title: 'NISAR: NASA-ISRO Synthetic Aperture Radar',
    authors: 'NASA Jet Propulsion Laboratory / ISRO',
    institution: 'NASA Science · NASA JPL',
    date: 'Launched 30 July 2025 — accessed 2026',
    url: 'https://science.nasa.gov/mission/nisar/',
    kind: 'mission',
  },
  nisarMexicoCity: {
    id: 'nisarMexicoCity',
    label: 'NASA JPL — NISAR subsidence mapping',
    title: 'US-Indian Space Mission Maps Extreme Subsidence in Mexico City',
    authors: 'NASA Jet Propulsion Laboratory',
    institution: 'NASA JPL',
    date: '2026',
    url: 'https://www.jpl.nasa.gov/news/us-indian-space-mission-maps-extreme-subsidence-in-mexico-city/',
    kind: 'agency',
  },
  nisarProducts: {
    id: 'nisarProducts',
    label: 'NASA ASF DAAC — NISAR product guide',
    title: 'NISAR Data Products & Availability',
    authors: 'Alaska Satellite Facility DAAC',
    institution: 'NASA ASF DAAC',
    date: 'Provisional L-band products released from 17 June 2026 acquisitions',
    url: 'https://nisar-docs.asf.alaska.edu/products-overview/',
    kind: 'dataset',
  },
  sentinel1: {
    id: 'sentinel1',
    label: 'ESA — Sentinel-1',
    title: 'Copernicus Sentinel-1 — C-band radar imaging',
    authors: 'European Space Agency',
    institution: 'ESA / Copernicus',
    date: 'Accessed 2026',
    url: 'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1',
    kind: 'mission',
  },
  usgs: {
    id: 'usgs',
    label: 'USGS — land subsidence',
    title: 'Land Subsidence — Water Science School',
    authors: 'U.S. Geological Survey',
    institution: 'USGS',
    date: 'Accessed 2026',
    url: 'https://www.usgs.gov/special-topics/water-science-school/science/land-subsidence',
    kind: 'agency',
  },
}

export const citationList = (ids: string[]): Citation[] =>
  ids.map((id) => CITATIONS[id]).filter((c): c is Citation => Boolean(c))

/* ------------------------------------------------------------------ */
/*  Scene 2 — progressive narration + cross-section labels            */
/* ------------------------------------------------------------------ */

export interface NarrationStep {
  id: string
  /** Progress threshold (0–1) at which this step becomes active. */
  at: number
  title: string
  text: string
}

export const GROUNDWATER_STEPS: NarrationStep[] = [
  {
    id: 'stored',
    at: 0,
    title: 'Water is stored underground',
    text: 'Between grains of sand, silt and clay, the pore spaces of the aquifer hold water. This is the groundwater that wells draw on.',
  },
  {
    id: 'extraction',
    at: 0.2,
    title: 'Wells pump more than is replenished',
    text: 'Thousands of wells — urban, industrial and agricultural — extract water faster than rainfall and river seepage can refill it.',
  },
  {
    id: 'decline',
    at: 0.42,
    title: 'The water table falls',
    text: 'When extraction exceeds recharge, the water table drops. The pore pressure that helped hold the sediment layers apart decreases.',
  },
  {
    id: 'compaction',
    at: 0.64,
    title: 'Fine layers compact',
    text: 'Clay and silt aquitards are the most compressible. As pressure drops, their grains rearrange and the layers lose thickness.',
  },
  {
    id: 'subsidence',
    at: 0.84,
    title: 'The surface sinks',
    text: 'The compaction of everything below is transmitted upward, and the ground surface settles — slowly, unevenly, and often permanently.',
  },
]

/** Labels drawn onto the animated cross-section. Anchor positions are derived
 *  from the live geometry inside the component, because the layers move. */
export interface CrossSectionLabel {
  id: string
  text: string
  /** Which side of the diagram the text is placed on. */
  side: 'left' | 'right'
}

export const CROSS_SECTION_LABELS: CrossSectionLabel[] = [
  { id: 'extraction', text: 'Well extraction', side: 'right' },
  { id: 'layers', text: 'Soil layers', side: 'left' },
  { id: 'compaction', text: 'Compaction', side: 'right' },
  { id: 'watertable', text: 'Water table', side: 'right' },
  { id: 'aquifer', text: 'Aquifer', side: 'left' },
  { id: 'groundwater', text: 'Groundwater', side: 'right' },
]

/* ------------------------------------------------------------------ */
/*  Scene 4 — consequences                                            */
/* ------------------------------------------------------------------ */

export interface Consequence {
  id: string
  title: string
  short: string
  detail: string
  caveat: string
  icon: string
  image: string
  accent: string
}

export const CONSEQUENCES: Consequence[] = [
  {
    id: 'roads',
    title: 'Cracks in roads and pavements',
    short: 'Pavements and kerbs',
    detail:
      'Where the ground settles unevenly, rigid surfaces that were built level start to crack and step. Kerbs, pavements and asphalt are usually the first place a problem becomes visible.',
    caveat:
      'Cracking has many causes — traffic loading, poor drainage and shrink–swell clays all produce similar damage. Ground movement is one possible contributor, not a diagnosis.',
    icon: 'route',
    image: 'impactDamage',
    accent: '#38d6ff',
  },
  {
    id: 'buildings',
    title: 'Buildings and foundations',
    short: 'Buildings',
    detail:
      'A structure is designed for the surface it stands on. If one part of that surface drops more than another, the difference — not the total movement — drives tilting and cracking.',
    caveat:
      'Damage depends entirely on how uneven the settlement is and how the building was founded. Published Iranian field studies report tilted buildings and ruptured well casings in the south-western plain.',
    icon: 'building',
    image: 'causeUrban',
    accent: '#9b8cff',
  },
  {
    id: 'uneven',
    title: 'Uneven ground surfaces',
    short: 'Uneven ground',
    detail:
      'Subsidence is rarely uniform. The result is a surface that gently bowls, tilts and steps, changing how water drains and where it ponds.',
    caveat:
      'The pattern follows the geology below. Different sub-regions of the Tehran plain sit on different sediment sequences, so they cannot be assumed to behave identically.',
    icon: 'mountain',
    image: 'causeGeology',
    accent: '#14e0c0',
  },
  {
    id: 'pipelines',
    title: 'Pipelines, rails and utilities',
    short: 'Networks',
    detail:
      'Linear infrastructure — water mains, gas lines, sewers, railways and transmission towers — is especially exposed because a small differential movement is spread along a long, rigid structure.',
    caveat:
      'Before attributing an incident to subsidence, engineers check the pipeline material, age and construction. Satellite evidence supports, but does not replace, that inspection.',
    icon: 'pipette',
    image: 'responseRoom',
    accent: '#f6c667',
  },
  {
    id: 'planning',
    title: 'Long-term planning and water management',
    short: 'Planning',
    detail:
      'Once fine-grained layers compact inelastically, the pore space does not come back. The aquifer can hold less water than it did, which constrains how the city can be supplied in a dry year.',
    caveat:
      'This is why subsidence is treated as a water-governance problem as much as a geological one — and why measurement programmes are worth maintaining.',
    icon: 'layout',
    image: 'causeAgriculture',
    accent: '#ff7a6b',
  },
]

/* ------------------------------------------------------------------ */
/*  Scene 6 — evidence dashboard                                      */
/* ------------------------------------------------------------------ */

export interface EvidenceItem {
  label: string
  detail: string
  state: DataState
}

export interface EvidenceCategory {
  id: string
  code: string
  title: string
  tagline: string
  icon: string
  accent: string
  items: EvidenceItem[]
}

export const EVIDENCE_CATEGORIES: EvidenceCategory[] = [
  {
    id: 'satellite',
    code: 'A',
    title: 'Satellite observations',
    tagline: 'What the ground actually did.',
    icon: 'satellite',
    accent: '#38d6ff',
    items: [
      {
        label: 'Surface deformation measurements',
        detail:
          'Repeat-pass radar interferometry measures how far the ground moved along the satellite line of sight between two acquisitions.',
        state: 'verified',
      },
      {
        label: 'Spatial distribution of subsidence',
        detail:
          'Published InSAR studies map which districts move fastest. Moradi et al. (2023) report the highest rate in the south-west of the city.',
        state: 'verified',
      },
      {
        label: 'Observation dates and time series',
        detail:
          'Deformation is a rate, so it needs a time series. Here the time series layer is not connected — it would be shown as an explicit empty state, never as zero.',
        state: 'unavailable',
      },
    ],
  },
  {
    id: 'groundwater',
    code: 'B',
    title: 'Groundwater evidence',
    tagline: 'The mechanism behind the movement.',
    icon: 'droplets',
    accent: '#14e0c0',
    items: [
      {
        label: 'Groundwater level change',
        detail:
          'Piezometer hydrographs show the water table falling. Mahmoudpour et al. (2013) report an 11.65 m decline over 28 years in the study area.',
        state: 'verified',
      },
      {
        label: 'Well extraction information',
        detail:
          'Pumping volumes are recorded by water authorities. No live agency feed is connected to this demo, so no well record is displayed.',
        state: 'unavailable',
      },
      {
        label: 'Aquifer and geological information',
        detail:
          'Borehole logs establish the layered aquifer–aquitard system. Mahmoudpour et al. (2013) describe three aquifer units and three aquitard units beneath the south-western plain.',
        state: 'verified',
      },
    ],
  },
  {
    id: 'human',
    code: 'C',
    title: 'Human activities',
    tagline: 'The pressure on the system.',
    icon: 'users',
    accent: '#f6c667',
    items: [
      {
        label: 'Agricultural land use',
        detail:
          'Irrigation is the largest single consumptive use of groundwater. Optical satellites map where irrigated fields are.',
        state: 'verified',
      },
      {
        label: 'Irrigation and water consumption',
        detail:
          'Crop water demand can be modelled, but metered abstraction is needed to close the water balance — that data is not public here.',
        state: 'unavailable',
      },
      {
        label: 'Urban development and drought context',
        detail:
          'Population growth, urban expansion and multi-year drought are independently documented and frame the whole problem.',
        state: 'verified',
      },
    ],
  },
]

export interface SinkingClaim {
  claim: string
  evidence: string
  citationIds: string[]
}

export const WHY_SINKING: SinkingClaim[] = [
  {
    claim: 'The dominant driver is groundwater withdrawal, not tectonics.',
    evidence:
      'Across Iran, ~56,000 km² (3.5%) shows measurable subsidence, mostly linked to irrigation, with 3,000 km² sinking faster than 10 cm per year. The authors attribute the permanent loss to inelastic compaction of aquifer systems — a pumping signal, not an earthquake signal.',
    citationIds: ['haghighi2024', 'usgs'],
  },
  {
    claim: 'The geology has to be compressible for the damage to be permanent.',
    evidence:
      'Subsidence concentrates where the subsurface contains thick fine-grained aquitards. In the Tehran plain the sequence has been characterised as three aquifer units interbedded with three aquitard units — the aquitards are the layers that compact.',
    citationIds: ['mahmoudpour2013'],
  },
  {
    claim: 'Where the two combine, the observed rates are very high.',
    evidence:
      'Sentinel-1A InSAR analysis of the Tehran metropolis reports a maximum land subsidence rate of about 217 mm per year in the south-western part of the city, with districts containing roughly a quarter of Tehran’s population located inside the affected zone.',
    citationIds: ['moradi2023'],
  },
  {
    claim: 'Water consumption is the human term in the equation.',
    evidence:
      'Iran’s groundwater depletion is measured at roughly 1.7 billion cubic metres per year from confined and semi-confined aquifers, driven by population growth, industry and expansion of irrigated agriculture over six decades.',
    citationIds: ['haghighi2024'],
  },
  {
    claim: 'Some of the loss is permanent, which is why forecasts matter.',
    evidence:
      'Groundwater-flow modelling combined with InSAR for District 19 of Tehran projects on the order of 118 mm of additional subsidence alongside an 11.6 m piezometric head decline between 2014 and 2043 under the modelled pumping scenario.',
    citationIds: ['arjomandi2018', 'nisarTehranReview2026'],
  },
]

/* ------------------------------------------------------------------ */
/*  Scene 7 — mitigation                                              */
/* ------------------------------------------------------------------ */

export interface Mitigation {
  id: string
  title: string
  detail: string
  icon: string
}

export const MITIGATION: Mitigation[] = [
  {
    id: 'management',
    title: 'Sustainable groundwater management',
    detail:
      'Treat the aquifer as a budget: measure recharge, cap abstraction, and stop drawing down beyond what the system can replace.',
    icon: 'scale',
  },
  {
    id: 'monitoring',
    title: 'Monitoring and controlling extraction',
    detail:
      'Metering, licensing and enforcement of well fields — including closing illegal wells — is the intervention with the clearest precedent for working.',
    icon: 'gauge',
  },
  {
    id: 'irrigation',
    title: 'More efficient agricultural irrigation',
    detail:
      'Irrigation is the largest consumptive use. Efficiency, cropping choice and treated-wastewater reuse reduce demand at the source.',
    icon: 'droplets',
  },
  {
    id: 'planning',
    title: 'Better urban planning',
    detail:
      'Locate and design critical infrastructure so that differential settlement is anticipated rather than discovered.',
    icon: 'layout',
  },
  {
    id: 'satellites',
    title: 'Continuous satellite-based monitoring',
    detail:
      'An independent, repeatable measurement of the ground itself. Radar can see the subsidence long before the damage becomes visible on a street.',
    icon: 'satellite',
  },
]

/* ------------------------------------------------------------------ */
/*  Data-source records for the visuals in this story                 */
/* ------------------------------------------------------------------ */

export const STORY_SOURCES = {
  /** The central honesty statement of the whole experience. */
  nisarTehran: {
    mission: 'NISAR (L-band / S-band)',
    sensor: 'Dual-band SAR — L-SAR (NASA) and S-SAR (ISRO)',
    provider: 'NASA / ISRO — granules archived at NASA ASF DAAC and ISRO Bhoonidhi',
    acquisitionDate: 'None selected — no Tehran analysis product retrieved',
    processing: 'Not applicable',
    resolution: 'L-band deformation products expected at metre-to-tens-of-metres posting',
    limitations:
      'NISAR is a different mission from Sentinel-1 and must never be labelled with Sentinel-1 data. The mission is releasing provisional products, but no calibrated NISAR displacement product for this Tehran study area has been retrieved, validated and connected to this platform. No NISAR image, acquisition date or measurement is shown here.',
    confidence:
      'No data. A missing NISAR layer means the observation is absent — it does NOT mean the ground in Tehran is stable.',
    state: 'unavailable',
    provenance: 'demonstration',
    attribution: 'Availability notice — not a measurement.',
    reference: CITATIONS.nisarProducts.url,
  },
  sentinelTehranSchematic: {
    mission: 'Sentinel-1 (C-band) — schematic only',
    sensor: 'IW C-SAR, interferometric wide swath',
    provider: 'ESA Copernicus (open data). The graphic is drawn by this platform, not processed from scenes.',
    acquisitionDate: 'Illustrative cadence — real acquisitions must be queried per frame',
    processing: 'Not processed here. Real velocities need full InSAR processing with atmospheric correction and a stable reference point.',
    resolution: 'Illustrative schematic; real Sentinel-1 InSAR posting is roughly 5–20 m',
    limitations:
      'The deformation surface shown is a hand-drawn schematic built to visualise the published pattern. It is not derived from Sentinel-1 scenes and must not be measured.',
    confidence:
      'Concept illustration only. Quantitative rates should be read from the cited studies, not from this figure.',
    state: 'demo',
    provenance: 'demonstration',
    attribution:
      'Reported rates for the Tehran plain: Moradi et al. (2023); Mahmoudpour et al. (2013).',
    reference: CITATIONS.moradi2023.url,
  },
  interferogramConcept: {
    mission: 'Interferometry concept diagram',
    sensor: 'Not a sensor product — explanatory graphic',
    provider: 'Produced by GROUND TRUTH for teaching purposes',
    acquisitionDate: 'Not applicable',
    processing: 'Hand-drawn fringes. Real interferograms come from phase differencing of two co-registered SAR acquisitions.',
    resolution: 'Not applicable',
    limitations:
      'This is not an interferogram and not a NISAR product. One coloured band does not equal one centimetre; real fringe-to-displacement conversion requires a known radar wavelength and geometry.',
    confidence: 'Pedagogical diagram. Do not extract values.',
    state: 'demo',
    provenance: 'demonstration',
    attribution: 'Concept: repeat-pass InSAR. See ESA Sentinel-1 and USGS subsidence overviews.',
    reference: CITATIONS.sentinel1.url,
  },
  radarConcept: {
    mission: 'NISAR mission profile (concept illustration)',
    sensor: 'L-SAR / S-SAR',
    provider: 'Mission parameters from NASA/JPL and ISRO — rendered here as a schematic',
    acquisitionDate: 'Not applicable',
    processing: 'Schematic of the observation geometry only',
    resolution: 'Schematic ~240 km imaging swath, 12-day repeat orbit shown for context',
    limitations:
      'The satellite, beam and ground track are illustrative. No actual NISAR acquisition is depicted over Tehran.',
    confidence: 'Mission facts are sourced; the drawing is not a data product.',
    state: 'demo',
    provenance: 'demonstration',
    attribution: 'NISAR mission parameters: NASA JPL.',
    reference: CITATIONS.nisarMission.url,
  },
  groundwaterRecords: {
    mission: 'Piezometer / well records',
    sensor: 'In-situ groundwater monitoring',
    provider: 'National and regional water authorities (not connected to this demo)',
    acquisitionDate: '—',
    processing: 'Not connected',
    resolution: 'Point measurements at individual wells',
    limitations:
      'No live agency feed is ingested, so no hydrograph is drawn. Published values are cited from the literature instead.',
    confidence: 'No data displayed — absence of a record is not evidence of a stable aquifer.',
    state: 'unavailable',
    provenance: 'demonstration',
    attribution: 'Cited instead: Mahmoudpour et al. (2013).',
    reference: CITATIONS.mahmoudpour2013.url,
  },
  landCoverContext: {
    mission: 'Landsat 8 / 9 (OLI) — optical context',
    sensor: 'Multi-spectral optical',
    provider: 'NASA / USGS',
    acquisitionDate: 'Seasonal composite (illustrative)',
    processing: 'NDVI / irrigated-area classification',
    resolution: '30 m',
    limitations:
      'Optical imagery cannot measure vertical ground motion. It supplies context — land use, irrigation extent, urban growth — and nothing else.',
    confidence: 'Contextual layer.',
    state: 'demo',
    provenance: 'demonstration',
    reference: CITATIONS.usgs.url,
  },
  subsurfaceConcept: {
    mission: 'Conceptual geological cross-section',
    sensor: 'Not a sensor product — explanatory diagram',
    provider: 'Drawn by GROUND TRUTH from published descriptions of the Tehran aquifer system',
    acquisitionDate: 'Not applicable',
    processing:
      'Illustrative geometry. Layer thicknesses and the amount of drop are exaggerated for legibility.',
    resolution: 'Not applicable',
    limitations:
      'This is a schematic, not a borehole log or a surveyed section. It is not a NISAR product and contains no measured displacement. The vertical scale is exaggerated so the mechanism is visible at all.',
    confidence: 'Pedagogical diagram. Do not extract values from it.',
    state: 'demo',
    provenance: 'demonstration',
    attribution:
      'Layering follows Mahmoudpour et al. (2013); reported rates from Moradi et al. (2023).',
    reference: CITATIONS.mahmoudpour2013.url,
  },
  tectonicContext: {
    mission: 'Seismological / geodetic records',
    sensor: 'Seismic networks, GNSS',
    provider: 'National seismic and geodetic agencies',
    acquisitionDate: 'Continuous',
    processing: 'Not connected to this platform',
    resolution: 'Station-based',
    limitations:
      'Natural tectonic motion also moves the ground. Distinguishing it from pumping-induced subsidence requires combining radar time series with seismic and GNSS records — a satellite alone cannot settle the question.',
    confidence: 'Qualitative statement only.',
    state: 'unavailable',
    provenance: 'demonstration',
  },
} satisfies Record<string, DataSource>

/* ------------------------------------------------------------------ */
/*  Scene 5 — interactive observation timeline                        */
/* ------------------------------------------------------------------ */

export interface ObservationSlot {
  id: string
  date: string
  mission: 'Sentinel-1' | 'NISAR'
  sensor: string
  state: DataState
  coverage: string
  note: string
  source: DataSource
}

/**
 * The dates below describe an ILLUSTRATIVE acquisition cadence so the timeline
 * interaction can be explored. They are not a claim about specific real
 * acquisitions. The NISAR slots carry no date at all.
 */
export const OBSERVATION_SLOTS: ObservationSlot[] = [
  {
    id: 's1-a',
    date: '23 Feb 2019',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (ascending)',
    state: 'demo',
    coverage: 'South-western Tehran plain',
    note: 'Illustrative cadence point. Sentinel-1 revisits the same frame every 6–12 days.',
    source: STORY_SOURCES.sentinelTehranSchematic,
  },
  {
    id: 's1-b',
    date: '06 Mar 2019',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (ascending)',
    state: 'demo',
    coverage: 'South-western Tehran plain',
    note: 'A 12-day pair is the shortest unit from which a deformation phase can be formed.',
    source: STORY_SOURCES.sentinelTehranSchematic,
  },
  {
    id: 's1-c',
    date: '18 Mar 2019',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (ascending)',
    state: 'processing',
    coverage: 'South-western Tehran plain',
    note: 'Processing state — raw scenes exist but have not yet been turned into a usable product.',
    source: { ...STORY_SOURCES.sentinelTehranSchematic, state: 'processing' },
  },
  {
    id: 'nisar-1',
    date: '—',
    mission: 'NISAR',
    sensor: 'L-SAR (NASA)',
    state: 'unavailable',
    coverage: 'Tehran study area',
    note: 'NISAR data not currently available for this analysis.',
    source: STORY_SOURCES.nisarTehran,
  },
  {
    id: 's1-d',
    date: '14 Jun 2023',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (descending)',
    state: 'demo',
    coverage: 'South-western Tehran plain',
    note: 'Illustrative cadence point. Combining ascending and descending tracks separates horizontal from vertical motion.',
    source: STORY_SOURCES.sentinelTehranSchematic,
  },
  {
    id: 's1-e',
    date: '26 Jun 2023',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (descending)',
    state: 'error',
    coverage: 'South-western Tehran plain',
    note: 'Error state — a retrieval step failed. The displayed values for this slot are not valid.',
    source: { ...STORY_SOURCES.sentinelTehranSchematic, state: 'error' },
  },
  {
    id: 'nisar-2',
    date: '—',
    mission: 'NISAR',
    sensor: 'S-SAR (ISRO)',
    state: 'unavailable',
    coverage: 'Tehran study area',
    note: 'NISAR S-band products are distributed through ISRO Bhoonidhi; none has been retrieved for this area.',
    source: STORY_SOURCES.nisarTehran,
  },
  {
    id: 's1-f',
    date: '08 Jul 2023',
    mission: 'Sentinel-1',
    sensor: 'IW C-SAR (descending)',
    state: 'demo',
    coverage: 'South-western Tehran plain',
    note: 'Illustrative cadence point closing the illustrative series.',
    source: STORY_SOURCES.sentinelTehranSchematic,
  },
]

/** Simple illustrative deformation profile drawn under the fringe diagram. */
export const DEFORMATION_PROFILE: { distanceKm: number; mmPerYear: number }[] = [
  { distanceKm: 0, mmPerYear: -12 },
  { distanceKm: 4, mmPerYear: -34 },
  { distanceKm: 8, mmPerYear: -76 },
  { distanceKm: 12, mmPerYear: -142 },
  { distanceKm: 16, mmPerYear: -196 },
  { distanceKm: 20, mmPerYear: -217 },
  { distanceKm: 24, mmPerYear: -188 },
  { distanceKm: 28, mmPerYear: -121 },
  { distanceKm: 32, mmPerYear: -63 },
  { distanceKm: 36, mmPerYear: -28 },
  { distanceKm: 40, mmPerYear: -9 },
]
