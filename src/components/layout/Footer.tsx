import { Code, Globe, Mail, Rss } from 'lucide-react'
import { Link } from 'react-router-dom'

import { NAV_LINKS } from '@/data/nav'
import { MISSIONS } from '@/data/satellites'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-void">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.18]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
        aria-hidden
      />

      <div className="shell relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal/25 to-violet/25 ring-1 ring-inset ring-white/15">
                <Globe className="h-4.5 w-4.5 text-teal" />
              </span>
              <span className="font-display text-[15px] font-extrabold tracking-[0.18em] text-white">
                GROUND<span className="text-teal"> TRUTH</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
              An educational Earth observation platform for understanding land subsidence through
              satellite evidence, environmental context and human impact.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Globe, Rss, Mail, Code].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white/5 text-white/55 transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-white/65 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
              Missions referenced
            </h4>
            <ul className="mt-4 space-y-2.5">
              {MISSIONS.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-center gap-2 text-[13px] text-white/65">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: m.accent }}
                  />
                  {m.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-hairline bg-panel/40 p-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
              Read before interpreting
            </h4>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/60">
              All map overlays, curves and zone values on this platform are{' '}
              <strong className="font-semibold text-white/85">demonstration data</strong> unless
              explicitly marked as a verified reference. They illustrate how the analysis works —
              they are not measurements to cite.
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/60">
              NISAR is a distinct NASA&nbsp;/&nbsp;ISRO mission. No measurement here is NISAR data,
              and Sentinel-1 imagery is never labelled as NISAR.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GROUND TRUTH · Educational demonstration platform</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
            Not an official NASA product · Not for navigation or engineering use
          </p>
        </div>
      </div>
    </footer>
  )
}
