import { cn } from '@/lib/cn'
import { CROSS_SECTION_LABELS } from '@/data/tehranStory'
import { lerp } from '@/lib/useTimeline'

const W = 820
const H = 520

const BEDROCK_TOP = 420
const TOP_SOIL_H = 44

/** Building footprints sitting on the moving surface. */
const BUILDINGS: { x: number; w: number; h: number; tiltDir: 1 | -1 }[] = [
  { x: 62, w: 46, h: 40, tiltDir: -1 },
  { x: 122, w: 34, h: 62, tiltDir: 1 },
  { x: 170, w: 52, h: 34, tiltDir: -1 },
  { x: 300, w: 40, h: 54, tiltDir: 1 },
  { x: 352, w: 58, h: 38, tiltDir: -1 },
  { x: 470, w: 36, h: 66, tiltDir: 1 },
  { x: 520, w: 50, h: 42, tiltDir: -1 },
  { x: 640, w: 44, h: 50, tiltDir: 1 },
  { x: 700, w: 56, h: 36, tiltDir: -1 },
]

const WELL_X = [205, 615]

export interface AquiferCrossSectionProps {
  /** 0 = uncompacted layers, 1 = fully compacted. Drives layer thickness. */
  compaction: number
  /** 0 = high water table, 1 = depleted. Defaults to `compaction`. */
  waterLevel?: number
  showLabels?: boolean
  showBuildings?: boolean
  /** Draws the dashed "original surface" reference line and the drop arrow. */
  showReference?: boolean
  className?: string
  /** Accessible description of the current state. */
  ariaLabel?: string
}

/**
 * Side-view cross-section of the Tehran aquifer system.
 *
 * Everything here is a SCHEMATIC. It is driven by a numeric progress value so
 * the mechanism can be paused and replayed, and it is always presented inside a
 * figure carrying state = "demo".
 */
