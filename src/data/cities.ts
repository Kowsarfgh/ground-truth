import type { CaseCity } from './types'

/**
 * Two case studies.
 *
 * `headlineProvenance: 'reference'` marks numbers summarised from published
 * geodetic / InSAR literature. The `trend` arrays are DEMO curves — shaped to
 * illustrate documented patterns, not digitised measurements.
 */
export const TEHRAN: CaseCity = {
  id: 'tehran',
  name: 'Tehran',
  country: 'Iran',
  region: 'Tehran Plain, Alborz foothills',
  coordinates: { lat: 35.6892, lng: 51.389 },
  timezone: 'Asia/Tehran',
  tagline: 'A fast-sinking capital built on an over-drafted alluvial aquifer.',
  overview:
    'Tehran sits on a thick sequence of alluvial sediments at the foot of the Alborz mountains. Rapid population growth, intensive irrigated agriculture on the surrounding plain, and repeated drought years have driven groundwater levels down sharply. Satellite radar interferometry has tracked the resulting subsidence since the early 2000s, with the strongest signals concentrated in the south-western districts and the agricultural plain beyond the city edge.',
  context: {
    population: '≈ 9 million (city) · 15 million+ (metropolitan region)',
    elevation: '≈ 1,200 m at the city centre, rising northwards into the Alborz',
    geology: 'Thick Quaternary alluvium — interbedded gravel, sand, silt and compressible clay',
    climate: 'Semi-arid, cold winters; multi-year drought episodes in recent decades',
    waterSource: 'Surface reservoirs (Karaj, Lar, Latian) plus heavy groundwater abstraction',
    landUse: 'Dense urban core, southward-spreading built-up area, irrigated farmland on the plain',
  },
  subsidence: {
    headline: 'Up to ~25 cm per year in the most affected districts',
    headlineProvenance: 'reference',
    peakRate: 'Reported peak rates of roughly 20–25 cm/yr in south-western Tehran',
    cumulative: 'Several metres of cumulative lowering across two decades of observation',
    firstDetected: 'Signals identified in research literature from the early 2000s',
    affectedArea: 'Concentrated in the south-western city districts and the Tehran plain',
    monitoringSince: 'Continuous InSAR monitoring from ~2003 onwards',
  },
  primaryCauses: [
    'Unregulated groundwater abstraction',
    'Intensive irrigated agriculture on the plain',
    'Multi-year drought and reduced recharge',
    'Compressible clay layers in the alluvium',
    'Rapid urban expansion and sealing of recharge surfaces',
  ],
  causeIds: ['groundwater', 'irrigation', 'drought', 'geology', 'urban'],
  timeline: [
    {
      year: 1960,
      title: 'Urban water demand accelerates',
      detail:
        'Rapid population growth pushes municipal and agricultural demand beyond reliable surface supply.',
      kind: 'cause',
    },
    {
      year: 1990,
      title: 'Well density climbs',
      detail:
        'Thousands of abstraction wells are drilled across the plain as irrigation expands.',
      kind: 'cause',
    },
    {
      year: 2003,
      title: 'First systematic radar record',
      detail:
        'Sentinel-era and earlier ENVISAT interferometry establish a baseline for deformation monitoring.',
      kind: 'observation',
    },
    {
      year: 2010,
      title: 'Subsidence becomes locally visible',
      detail:
        'Reports of structural damage, well-casing failures and ground fissures in affected districts.',
      kind: 'impact',
    },
    {
      year: 2015,
      title: 'Monitoring networks expand',
      detail:
        'GNSS stations, levelling campaigns and InSAR time series are combined for cross-validation.',
      kind: 'observation',
    },
    {
      year: 2020,
      title: 'Water-management restrictions tighten',
      detail:
        'Well metering, restrictions on new drilling and recharge programmes are introduced in phases.',
      kind: 'policy',
    },
  ],
  groundwater: {
    summary:
      'Groundwater provides a large share of supply. Levels in the plains aquifer have declined substantially over recent decades, with the steepest drawdown beneath agricultural districts.',
    history: [
      {
        period: '1960s–1980s',
        label: 'Expansion',
        detail: 'Pumping grows alongside the city; aquifers still partly recover each year.',
      },
      {
        period: '1990s',
        label: 'Over-draft',
        detail: 'Abstraction consistently exceeds recharge; water tables begin a steady decline.',
      },
      {
        period: '2000s',
        label: 'Drought pressure',
        detail: 'Repeated dry years deepen the deficit and push pumping into confined layers.',
      },
      {
        period: '2010s–now',
        label: 'Managed response',
        detail: 'Metering, drilling bans and recharge works attempt to slow the decline.',
      },
    ],
  },
  policies: [
    {
      name: 'Restrictions on new abstraction wells',
      year: '2010s',
      effect: 'Slows the growth of new extraction points; enforcement remains difficult.',
    },
    {
      name: 'Well metering & volumetric charging',
      year: '2010s onwards',
      effect: 'Creates an incentive to reduce over-irrigation, though coverage is uneven.',
    },
    {
      name: 'Managed aquifer recharge trials',
      year: '2010s onwards',
      effect: 'Targets localised recovery; benefits mostly appear in shallower, coarse sediments.',
    },
    {
      name: 'Water-transfer & demand management',
      year: 'ongoing',
      effect: 'Reduces reliance on the local aquifer, but transfers carry their own costs.',
    },
  ],
  evidenceAfterIntervention: [
    'Some districts show a slower pace of deformation after pumping restrictions — but attribution is complicated by rainfall variability.',
    'InSAR time series are being used to check whether restrictions produce measurable change.',
    'Reported recovery remains limited where compacting clay layers dominate.',
    'Longer, well-calibrated records are needed before policy effects can be separated from climate signals.',
  ],
  observationSources: ['Sentinel-1 (C-band InSAR)', 'ENVISAT ASAR (historical)', 'GNSS & levelling surveys', 'GRACE-FO (regional water storage)'],
  trend: [
    { year: 2003, rateMmPerYear: -80, uncertainty: 30 },
    { year: 2005, rateMmPerYear: -120, uncertainty: 34 },
    { year: 2007, rateMmPerYear: -160, uncertainty: 38 },
    { year: 2009, rateMmPerYear: -200, uncertainty: 42 },
    { year: 2011, rateMmPerYear: -230, uncertainty: 46 },
    { year: 2013, rateMmPerYear: -250, uncertainty: 50 },
    { year: 2015, rateMmPerYear: -240, uncertainty: 48 },
    { year: 2017, rateMmPerYear: -220, uncertainty: 46 },
    { year: 2019, rateMmPerYear: -200, uncertainty: 44 },
    { year: 2021, rateMmPerYear: -190, uncertainty: 42 },
    { year: 2023, rateMmPerYear: -180, uncertainty: 40 },
  ],
  map: {
    center: [35.6892, 51.389],
    zoom: 11,
    bounds: [
      [35.52, 51.12],
      [35.86, 51.66],
    ],
  },
}

