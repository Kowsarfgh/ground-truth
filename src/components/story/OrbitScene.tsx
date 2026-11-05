import { cn } from '@/lib/cn'
import { lerp } from '@/lib/useTimeline'

const W = 1000
const H = 620

/** Centre and radius of the Earth disc; only its upper limb is visible. */
const EARTH_CX = 500
const EARTH_CY = 1250
const EARTH_R = 800

/** The observed site, sitting just inside the visible limb. */
const SITE = { x: 620, y: 459 }

export interface OrbitSceneProps {
  /** 0 → 1: the satellite traverses its orbit and the radar beam opens up. */
  progress: number
  className?: string
  ariaLabel?: string
}

/**
 * Concept illustration of a radar satellite observing the ground.
 *
 * This is a diagram of the observation geometry — not an acquisition, not a
 * NISAR product, and not a picture of Tehran from orbit.
 */
export function OrbitScene({
  progress,
  className,
  ariaLabel = 'Illustration of a radar satellite in orbit transmitting a radar beam toward a ground station',
}: OrbitSceneProps) {
  const p = Math.max(0, Math.min(1, progress))

  const sat = { x: lerp(130, 782, p), y: lerp(72, 214, p) }
  const beamOpen = Math.min(1, p / 0.35)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="gt-orbit-space" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04060d" />
          <stop offset="60%" stopColor="#070c1a" />
          <stop offset="100%" stopColor="#0b1730" />
        </linearGradient>
        <linearGradient id="gt-orbit-earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="45%" stopColor="#12466b" />
          <stop offset="100%" stopColor="#081426" />
        </linearGradient>
        <linearGradient id="gt-orbit-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38d6ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#38d6ff" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="gt-orbit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14e0c0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#14e0c0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="gt-orbit-earth-clip">
          <circle cx={EARTH_CX} cy={EARTH_CY} r={EARTH_R} />
        </clipPath>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#gt-orbit-space)" />

      {/* Star field */}
      <g opacity="0.6">
        {Array.from({ length: 64 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 293) % W) + 7}
            cy={((i * 131) % 430) + 10}
            r={i % 7 === 0 ? 1.6 : 1}
            fill="#cfe4ff"
          />
        ))}
      </g>

      {/* Earth */}
      <circle cx={EARTH_CX} cy={EARTH_CY} r={EARTH_R} fill="url(#gt-orbit-earth)" />
      <circle
        cx={EARTH_CX}
        cy={EARTH_CY}
        r={EARTH_R}
        fill="none"
        stroke="#38d6ff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      <g clipPath="url(#gt-orbit-earth-clip)" opacity="0.35">
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse
            key={i}
            cx={EARTH_CX}
            cy={EARTH_CY - EARTH_R + 90 + i * 62}
            rx={EARTH_R - 40}
            ry="10"
            fill="none"
            stroke="#7fe6ff"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ))}
      </g>
      {/* Atmosphere halo */}
      <circle
        cx={EARTH_CX}
        cy={EARTH_CY}
        r={EARTH_R + 14}
        fill="none"
        stroke="#14e0c0"
        strokeOpacity="0.2"
        strokeWidth="14"
      />

      {/* Ground track */}
      <path
        d={`M${SITE.x - 240} ${SITE.y + 34} Q ${SITE.x} ${SITE.y - 46} ${SITE.x + 240} ${SITE.y + 26}`}
        fill="none"
        stroke="#f6c667"
        strokeWidth="1.6"
        strokeDasharray="12 10"
        strokeOpacity="0.6"
      />

      {/* The site being observed */}
      <g>
        <g className="animate-pulse-soft">
          <circle cx={SITE.x} cy={SITE.y} r="52" fill="url(#gt-orbit-glow)" />
        </g>
        {[26, 40, 54].map((r, i) => (
          <circle
            key={r}
            cx={SITE.x}
            cy={SITE.y}
            r={r}
            fill="none"
            stroke="#14e0c0"
            strokeWidth="1.4"
            strokeOpacity={0.5 - i * 0.12}
            className="animate-pulse-soft"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
        <circle cx={SITE.x} cy={SITE.y} r="4" fill="#14e0c0" />
      </g>

      {/* Radar beam */}
      <g opacity={beamOpen}>
        <path
          d={`M${sat.x} ${sat.y} L${SITE.x - 74} ${SITE.y} L${SITE.x + 74} ${SITE.y} Z`}
          fill="url(#gt-orbit-beam)"
        />
        <line
          x1={sat.x}
          y1={sat.y}
          x2={SITE.x}
          y2={SITE.y}
          stroke="#7fe6ff"
          strokeWidth="2"
          strokeDasharray="14 12"
          className="animate-beam"
        />
        <line
          x1={sat.x}
          y1={sat.y}
          x2={SITE.x - 56}
          y2={SITE.y}
          stroke="#38d6ff"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <line
          x1={sat.x}
          y1={sat.y}
          x2={SITE.x + 56}
          y2={SITE.y}
          stroke="#38d6ff"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </g>

      {/* Satellite */}
      <g>
        <line
          x1={sat.x}
          y1={sat.y}
          x2={sat.x - 74}
          y2={sat.y + 26}
          stroke="#5f7ba6"
          strokeWidth="1"
          strokeDasharray="5 6"
          strokeOpacity="0.6"
        />
        <line
          x1={sat.x}
          y1={sat.y}
          x2={sat.x + 74}
          y2={sat.y + 26}
          stroke="#5f7ba6"
          strokeWidth="1"
          strokeDasharray="5 6"
          strokeOpacity="0.6"
        />
        {/* solar wings */}
        <rect x={sat.x - 92} y={sat.y - 12} width="48" height="24" rx="3" fill="#16233d" stroke="#38d6ff" strokeWidth="1" />
        <rect x={sat.x + 44} y={sat.y - 12} width="48" height="24" rx="3" fill="#16233d" stroke="#38d6ff" strokeWidth="1" />
        <g stroke="#2b5f86" strokeWidth="0.8">
          {[0, 1, 2, 3].map((i) => (
            <line key={`l${i}`} x1={sat.x - 86 + i * 12} y1={sat.y - 12} x2={sat.x - 86 + i * 12} y2={sat.y + 12} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`r${i}`} x1={sat.x + 50 + i * 12} y1={sat.y - 12} x2={sat.x + 50 + i * 12} y2={sat.y + 12} />
          ))}
        </g>
        {/* body */}
        <rect x={sat.x - 22} y={sat.y - 16} width="44" height="32" rx="4" fill="#1b2740" stroke="#9b8cff" strokeWidth="1.4" />
        <rect x={sat.x - 14} y={sat.y - 7} width="28" height="14" rx="2" fill="#0b1224" stroke="#5f7ba6" strokeWidth="0.8" />
        {/* radar antenna */}
        <path
          d={`M${sat.x} ${sat.y + 16} L${sat.x - 13} ${sat.y + 30} L${sat.x + 13} ${sat.y + 30} Z`}
          fill="#24365a"
          stroke="#38d6ff"
          strokeWidth="1.2"
        />
        <text
          x={sat.x}
          y={sat.y - 26}
          textAnchor="middle"
          fontSize="12.5"
          fontFamily="var(--font-display)"
          fill="#dbe7f7"
        >
          NISAR
        </text>
      </g>

      {/* Caption */}
      <text x="30" y={H - 26} fontSize="12" fontFamily="var(--font-mono)" fill="#8fa8c8" opacity="0.8">
        Observation geometry — schematic, not an acquisition
      </text>
    </svg>
  )
}
