import { EVIDENCE_CATEGORIES, WHY_SINKING, citationList } from '@/data/tehranStory'
import { DataStateBadge } from '@/components/ui/DataState'
import { SceneCallout, SceneHeader, SceneSection } from './SceneShell'
import { storyIcon } from './storyIcons'

/**
 * Scene 6 — the evidence dashboard.
 *
 * Three families of evidence are laid out separately, and every causal claim
 * carries the study it comes from. None of the claims is derived from satellite
 * imagery on its own.
 */
export function SceneEvidence() {
  return (
    <SceneSection id="evidence" tone="space">
      <SceneHeader
        id="evidence"
        index={6}
        total={7}
        eyebrow="What the evidence tells us"
        title="Three kinds of evidence, one question"
        lead="Radar tells us where and how fast the ground moved. It cannot tell us why on its own. That answer is assembled from groundwater records, the geology below, and what people are doing on the surface."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {EVIDENCE_CATEGORIES.map((category) => {
          const Icon = storyIcon(category.icon)
          return (
            <article
              key={category.id}
              className="flex flex-col rounded-2xl border border-hairline bg-panel/35 p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${category.accent}1f`,
                    color: category.accent,
                    boxShadow: `inset 0 0 0 1px ${category.accent}59`,
                  }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-bold text-white">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-white/40">
                      {category.code} ·{' '}
                    </span>
                    {category.title}
                  </p>
                  <p className="text-[12px] text-white/50">{category.tagline}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-4">
                {category.items.map((item) => (
                  <li key={item.label} className="border-t border-hairline pt-4">
                    <DataStateBadge state={item.state} tone="dark" />
                    <p className="mt-2.5 text-[13.5px] font-medium leading-snug text-white/85">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      <div className="mt-14">
        <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
          Why Is Tehran Sinking?
        </h3>
        <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-white/60">
          Each statement below is a finding from a published study, followed by the study it comes
          from. Where a number is quoted, it is quoted — not re-derived from a picture.
        </p>

        <ol className="mt-7 space-y-4">
          {WHY_SINKING.map((claim, index) => (
            <li
              key={claim.claim}
              className="rounded-2xl border border-hairline bg-panel/35 p-5 sm:p-6"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="font-display text-2xl font-extrabold leading-none text-white/20 sm:text-3xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-balance font-display text-[16.5px] font-bold leading-snug text-white">
                    {claim.claim}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/65">
                    {claim.evidence}
                  </p>

                  <ul className="mt-4 space-y-4 border-t border-hairline pt-4">
                    {citationList(claim.citationIds).map((citation) => (
                      <li key={citation.id} className="text-[12.5px] leading-relaxed">
                        <p className="font-display text-[13px] font-semibold text-white/85">
                          {citation.title}
                        </p>
                        <p className="mt-1 text-white/55">
                          {citation.authors} · {citation.institution}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                          {citation.date}
                        </p>
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-block break-all font-mono text-[10px] text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
                        >
                          {citation.label} — {citation.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <SceneCallout title="Satellite imagery alone cannot settle the cause" className="mt-8" tone="honest">
        A radar time series can show that the ground moved and how fast. Attributing that movement to
        groundwater extraction requires independent evidence of the water level falling, of
        compressible layers below, and of how much water was taken. Where any of those is missing,
        the honest answer is that the cause is unresolved — not that the satellite proved it.
      </SceneCallout>
    </SceneSection>
  )
}
