import {
  CircleSlash,
  Cpu,
  FlaskConical,
  LoaderCircle,
  ShieldCheck,
  TriangleExclamationPoint,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import type { DataState } from '@/data/types'

interface StateConfig {
  label: string
  description: string
  icon: ReactNode
  /** Badge classes for dark surfaces. */
  dark: string
  /** Badge classes for light surfaces. */
  light: string
}

const ICON = 'h-3.5 w-3.5'

export const DATA_STATE_CONFIG: Record<DataState, StateConfig> = {
  verified: {
    label: 'Verified reference',
    description: 'Drawn from published observations and clearly attributed.',
    icon: <ShieldCheck className={ICON} />,
    dark: 'border-teal/40 bg-teal/12 text-teal',
    light: 'border-teal-deep/30 bg-teal-deep/10 text-teal-deep',
  },
  demo: {
    label: 'Demo data',
    description: 'Illustrative placeholder values — not verified measurements.',
    icon: <FlaskConical className={ICON} />,
    dark: 'border-sand/40 bg-sand/12 text-sand',
    light: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
  },
  loading: {
    label: 'Loading data',
    description: 'Requesting observations — please wait.',
    icon: <LoaderCircle className={cn(ICON, 'animate-spin')} />,
    dark: 'border-cyan/40 bg-cyan/12 text-cyan',
    light: 'border-cyan-deep/30 bg-cyan-deep/10 text-cyan-deep',
  },
  processing: {
    label: 'Processing',
    description: 'Raw observations are being converted into a usable product.',
    icon: <Cpu className={ICON} />,
    dark: 'border-violet/40 bg-violet/12 text-violet',
    light: 'border-violet-deep/30 bg-violet-deep/10 text-violet-deep',
  },
  unavailable: {
    label: 'No suitable data available',
    description:
      'No acquisition matches this place and date. Missing data never means the ground is stable.',
    icon: <CircleSlash className={ICON} />,
    dark: 'border-white/25 bg-white/8 text-white/75',
    light: 'border-slate-400/40 bg-slate-500/10 text-slate-600',
  },
  error: {
    label: 'Error loading data',
    description: 'The retrieval or processing step failed. Values shown are not valid.',
    icon: <TriangleExclamationPoint className={ICON} />,
    dark: 'border-coral/45 bg-coral/12 text-coral',
    light: 'border-rose-500/30 bg-rose-500/10 text-rose-600',
  },
}

export function DataStateBadge({
  state,
  tone = 'light',
  className,
}: {
  state: DataState
  tone?: 'light' | 'dark'
  className?: string
}) {
  const config = DATA_STATE_CONFIG[state]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]',
        tone === 'dark' ? config.dark : config.light,
        className,
      )}
      title={config.description}
    >
      {config.icon}
      {config.label}
    </span>
  )
}

/**
 * Full-width explanatory strip for a state. Used where the user might
 * otherwise misread an empty visualisation as "nothing is happening here".
 */
export function DataStateNotice({
  state,
  tone = 'light',
  message,
  className,
}: {
  state: DataState
  tone?: 'light' | 'dark'
  message?: string
  className?: string
}) {
  const config = DATA_STATE_CONFIG[state]
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border p-3.5',
        tone === 'dark' ? config.dark : config.light,
        className,
      )}
      role="status"
    >
      <span className="mt-0.5 shrink-0">{config.icon}</span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
          {config.label}
        </p>
        <p
          className={cn(
            'mt-1 text-[13px] leading-relaxed',
            tone === 'dark' ? 'text-white/70' : 'text-slate-ink/80',
          )}
        >
          {message ?? config.description}
        </p>
      </div>
    </div>
  )
}
