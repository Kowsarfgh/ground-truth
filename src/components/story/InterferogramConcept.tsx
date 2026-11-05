import { cn } from '@/lib/cn'

const W = 820
const H = 420

const SITE = { x: 168, y: 302 }
const PASS_Y = 86
const PASS_X = [58, 278]

const FRINGE_CENTER = { x: 598, y: 236 }
const FRINGE_COLOURS = ['#38d6ff', '#14e0c0', '#9b8cff', '#f6c667']

/** Builds one closed, slightly irregular "fringe" ring around the centre. */
function fringePath(radius: number, wobble: number) {
  const points: string[] = []
  for (let step = 0; step <= 48; step += 1) {
    const angle = (step / 48) * Math.PI * 2
    const r = radius * (1 + wobble * Math.sin(3 * angle + radius * 0.05))
    const x = FRINGE_CENTER.x + Math.cos(angle) * r
    const y = FRINGE_CENTER.y + Math.sin(angle) * r * 0.78
    points.push(`${step === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return `${points.join(' ')} Z`
}

/**
 * Teaching diagram for repeat-pass interferometry: two acquisitions separated
 * in time, and the fringe pattern their phase difference produces.
 *
 * It is a schematic. One coloured band is not one centimetre, and this is not
 * an interferogram from any mission.
 */
export function InterferogramConcept({
  className,
  ariaLabel = 'Diagram of two radar acquisitions over the same site and the resulting phase fringe pattern',
}: {
  className?: string
  ariaLabel?: string
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="gt-igi-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#070c1a" />
          <stop offset="100%" stopColor="#0b1730" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#gt-igi-bg)" />

      {/* ---------------- Left: two passes over one site ---------------- */}
      <text x="30" y="34" fontSize="12" fontFamily="var(--font-mono)" fill="#8fa8c8">
        TWO PASSES · ONE SITE
      </text>

      <line x1="30" y1={SITE.y} x2="320" y2={SITE.y} stroke="#31456f" strokeWidth="2" />
      <line
        x1="30"
        y1={SITE.y + 16}
        x2="320"
        y2={SITE.y + 16}
        stroke="#f6c667"
        strokeWidth="1.4"
        strokeDasharray="8 6"
        opacity="0.7"
      />
      <line x1={SITE.x} y1={SITE.y} x2={SITE.x} y2={SITE.y + 16} stroke="#f6c667" strokeWidth="1.6" />
      <text x="326" y={SITE.y + 5} fontSize="11" fill="#dbe7f7">
        surface
      </text>
      <text x="326" y={SITE.y + 21} fontSize="11" fill="#f6c667">
        unchanged?
      </text>

      {PASS_X.map((x, i) => {
        const label = i === 0 ? 'Pass 1' : 'Pass 2'
        return (
          <g key={label}>
            <line
              x1={x}
              y1={PASS_Y - 22}
              x2={x}
              y2={PASS_Y + 22}
              stroke="#38d6ff"
              strokeWidth="2"
              strokeOpacity={i === 0 ? 0.9 : 0.55}
            />
            <line x1={x - 16} y1={PASS_Y} x2={x + 16} y2={PASS_Y} stroke="#9b8cff" strokeWidth="2" />
            <rect x={x - 9} y={PASS_Y - 9} width="18" height="18" rx="3" fill="#1b2740" stroke="#9b8cff" strokeWidth="1.2" />
            <line
              x1={x}
              y1={PASS_Y}
              x2={SITE.x}
              y2={SITE.y}
              stroke={i === 0 ? '#14e0c0' : '#f6c667'}
              strokeWidth="1.6"
              strokeDasharray="7 6"
            />
            <text
              x={x}
              y={PASS_Y - 32}
              textAnchor="middle"
              fontSize="11.5"
              fontFamily="var(--font-display)"
              fill={i === 0 ? '#14e0c0' : '#f6c667'}
            >
              {label}
            </text>
            <text x={x} y={PASS_Y - 18} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="#8fa8c8">
              {i === 0 ? 't₁' : 't₂'}
            </text>
          </g>
        )
      })}

      <text x="30" y={SITE.y + 54} fontSize="11.5" fill="#dbe7f7">
        The distance from each pass to the same point is measured.
      </text>
      <text x="30" y={SITE.y + 74} fontSize="11.5" fill="#dbe7f7">
        Any <tspan fill="#14e0c0">change in that distance</tspan> shows up as a phase shift.
      </text>

      {/* Divider */}
      <line x1="352" y1="30" x2="352" y2={H - 30} stroke="#1d3157" strokeDasharray="5 8" />
      <text
        x="352"
        y={H - 12}
        textAnchor="middle"
        fontSize="10.5"
        fontFamily="var(--font-mono)"
        fill="#8fa8c8"
      >
        phase difference
      </text>

      {/* ---------------- Right: the fringe pattern ---------------- */}
      <text x="380" y="34" fontSize="12" fontFamily="var(--font-mono)" fill="#8fa8c8">
        INTERFEROGRAM (CONCEPT)
      </text>

      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={fringePath(24 + i * 21, 0.05)}
            fill="none"
            stroke={FRINGE_COLOURS[i % FRINGE_COLOURS.length]}
            strokeWidth={i % 2 === 0 ? 9 : 3}
            strokeOpacity={0.85 - i * 0.045}
            strokeLinejoin="round"
          />
        ))}
        <circle cx={FRINGE_CENTER.x} cy={FRINGE_CENTER.y} r="4" fill="#04060d" stroke="#ffffff" strokeWidth="1.5" />
      </g>

      <text x="380" y={H - 46} fontSize="11" fill="#8fa8c8">
        Each full colour cycle = one phase cycle.
      </text>
      <text x="380" y={H - 28} fontSize="11" fill="#8fa8c8">
        Tightly packed fringes = a steeper change across the ground.
      </text>
    </svg>
  )
}
