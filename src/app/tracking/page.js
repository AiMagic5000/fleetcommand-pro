"use client"

import { useState, useEffect, useMemo, useRef } from "react"

// 8-truck demo fleet. Each truck has origin/destination coords -- progress drives
// position via linear interpolation, animated client-side so the map looks alive.
const ROUTES = [
  { truck_id: "FCP-101", driver_name: "Victor Caldwell",  truck_unit: "Peterbilt 579", truck_year: 2024, status: "transit", origin: "Fort Worth, TX",   destination: "Memphis, TN",       commodity: "Auto Parts",      weight: 39500, equipment: "53' Dry Van", load_value: "$24,800", load_code: "FCP-2026-0428-101", eta_hr: 6.4,  miles: 630, hos: 7.0, o: [-97.330, 32.755], d: [-90.049, 35.149], speed: 0.0019 },
  { truck_id: "FCP-102", driver_name: "Denise Okonkwo",   truck_unit: "Kenworth T680",  truck_year: 2023, status: "transit", origin: "Columbus, OH",     destination: "Charlotte, NC",     commodity: "Steel Coils",     weight: 47000, equipment: "Flatbed",     load_value: "$31,200", load_code: "FCP-2026-0428-102", eta_hr: 9.1,  miles: 554, hos: 8.5, o: [-82.998, 39.961], d: [-80.843, 35.227], speed: 0.0014 },
  { truck_id: "FCP-103", driver_name: "Marco Delgado",    truck_unit: "Freightliner Cascadia", truck_year: 2025, status: "transit", origin: "Chicago, IL", destination: "Kansas City, MO", commodity: "Packaged Foods", weight: 42000, equipment: "53' Reefer",  load_value: "$18,400", load_code: "FCP-2026-0428-103", eta_hr: 2.8,  miles: 503, hos: 5.5, o: [-87.629, 41.878], d: [-94.578, 39.099], speed: 0.0024 },
  { truck_id: "FCP-104", driver_name: "Shayla Winters",   truck_unit: "Volvo VNL 760",  truck_year: 2024, status: "rest",    origin: "Atlanta, GA",      destination: "Jacksonville, FL", commodity: "Retail Goods",   weight: 31000, equipment: "53' Dry Van", load_value: "$12,600", load_code: "FCP-2026-0428-104", eta_hr: 0,    miles: 346, hos: 10,  o: [-84.388, 33.749], d: [-81.655, 30.332], speed: 0 },
  { truck_id: "FCP-105", driver_name: "Curtis Lawson",    truck_unit: "Mack Anthem",    truck_year: 2023, status: "transit", origin: "Louisville, KY",   destination: "Nashville, TN",     commodity: "Beverages",       weight: 38000, equipment: "53' Dry Van", load_value: "$9,800",  load_code: "FCP-2026-0428-105", eta_hr: 0.9,  miles: 177, hos: 3.5, o: [-85.759, 38.252], d: [-86.781, 36.162], speed: 0.0028 },
  { truck_id: "FCP-106", driver_name: "Renee Blackwood",  truck_unit: "Peterbilt 389",  truck_year: 2025, status: "transit", origin: "Philadelphia, PA", destination: "Boston, MA",        commodity: "Electronics",     weight: 28500, equipment: "53' Dry Van", load_value: "$42,500", load_code: "FCP-2026-0428-106", eta_hr: 5.2,  miles: 301, hos: 6.0, o: [-75.165, 39.952], d: [-71.058, 42.360], speed: 0.0021 },
  { truck_id: "FCP-107", driver_name: "Andre Simmons",    truck_unit: "Kenworth W900",  truck_year: 2022, status: "transit", origin: "Indianapolis, IN", destination: "Detroit, MI",       commodity: "Machinery",        weight: 44000, equipment: "Step Deck",   load_value: "$36,900", load_code: "FCP-2026-0428-107", eta_hr: 3.1,  miles: 296, hos: 5.0, o: [-86.158, 39.768], d: [-83.046, 42.331], speed: 0.0023 },
  { truck_id: "FCP-108", driver_name: "Katrina Holloway", truck_unit: "Freightliner Coronado", truck_year: 2024, status: "rest",    origin: "Raleigh, NC",      destination: "Richmond, VA",     commodity: "Medical Supplies", weight: 22000, equipment: "53' Dry Van", load_value: "$58,200", load_code: "FCP-2026-0428-108", eta_hr: 0,    miles: 174, hos: 10,  o: [-78.638, 35.779], d: [-77.436, 37.541], speed: 0 },
]

