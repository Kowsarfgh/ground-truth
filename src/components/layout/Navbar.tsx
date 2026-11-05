import { Globe, Menu, Satellite, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { NAV_LINKS } from '@/data/nav'
import { LinkButton } from '@/components/ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-hairline bg-void/90 backdrop-blur-xl'
          : 'border-transparent bg-void/70 backdrop-blur-md',
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="GROUND TRUTH — home">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal/25 to-violet/25 ring-1 ring-inset ring-white/15">
            <Globe className="h-4.5 w-4.5 text-teal transition-transform duration-500 group-hover:rotate-12" />
            <Satellite className="absolute -right-1 -top-1 h-3 w-3 text-cyan" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-extrabold tracking-[0.18em] text-white">
              GROUND
              <span className="text-teal"> TRUTH</span>
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
              Earth observation
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200',
                    isActive ? 'text-white' : 'text-white/60 hover:text-white',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-teal to-cyan transition-opacity duration-300',
                        isActive ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LinkButton to="/explore" size="sm" className="px-4">
            Explore the Data
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline bg-void/97 backdrop-blur-xl lg:hidden">
          <ul className="shell flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors',
                      isActive ? 'bg-white/8 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-3 px-3 pb-2">
              <LinkButton to="/explore" className="w-full">
                Explore the Data
              </LinkButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
