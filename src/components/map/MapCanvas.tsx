import { useEffect } from 'react'
import {
  Circle,
  CircleMarker,
  MapContainer,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

import type { CaseCity } from '@/data/types'
import { OVERLAYS, rampColor } from '@/data/overlays'

export type MapLayerId = 'subsidence' | 'observations' | 'groundwater' | 'agriculture'

/** Keeps the viewport in sync when the selected city changes. */
function ViewController({ city }: { city: CaseCity }) {
  const map = useMap()
  useEffect(() => {
    map.flyToBounds(city.map.bounds as [number, number][], {
      padding: [28, 28],
      duration: 1.1,
    })
  }, [city, map])
  return null
}

export function MapCanvas({
  city,
  layer,
  unavailable = false,
  selectedZoneId,
  onSelectZone,
}: {
  city: CaseCity
  layer: MapLayerId
  unavailable?: boolean
  selectedZoneId?: string | null
  onSelectZone?: (zoneId: string) => void
}) {
  const overlays = OVERLAYS[city.id]

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={city.map.center as LatLngExpression}
        zoom={city.map.zoom}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
        attributionControl
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains={['a', 'b', 'c', 'd']}
          attribution='Basemap &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> &middot; overlays are DEMO data'
          maxZoom={19}
        />
        <ViewController city={city} />

        {/* ---------------- Land subsidence (DEMO) ---------------- */}
        {layer === 'subsidence' &&
          !unavailable &&
          overlays.subsidence.map((zone) => {
            const ramp = rampColor(zone.intensity)
            const isSelected = selectedZoneId === zone.id
            return (
              <Circle
                key={zone.id}
                center={zone.center as LatLngExpression}
                radius={zone.radiusM}
                eventHandlers={{ click: () => onSelectZone?.(zone.id) }}
                pathOptions={{
                  color: isSelected ? '#ffffff' : ramp.color,
                  weight: isSelected ? 2.6 : 1.2,
                  opacity: isSelected ? 1 : 0.85,
                  fillColor: ramp.color,
                  fillOpacity: isSelected ? Math.min(0.8, ramp.opacity + 0.18) : ramp.opacity,
                }}
              >
                <Tooltip sticky>
                  <span className="font-sans text-[12px] font-semibold">{zone.label}</span>
                  <br />
                  <span className="font-mono text-[11px]">{zone.value}</span>
                  <br />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600">
                    Demo value — not a measurement
                  </span>
                </Tooltip>
              </Circle>
            )
          })}

        {/* ---------------- Satellite observations (DEMO tracks) ---------------- */}
        {layer === 'observations' &&
          !unavailable &&
          overlays.passes.map((pass) => {
            const isNisar = pass.id.includes('nisar')
            return (
              <Polyline
                key={pass.id}
                positions={pass.path as LatLngExpression[]}
                pathOptions={{
                  color: isNisar ? '#9b8cff' : '#38d6ff',
                  weight: isNisar ? 2 : 2.6,
                  opacity: 0.9,
                  dashArray: isNisar ? '2 8' : '10 8',
                }}
              >
                <Tooltip sticky>
                  <span className="font-sans text-[12px] font-semibold">{pass.label}</span>
                  <br />
                  <span className="font-mono text-[10px]">{pass.meta}</span>
                </Tooltip>
              </Polyline>
            )
          })}

        {/* ---------------- Groundwater observation points (DEMO) ---------------- */}
        {layer === 'groundwater' &&
          !unavailable &&
          overlays.groundwater.map((well) => (
            <CircleMarker
              key={well.id}
              center={well.position as LatLngExpression}
              radius={8}
              pathOptions={{
                color: '#14e0c0',
                weight: 2,
                fillColor: '#04060d',
                fillOpacity: 0.9,
              }}
            >
              <Tooltip sticky>
                <span className="font-sans text-[12px] font-semibold">{well.label}</span>
                <br />
                <span className="font-mono text-[10px]">{well.meta}</span>
              </Tooltip>
            </CircleMarker>
          ))}

        {/* ---------------- Agricultural / land-use areas (DEMO) ---------------- */}
        {layer === 'agriculture' &&
          !unavailable &&
          overlays.agriculture.map((area) => (
            <Polygon
              key={area.id}
              positions={area.points as LatLngExpression[]}
              pathOptions={{
                color: '#f6c667',
                weight: 1.5,
                opacity: 0.9,
                fillColor: '#f6c667',
                fillOpacity: 0.26,
              }}
            >
              <Tooltip sticky>
                <span className="font-sans text-[12px] font-semibold">{area.label}</span>
                <br />
                <span className="font-mono text-[10px]">{area.meta}</span>
              </Tooltip>
            </Polygon>
          ))}
      </MapContainer>

      {/* Persistent demo stamp — visible regardless of layer */}
      <div className="pointer-events-none absolute left-3 top-3 z-[500] flex flex-col gap-1.5">
        <span className="w-fit rounded-md border border-sand/50 bg-void/80 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur">
          Demo overlays — not measurements
        </span>
        <span className="w-fit rounded-md border border-hairline bg-void/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50 backdrop-blur">
          Basemap: OSM / CARTO
        </span>
      </div>
    </div>
  )
}
