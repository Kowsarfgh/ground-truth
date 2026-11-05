import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import type { CauseFactor } from '@/data/types'

interface TooltipItem {
  payload?: { title: string; demoShare: number; short: string }
}

function CauseTooltip({ active, payload }: { active?: boolean; payload?: TooltipItem[] }) {
  if (!active || !payload?.length) return null
  const item = payload[0]?.payload
  if (!item) return null
  return (
    <div className="max-w-xs rounded-xl border border-hairline bg-void/95 px-3.5 py-3 shadow-2xl backdrop-blur">
      <p className="text-[13px] font-semibold text-white">{item.title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-white/60">{item.short}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-sand">
        Illustrative weighting — {item.demoShare}%
      </p>
    </div>
  )
}

/**
 * Horizontal breakdown of contributing mechanisms. Values are demonstration
 * weights, not measured attributions.
 */
export function CauseBreakdown({ causes, height = 260 }: { causes: CauseFactor[]; height?: number }) {
  const data = causes.map((c) => ({ ...c, name: c.title }))

  return (
    <div className="w-full px-2 py-4" style={{ height }} role="img" aria-label="Illustrative weighting of subsidence causes">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 34, bottom: 4, left: 8 }}>
          <XAxis type="number" hide domain={[0, 45]} />
          <YAxis
            type="category"
            dataKey="name"
            width={0}
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CauseTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="demoShare" radius={[0, 8, 8, 0]} barSize={18} isAnimationActive={false}>
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.accent} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
