import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cn } from '@/lib/cn'
import type { MetricPoint } from '@/data/types'

export interface TrendSeries {
  id: string
  label: string
  color: string
  points: MetricPoint[]
}

interface Row {
  year: number
  [key: string]: number | null
}

function buildRows(series: TrendSeries[]): Row[] {
  const years = Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.year)))).sort(
    (a, b) => a - b,
  )
  return years.map((year) => {
    const row: Row = { year }
    series.forEach((s) => {
      const point = s.points.find((p) => p.year === year)
      // Plot subsidence magnitude (positive = sinking) — easier to read than
      // negative millimetres.
      row[s.id] = point ? Math.abs(point.rateMmPerYear) : null
      row[`${s.id}__lo`] = point ? Math.max(0, Math.abs(point.rateMmPerYear) - point.uncertainty) : null
      row[`${s.id}__hi`] = point ? Math.abs(point.rateMmPerYear) + point.uncertainty : null
      row[`${s.id}__band`] = point
        ? Math.abs(point.rateMmPerYear) + point.uncertainty - Math.max(0, Math.abs(point.rateMmPerYear) - point.uncertainty)
        : null
    })
    return row
  })
}

interface TooltipPayloadItem {
  payload?: Row
  dataKey?: string | number
  value?: number | string
}

function TrendTooltip({
  active,
  payload,
  series,
  unitLabel,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  series: TrendSeries[]
  unitLabel: string
}) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null

  return (
    <div className="rounded-xl border border-hairline bg-void/95 px-3.5 py-3 shadow-2xl backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
        Year {row.year}
      </p>
      <div className="mt-2 space-y-2">
        {series.map((s) => {
          const value = row[s.id]
          if (value === null || value === undefined) return null
          const lo = row[`${s.id}__lo`]
          const hi = row[`${s.id}__hi`]
          return (
            <div key={s.id} className="flex items-baseline justify-between gap-5">
              <span className="flex items-center gap-2 text-[12px] text-white/70">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
              <span className="text-right">
                <span className="font-mono text-[13px] font-semibold text-white">~{value}</span>
                <span className="ml-1 text-[10px] text-white/45">{unitLabel}</span>
                {typeof lo === 'number' && typeof hi === 'number' && (
                  <span className="block font-mono text-[10px] text-white/40">
                    ± {Math.round((hi - lo) / 2)}
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>
      <p className="mt-2.5 border-t border-hairline pt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-sand">
        Demo series — illustrative only
      </p>
    </div>
  )
}

/**
 * Subsidence-rate trend chart. Y axis shows the magnitude of sinking so that
 * "higher" reads intuitively as "sinking faster".
 */
export function TrendChart({
  series,
  height = 300,
  unitLabel = 'mm/yr',
  showBand = true,
  className,
}: {
  series: TrendSeries[]
  height?: number
  unitLabel?: string
  showBand?: boolean
  className?: string
}) {
  const rows = buildRows(series)
  const label = series.map((s) => `${s.label} subsidence rate over time`).join(' and ')

  return (
    <div className={cn('w-full', className)} style={{ height }} role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rows} margin={{ top: 12, right: 16, bottom: 8, left: 4 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.id} id={`band-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.12} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="#1d3157" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#7b8db0', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={{ stroke: '#1d3157' }}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            tick={{ fill: '#7b8db0', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            width={44}
            label={{
              value: 'Sinking rate (mm/yr)',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#5b6b86', fontSize: 10, fontFamily: 'JetBrains Mono' },
            }}
          />
          <Tooltip
            content={<TrendTooltip series={series} unitLabel={unitLabel} />}
            cursor={{ stroke: '#38d6ff', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <ReferenceLine y={0} stroke="#1d3157" />
          {showBand &&
            series.map((s) => (
              <Area
                key={`${s.id}-lo`}
                type="monotone"
                dataKey={`${s.id}__lo`}
                stackId={`${s.id}-band`}
                stroke="none"
                fill="transparent"
                isAnimationActive={false}
                connectNulls
              />
            ))}
          {showBand &&
            series.map((s) => (
              <Area
                key={`${s.id}-band`}
                type="monotone"
                dataKey={`${s.id}__band`}
                stackId={`${s.id}-band`}
                stroke="none"
                fill={`url(#band-${s.id})`}
                isAnimationActive={false}
                connectNulls
              />
            ))}
          {series.map((s) => (
            <Line
              key={s.id}
              type="monotone"
              dataKey={s.id}
              stroke={s.color}
              strokeWidth={2.5}
              dot={{ r: 2.5, fill: '#070c1a', stroke: s.color, strokeWidth: 2 }}
              activeDot={{ r: 5, fill: s.color, stroke: '#04060d', strokeWidth: 2 }}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
