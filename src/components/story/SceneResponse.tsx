import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Compass } from 'lucide-react'

import { MITIGATION } from '@/data/tehranStory'
import { LinkButton } from '@/components/ui/Button'
import { CitySkyline } from './CitySkyline'
import { SceneHeader } from './SceneShell'
import { storyIcon } from './storyIcons'

/**
 * Scene 7 — what can be done.
 *
 * The story comes back above ground, into daylight, and ends on the two paths
 * a reader can take next.
 */
export function SceneResponse() {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const skylineY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="what-we-can-do"
      ref={ref}
      aria-labelledby="what-we-can-do-title"
      className="relative isolate scroll-mt-28 overflow-hidden border-t border-hairline bg-void py-16 sm:py-20"
    >
      <motion.div style={{ y: skylineY }} className="absolute inset-0" aria-hidden>
        <CitySkyline
          variant="aerial"
          ariaLabel="Illustration of the Tehran skyline with the Alborz mountains behind it"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/88 to-void" aria-hidden />

      <div className="shell relative">
        <SceneHeader
          id="what-we-can-do"
          index={7}
          total={7}
          eyebrow="What can we do"
          title="Understanding the Ground Is the First Step Toward Protecting Our Future."
          lead="Subsidence is slow, but it is not unstoppable. The same measurements that reveal the problem are the ones that show whether an intervention is working."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MITIGATION.map((item) => {
            const Icon = storyIcon(item.icon)
            return (
              <li
                key={item.id}
                className="rounded-2xl border border-hairline bg-panel/40 p-5 transition-colors duration-300 hover:border-teal/35"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/12 text-teal ring-1 ring-inset ring-teal/30">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <p className="mt-4 font-display text-[15px] font-bold text-white">{item.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{item.detail}</p>
              </li>
            )
          })}
        </ul>

        <div className="mt-12 rounded-2xl border border-teal/25 bg-teal/8 p-6 sm:p-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-teal">
            The takeaway
          </p>
          <p className="mt-4 max-w-3xl text-pretty text-[17px] leading-relaxed text-white/85 sm:text-[18px]">
            Satellite observations help us understand how our planet changes. Scientific evidence
            helps us understand why. Better decisions can help reduce future risks.
          </p>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <LinkButton to="/explore" size="lg">
              <Compass className="h-4.5 w-4.5" />
              Explore Tehran&rsquo;s Data
            </LinkButton>
            <LinkButton to="/compare" size="lg" variant="secondary">
              Compare Tehran with Tokyo
              <ArrowRight className="h-4.5 w-4.5" />
            </LinkButton>
          </div>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          Every figure in this story carries a data-source panel · every claim carries a citation
        </p>
      </div>
    </section>
  )
}
