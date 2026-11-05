import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { DEFORMATION_PROFILE } from '@/data/tehranStory'

interface ProfileTooltipProps {
  active?: boolean
  label?: number
  payload?: { value?: number }[]
}

function ProfileTooltip({ active, label, payload }: ProfileTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-hairline bg-void/95 px-3.5 py-2.5 shadow-2xl backdrop-blur">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
        {label} km from the plain edge
      </p>
      <p className="mt-1 text-[13px] font-semibold text-white">
        {payload[0]?.value} mm/yr
        <span className="ml-2 font-normal text-white/45">Illustrative</span>
      </p>
    </div>
  )
}

/**
 * Illustrative cross-profile of the deformation pattern reported for the
 * Tehran plain. The shape follows the published description; the curve itself
 * is a schematic and is labelled as such wherever it appears.
 */
export function DeformationProfileChart({ height = 280 }: { height?: number }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DEFORMATION_PROFILE} margin={{ top: 14, right: 20, bottom: 6, left: -4 }}>
          <defs>
            <linearGradient id="gt-profile-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38d6ff" stopOpacity={0.06} />
              <stop offset="100%" stopColor="#38d6ff" stopOpacity={0.45} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1d3157" strokeDasharray="4 6" vertical={false} />
          <XAxis
            dataKey="distanceKm"
            stroke="#31456f"
            tick={{ fill: '#8fa8c8', fontSize: 11 }}
            tickFormatter={(value: number) => `${value}`}
            label={{
              value: 'Distance across the plain (km)',
              position: 'insideBottom',
              offset: -2,
              fill: '#8fa8c8',
              fontSize: 11,
            }}
          />
          <YAxis
            domain={[-240, 20]}
            stroke="#31456f"
            tick={{ fill: '#8fa8c8', fontSize: 11 }}
            label={{
              value: 'mm / yr',
              angle: -90,
              position: 'insideLeft',
              offset: 18,
              fill: '#8fa8c8',
              fontSize: 11,
            }}
          />
          <Tooltip content={<ProfileTooltip />} cursor={{ stroke: '#1d3157' }} />
          <ReferenceLine y={0} stroke="#5b6b86" />
          <Area
            type="monotone"
            dataKey="mmPerYear"
            stroke="#14e0c0"
            strokeWidth={2.2}
            fill="url(#gt-profile-fill)"
            dot={{ r: 2.5, fill: '#14e0c0', strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