const INITIAL_PROGRESS = [0.58, 0.41, 0.73, 0.0, 0.86, 0.47, 0.62, 0.0]

function lerp(a, b, t) { return a + (b - a) * t }

function buildTrucks(progressArr) {
  return ROUTES.map((r, i) => {
    const p = Math.min(progressArr[i], 0.99)
    const lng = lerp(r.o[0], r.d[0], p)
    const lat = lerp(r.o[1], r.d[1], p)
    const eta_hr = r.status === "rest" ? 0 : Math.max(0.1, r.eta_hr * (1 - p))
    const eta = r.status === "rest"
      ? "--"
      : new Date(Date.now() + eta_hr * 3600 * 1000).toISOString()
    return {
      ...r,
      lat, lng,
      progress: Math.round(p * 100),
      eta,
      hos_remaining: r.status === "rest" ? r.hos : Math.max(0.5, +(r.hos - p * 5.5).toFixed(1)),
    }
  })
}

const MAP_CSS = `
.fcp-track-page { padding-top: var(--header-h, 96px); background: oklch(0.985 0.005 85); min-height: 100vh; }
.fcp-track-shell { max-width: 1380px; margin: 0 auto; padding: 0 24px; }
@media (max-width: 768px) { .fcp-track-shell { padding: 0 16px; } }

/* Header */
.fcp-track-head {
  background: oklch(0.20 0.012 60);
  color: oklch(0.985 0.005 85);
  padding: 28px 0 24px;
}
.fcp-track-head h1 {
  font-family: "Inter", -apple-system, sans-serif;
  font-weight: 800; font-size: clamp(26px, 2.8vw, 38px);
  line-height: 1.05; letter-spacing: -0.02em; margin: 0;
}
.fcp-track-head .fcp-track-eyebrow {
  font-family: "Inter", -apple-system, sans-serif;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: oklch(0.7 0.012 60);
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 8px;
}
.fcp-live-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: oklch(0.66 0.13 145);
  animation: fcpDotPulse 2s ease-out infinite;
}
@keyframes fcpDotPulse {
  0% { box-shadow: 0 0 0 0 oklch(0.66 0.13 145 / 0.55); }
  70% { box-shadow: 0 0 0 8px oklch(0.66 0.13 145 / 0); }
  100% { box-shadow: 0 0 0 0 oklch(0.66 0.13 145 / 0); }
}

/* Search */
.fcp-search-row {
  display: flex; gap: 10px; align-items: stretch;
  margin-top: 20px;
  max-width: 640px;
}
.fcp-search-input {
  flex: 1;
  background: oklch(0.985 0.005 85);
  color: oklch(0.20 0.012 60);
  border: 1px solid oklch(0.30 0.012 60);
  border-radius: 4px;
  padding: 14px 18px;
  font-family: inherit; font-size: 15px; font-weight: 500;
  outline: none;
}
.fcp-search-input::placeholder { color: oklch(0.55 0.012 60); }
.fcp-search-input:focus { border-color: oklch(0.86 0.17 92); }
.fcp-search-btn {
  background: oklch(0.86 0.17 92);
  color: oklch(0.20 0.012 60);
  border: none;
  padding: 14px 24px;
  font-family: inherit; font-size: 14px; font-weight: 700;
  letter-spacing: 0.04em; text-transform: uppercase;
  cursor: pointer; border-radius: 4px;
  transition: background 200ms;
}
.fcp-search-btn:hover { background: oklch(0.92 0.16 92); }
.fcp-search-feedback {
  font-family: "Inter", -apple-system, sans-serif;
  font-size: 12px; letter-spacing: 0.06em;
  margin-top: 10px; padding: 8px 12px; border-radius: 4px;
  display: none;
}
.fcp-search-feedback.success { display: block; background: oklch(0.66 0.13 145 / 0.18); color: oklch(0.78 0.13 145); }
.fcp-search-feedback.error { display: block; background: oklch(0.58 0.21 28 / 0.18); color: oklch(0.82 0.21 28); }

/* Stats */
.fcp-stats-row {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 0;
  border: 1px solid oklch(0.88 0.008 70);
  background: oklch(0.985 0.005 85);
  margin: -20px auto 24px;
  position: relative; z-index: 2;
  max-width: calc(1380px - 48px);
}
@media (max-width: 900px) { .fcp-stats-row { grid-template-columns: repeat(2, 1fr); } }
.fcp-stat {
  padding: 18px 22px;
  border-right: 1px solid oklch(0.88 0.008 70);
  border-bottom: 1px solid oklch(0.88 0.008 70);
}
.fcp-stat:last-child { border-right: none; }
@media (max-width: 900px) { .fcp-stat:nth-child(2n) { border-right: none; } }
.fcp-stat-label {
  font-family: "Inter", -apple-system, sans-serif;
  font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  color: oklch(0.55 0.012 60);
}
.fcp-stat-val {
  font-family: "Inter", -apple-system, sans-serif;
  font-weight: 800; font-size: 28px; line-height: 1;
  margin-top: 6px;
  color: oklch(0.20 0.012 60); font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

/* Map frame */
.fcp-map-frame {
  position: relative;
  height: clamp(420px, 60vh, 620px);
  background: oklch(0.92 0.008 70);
  border: 1px solid oklch(0.88 0.008 70);
  margin-bottom: 24px;
  overflow: hidden;
}
#fcp-map { width: 100%; height: 100%; }
.maplibregl-ctrl-attrib,
.maplibregl-ctrl-attrib-inner,
.maplibregl-ctrl-bottom-left,
.maplibregl-ctrl-bottom-right .maplibregl-ctrl-attrib { display: none !important; }
.maplibregl-ctrl-logo { display: none !important; }
.fcp-map-overlay {
  position: absolute; top: 12px; left: 12px;
  background: oklch(0.20 0.012 60 / 0.92);
  color: oklch(0.985 0.005 85);
  font-family: "Inter", -apple-system, sans-serif;
  font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 8px 12px;
  display: inline-flex; align-items: center; gap: 10px;
  z-index: 2;
}

/* MapLibre popup theming */
.maplibregl-popup-content {
  border-radius: 12px !important;
  padding: 0 !important;
  overflow: hidden;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  box-shadow: 0 24px 60px oklch(0.10 0.012 60 / 0.30) !important;
  min-width: 300px; max-width: 340px;
}
.maplibregl-popup-close-button {
  font-size: 20px !important;
  padding: 6px 10px !important;
  color: oklch(0.985 0.005 85) !important;
  z-index: 2;
}
.fcp-pop-h {
  background: oklch(0.20 0.012 60);
  color: oklch(0.985 0.005 85);
  padding: 16px 18px 14px;
}
.fcp-pop-h h3 {
  font-size: 17px; font-weight: 700; margin: 0 0 4px;
  color: oklch(0.985 0.005 85); display: flex; align-items: center; gap: 8px;
  flex-wrap: wrap;
}
.fcp-pop-sub { font-size: 12px; color: oklch(0.7 0.012 60); }
.fcp-pop-b { padding: 14px 18px; background: oklch(0.985 0.005 85); }
.fcp-pop-route { font-size: 13.5px; color: oklch(0.36 0.01 60); display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.fcp-pop-route b { color: oklch(0.20 0.012 60); font-weight: 600; }
.fcp-pop-route .ar { color: oklch(0.86 0.17 92); }
.fcp-pop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; font-size: 12.5px; }
.fcp-pop-cell .fcp-pop-l { font-size: 10px; font-weight: 700; color: oklch(0.55 0.012 60); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
.fcp-pop-cell .fcp-pop-v { font-weight: 600; color: oklch(0.20 0.012 60); }
.fcp-pop-bar { margin-top: 12px; }
.fcp-pop-bar-l { display: flex; justify-content: space-between; font-size: 11px; color: oklch(0.55 0.012 60); margin-bottom: 4px; font-family: "JetBrains Mono", monospace; letter-spacing: 0.06em; text-transform: uppercase; }
.fcp-pop-bar-l b { color: oklch(0.20 0.012 60); }
.fcp-pop-bar-bg { height: 4px; background: oklch(0.88 0.008 70); border-radius: 2px; overflow: hidden; }
.fcp-pop-bar-fg { height: 100%; background: oklch(0.86 0.17 92); border-radius: 2px; transition: width 800ms ease; }
.fcp-pop-stat { display: inline-block; padding: 2px 8px; border-radius: 2px; font-size: 10.5px; letter-spacing: 0.12em; font-weight: 700; text-transform: uppercase; }
.fcp-pop-stat.t { background: oklch(0.66 0.13 145 / 0.2); color: oklch(0.85 0.13 145); }
.fcp-pop-stat.r { background: oklch(0.30 0.012 60); color: oklch(0.85 0.012 60); }

/* Truck list */
.fcp-list-head {
  font-family: "Inter", -apple-system, sans-serif;
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  color: oklch(0.55 0.012 60);
  margin-bottom: 12px;
}
.fcp-list-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 0;
  border: 1px solid oklch(0.88 0.008 70);
  margin-bottom: 64px;
}
.fcp-card {
  padding: 22px 24px;
  background: oklch(0.985 0.005 85);
  border-right: 1px solid oklch(0.88 0.008 70);
  border-bottom: 1px solid oklch(0.88 0.008 70);
  cursor: pointer;
  transition: background 200ms;
}
.fcp-card:hover { background: oklch(0.965 0.006 85); }
.fcp-card-h { display: flex; justify-content: space-between; align-items: start; gap: 12px; margin-bottom: 12px; }
.fcp-card-id { font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; color: oklch(0.20 0.012 60); }
.fcp-card-driver { font-size: 13px; color: oklch(0.36 0.01 60); margin-top: 2px; }
.fcp-badge { padding: 3px 8px; font-size: 10.5px; letter-spacing: 0.12em; font-weight: 700; text-transform: uppercase; font-family: "JetBrains Mono", monospace; }
.fcp-badge.t { background: oklch(0.66 0.13 145 / 0.18); color: oklch(0.45 0.13 145); }
.fcp-badge.r { background: oklch(0.88 0.008 70); color: oklch(0.36 0.01 60); }
.fcp-card-route {
  font-family: "Inter", -apple-system, sans-serif; font-size: 16px; line-height: 1.35;
  font-weight: 600;
  color: oklch(0.20 0.012 60);
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}
.fcp-card-route span { color: oklch(0.86 0.17 92); }
.fcp-card-bar { height: 3px; background: oklch(0.88 0.008 70); border-radius: 2px; margin: 12px 0; overflow: hidden; }
.fcp-card-bar > div { height: 100%; background: oklch(0.55 0.16 65); border-radius: 2px; transition: width 800ms ease; }
.fcp-card-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-family: "JetBrains Mono", monospace; font-size: 11px; }
.fcp-card-meta b { display: block; font-weight: 600; color: oklch(0.55 0.012 60); letter-spacing: 0.08em; text-transform: uppercase; font-size: 9.5px; }
.fcp-card-meta span { color: oklch(0.20 0.012 60); font-weight: 500; }
`

