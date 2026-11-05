import { TEHRAN, TOKYO } from './cities'
import type { CaseCity } from './types'

export interface ComparisonRow {
  label: string
  tehran: string
  tokyo: string
  /** How comparable the two entries actually are. */
  comparability: 'comparable' | 'partial' | 'not-comparable'
  note: string
}

const c = (city: CaseCity) => city

/**
 * Side-by-side comparison rows. `comparability` exists so the table can warn
 * the reader where a direct comparison would be misleading.
 */
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: 'Primary driver',
    tehran: 'Ongoing groundwater over-abstraction for agriculture and municipal supply',
    tokyo: 'Historical industrial and municipal groundwater pumping (largely controlled since the 1960s)',
    comparability: 'comparable',
    note: 'Same physical mechanism, very different regulatory stage.',
  },
  {
    label: 'Current status',
    tehran: 'Ongoing — deformation continues in the south-western districts',
    tokyo: 'Largely stabilised — residual motion in a few lowland districts',
    comparability: 'comparable',
    note: 'A live crisis versus a managed legacy.',
  },
  {
    label: 'Peak reported rate',
    tehran: c(TEHRAN).subsidence.peakRate,
    tokyo: c(TOKYO).subsidence.peakRate,
    comparability: 'partial',
    note: 'Measured in different eras with different instruments.',
  },
  {
    label: 'Cumulative lowering',
    tehran: c(TEHRAN).subsidence.cumulative,
    tokyo: c(TOKYO).subsidence.cumulative,
    comparability: 'partial',
    note: 'Tokyo’s record spans a century; Tehran’s spans roughly two decades of satellite data.',
  },
  {
    label: 'Monitoring era',
    tehran: c(TEHRAN).subsidence.monitoringSince,
    tokyo: c(TOKYO).subsidence.monitoringSince,
    comparability: 'not-comparable',
    note: 'Levelling surveys and satellite radar are not the same measurement.',
  },
  {
    label: 'Dominant geology',
    tehran: c(TEHRAN).context.geology,
    tokyo: c(TOKYO).context.geology,
    comparability: 'partial',
    note: 'Both compressible alluvium; Tokyo’s is more deltaic and water-rich.',
  },
  {
    label: 'Water supply strategy',
    tehran: c(TEHRAN).context.waterSource,
    tokyo: c(TOKYO).context.waterSource,
    comparability: 'comparable',
    note: 'Tokyo’s shift to surface water is the pivot of its success story.',
  },
  {
    label: 'Key policy lever',
    tehran: 'Well metering, drilling restrictions, recharge schemes',
    tokyo: 'Industrial Water Law (1956) and Building Water Law (1962)',
    comparability: 'partial',
    note: 'Enforcement capacity and legal frameworks differ substantially.',
  },
  {
    label: 'Evidence of change after intervention',
    tehran: 'Indications of slower deformation in some districts; attribution complicated by drought',
    tokyo: 'Clear, sustained reduction in subsidence rate documented from the 1970s',
    comparability: 'partial',
    note: 'Tokyo’s signal is unambiguous; Tehran’s is still emerging.',
  },
  {
    label: 'Flood exposure linkage',
    tehran: 'Localised infrastructure damage; less direct coastal exposure',
    tokyo: 'Directly increases relative sea-level and storm-surge risk in the lowlands',
    comparability: 'not-comparable',
    note: 'Coastal versus inland context changes the consequence profile.',
  },
]

export const COMPARABILITY_LABEL: Record<ComparisonRow['comparability'], string> = {
  comparable: 'Directly comparable',
  partial: 'Compare with care',
  'not-comparable': 'Not directly comparable',
}
