import type { CauseFactor } from './types'

/**
 * The five interacting mechanisms behind land subsidence.
 * `demoShare` values are illustrative weights used only for the visual
 * breakdown — they are explicitly labelled as demonstration data in the UI.
 */
export const CAUSES: CauseFactor[] = [
  {
    id: 'groundwater',
    title: 'Excessive groundwater extraction',
    short: 'Pumping water out faster than recharge can refill it.',
    explanation:
      'When water is pumped from an aquifer, the fluid pressure that helps hold the sediment grains apart drops. The grains compact under the weight of everything above them. Because the pore space collapses permanently, the land surface sinks and the aquifer loses storage capacity that is very difficult to recover.',
    mechanism:
      'Pore-pressure decline → effective stress increase → irreversible compaction of fine-grained layers.',
    indicators: [
      'Falling water tables in monitoring wells',
      'Subsidence bowls centred on pumping districts',
      'Seasonal ground motion that tracks irrigation cycles',
    ],
    relevance:
      'The dominant driver in both case studies — directly for Tehran today, and historically for Tokyo before regulation.',
    icon: 'droplets',
    accent: '#38d6ff',
    demoShare: 38,
  },
  {
    id: 'irrigation',
    title: 'Agricultural irrigation',
    short: 'Crops are the largest single consumer of pumped water.',
    explanation:
      'Irrigated farming concentrates demand in specific seasons and districts. Where surface canals are unavailable or unreliable, growers drill deeper wells, extending pumping into confined aquifers whose compaction is effectively permanent rather than elastic.',
    mechanism:
      'Seasonal demand spikes → deeper, confined-aquifer pumping → permanent inelastic compaction.',
    indicators: [
      'Deformation amplitude correlating with the growing season',
      'Well-depth increases over time',
      'Subsidence hot spots aligned with irrigated plains',
    ],
    relevance:
      'Central to the Tehran plain, where intensive cultivation sits on top of the most compacting sediments.',
    icon: 'sprout',
    accent: '#14e0c0',
    demoShare: 24,
  },
  {
    id: 'drought',
    title: 'Drought & climate conditions',
    short: 'Less rain means more reliance on stored groundwater.',
    explanation:
      'Multi-year droughts reduce natural recharge while demand continues — or rises. The aquifer is drawn down faster than it can refill even in wet years, and the compounding deficit accelerates compaction. Climate variability therefore acts as an amplifier of human extraction, not a separate problem.',
    mechanism:
      'Reduced recharge → declining storage → higher effective stress → accelerated compaction.',
    indicators: [
      'Multi-year precipitation deficits',
      'Shrinking reservoir and lake levels',
      'Step-changes in deformation rate during dry spells',
    ],
    relevance:
      'A key pressure multiplier for Tehran; a contributing factor in the early Tokyo subsidence era.',
    icon: 'sun',
    accent: '#f6c667',
    demoShare: 16,
  },
  {
    id: 'geology',
    title: 'Soil composition & clay layers',
    short: 'Some sediments compact far more than others.',
    explanation:
      'Loose alluvial deposits — particularly thick sequences of compressible clay and silt — compact strongly once their pore pressure falls. Coarse sand and gravel rebound partially when water returns; clays largely do not. This is why two cities with similar pumping can subside at very different rates.',
    mechanism:
      'High compressibility of fine-grained layers → large, mostly irreversible volume loss.',
    indicators: [
      'Thick fine-grained alluvial sequences in boreholes',
      'Spatial mismatch between pumping and subsidence patterns',
      'Minimal recovery when water levels rebound',
    ],
    relevance:
      'Explains why Tokyo’s soft lowland sediments and Tehran’s alluvial plain both proved highly vulnerable.',
    icon: 'layers',
    accent: '#9b8cff',
    demoShare: 14,
  },
  {
    id: 'urban',
    title: 'Urban development & loading',
    short: 'Cities add weight and seal the ground that would recharge.',
    explanation:
      'Construction loads add direct stress to compressible ground, while paving and drainage networks reduce local infiltration. Rapidly growing cities can therefore increase demand on aquifers and simultaneously cut off the recharge that would slow the decline — a reinforcing loop.',
    mechanism:
      'Surface loading + reduced infiltration → higher stress, less recharge.',
    indicators: [
      'New construction over compressible ground',
      'Declining infiltration in built-up catchments',
      'Localised settlement around heavy structures',
    ],
    relevance:
      'A secondary but growing factor in Tehran’s expansion; historically significant in Tokyo’s port and lowland districts.',
    icon: 'building2',
    accent: '#ff7a6b',
    demoShare: 8,
  },
]

export const causeById = (id: string) => CAUSES.find((c) => c.id === id)
