import { Pause, Play, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { TimelineControls } from '@/lib/useTimeline'

const ICON_BUTTON =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white/5 text-white/80 transition-colors hover:border-cyan/40 hover:text-cyan'

/**
 * Playback control for one animated chapter: pause / resume, replay, and a
 * scrub bar so the reader can step through the mechanism at their own pace.
 */
export function TimelineBar({
  timeline,
  label,
  hint,
  className,
}: {
  timeline: TimelineControls
  /** What is being animated, e.g. "Water-table decline". */
  label: string
  hint?: string
  className?: string
}) {
  const percent = Math.round(timeline.progress * 100)

  return (
    <div
      className={cn(
        'rounded-xl border border-hairline bg-panel/40 px-3.5 py-3',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={timeline.toggle}
          aria-label={timeline.playing ? `Pause ${label}` : `Play ${label}`}
          className={ICON_BUTTON}
        >
          {timeline.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={timeline.replay}
          aria-label={`Replay ${label} from the beginning`}
          className={ICON_BUTTON}
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={timeline.progress}
          onChange={(event) => {
            timeline.pause()
            timeline.seek(Number(event.target.value))
          }}
          aria-label={`${label} — scrub position`}
          aria-valuetext={`${percent} percent`}
          className="h-4 w-full min-w-0 flex-1 cursor-pointer accent-teal"
        />

        <span className="w-24 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          {label} · {percent}%
        </span>
      </div>
      {hint && <p className="mt-2 pl-1 text-[11.5px] leading-relaxed text-white/40">{hint}</p>}
    </div>
  )
}