export const TOKYO: CaseCity = {
  id: 'tokyo',
  name: 'Tokyo',
  country: 'Japan',
  region: 'Kanto Plain, Tokyo Bay lowlands',
  coordinates: { lat: 35.6812, lng: 139.7671 },
  timezone: 'Asia/Tokyo',
  tagline: 'A city that reversed one of the world’s worst subsidence crises.',
  overview:
    'Eastern Tokyo is built on soft, water-rich sediments around Tokyo Bay. Through the early and mid-20th century, industrial and municipal groundwater pumping caused dramatic settlement — parts of the lowlands dropped several metres. When groundwater use was brought under legal control, the trend slowed sharply and in many districts effectively stopped. Tokyo is therefore a rare example of subsidence being demonstrably arrested by policy.',
  context: {
    population: '≈ 14 million (metropolis) · ~37 million (greater metropolitan area)',
    elevation: 'Much of the eastern lowland lies at or near sea level; reclaimed land is lower still',
    geology: 'Soft Quaternary alluvial and deltaic deposits over the Kanto Plain',
    climate: 'Humid subtropical with a pronounced summer monsoon; historically typhoon-exposed',
    waterSource: 'Surface rivers (Tone, Arakawa) plus historically heavy industrial groundwater use',
    landUse: 'Dense mixed urban, port and industrial districts on reclaimed and low-lying ground',
  },
  subsidence: {
    headline: 'Several metres of cumulative settlement before regulation',
    headlineProvenance: 'reference',
    peakRate: 'Rates reached roughly 20 cm/yr or more during the 1960s peak',
    cumulative: 'Localised cumulative lowering approaching ~4 m in the eastern lowlands',
    firstDetected: 'Measured by levelling surveys from the early 20th century',
    affectedArea: 'Eastern lowland districts, port areas and reclaimed ground around Tokyo Bay',
    monitoringSince: 'Continuous levelling records from ~1900 onward',
  },
  primaryCauses: [
    'Industrial and municipal groundwater pumping',
    'Compressible deltaic sediments',
    'Land reclamation and drainage of low-lying ground',
    'Heavy construction loads on soft ground',
    'Post-war industrial expansion',
  ],
  causeIds: ['groundwater', 'geology', 'urban', 'drought'],
  timeline: [
    {
      year: 1900,
      title: 'First levelling evidence',
      detail: 'Survey benchmarks reveal measurable settlement in the eastern lowlands.',
      kind: 'observation',
    },
    {
      year: 1945,
      title: 'Post-war industrial surge',
      detail: 'Rebuilding and industry drive a rapid increase in groundwater pumping.',
      kind: 'cause',
    },
    {
      year: 1962,
      title: 'Peak subsidence',
      detail: 'Annual rates in the worst-affected districts reach roughly 20 cm/yr or more.',
      kind: 'impact',
    },
    {
      year: 1956,
      title: 'Industrial Water Law',
      detail: 'Groundwater use in industry is placed under statutory control in designated areas.',
      kind: 'policy',
    },
    {
      year: 1962,
      title: 'Building Water Law',
      detail: 'Groundwater used for building services is regulated, extending control further.',
      kind: 'policy',
    },
    {
      year: 1970,
      title: 'Sharp decline in pumping',
      detail: 'Groundwater abstraction falls steeply; subsidence rates drop in step.',
      kind: 'recovery',
    },
    {
      year: 1980,
      title: 'Trend largely arrested',
      detail: 'Most eastern districts approach stability; residual motion persists locally.',
      kind: 'recovery',
    },
  ],
  groundwater: {
    summary:
      'Groundwater pumping once supplied a large share of industrial and municipal demand. Legal controls shifted users to surface supply, and water levels in many wells recovered — though compacted layers do not rebound.',
    history: [
      {
        period: '1900s–1945',
        label: 'Growing reliance',
        detail: 'Pumping rises with urbanisation; subsidence is already measurable.',
      },
      {
        period: '1945–1960s',
        label: 'Peak extraction',
        detail: 'Post-war industry pushes abstraction to its maximum; subsidence accelerates.',
      },
      {
        period: '1956–1970s',
        label: 'Statutory control',
        detail: 'Industrial and building water laws restrict groundwater use in designated areas.',
      },
      {
        period: '1980s–now',
        label: 'Stabilisation',
        detail: 'Water levels partly recover; subsidence is largely halted in most districts.',
      },
    ],
  },
  policies: [
    {
      name: 'Industrial Water Law',
      year: '1956',
      effect: 'Mandatory controls on industrial groundwater use in designated subsiding areas.',
    },
    {
      name: 'Building Water Law',
      year: '1962',
      effect: 'Extends regulation to building-service groundwater use.',
    },
    {
      name: 'Shift to surface-water supply',
      year: '1960s–1970s',
      effect: 'Substitutes river supply for pumped groundwater, directly reducing extraction.',
    },
    {
      name: 'Continued monitoring and enforcement',
      year: '1970s–now',
      effect: 'Sustained measurement keeps the trend visible and policy accountable.',
    },
  ],
  evidenceAfterIntervention: [
    'Levelling and radar records show a clear, sustained reduction in subsidence rates following the water laws.',
    'Groundwater levels in monitored wells recovered substantially after pumping was curtailed.',
    'However, cumulative settlement already recorded is permanent — the ground did not rise back.',
    'Residual local subsidence continues in a few districts, so monitoring has never been switched off.',
  ],
  observationSources: ['Historical levelling surveys', 'ENVISAT ASAR (historical InSAR)', 'Sentinel-1 (C-band InSAR)', 'Municipal groundwater monitoring wells'],
  trend: [
    { year: 1900, rateMmPerYear: -20, uncertainty: 15 },
    { year: 1915, rateMmPerYear: -45, uncertainty: 16 },
    { year: 1930, rateMmPerYear: -90, uncertainty: 18 },
    { year: 1945, rateMmPerYear: -150, uncertainty: 22 },
    { year: 1952, rateMmPerYear: -190, uncertainty: 24 },
    { year: 1958, rateMmPerYear: -220, uncertainty: 26 },
    { year: 1962, rateMmPerYear: -240, uncertainty: 28 },
    { year: 1966, rateMmPerYear: -210, uncertainty: 26 },
    { year: 1970, rateMmPerYear: -140, uncertainty: 22 },
    { year: 1975, rateMmPerYear: -70, uncertainty: 16 },
    { year: 1980, rateMmPerYear: -35, uncertainty: 12 },
    { year: 1990, rateMmPerYear: -18, uncertainty: 8 },
    { year: 2000, rateMmPerYear: -10, uncertainty: 6 },
    { year: 2010, rateMmPerYear: -6, uncertainty: 5 },
    { year: 2023, rateMmPerYear: -4, uncertainty: 4 },
  ],
  map: {
    center: [35.6812, 139.7671],
    zoom: 11,
    bounds: [
      [35.5, 139.58],
      [35.86, 139.94],
    ],
  },
}

export const CITIES: CaseCity[] = [TEHRAN, TOKYO]

export const cityById = (id: string): CaseCity | undefined =>
  CITIES.find((c) => c.id === id)