export default function TrackingPage() {
  const [progress, setProgress] = useState(INITIAL_PROGRESS)
  const [search, setSearch] = useState("")
  const [feedback, setFeedback] = useState({ kind: null, msg: "" })
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const sourceReadyRef = useRef(false)
  const popupRef = useRef(null)

  const trucks = useMemo(() => buildTrucks(progress), [progress])

  const stats = useMemo(() => {
    const transit = trucks.filter((t) => t.status === "transit").length
    const rest = trucks.filter((t) => t.status === "rest").length
    const miles = trucks.reduce((s, t) => s + t.miles, 0)
    return {
      total: trucks.length,
      transit, rest,
      miles_today: miles.toLocaleString(),
      on_time: 98.6,
    }
  }, [trucks])

  // Live tick: every 4s, advance each transit truck by its speed
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) =>
        prev.map((p, i) => {
          const r = ROUTES[i]
          if (r.status === "rest") return p
          let next = p + r.speed
          if (next >= 0.99) next = 0.05
          return next
        })
      )
    }, 4000)
    return () => clearInterval(id)
  }, [])

  // Map init
  useEffect(() => {
    if (typeof window === "undefined") return

    const ensureLib = () =>
      new Promise((resolve) => {
        if (window.maplibregl) return resolve()
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css"
        document.head.appendChild(link)
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js"
        script.onload = resolve
        document.head.appendChild(script)
      })

    let cancelled = false
    ensureLib().then(() => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return
      const map = new window.maplibregl.Map({
        container: mapRef.current,
        attributionControl: false,
        style: {
          version: 8,
          sources: {
            carto: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
                "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
              ],
              tileSize: 256,
              attribution: "",
            },
          },
          layers: [{ id: "base", type: "raster", source: "carto", minzoom: 0, maxzoom: 20 }],
        },
        center: [-94, 38],
        zoom: 4.4,
        maxBounds: [[-130, 22], [-64, 52]],
      })
      map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), "top-right")

      map.once("style.load", () => {
        // Truck-shield favicon as marker. Render once into a canvas to grab pixel data.
        const buildShieldImage = (src, targetW, dim) =>
          new Promise((resolve) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              const scale = targetW / img.naturalWidth
              const w = Math.round(img.naturalWidth * scale)
              const h = Math.round(img.naturalHeight * scale)
              const c = document.createElement("canvas")
              c.width = w
              c.height = h
              const cx = c.getContext("2d")
              if (dim) {
                cx.globalAlpha = 0.55
                cx.filter = "grayscale(100%)"
              }
              cx.drawImage(img, 0, 0, w, h)
              const imgData = cx.getImageData(0, 0, w, h)
              resolve({ width: w, height: h, data: imgData.data })
            }
            img.onerror = () => resolve(null)
            img.src = src
          })

        Promise.all([
          buildShieldImage("/icon-192.png", 48, false),
          buildShieldImage("/icon-192.png", 44, true),
        ]).then(([live, rest]) => {
          if (live && !map.hasImage("fcp-truck")) map.addImage("fcp-truck", live)
          if (rest && !map.hasImage("fcp-rest")) map.addImage("fcp-rest", rest)
          // Trigger re-render
          if (map.getLayer("fleet-pts")) map.triggerRepaint()
        })

        const fc = {
          type: "FeatureCollection",
          features: trucks.map((t, i) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: [t.lng, t.lat] },
            properties: { idx: i, status: t.status, id: t.truck_id },
          })),
        }
        map.addSource("fleet", { type: "geojson", data: fc })
        map.addLayer({
          id: "fleet-pts",
          type: "symbol",
          source: "fleet",
          layout: {
            "icon-image": ["case", ["==", ["get", "status"], "transit"], "fcp-truck", "fcp-rest"],
            "icon-size": 1,
            "icon-anchor": "bottom",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
        })
        sourceReadyRef.current = true

        map.on("click", "fleet-pts", (e) => {
          const idx = e.features[0].properties.idx
          const t = trucksRef.current[idx]
          if (!t) return
          openPopup(t)
        })
        map.on("mouseenter", "fleet-pts", () => { map.getCanvas().style.cursor = "pointer" })
        map.on("mouseleave", "fleet-pts", () => { map.getCanvas().style.cursor = "" })
      })

      mapInstanceRef.current = map
    })

    return () => {
      cancelled = true
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null }
      sourceReadyRef.current = false
    }
  }, [])

  // Update geojson on every truck position change
  const trucksRef = useRef(trucks)
  trucksRef.current = trucks
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !sourceReadyRef.current) return
    const src = map.getSource("fleet")
    if (!src) return
    src.setData({
      type: "FeatureCollection",
      features: trucks.map((t, i) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [t.lng, t.lat] },
        properties: { idx: i, status: t.status, id: t.truck_id },
      })),
    })
  }, [trucks])

  function openPopup(t) {
    const map = mapInstanceRef.current
    if (!map) return
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
    const isT = t.status === "transit"
    const etaStr = t.status === "rest"
      ? "--"
      : new Date(t.eta).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    const html = `
      <div class="fcp-pop-h">
        <h3>${t.truck_id} <span class="fcp-pop-stat ${isT ? "t" : "r"}">${isT ? "Rolling" : "At Rest"}</span></h3>
        <div class="fcp-pop-sub">${t.truck_unit} (${t.truck_year}) &middot; ${t.driver_name}</div>
      </div>
      <div class="fcp-pop-b">
        <div class="fcp-pop-route"><b>${t.origin}</b><span class="ar">&rarr;</span><b>${t.destination}</b></div>
        <div class="fcp-pop-grid">
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Tracking</div><div class="fcp-pop-v">${t.load_code}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Commodity</div><div class="fcp-pop-v">${t.commodity}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Equipment</div><div class="fcp-pop-v">${t.equipment}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Weight</div><div class="fcp-pop-v">${t.weight.toLocaleString()} lbs</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Miles</div><div class="fcp-pop-v">${t.miles.toLocaleString()}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">ETA</div><div class="fcp-pop-v">${etaStr}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">Load Value</div><div class="fcp-pop-v">${t.load_value}</div></div>
          <div class="fcp-pop-cell"><div class="fcp-pop-l">HOS Left</div><div class="fcp-pop-v">${t.hos_remaining}h</div></div>
        </div>
        <div class="fcp-pop-bar">
          <div class="fcp-pop-bar-l"><span>Progress</span><b>${t.progress}%</b></div>
          <div class="fcp-pop-bar-bg"><div class="fcp-pop-bar-fg" style="width:${t.progress}%"></div></div>
        </div>
      </div>
    `
    popupRef.current = new window.maplibregl.Popup({ offset: [0, -22], maxWidth: "340px", closeButton: true })
      .setLngLat([t.lng, t.lat])
      .setHTML(html)
      .addTo(map)
  }

  function focusTruck(t) {
    const map = mapInstanceRef.current
    if (!map) return
    map.flyTo({ center: [t.lng, t.lat], zoom: 6.5, duration: 1100 })
    setTimeout(() => openPopup(t), 1150)
  }

  function doSearch() {
    const q = search.trim().toUpperCase()
    if (!q) return
    const match = trucks.find(
      (t) =>
        t.truck_id.toUpperCase() === q ||
        t.load_code.toUpperCase() === q ||
        t.driver_name.toUpperCase().includes(q)
    )
    if (match) {
      setFeedback({ kind: "success", msg: `Locked on ${match.truck_id} -- ${match.load_code}` })
      focusTruck(match)
    } else {
      setFeedback({ kind: "error", msg: `No match for "${search.trim()}". Try a truck ID, tracking code, or driver name.` })
    }
    setTimeout(() => setFeedback({ kind: null, msg: "" }), 5000)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MAP_CSS }} />
      <main className="fcp-track-page">

        <header className="fcp-track-head">
          <div className="fcp-track-shell">
            <div className="fcp-track-eyebrow">
              <span className="fcp-live-dot" aria-hidden="true"></span>
              FCP-OPS // Live Fleet Tracking // Auto-refresh 4s
            </div>
            <h1>Apex Freight Group &middot; live operations</h1>
            <div className="fcp-search-row">
              <input
                className="fcp-search-input"
                type="text"
                placeholder="Truck ID, tracking code, or driver name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") doSearch() }}
              />
              <button className="fcp-search-btn" onClick={doSearch}>Find</button>
            </div>
            {feedback.kind && (
              <div className={`fcp-search-feedback ${feedback.kind}`} style={{ display: "block" }}>
                {feedback.msg}
              </div>
            )}
          </div>
        </header>

        <div className="fcp-track-shell">
          <div className="fcp-stats-row">
            <div className="fcp-stat"><div className="fcp-stat-label">Active Trucks</div><div className="fcp-stat-val">{stats.total}</div></div>
            <div className="fcp-stat"><div className="fcp-stat-label">In Transit</div><div className="fcp-stat-val">{stats.transit}</div></div>
            <div className="fcp-stat"><div className="fcp-stat-label">At Rest</div><div className="fcp-stat-val">{stats.rest}</div></div>
            <div className="fcp-stat"><div className="fcp-stat-label">Fleet Miles Today</div><div className="fcp-stat-val">{stats.miles_today}</div></div>
            <div className="fcp-stat"><div className="fcp-stat-label">On-Time Rate</div><div className="fcp-stat-val">{stats.on_time}%</div></div>
          </div>

          <div className="fcp-map-frame">
            <div className="fcp-map-overlay">
              <span className="fcp-live-dot" aria-hidden="true"></span>Live &middot; {stats.transit} rolling
            </div>
            <div id="fcp-map" ref={mapRef}></div>
          </div>

          <div className="fcp-list-head">Section II &middot; Roster &middot; click a card to fly the map</div>
          <div className="fcp-list-grid">
            {trucks.map((t) => (
              <div key={t.truck_id} className="fcp-card" onClick={() => focusTruck(t)}>
                <div className="fcp-card-h">
                  <div>
                    <div className="fcp-card-id">{t.truck_id}</div>
                    <div className="fcp-card-driver">{t.driver_name} &middot; {t.truck_unit}</div>
                  </div>
                  <span className={`fcp-badge ${t.status === "transit" ? "t" : "r"}`}>
                    {t.status === "transit" ? "Rolling" : "At Rest"}
                  </span>
                </div>
                <p className="fcp-card-route">
                  {t.origin} <span>&rarr;</span> {t.destination}
                </p>
                <div className="fcp-card-bar"><div style={{ width: `${t.progress}%` }} /></div>
                <div className="fcp-card-meta">
                  <div><b>Progress</b><span>{t.progress}%</span></div>
                  <div><b>Miles</b><span>{t.miles.toLocaleString()}</span></div>
                  <div><b>HOS Left</b><span>{t.hos_remaining}h</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
