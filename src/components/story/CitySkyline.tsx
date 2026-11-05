import { useMemo } from 'react'

import { cn } from '@/lib/cn'

const W = 1200
const H = 620
const HORIZON = 300

/** Tiny deterministic PRNG so the skyline is stable between renders. */
function mulberry(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface CitySkylineProps {
  /** 'aerial' for the opening scene, 'surface' for the consequences scene. */
  variant?: 'aerial' | 'surface'
  /** 0 → 1: fades in the visible damage cues (cracks, stepped kerbs). */
  damage?: number
  className?: string
  ariaLabel?: string
}

/**
 * Decorative illustration of Tehran: the Alborz ridge to the north, dense
 * urban blocks, irrigation plots at the plain edge.
 *
 * This is a drawing, not an image of Tehran. Every figure that uses it is
 * framed as an illustration.
 */
export function CitySkyline({
  variant = 'aerial',
  damage = 0,
  className,
  ariaLabel = 'Illustration of the Tehran skyline with the Alborz mountains behind it',
}: CitySkylineProps) {
  const d = Math.max(0, Math.min(1, damage))

  const { far, near, towers, plots, roads } = useMemo(() => {
    const rand = mulberry(variant === 'aerial' ? 20240614 : 19900101)

    const ridge = (baseY: number, amp: number, step: number, seed: number) => {
      const r = mulberry(seed)
      const pts: string[] = [`M0 ${baseY}`]
      for (let x = 0; x <= W; x += step) {
        pts.push(`L${x} ${baseY - amp * (0.45 + r() * 0.55)}`)
      }
      pts.push(`L${W} ${baseY} Z`)
      return pts.join(' ')
    }

    const towerList = Array.from({ length: 74 }, () => {
      const x = rand() * W
      const depth = 0.35 + rand() * 0.65
      const w = 16 + rand() * 26
      const h = 26 + rand() * 96 * depth
      return { x, w, h, depth, lit: rand() > 0.45 }
    }).sort((a, b) => a.depth - b.depth)

    const plotList = Array.from({ length: 11 }, () => {
      const x = rand() * W
      const y = HORIZON + 40 + rand() * 250
      const s = 40 + rand() * 70
      return { x, y, s }
    })

    const roadList = Array.from({ length: 7 }, (_, i) => {
      const x = (i / 6) * W
      return { from: { x, y: H }, to: { x: W / 2 + (x - W / 2) * 0.24, y: HORIZON + 8 } }
    })

    return {
      far: ridge(HORIZON + 6, 118, 90, 991),
      near: ridge(HORIZON + 14, 74, 62, 4242),
      towers: towerList,
      plots: plotList,
      roads: roadList,
    }
  }, [variant])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="gt-city-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060d" />
          <stop offset="55%" stopColor="#0b1730" />
          <stop offset="100%" stopColor="#17315c" />
        </linearGradient>
        <linearGradient id="gt-ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b4f79" />
          <stop offset="100%" stopColor="#22355c" />
        </linearGradient>
        <linearGradient id="gt-ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25395f" />
          <stop offset="100%" stopColor="#16233d" />
        </linearGradient>
        <linearGradient id="gt-plain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2740" />
          <stop offset="100%" stopColor="#101a2e" />
        </linearGradient>
        <radialGradient id="gt-horizon-glow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#14e0c0" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#14e0c0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#gt-city-sky)" />

      {/* Stars */}
      <g opacity="0.5">
        {Array.from({ length: 46 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 271) % W) + 11}
            cy={((i * 97) % (HORIZON - 60)) + 12}
            r={i % 5 === 0 ? 1.5 : 1}
            fill="#cfe4ff"
          />
        ))}
      </g>

      {/* Horizon glow */}
      <rect x="0" y={HORIZON - 200} width={W} height="210" fill="url(#gt-horizon-glow)" />

      {/* Alborz ridges */}
      <path d={far} fill="url(#gt-ridge-far)" opacity="0.95" />
      <g opacity="0.85">
        {[190, 420, 690, 900, 1050].map((x, i) => (
          <path
            key={i}
            d={`M${x} ${HORIZON + 6} l26 ${-72 - (i % 3) * 18} l26 ${72 + (i % 3) * 18} Z`}
            fill="#dce9fb"
            opacity="0.35"
          />
        ))}
      </g>
      <path d={near} fill="url(#gt-ridge-near)" />

      {/* The plain */}
      <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill="url(#gt-plain)" />

      {/* Irrigated plots at the plain edge */}
      <g>
        {plots.map((p, i) => (
          <g key={i} opacity="0.5">
            <rect x={p.x} y={p.y} width={p.s} height={p.s * 0.62} rx="4" fill="#1c4a44" stroke="#2f7f6f" strokeWidth="1" />
            <rect
              x={p.x + 4}
              y={p.y + 3}
              width={(p.s - 8) * 0.45}
              height={(p.s * 0.62 - 6) * 0.5}
              rx="2"
              fill="#f6c667"
              opacity="0.16"
            />
          </g>
        ))}
      </g>

      {/* Roads converging toward the horizon */}
      <g stroke="#31456f" strokeWidth="3" opacity="0.42" strokeLinecap="round">
        {roads.map((r, i) => (
          <line key={i} x1={r.from.x} y1={r.from.y} x2={r.to.x} y2={r.to.y} />
        ))}
        <line x1="0" y1={H * 0.72} x2={W} y2={H * 0.66} strokeWidth="4" opacity="0.5" />
      </g>

      {/* Urban blocks, far → near */}
      <g>
        {towers.map((t, i) => {
          const baseY = HORIZON + 26 + t.depth * 250
          const top = baseY - t.h
          const face = t.depth < 0.5 ? '#16233d' : '#1d2f52'
          const side = t.depth < 0.5 ? '#101a30' : '#152644'
          return (
            <g key={i}>
              <path
                d={`M${t.x} ${baseY} L${t.x + t.w} ${baseY} L${t.x + t.w + 8} ${baseY - 9} L${t.x + 8} ${baseY - 9} Z`}
                fill={side}
              />
              <rect x={t.x + 8} y={top} width={t.w} height={t.h + 9} fill={face} rx="2" />
              <rect
                x={t.x + 8}
                y={top}
                width={t.w}
                height="3"
                fill={t.lit ? '#38d6ff' : '#2b3f6b'}
                opacity={t.lit ? 0.7 : 0.5}
              />
              {t.lit && (
                <rect
                  x={t.x + 12}
                  y={top + 12}
                  width="4"
                  height="3"
                  fill="#f6c667"
                  opacity="0.55"
                />
              )}
            </g>
          )
        })}
      </g>

      {/* Visible damage cues (consequences scene) */}
      {d > 0 && (
        <g opacity={d}>
          <path
            d={`M0 ${H - 96} L170 ${H - 118} L300 ${H - 92} L470 ${H - 124} L620 ${H - 96} L790 ${H - 126} L960 ${H - 98} L${W} ${H - 120}`}
            fill="none"
            stroke="#04060d"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d={`M0 ${H - 96} L170 ${H - 118} L300 ${H - 92} L470 ${H - 124} L620 ${H - 96} L790 ${H - 126} L960 ${H - 98} L${W} ${H - 120}`}
            fill="none"
            stroke="#ff7a6b"
            strokeWidth="1.6"
            opacity="0.7"
            strokeDasharray="10 8"
          />
          {[300, 620, 960].map((x, i) => (
            <path
              key={i}
              d={`M${x} ${H - 100} l-14 -46 l22 -30 l-10 -40`}
              fill="none"
              stroke="#ff7a6b"
              strokeWidth="2"
              opacity="0.55"
            />
          ))}
        </g>
      )}
    </svg>
  )
}