export function AquiferCrossSection({
  compaction,
  waterLevel,
  showLabels = true,
  showBuildings = true,
  showReference = true,
  className,
  ariaLabel,
}: AquiferCrossSectionProps) {
  const c = Math.max(0, Math.min(1, compaction))
  const w = Math.max(0, Math.min(1, waterLevel ?? compaction))

  const aquiferH = lerp(130, 100, c)
  const aquitardH = lerp(120, 66, c)
  const aquiferTop = BEDROCK_TOP - aquiferH
  const aquitardTop = aquiferTop - aquitardH
  const surfaceY = aquitardTop - TOP_SOIL_H

  // Reference: the surface as it was before depletion.
  const surfaceY0 = BEDROCK_TOP - 130 - 120 - TOP_SOIL_H
  const dropped = surfaceY - surfaceY0

  const waterFrac = lerp(0.3, 0.92, w)
  const waterY = aquiferTop + aquiferH * waterFrac

  // Compaction hatch lines inside the aquitard: constant count, thinning layer.
  const hatch = Array.from({ length: 9 }, (_, i) => aquitardTop + ((i + 1) / 10) * aquitardH)

  const anchors: Record<string, { x: number; y: number; side: 'left' | 'right' }> = {
    extraction: { x: WELL_X[1], y: surfaceY - 26, side: 'right' },
    layers: { x: 300, y: (surfaceY + aquitardTop) / 2, side: 'left' },
    compaction: { x: 700, y: aquitardTop + aquitardH / 2, side: 'right' },
    watertable: { x: 648, y: waterY, side: 'right' },
    aquifer: { x: 300, y: aquiferTop + aquiferH * 0.72, side: 'left' },
    groundwater: { x: 730, y: (waterY + BEDROCK_TOP) / 2, side: 'right' },
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={ariaLabel ?? 'Schematic cross-section of the aquifer beneath Tehran'}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="gt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070c1a" />
          <stop offset="100%" stopColor="#12224a" />
        </linearGradient>
        <linearGradient id="gt-topsoil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6d5a3c" />
          <stop offset="100%" stopColor="#54452e" />
        </linearGradient>
        <linearGradient id="gt-aquitard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f4f66" />
          <stop offset="100%" stopColor="#2f3d52" />
        </linearGradient>
        <linearGradient id="gt-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7248" />
          <stop offset="100%" stopColor="#6b5836" />
        </linearGradient>
        <linearGradient id="gt-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38d6ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="gt-bedrock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151f38" />
          <stop offset="100%" stopColor="#0a1020" />
        </linearGradient>
        <clipPath id="gt-aquifer-clip">
          <rect x="0" y={aquiferTop} width={W} height={aquiferH} />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width={W} height={surfaceY + 2} fill="url(#gt-sky)" />

      {/* Bedrock */}
      <rect x="0" y={BEDROCK_TOP} width={W} height={H - BEDROCK_TOP} fill="url(#gt-bedrock)" />
      <g opacity="0.35">
        {Array.from({ length: 16 }, (_, i) => (
          <line
            key={i}
            x1={i * 56}
            y1={H}
            x2={i * 56 + 40}
            y2={BEDROCK_TOP}
            stroke="#2b3d63"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Aquitard — the layer that compacts */}
      <rect x="0" y={aquitardTop} width={W} height={aquitardH} fill="url(#gt-aquitard)" />
      <g stroke="#8fa8c8" strokeOpacity={lerp(0.14, 0.4, c)} strokeWidth="1">
        {hatch.map((y, i) => (
          <line key={i} x1="0" y1={y} x2={W} y2={y} strokeDasharray="7 9" />
        ))}
      </g>

      {/* Aquifer sand (dewatered above the water table) */}
      <rect x="0" y={aquiferTop} width={W} height={aquiferH} fill="url(#gt-sand)" />
      <g clipPath="url(#gt-aquifer-clip)" opacity="0.5">
        {Array.from({ length: 60 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 137) % W) + 3}
            cy={aquiferTop + 6 + ((i * 53) % Math.max(1, aquiferH - 10))}
            r="1.6"
            fill="#c8b48a"
            opacity="0.5"
          />
        ))}
      </g>

      {/* Saturated zone */}
      <g clipPath="url(#gt-aquifer-clip)">
        <rect x="0" y={waterY} width={W} height={aquiferH} fill="url(#gt-water)" />
      </g>

      {/* Top soil */}
      <rect x="0" y={surfaceY} width={W} height={TOP_SOIL_H} fill="url(#gt-topsoil)" />
      <line x1="0" y1={surfaceY} x2={W} y2={surfaceY} stroke="#a98f5f" strokeWidth="2.5" />

      {/* Water table line */}
      <path
        d={`M0 ${waterY} C 120 ${waterY - 7}, 240 ${waterY + 7}, 360 ${waterY} S 620 ${waterY - 7}, ${W} ${waterY}`}
        fill="none"
        stroke="#7fe6ff"
        strokeWidth="2.5"
        strokeOpacity="0.95"
      />

      {/* Original surface reference */}
      {showReference && (
        <g>
          <line
            x1="0"
            y1={surfaceY0}
            x2={W}
            y2={surfaceY0}
            stroke="#f6c667"
            strokeWidth="1.5"
            strokeDasharray="9 7"
            opacity="0.75"
          />
          {dropped > 4 && (
            <g opacity={Math.min(1, dropped / 30)}>
              <line
                x1={W - 34}
                y1={surfaceY0}
                x2={W - 34}
                y2={surfaceY}
                stroke="#f6c667"
                strokeWidth="1.5"
              />
              <path d={`M${W - 40} ${surfaceY0 + 8} L${W - 34} ${surfaceY0} L${W - 28} ${surfaceY0 + 8}`} fill="none" stroke="#f6c667" strokeWidth="1.5" />
              <path d={`M${W - 40} ${surfaceY - 8} L${W - 34} ${surfaceY} L${W - 28} ${surfaceY - 8}`} fill="none" stroke="#f6c667" strokeWidth="1.5" />
            </g>
          )}
        </g>
      )}

      {/* Buildings sit on the surface, so they sink with it */}
      {showBuildings &&
        BUILDINGS.map((b, i) => (
          <g
            key={i}
            transform={`rotate(${b.tiltDir * c * 2.6} ${b.x + b.w / 2} ${surfaceY})`}
            opacity="0.92"
          >
            <rect x={b.x} y={surfaceY - b.h} width={b.w} height={b.h} rx="2.5" fill="#1b2740" stroke="#3d5480" strokeWidth="1" />
            {Array.from({ length: Math.max(1, Math.floor(b.h / 16)) }, (_, r) => (
              <rect
                key={r}
                x={b.x + 6}
                y={surfaceY - b.h + 7 + r * 16}
                width={Math.max(6, b.w - 12)}
                height="5"
                rx="1"
                fill="#38d6ff"
                opacity="0.28"
              />
            ))}
          </g>
        ))}

      {/* Wells */}
      {WELL_X.map((x, i) => {
        const casingTop = surfaceY - 34
        const casingBottom = Math.max(waterY + 26, aquiferTop + 26)
        return (
          <g key={i}>
            <rect x={x - 5} y={casingTop} width="10" height={casingBottom - casingTop} rx="2" fill="#0b1224" stroke="#5f7ba6" strokeWidth="1.4" />
            {/* rising water inside the casing */}
            <rect
              x={x - 2.5}
              y={waterY}
              width="5"
              height={Math.max(0, casingBottom - waterY - 2)}
              rx="1.5"
              fill="#38d6ff"
              opacity="0.75"
            />
            {/* pump head */}
            <rect x={x - 15} y={casingTop - 12} width="30" height="12" rx="2.5" fill="#24365a" stroke="#5f7ba6" strokeWidth="1.2" />
            <circle cx={x} cy={casingTop - 6} r="2.6" fill="#14e0c0" opacity={0.35 + w * 0.6} />
          </g>
        )
      })}

      {/* Compaction arrows inside the aquitard */}
      {c > 0.05 &&
        [340, 430, 520, 610].map((x, i) => (
          <g key={i} opacity={Math.min(0.85, c)} transform={`translate(${x} ${aquitardTop + 12})`}>
            <line x1="0" y1="0" x2="0" y2={Math.max(6, aquitardH - 30)} stroke="#ff9f8f" strokeWidth="2" />
            <path d={`M-5 ${Math.max(6, aquitardH - 30) - 7} L0 ${Math.max(6, aquitardH - 30)} L5 ${Math.max(6, aquitardH - 30) - 7}`} fill="none" stroke="#ff9f8f" strokeWidth="2" />
          </g>
        ))}

      {/* Labels — hidden on very small screens where the type would be unreadable */}
      {showLabels && (
        <g className="hidden md:inline">
          {CROSS_SECTION_LABELS.map((label) => {
            const a = anchors[label.id]
            if (!a) return null
            const isRight = a.side === 'right'
            const textX = isRight ? a.x + 26 : a.x - 26
            const width = label.text.length * 7.1 + 14
            const boxX = isRight ? textX - 6 : textX - width + 6
            return (
              <g key={label.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={isRight ? textX - 6 : textX + 6}
                  y2={a.y}
                  stroke="#8fa8c8"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <circle cx={a.x} cy={a.y} r="3.2" fill="#38d6ff" stroke="#04060d" strokeWidth="1.4" />
                <rect x={boxX} y={a.y - 11} width={width} height="21" rx="6" fill="#04060d" fillOpacity="0.78" />
                <text
                  x={textX}
                  y={a.y + 4}
                  textAnchor={isRight ? 'start' : 'end'}
                  fontSize="12.5"
                  fill="#dbe7f7"
                  fontFamily="var(--font-sans)"
                >
                  {label.text}
                </text>
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}
