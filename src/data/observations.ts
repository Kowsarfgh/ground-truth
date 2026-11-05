import type { DataState } from './types'
import { SOURCES } from './satellites'
import type { DataSource } from './types'

export interface ObservationDate {
  id: string
  /** ISO date shown to the user. */
  date: string
  /** Mission that would provide this acquisition. */
  mission: string
  label: string
  state: DataState
  /** Reason shown when a date cannot be rendered. */
  note: string
  source: DataSource
}

/**
 * Illustrative acquisition list for the date selector.
 *
 * This is deliberately *not* a list of real granules. It exists to exercise the
 * full set of required states — loading, processing, demo, unavailable and
 * error — so the interface can never hide a data gap behind an empty map.
 */
export const OBSERVATION_DATES: Record<'tehran' | 'tokyo', ObservationDate[]> = {
  tehran: [
    {
      id: 'th-2023-06-14',
      date: '2023-06-14',
      mission: 'Sentinel-1 (C-band)',
      label: 'Dry-season acquisition',
      state: 'demo',
      note: 'Rendered as a demonstration grid. Overlay zones are illustrative only.',
      source: SOURCES.sentinelDemoTehran,
    },
    {
      id: 'th-2023-03-02',
      date: '2023-03-02',
      mission: 'Sentinel-1 (C-band)',
      label: 'Post-winter acquisition',
      state: 'processing',
      note: 'Interferometric processing in progress — no velocity field published for this date yet.',
      source: {
        ...SOURCES.sentinelDemoTehran,
        acquisitionDate: '2023-03-02',
        processing: 'InSAR stack assembly — interferograms not yet unwrapped',
        state: 'processing',
        confidence: 'Not yet assessable.',
      },
    },
    {
      id: 'th-2024-01-20',
      date: '2024-01-20',
      mission: 'NISAR (L-band)',
      label: 'Requested NISAR acquisition',
      state: 'unavailable',
      note: 'NISAR is a distinct mission and no granules are connected to this platform. This is not a Sentinel-1 product.',
      source: SOURCES.nisarPending,
    },
    {
      id: 'th-2021-08-08',
      date: '2021-08-08',
      mission: 'Sentinel-1 (C-band)',
      label: 'Archive retrieval',
      state: 'error',
      note: 'The archive request failed. Values would be invalid if displayed — retry or choose another date.',
      source: {
        ...SOURCES.sentinelDemoTehran,
        acquisitionDate: '2021-08-08',
        provider: 'Archive endpoint unreachable',
        state: 'error',
        confidence: 'Unavailable — retrieval error.',
      },
    },
  ],
  tokyo: [
    {
      id: 'tk-2023-09-02',
      date: '2023-09-02',
      mission: 'Sentinel-1 (C-band)',
      label: 'Post-typhoon-season acquisition',
      state: 'demo',
      note: 'Rendered as a demonstration grid. Residual motion shown is illustrative.',
      source: SOURCES.sentinelDemoTokyo,
    },
    {
      id: 'tk-1968-01-01',
      date: '1968-01-01',
      mission: 'Levelling survey',
      label: 'Historic peak-subsidence era',
      state: 'unavailable',
      note: 'No satellite acquisition exists for this date. Tokyo’s 1960s record comes from survey levelling, which cannot be displayed as a radar layer.',
      source: {
        ...SOURCES.tokyoHistorical,
        acquisitionDate: '1968 survey year',
        processing: 'Benchmark levelling compilation',
        state: 'unavailable',
        confidence: 'Historic survey record — not a radar product.',
      },
    },
    {
      id: 'tk-2008-05-11',
      date: '2008-05-11',
      mission: 'ALOS PALSAR (L-band)',
      label: 'Research-licensed archive',
      state: 'processing',
      note: 'ALOS data require a research agreement. This entry is queued for licensed processing and is not yet available.',
      source: {
        ...SOURCES.tokyoHistorical,
        mission: 'ALOS / PALSAR (L-band)',
        provider: 'JAXA — access requires a research agreement',
        acquisitionDate: '2008-05-11',
        processing: 'Awaiting licensed access',
        state: 'processing',
        confidence: 'Not assessable until access is granted.',
      },
    },
    {
      id: 'tk-2022-11-30',
      date: '2022-11-30',
      mission: 'Sentinel-1 (C-band)',
      label: 'Late-year acquisition',
      state: 'demo',
      note: 'Demonstration grid. Present-day Tokyo signals are near the detection threshold of the method.',
      source: { ...SOURCES.sentinelDemoTokyo, acquisitionDate: '2022-11-30' },
    },
  ],
}
