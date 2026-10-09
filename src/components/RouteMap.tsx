import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { MapMarker } from '../types'

interface RouteMapProps {
  markers: MapMarker[]
  label: string
}

/**
 * Interactive map that plots the day's stops in itinerary order and links them
 * with a route line. Numbered pins match the stop list underneath.
 */
export function RouteMap({ markers, label }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || markers.length === 0) return

    const points = markers.map((marker) => L.latLng(marker.lat, marker.lng))

    const map = L.map(container, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    markers.forEach((marker, index) => {
      const icon = L.divIcon({
        className: 'lt-route-pin',
        html: `<span>${index + 1}</span>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      })
      L.marker(points[index], { icon, title: marker.name, alt: marker.name })
        .addTo(map)
        .bindPopup(`<strong>${index + 1}. ${marker.name}</strong>`)
    })

    if (points.length > 1) {
      // White casing under a dashed route line keeps it readable over any map.
      L.polyline(points, { color: '#ffffff', weight: 7, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map)
      L.polyline(points, { color: '#e06a1f', weight: 3.5, opacity: 1, dashArray: '9 9', lineCap: 'round' }).addTo(map)
    }

    if (points.length === 1) {
      map.setView(points[0], 15)
    } else {
      map.fitBounds(L.latLngBounds(points).pad(0.25))
    }

    const timeout = window.setTimeout(() => map.invalidateSize(), 150)

    return () => {
      window.clearTimeout(timeout)
      map.remove()
      mapRef.current = null
    }
  }, [markers])

  if (markers.length === 0) return null

  return (
    <div className="isolate overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      <div ref={containerRef} aria-label={label} className="h-60 w-full bg-muted" />
      <div className="flex flex-wrap gap-2 border-t border-border px-3 py-2.5">
        {markers.map((marker, index) => (
          <button
            key={marker.name}
            type="button"
            onClick={() => mapRef.current?.flyTo([marker.lat, marker.lng], 15, { duration: 0.6 })}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-foreground transition-transform active:scale-95"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {index + 1}
            </span>
            {marker.name}
          </button>
        ))}
      </div>
    </div>
  )
}
