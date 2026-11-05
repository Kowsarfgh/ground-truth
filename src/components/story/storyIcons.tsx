import {
  Activity,
  Building,
  Droplets,
  Gauge,
  Globe,
  Layers,
  LayoutGrid,
  Mountain,
  Pipette,
  Radar,
  Route,
  Satellite,
  Scale,
  Telescope,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type IconComponent = ComponentType<{ className?: string }>

/** Maps the `icon` string carried on the story data records to a real glyph. */
const ICONS: Record<string, IconComponent> = {
  activity: Activity,
  building: Building,
  droplets: Droplets,
  gauge: Gauge,
  globe: Globe,
  layers: Layers,
  layout: LayoutGrid,
  mountain: Mountain,
  pipette: Pipette,
  radar: Radar,
  route: Route,
  satellite: Satellite,
  scale: Scale,
  telescope: Telescope,
  users: Users,
}

export const storyIcon = (id: string): IconComponent => ICONS[id] ?? Activity
