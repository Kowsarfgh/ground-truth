/**
 * Generated illustrative visuals.
 *
 * Every image below is a synthetic rendering produced for this educational
 * demo. None of them is real satellite imagery and the UI labels them as such.
 */
const BASE = 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image'

function img(prompt: string, size: string) {
  return `${BASE}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`
}

export const IMAGES = {
  heroEarth: img(
    'planet earth seen from orbit at night, glowing city lights along coastlines, deep navy blue atmosphere, thin clouds, photorealistic cinematic earth observation view',
    'landscape_16_9',
  ),
  heroSatellite: img(
    'radar satellite with large solar panels orbiting above earth, dark blue space background, soft cyan rim light, technical photorealistic render',
    'landscape_4_3',
  ),
  evidenceRadar: img(
    'scientific radar interferogram of ground deformation, concentric colourful fringe bands over dark terrain, cyan teal magenta palette, data visualisation, top down',
    'landscape_16_9',
  ),
  impactDamage: img(
    'cracked asphalt road and slightly tilted concrete foundation wall in an urban street, daylight, documentary photograph, subtle damage, realistic',
    'landscape_4_3',
  ),
  responseRoom: img(
    'water management control room with large screens showing groundwater monitoring charts and maps, cool blue lighting, professional scientific environment',
    'landscape_16_9',
  ),
  causeGroundwater: img(
    'cross section diagram of aquifer layers underground with a pumping well, water table dropping, sandy and clay sediment strata, clean scientific illustration, teal and navy palette',
    'landscape_4_3',
  ),
  causeAgriculture: img(
    'irrigated agricultural fields on a semi arid plain seen from above, centre pivot irrigation circles, pale soil, realistic aerial photograph',
    'landscape_4_3',
  ),
  causeDrought: img(
    'dried cracked lake bed with exposed mud and a distant reservoir at low level, arid landscape, clear sky, documentary photograph',
    'landscape_4_3',
  ),
  causeGeology: img(
    'geological core sample of layered clay silt and sand sediments on a neutral background, scientific close up photograph',
    'landscape_4_3',
  ),
  causeUrban: img(
    'rapidly growing city district from above with construction sites, new roads and dense low rise buildings, aerial photograph, daylight',
    'landscape_4_3',
  ),
}

/** Before / after pairs used by the comparison slider (demo renderings). */
export interface ComparePair {
  id: string
  region: string
  observationType: string
  before: { src: string; label: string; date: string; source: string }
  after: { src: string; label: string; date: string; source: string }
  note: string
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    id: 'tehran',
    region: 'South-western Tehran plain, Iran',
    observationType: 'Urban & land-cover change (optical context)',
    before: {
      src: img(
        'top down aerial view of an arid semi desert plain at a city edge, sparse low rise buildings, dirt tracks, scattered farmland patches, pale brown tones, even daylight',
        'landscape_4_3',
      ),
      label: 'Earlier condition',
      date: '1990-07-12',
      source: 'Illustrative rendering — optical land-cover context',
    },
    after: {
      src: img(
        'top down aerial view of dense urban sprawl over an arid plain, grey concrete rooftops, new highways, patchwork irrigated fields, hazy daylight',
        'landscape_4_3',
      ),
      label: 'Later condition',
      date: '2023-06-14',
      source: 'Illustrative rendering — optical land-cover context',
    },
    note: 'Both panels are synthetic renderings created for this demo. They illustrate the type of land-cover change that accompanies subsidence; they are not satellite acquisitions and should not be measured.',
  },
  {
    id: 'tokyo',
    region: 'Eastern Tokyo lowlands, Japan',
    observationType: 'Urban development over soft ground (optical context)',
    before: {
      src: img(
        'top down aerial view of a dense low rise mid century city on flat delta ground, narrow canals and waterways, small wooden houses, muted sepia grey tones',
        'landscape_4_3',
      ),
      label: 'Earlier condition',
      date: '1947-04-02',
      source: 'Illustrative rendering — historical urban context',
    },
    after: {
      src: img(
        'top down aerial view of a dense modern metropolis, tall buildings, grid of streets, river crossing the city toward a bay, clear daylight',
        'landscape_4_3',
      ),
      label: 'Later condition',
      date: '2023-09-02',
      source: 'Illustrative rendering — modern urban context',
    },
    note: 'Rendered for demonstration. Tokyo’s subsidence record comes from survey levelling and historical InSAR, not from a visual pair like this.',
  },
]
