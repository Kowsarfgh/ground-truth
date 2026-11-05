import { useState } from 'react'

import { cn } from '@/lib/cn'
import { COMPARE_PAIRS } from '@/data/imagery'
import { BeforeAfterSlider } from '@/components/map/BeforeAfterSlider'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function BeforeAfterSection() {
  const [activeId, setActiveId] = useState(COMPARE_PAIRS[0].id)
  const active = COMPARE_PAIRS.find((p) => p.id === activeId) ?? COMPARE_PAIRS[0]

  return (
    <section id="before-after" className="border-t border-line bg-cloud py-20 sm:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Before / after"
          title="Drag the divider to compare two moments in time"
          description="Move the vertical handle to sweep between an earlier and a later view of the same ground. Read the acquisition dates and sources below each panel before drawing any conclusion."
        />

        <div className="mt-8 flex flex-wrap gap-2.5">
          {COMPARE_PAIRS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => setActiveId(pair.id)}
              aria-pressed={pair.id === activeId}
              className={cn(
                'rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300',
                pair.id === activeId
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-cloud text-slate-ink hover:border-cyan-deep/40 hover:text-cyan-deep',
              )}
            >
              {pair.region.split(',')[0]}
            </button>
          ))}
        </div>

        <Reveal className="mt-6">
          <BeforeAfterSlider pair={active} />
        </Reveal>
      </div>
    </section>
  )
}
