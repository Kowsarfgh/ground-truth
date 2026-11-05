import { SOURCES } from './satellites'
import type { StoryStage } from './types'

/**
 * The five-stage narrative used on the "Our Stories" page.
 * Text is explanatory; every figure carries a full DataSource so the
 * transparency panel can be rendered next to the visual.
 */
export const STORY_STAGES: StoryStage[] = [
  {
    id: 'event',
    index: 1,
    eyebrow: 'Stage 01',
    title: 'The Event',
    lead: 'The ground beneath a city moves — slowly, silently, and permanently.',
    body: [
      'Land subsidence is the gradual sinking of the Earth’s surface. It is not an earthquake: there is no single moment of rupture. Instead, millimetres accumulate into centimetres, and centimetres into metres, over years and decades.',
      'The movement is usually invisible from the street. It shows up in the instruments first — in levelling benchmarks, in well casings, in the phase of a radar echo returning from the ground.',
      'In both of our case studies the pattern is the same: a surface that was stable for centuries begins to descend once the water held inside the sediment is withdrawn.',
    ],
    keyPoints: [
      'Subsidence is slow and cumulative, not instantaneous.',
      'It is measured as a rate — millimetres or centimetres per year.',
      'Once fine-grained layers compact, the loss of elevation is essentially permanent.',
    ],
    figure: {
      kind: 'chart',
      caption:
        'Illustrative deformation shapes for the two case studies — rapid onset and continued decline in Tehran; a long historical curve that flattens after regulation in Tokyo.',
      source: SOURCES.tehranTrend,
    },
  },
  {
    id: 'evidence',
    index: 2,
    eyebrow: 'Stage 02',
    title: 'The Evidence',
    lead: 'Radar satellites turn tiny vertical motions into measurable maps.',
    body: [
      'Interferometric Synthetic Aperture Radar (InSAR) compares the phase of radar echoes from two passes over the same ground. Where the surface has moved towards or away from the satellite, the phase shifts — and that shift can be converted into a displacement measurement.',
      'Because a satellite repeats the same orbit every few days, thousands of measurements stack into a time series. Individual pixels are noisy; the trend across many pixels and many dates is not.',
      'Optical satellites such as Landsat cannot measure this vertical motion. They show the context — how cities grew, where fields are irrigated, where water once stood — while radar measures the movement itself.',
    ],
    keyPoints: [
      'InSAR measures line-of-sight displacement, then converts it to vertical motion with assumptions.',
      'Repeat passes build a time series; consistency across pixels is what makes a result trustworthy.',
      'C-band (Sentinel-1) is sensitive but struggles over vegetation; L-band (ALOS, NISAR) holds coherence better.',
      'A gap in satellite coverage is a data gap — never evidence that the ground is stable.',
    ],
    figure: {
      kind: 'map',
      caption:
        'Demonstration observation coverage across the two study regions. Overlay zones are illustrative placeholders, not processed interferograms.',
      source: SOURCES.sentinelDemoTehran,
    },
  },
  {
    id: 'causes',
    index: 3,
    eyebrow: 'Stage 03',
    title: 'The Causes',
    lead: 'Pumping water is the trigger — geology decides how much the ground answers.',
    body: [
      'When groundwater is extracted faster than it is replenished, the water pressure that props open the pore spaces between sediment grains falls. The grains rearrange, the pore space collapses, and the surface drops.',
      'How much it drops depends on what the ground is made of. Coarse sand and gravel can partly rebound when water returns. Thick beds of clay compact far more — and they largely do not recover.',
      'Drought intensifies the pressure by cutting recharge while demand continues. Urban growth adds both load and impervious surfaces that block infiltration. These factors rarely act alone; they compound.',
    ],
    keyPoints: [
      'Extraction lowers pore pressure, which raises effective stress on the sediment skeleton.',
      'Clay-rich sequences produce the largest and most irreversible settlement.',
      'Drought removes recharge at the exact moment demand is highest.',
      'Urban sealing reduces the infiltration that would otherwise slow the decline.',
    ],
    figure: {
      kind: 'diagram',
      caption:
        'Illustrative weighting of contributing mechanisms. Percentages are demonstration values used to show relative emphasis, not measured attributions.',
      source: SOURCES.gleamPlaceholder,
    },
  },
  {
    id: 'impact',
    index: 4,
    eyebrow: 'Stage 04',
    title: 'The Impact',
    lead: 'When the ground drops, everything built on it is tested.',
    body: [
      'Uneven settlement is more damaging than uniform sinking. Buildings, pipelines, railways and canals that were designed for a level surface are bent, tilted and cracked when the ground beneath them moves at different rates.',
      'In low-lying coastal districts the consequences compound: relative sea level rises twice over — once from the ocean, once from the sinking land. Flood risk increases even without any change in the sea itself.',
      'There is also an invisible loss. Compacted aquifers hold less water. The storage capacity that took millennia to build is removed in decades, weakening the very buffer that could carry a city through the next drought.',
    ],
    keyPoints: [
      'Differential settlement damages structures far more than uniform sinking.',
      'Cracked well casings and pipelines can create new, uncontrolled water losses.',
      'In coastal cities, subsidence multiplies flood and storm-surge exposure.',
      'Lost aquifer storage is extremely difficult and costly to restore.',
    ],
    figure: {
      kind: 'list',
      caption:
        'Illustrative impact categories compiled for this educational platform. Not a site-specific damage assessment.',
      source: SOURCES.gleamPlaceholder,
    },
  },
  {
    id: 'response',
    index: 5,
    eyebrow: 'Stage 05',
    title: 'The Response',
    lead: 'Tokyo proved the trend can be stopped. That is the most valuable lesson available.',
    body: [
      'Subsidence is not a natural inevitability. It is the physical consequence of a management decision — and management decisions can change.',
      'Tokyo’s groundwater laws of 1956 and 1962 restricted industrial and building water use in the areas that were sinking fastest. Pumping fell, water levels recovered, and the subsidence rate collapsed. The ground did not rise back, but it stopped falling.',
      'Tehran is at an earlier point on the same curve. Restrictions on new wells, metering, recharge schemes and demand management are in place or expanding. Whether they bend the curve is a question that only sustained, honest measurement can answer.',
    ],
    keyPoints: [
      'Regulation works — but only when extraction actually falls.',
      'Monitoring must continue after the crisis, or a relapse becomes invisible.',
      'Recovery of water levels does not mean recovery of elevation.',
      'Transparency about data gaps keeps public trust and policy pressure alive.',
    ],
    figure: {
      kind: 'compare',
      caption:
        'Illustrative comparison of the two trajectories. Tokyo’s curve reflects a published, well-documented stabilisation; Tehran’s reflects an ongoing situation.',
      source: SOURCES.tokyoHistorical,
    },
  },
]

/** Final synthesis for the Compare Cities page. */
export const LEARNINGS = [
  {
    title: 'Geography sets the ceiling, policy sets the curve',
    detail:
      'Both cities sit on compressible sediments, which is why both subsided. What separated their outcomes was groundwater management, not geology.',
  },
  {
    title: 'Time periods are not comparable at face value',
    detail:
      'Tokyo’s peak occurred when monitoring relied on survey levelling. Tehran’s record is built from satellite radar. Methods, densities and uncertainties differ, so raw rates should never be compared without context.',
  },
  {
    title: 'Regulation can halt subsidence, but not undo it',
    detail:
      'Tokyo demonstrates that sustained extraction limits stop the sinking. It also demonstrates that compacted ground does not spring back.',
  },
  {
    title: 'Data gaps must be stated, not smoothed over',
    detail:
      'Where coverage is thin, the honest answer is "we do not know yet". Silence in a dataset is a limitation of the observation, never proof that nothing is happening.',
  },
  {
    title: 'The measurement is part of the solution',
    detail:
      'Continuous, openly documented monitoring is what makes policy accountable — and what allows a city to see whether its interventions are working.',
  },
]
