import * as THREE from 'three'

export interface GeoNode {
  name: string
  lat: number
  lng: number
  s: number
}

export const GLOBE_NODES: GeoNode[] = [
  { name: 'Colombo (HQ)', lat: 6.9271, lng: 79.8612, s: 1.2 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, s: 1.0 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, s: 1.0 },
  { name: 'London', lat: 51.5072, lng: -0.1276, s: 1.0 },
  { name: 'New York', lat: 40.7128, lng: -74.006, s: 1.15 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, s: 0.95 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, s: 1.0 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, s: 0.9 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, s: 0.9 },
  { name: 'Berlin', lat: 52.52, lng: 13.405, s: 0.85 },
]

export const GLOBE_LINKS: [number, number, string][] = [
  [0, 1, '#38bdf8'], // Colombo -> Singapore
  [0, 2, '#ff334b'], // Colombo -> Dubai
  [0, 8, '#ff334b'], // Colombo -> Mumbai
  [0, 6, '#38bdf8'], // Colombo -> Tokyo
  [1, 6, '#38bdf8'], // Singapore -> Tokyo
  [2, 3, '#ff334b'], // Dubai -> London
  [3, 4, '#38bdf8'], // London -> New York
  [4, 5, '#ff334b'], // New York -> SF
  [5, 6, '#38bdf8'], // SF -> Tokyo
  [6, 7, '#ff334b'], // Tokyo -> Sydney
  [8, 2, '#38bdf8'], // Mumbai -> Dubai
  [3, 9, '#ff334b'], // London -> Berlin
  [7, 0, '#38bdf8'], // Sydney -> Colombo
  [4, 0, '#ff334b'], // New York -> Colombo
]

export function latLngToVector3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

export function makeArcCurve(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  radius = 2.45,
  lift = 0.55
): THREE.QuadraticBezierCurve3 {
  const a = latLngToVector3(start.lat, start.lng, radius)
  const b = latLngToVector3(end.lat, end.lng, radius)
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(radius + lift)
  return new THREE.QuadraticBezierCurve3(a, mid, b)
}
