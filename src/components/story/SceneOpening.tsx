import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { CitySkyline } from './CitySkyline'

const STRATA = [
  { label: 'Topsoil', colour: '#54452e', height: 26 },
  { label: 'Compressible aquitard', colour: '#2f3d52', height: 22 },
  { label: 'Aquifer — sand and gravel', colour: '#6b5836', height: 30 },
  { label: 'Bedrock', colour: '#0a1020', height: 18 },
]

/** The last few metres of the hero: the first hint of the world below. */
function GroundTease() {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 px-1 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Below the surface
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <div className="overflow-hidden rounded-t-xl border-x border-t border-hairline">
        {STRATA.map((layer) => (
          <div
            key={layer.label}
            className="relative flex items-center justify-end"
            style={{ height: layer.height, background: layer.colour }}
          >
            <span className="pr-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
              {layer.label}
            </span>
            {layer.label.startsWith('Aquifer') && (
              <span className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-cyan/25 via-cyan/5 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Scene 1 — the city above a changing ground.
 *
 * The skyline drifts at a different rate from the text and the first layers of
 * the subsurface are already visible at the fold, so the step underground feels
 * continuous rather than abrupt.
 */
export function SceneOpening() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skylineY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const discover = () => {
    document.getElementById('hidden-cause')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="opening"
      ref={ref}
      aria-labelledby="opening-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void pt-16"
    >
      <motion.div style={{ y: skylineY }} className="absolute inset-x-0 -top-6 bottom-0" aria-hidden>
        <CitySkyline variant="aerial" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/60 to-void" aria-hidden />
      <div className="absolute inset-0 grid-overlay opacity-[0.14]" aria-hidden />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="shell relative flex flex-1 flex-col justify-center py-20"
      >
        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/8 px-3.5 py-1.5 backdrop-blur">
          <Play className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
            An interactive story · seven chapters
          </span>
        </span>

        <h1
          id="opening-title"
          className="mt-7 max-w-4xl text-balance font-display text-[2.5rem] font-extrabold leading-[1.03] text-white sm:text-6xl lg:text-[4.25rem]"
        >
          What&rsquo;s Happening Beneath <span className="text-glow text-teal">Tehran</span>?
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-white/70">
          While life continues above the surface, something is changing underground. Beneath Tehran,
          groundwater depletion is contributing to one of the most serious environmental challenges:
          land subsidence.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Button size="lg" onClick={discover}>
            <Play className="h-4.5 w-4.5" />
            Discover the Story
          </Button>
          <span className="inline-flex items-center gap-2 text-white/45">
            <ArrowDown className="h-4 w-4 animate-pulse-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Starts below your feet
            </span>
          </span>
        </div>

        <dl className="mt-12 grid max-w-2xl gap-x-8 gap-y-5 sm:grid-cols-3">
          {[
            { term: 'Mechanism', value: 'Groundwater depletion' },
            { term: 'Measured by', value: 'Radar satellites' },
            { term: 'Read on', value: 'Multiple datasets' },
          ].map((item) => (
            <div key={item.term} className="border-t border-hairline pt-3.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {item.term}
              </dt>
              <dd className="mt-1.5 font-display text-[14.5px] font-semibold text-white/85">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <div className="shell relative pb-0">
        <GroundTease />
      </div>
    </section>
  )
}
