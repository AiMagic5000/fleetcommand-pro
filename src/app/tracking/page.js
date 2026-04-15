"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"

const COMPANIES = [
  { id: "apex-freight", name: "Apex Freight Group", initials: "AF" },
  { id: "titan-logistics", name: "Titan Logistics", initials: "TL" },
  { id: "crosscountry-carriers", name: "CrossCountry Carriers", initials: "CC" },
  { id: "liberty-transport", name: "Liberty Transport Co.", initials: "LT" },
  { id: "pinnacle-fleet", name: "Pinnacle Fleet Services", initials: "PF" },
]

const REFRESH_INTERVAL = 60000

const DEMO_FLEETS = {
  "apex-freight": {
    stats: { total_trucks: 8, in_transit: 6, at_rest: 2, fleet_miles_today: "4,210", on_time_rate: "98.6" },
    fleet: [
      { truck_id: "FCP-101", driver_name: "Victor Caldwell", status: "transit", origin: "Fort Worth, TX", destination: "Memphis, TN", commodity: "Auto Parts", weight: 39500, progress: 58, load_code: "FCP-2026-0415-001", eta: "6.4 hrs", miles: 630, hos_remaining: 7.0, lat: 33.16, lng: -94.38 },
      { truck_id: "FCP-102", driver_name: "Denise Okonkwo", status: "transit", origin: "Columbus, OH", destination: "Charlotte, NC", commodity: "Steel Coils", weight: 47000, progress: 41, load_code: "FCP-2026-0415-002", eta: "9.1 hrs", miles: 554, hos_remaining: 8.5, lat: 37.28, lng: -81.22 },
      { truck_id: "FCP-103", driver_name: "Marco Delgado", status: "transit", origin: "Chicago, IL", destination: "Kansas City, MO", commodity: "Packaged Foods", weight: 42000, progress: 73, load_code: "FCP-2026-0415-003", eta: "2.8 hrs", miles: 503, hos_remaining: 5.5, lat: 39.47, lng: -92.86 },
      { truck_id: "FCP-104", driver_name: "Shayla Winters", status: "rest", origin: "Atlanta, GA", destination: "Jacksonville, FL", commodity: "Retail Goods", weight: 31000, progress: 0, load_code: "FCP-2026-0415-004", eta: "--", miles: 346, hos_remaining: 10.0, lat: 33.75, lng: -84.39 },
      { truck_id: "FCP-105", driver_name: "Curtis Lawson", status: "transit", origin: "Louisville, KY", destination: "Nashville, TN", commodity: "Beverages", weight: 38000, progress: 86, load_code: "FCP-2026-0415-005", eta: "0.9 hrs", miles: 177, hos_remaining: 3.5, lat: 36.41, lng: -86.59 },
      { truck_id: "FCP-106", driver_name: "Renee Blackwood", status: "transit", origin: "Philadelphia, PA", destination: "Boston, MA", commodity: "Electronics", weight: 28500, progress: 47, load_code: "FCP-2026-0415-006", eta: "5.2 hrs", miles: 301, hos_remaining: 6.0, lat: 41.28, lng: -72.91 },
      { truck_id: "FCP-107", driver_name: "Andre Simmons", status: "transit", origin: "Indianapolis, IN", destination: "Detroit, MI", commodity: "Machinery", weight: 44000, progress: 62, load_code: "FCP-2026-0415-007", eta: "3.1 hrs", miles: 296, hos_remaining: 5.0, lat: 41.58, lng: -85.68 },
      { truck_id: "FCP-108", driver_name: "Katrina Holloway", status: "rest", origin: "Raleigh, NC", destination: "Richmond, VA", commodity: "Medical Supplies", weight: 22000, progress: 0, load_code: "FCP-2026-0415-008", eta: "--", miles: 174, hos_remaining: 10.0, lat: 35.78, lng: -78.64 },
    ],
  },
  "titan-logistics": {
    stats: { total_trucks: 6, in_transit: 4, at_rest: 2, fleet_miles_today: "2,890", on_time_rate: "97.9" },
    fleet: [
      { truck_id: "FCP-201", driver_name: "Jerome Patterson", status: "transit", origin: "Houston, TX", destination: "Albuquerque, NM", commodity: "Chemical Drums", weight: 46000, progress: 54, load_code: "FCP-2026-0415-201", eta: "7.6 hrs", miles: 755, hos_remaining: 7.5, lat: 31.77, lng: -106.43 },
      { truck_id: "FCP-202", driver_name: "Tamika Ellis", status: "transit", origin: "Los Angeles, CA", destination: "Phoenix, AZ", commodity: "Consumer Goods", weight: 34000, progress: 69, load_code: "FCP-2026-0415-202", eta: "2.5 hrs", miles: 373, hos_remaining: 4.5, lat: 33.44, lng: -112.07 },
      { truck_id: "FCP-203", driver_name: "Floyd Garrison", status: "rest", origin: "Denver, CO", destination: "Salt Lake City, UT", commodity: "Lumber", weight: 49000, progress: 0, load_code: "FCP-2026-0415-203", eta: "--", miles: 525, hos_remaining: 10.0, lat: 39.73, lng: -104.99 },
      { truck_id: "FCP-204", driver_name: "Alicia Mercer", status: "transit", origin: "San Antonio, TX", destination: "Austin, TX", commodity: "Construction Materials", weight: 50000, progress: 79, load_code: "FCP-2026-0415-204", eta: "1.1 hrs", miles: 80, hos_remaining: 3.0, lat: 29.97, lng: -97.82 },
      { truck_id: "FCP-205", driver_name: "Brandon Kemp", status: "transit", origin: "Oklahoma City, OK", destination: "St. Louis, MO", commodity: "Grain", weight: 52000, progress: 36, load_code: "FCP-2026-0415-205", eta: "8.4 hrs", miles: 497, hos_remaining: 9.0, lat: 36.52, lng: -95.81 },
      { truck_id: "FCP-206", driver_name: "Loretta Hines", status: "rest", origin: "Memphis, TN", destination: "Little Rock, AR", commodity: "Frozen Foods", weight: 37000, progress: 0, load_code: "FCP-2026-0415-206", eta: "--", miles: 137, hos_remaining: 10.0, lat: 35.15, lng: -90.05 },
    ],
  },
  "crosscountry-carriers": {
    stats: { total_trucks: 5, in_transit: 3, at_rest: 2, fleet_miles_today: "1,740", on_time_rate: "99.1" },
    fleet: [
      { truck_id: "FCP-301", driver_name: "Wesley Grant", status: "transit", origin: "Seattle, WA", destination: "Sacramento, CA", commodity: "Tech Equipment", weight: 29000, progress: 44, load_code: "FCP-2026-0415-301", eta: "10.2 hrs", miles: 840, hos_remaining: 8.0, lat: 44.06, lng: -122.18 },
      { truck_id: "FCP-302", driver_name: "Ingrid Santos", status: "transit", origin: "San Francisco, CA", destination: "Las Vegas, NV", commodity: "Wine & Spirits", weight: 26000, progress: 67, load_code: "FCP-2026-0415-302", eta: "3.0 hrs", miles: 568, hos_remaining: 5.0, lat: 37.85, lng: -117.30 },
      { truck_id: "FCP-303", driver_name: "Malcolm Pierce", status: "rest", origin: "Portland, OR", destination: "Boise, ID", commodity: "Agricultural", weight: 44000, progress: 0, load_code: "FCP-2026-0415-303", eta: "--", miles: 432, hos_remaining: 10.0, lat: 45.52, lng: -122.68 },
      { truck_id: "FCP-304", driver_name: "Gwendolyn Rowe", status: "transit", origin: "Reno, NV", destination: "Salt Lake City, UT", commodity: "Mining Equipment", weight: 48000, progress: 52, load_code: "FCP-2026-0415-304", eta: "6.1 hrs", miles: 519, hos_remaining: 6.5, lat: 40.70, lng: -115.08 },
      { truck_id: "FCP-305", driver_name: "Hector Fuentes", status: "rest", origin: "San Diego, CA", destination: "Tucson, AZ", commodity: "Household Goods", weight: 33000, progress: 0, load_code: "FCP-2026-0415-305", eta: "--", miles: 411, hos_remaining: 10.0, lat: 32.72, lng: -117.16 },
    ],
  },
  "liberty-transport": {
    stats: { total_trucks: 7, in_transit: 5, at_rest: 2, fleet_miles_today: "3,120", on_time_rate: "96.5" },
    fleet: [
      { truck_id: "FCP-401", driver_name: "Reginald Moss", status: "transit", origin: "Miami, FL", destination: "Savannah, GA", commodity: "Textiles", weight: 32000, progress: 61, load_code: "FCP-2026-0415-401", eta: "5.3 hrs", miles: 474, hos_remaining: 6.0, lat: 29.80, lng: -82.44 },
      { truck_id: "FCP-402", driver_name: "Cecilia Nguyen", status: "transit", origin: "New Orleans, LA", destination: "Birmingham, AL", commodity: "Paper Products", weight: 36000, progress: 38, load_code: "FCP-2026-0415-402", eta: "5.0 hrs", miles: 345, hos_remaining: 8.0, lat: 30.60, lng: -88.92 },
      { truck_id: "FCP-403", driver_name: "Tyrone Bridges", status: "rest", origin: "Dallas, TX", destination: "Shreveport, LA", commodity: "Plastics", weight: 40000, progress: 0, load_code: "FCP-2026-0415-403", eta: "--", miles: 190, hos_remaining: 10.0, lat: 32.52, lng: -96.83 },
      { truck_id: "FCP-404", driver_name: "Pamela Kruger", status: "transit", origin: "Tampa, FL", destination: "Orlando, FL", commodity: "Pharmaceuticals", weight: 18000, progress: 84, load_code: "FCP-2026-0415-404", eta: "0.7 hrs", miles: 84, hos_remaining: 4.0, lat: 28.27, lng: -82.14 },
      { truck_id: "FCP-405", driver_name: "Edwin Castillo", status: "transit", origin: "Richmond, VA", destination: "Washington, DC", commodity: "Office Furniture", weight: 27000, progress: 71, load_code: "FCP-2026-0415-405", eta: "1.4 hrs", miles: 111, hos_remaining: 3.5, lat: 38.72, lng: -77.21 },
      { truck_id: "FCP-406", driver_name: "Nadine Fowler", status: "transit", origin: "Baton Rouge, LA", destination: "Jackson, MS", commodity: "Chemicals", weight: 43000, progress: 49, load_code: "FCP-2026-0415-406", eta: "3.6 hrs", miles: 232, hos_remaining: 7.0, lat: 31.66, lng: -90.43 },
      { truck_id: "FCP-407", driver_name: "Clyde Jefferson", status: "rest", origin: "Tallahassee, FL", destination: "Mobile, AL", commodity: "Lumber", weight: 47000, progress: 0, load_code: "FCP-2026-0415-407", eta: "--", miles: 207, hos_remaining: 10.0, lat: 30.44, lng: -84.28 },
    ],
  },
  "pinnacle-fleet": {
    stats: { total_trucks: 6, in_transit: 4, at_rest: 2, fleet_miles_today: "2,540", on_time_rate: "98.3" },
    fleet: [
      { truck_id: "FCP-501", driver_name: "Rodney Stanton", status: "transit", origin: "Minneapolis, MN", destination: "Fargo, ND", commodity: "Dairy Products", weight: 40000, progress: 57, load_code: "FCP-2026-0415-501", eta: "3.5 hrs", miles: 238, hos_remaining: 6.5, lat: 46.01, lng: -96.71 },
      { truck_id: "FCP-502", driver_name: "Gloria Estes", status: "transit", origin: "Omaha, NE", destination: "Des Moines, IA", commodity: "Farm Equipment", weight: 50000, progress: 74, load_code: "FCP-2026-0415-502", eta: "1.6 hrs", miles: 160, hos_remaining: 4.0, lat: 41.51, lng: -95.37 },
      { truck_id: "FCP-503", driver_name: "Maurice Owens", status: "rest", origin: "Sioux Falls, SD", destination: "Rapid City, SD", commodity: "Grain", weight: 52000, progress: 0, load_code: "FCP-2026-0415-503", eta: "--", miles: 346, hos_remaining: 10.0, lat: 43.55, lng: -96.73 },
      { truck_id: "FCP-504", driver_name: "Helen Beaumont", status: "transit", origin: "Green Bay, WI", destination: "Milwaukee, WI", commodity: "Paper", weight: 35000, progress: 66, load_code: "FCP-2026-0415-504", eta: "1.9 hrs", miles: 118, hos_remaining: 5.0, lat: 43.64, lng: -87.95 },
      { truck_id: "FCP-505", driver_name: "Preston Vance", status: "transit", origin: "Billings, MT", destination: "Casper, WY", commodity: "Petroleum Products", weight: 45000, progress: 43, load_code: "FCP-2026-0415-505", eta: "5.7 hrs", miles: 225, hos_remaining: 7.5, lat: 45.68, lng: -107.42 },
      { truck_id: "FCP-506", driver_name: "Iris Calloway", status: "rest", origin: "Duluth, MN", destination: "Eau Claire, WI", commodity: "Electronics", weight: 27000, progress: 0, load_code: "FCP-2026-0415-506", eta: "--", miles: 146, hos_remaining: 10.0, lat: 46.79, lng: -92.10 },
    ],
  },
}

export default function TrackingPage() {
  const [companyId, setCompanyId] = useState(COMPANIES[0].id)
  const [search, setSearch] = useState("")
  const [fleet, setFleet] = useState([])
  const [stats, setStats] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFleet = useCallback(async (id) => {
    try {
      setError(null)
      const demo = DEMO_FLEETS[id]
      if (demo) {
        setFleet(demo.fleet)
        setStats(demo.stats)
        setUpdated(new Date().toISOString())
      } else {
        const res = await fetch(`/api/fleet-status?company_id=${id}`)
        if (!res.ok) throw new Error(`API returned ${res.status}`)
        const data = await res.json()
        setFleet(data.fleet || [])
        setStats(data.stats || null)
        setUpdated(data.updated || new Date().toISOString())
      }
    } catch (err) {
      setError(err.message || "Failed to load fleet data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setFleet([])
    setStats(null)
    fetchFleet(companyId)
    const interval = setInterval(() => fetchFleet(companyId), REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [companyId, fetchFleet])

  const filtered = useMemo(() => {
    if (!search.trim()) return fleet
    const q = search.toLowerCase()
    return fleet.filter((t) =>
      (t.truck_id || "").toLowerCase().includes(q) ||
      (t.driver_name || "").toLowerCase().includes(q) ||
      (t.load_code || "").toLowerCase().includes(q) ||
      (t.origin || "").toLowerCase().includes(q) ||
      (t.destination || "").toLowerCase().includes(q) ||
      (t.commodity || "").toLowerCase().includes(q)
    )
  }, [fleet, search])

  const selectedCompany = COMPANIES.find((c) => c.id === companyId) || COMPANIES[0]
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined" || !fleet.length) return

    const loadMap = () => {
      if (!window.maplibregl || !mapRef.current) return

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      const map = new window.maplibregl.Map({
        container: mapRef.current,
        style: {
          version: 8,
          sources: {
            carto: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
                "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
              ],
              tileSize: 256,
            },
          },
          layers: [{ id: "base", type: "raster", source: "carto", minzoom: 0, maxzoom: 20 }],
        },
        center: [-98, 39],
        zoom: 3.8,
        maxBounds: [[-130, 22], [-64, 52]],
      })

      map.once("style.load", () => {
        const validTrucks = fleet.filter((t) => t.lat && t.lng)

        const features = validTrucks.map((t) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [t.lng, t.lat] },
          properties: {
            id: t.truck_id,
            driver: t.driver_name,
            status: t.status,
            origin: t.origin,
            destination: t.destination,
            commodity: t.commodity,
            weight: t.weight,
            progress: t.progress,
            load_code: t.load_code,
            eta: t.eta,
            miles: t.miles,
            hos_remaining: t.hos_remaining,
          },
        }))

        map.addSource("trucks", {
          type: "geojson",
          data: { type: "FeatureCollection", features },
        })

        // Load the FleetCommand shield logo as the marker image
        map.loadImage("/fc-logo.png", (err, image) => {
          if (err || !image) {
            // Fallback to circle markers if image fails to load
            map.addLayer({
              id: "truck-markers",
              type: "circle",
              source: "trucks",
              paint: {
                "circle-radius": 8,
                "circle-color": ["case", ["==", ["get", "status"], "transit"], "#1e88e5", "#94a3b8"],
                "circle-stroke-width": 3,
                "circle-stroke-color": "#ffffff",
              },
            })
          } else {
            map.addImage("fc-shield", image)
            map.addLayer({
              id: "truck-markers",
              type: "symbol",
              source: "trucks",
              layout: {
                "icon-image": "fc-shield",
                "icon-size": 0.075,
                "icon-anchor": "center",
                "icon-allow-overlap": true,
              },
            })
          }

          // Fit bounds to all trucks in this fleet
          if (features.length > 1) {
            const lngs = features.map((f) => f.geometry.coordinates[0])
            const lats = features.map((f) => f.geometry.coordinates[1])
            map.fitBounds(
              [
                [Math.min(...lngs) - 1.5, Math.min(...lats) - 1.5],
                [Math.max(...lngs) + 1.5, Math.max(...lats) + 1.5],
              ],
              { padding: 50, maxZoom: 8 }
            )
          } else if (features.length === 1) {
            map.setCenter(features[0].geometry.coordinates)
            map.setZoom(7)
          }

          // Rich popup on marker click
          map.on("click", "truck-markers", (e) => {
            const p = e.features[0].properties
            const isTransit = p.status === "transit"
            const statusColor = isTransit ? "#16a34a" : "#6b7280"
            const statusBg = isTransit ? "#f0fdf4" : "#f3f4f6"
            const statusBorder = isTransit ? "#bbf7d0" : "#e5e7eb"
            const statusLabel = isTransit ? "In Transit" : "At Rest"
            const weight = p.weight ? `${Number(p.weight).toLocaleString()} lbs` : "--"
            const progress = p.progress || 0

            const html = `
              <div style="font-family:Inter,system-ui,sans-serif;min-width:280px;max-width:320px;padding:0;border-radius:12px;overflow:hidden;">
                <div style="background:linear-gradient(135deg,#0a2540,#1b3a5c);padding:16px 18px 14px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${p.id}</span>
                    <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;color:${statusColor};background:${statusBg};border:1px solid ${statusBorder};">${statusLabel}</span>
                  </div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.65);font-weight:500;">${p.driver}</div>
                </div>
                <div style="background:#ffffff;padding:14px 18px;">
                  <div style="margin-bottom:12px;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#334155;margin-bottom:4px;">
                      <span style="width:8px;height:8px;border-radius:50%;background:#1e88e5;flex-shrink:0;display:inline-block;"></span>
                      <span style="font-weight:600;">${p.origin || "N/A"}</span>
                    </div>
                    <div style="width:1px;height:10px;background:#e2e8f0;margin-left:3.5px;margin-bottom:4px;"></div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#334155;">
                      <span style="width:8px;height:8px;border-radius:50%;background:#f59e0b;flex-shrink:0;display:inline-block;"></span>
                      <span style="font-weight:600;">${p.destination || "N/A"}</span>
                    </div>
                  </div>
                  <div style="margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:5px;">
                      <span style="font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Progress</span>
                      <span style="font-weight:700;color:#0a2540;">${progress}%</span>
                    </div>
                    <div style="height:5px;border-radius:3px;background:#e2e8f0;overflow:hidden;">
                      <div style="height:100%;width:${progress}%;border-radius:3px;background:linear-gradient(90deg,#1e88e5,#1565c0);"></div>
                    </div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Commodity</div>
                      <div style="font-weight:600;color:#334155;">${p.commodity || "--"}</div>
                    </div>
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Weight</div>
                      <div style="font-weight:600;color:#334155;">${weight}</div>
                    </div>
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">ETA</div>
                      <div style="font-weight:600;color:#334155;">${p.eta || "--"}</div>
                    </div>
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Miles</div>
                      <div style="font-weight:600;color:#334155;">${p.miles ? Number(p.miles).toLocaleString() : "--"}</div>
                    </div>
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">HOS Left</div>
                      <div style="font-weight:600;color:#334155;">${p.hos_remaining != null ? p.hos_remaining + "h" : "--"}</div>
                    </div>
                    <div>
                      <div style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">Load Code</div>
                      <div style="font-weight:600;color:#334155;font-size:11px;">${p.load_code || "--"}</div>
                    </div>
                  </div>
                </div>
              </div>
            `

            new window.maplibregl.Popup({ offset: 14, maxWidth: "340px", className: "fcp-popup" })
              .setLngLat(e.lngLat)
              .setHTML(html)
              .addTo(map)
          })

          map.on("mouseenter", "truck-markers", () => {
            map.getCanvas().style.cursor = "pointer"
          })
          map.on("mouseleave", "truck-markers", () => {
            map.getCanvas().style.cursor = ""
          })
        })
      })

      mapInstanceRef.current = map
    }

    if (!window.maplibregl) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css"
      document.head.appendChild(link)
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js"
      script.onload = loadMap
      document.head.appendChild(script)
    } else {
      loadMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [fleet])

  return (
    <main style={{ paddingTop: 72, minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Header Bar */}
      <div style={{
        background: "linear-gradient(135deg, #0a2540, #1b3a5c)",
        padding: "24px 32px",
        color: "white",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}>
            {/* Fleet Selector */}
            <div style={{ flex: "0 0 auto" }}>
              <label style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                opacity: 0.6,
                marginBottom: 6,
              }}>
                Select Fleet
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  style={{
                    appearance: "none",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 10,
                    color: "white",
                    padding: "12px 48px 12px 16px",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    minWidth: 260,
                    outline: "none",
                  }}
                >
                  {COMPANIES.map((c) => (
                    <option key={c.id} value={c.id} style={{ color: "#0a2540" }}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: 12,
                  opacity: 0.6,
                }}>
                  &#9662;
                </span>
              </div>
            </div>

            {/* Title */}
            <div style={{ textAlign: "center", flex: "1 1 auto" }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, margin: 0 }}>
                Live Fleet Tracking
              </h1>
              {updated && (
                <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>
                  Last updated: {new Date(updated).toLocaleTimeString()} -- Refreshes every 60s
                </div>
              )}
            </div>

            {/* Search */}
            <div style={{ flex: "0 0 auto" }}>
              <label style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                opacity: 0.6,
                marginBottom: 6,
              }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Truck ID, driver, tracking code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  color: "white",
                  padding: "12px 16px",
                  fontSize: 15,
                  fontFamily: "inherit",
                  minWidth: 260,
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {stats && !loading && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px 0" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
          }}>
            <StatCard label="Active Trucks" value={stats.total_trucks} />
            <StatCard label="In Transit" value={stats.in_transit} color="#1e88e5" />
            <StatCard label="At Rest" value={stats.at_rest} color="#94a3b8" />
            <StatCard label="Fleet Miles Today" value={stats.fleet_miles_today} color="#f59e0b" />
            <StatCard label="On-Time Rate" value={`${stats.on_time_rate}%`} color="#16a34a" />
          </div>
        </div>
      )}

      {/* Live Map */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px 0" }}>
        <div
          ref={mapRef}
          style={{
            height: 420,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            background: "#e2e8f0",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px 48px" }}>
        {loading && <LoadingState />}
        {error && (
          <ErrorState
            message={error}
            onRetry={() => { setLoading(true); fetchFleet(companyId) }}
          />
        )}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState search={search} companyName={selectedCompany.name} />
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 16, fontWeight: 500 }}>
              Showing {filtered.length} of {fleet.length} vehicles for {selectedCompany.name}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: 16,
            }}>
              {filtered.map((truck) => (
                <TruckCard key={truck.truck_id + truck.load_code} truck={truck} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      border: "1px solid #e2e8f0",
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 28,
        fontWeight: 800,
        color: color || "#0a2540",
        letterSpacing: -0.5,
      }}>
        {value}
      </div>
    </div>
  )
}

function TruckCard({ truck }) {
  const isTransit = truck.status === "transit"
  const statusLabel = isTransit ? "In Transit" : "At Rest"
  const statusColor = isTransit ? "#16a34a" : "#94a3b8"
  const statusBg = isTransit ? "#f0fdf4" : "#f8fafc"
  const progress = truck.progress || 0
  const weight = truck.weight ? `${Number(truck.weight).toLocaleString()} lbs` : ""

  return (
    <div style={{
      background: "white",
      borderRadius: 14,
      padding: 24,
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
      }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#0a2540", letterSpacing: -0.3 }}>
            {truck.truck_id}
          </div>
          <div style={{ fontSize: 14, color: "#64748b", marginTop: 2 }}>
            {truck.driver_name}
          </div>
        </div>
        <span style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
          color: statusColor,
          background: statusBg,
          border: `1px solid ${isTransit ? "#bbf7d0" : "#e2e8f0"}`,
        }}>
          {statusLabel}
        </span>
      </div>

      {/* Route */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#334155" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1e88e5", flexShrink: 0 }} />
          <span style={{ fontWeight: 500 }}>{truck.origin || "N/A"}</span>
        </div>
        <div style={{ width: 1, height: 12, background: "#e2e8f0", marginLeft: 3.5 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#334155" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
          <span style={{ fontWeight: 500 }}>{truck.destination || "N/A"}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#94a3b8",
          marginBottom: 6,
        }}>
          <span>Progress</span>
          <span style={{ fontWeight: 700, color: "#0a2540" }}>{progress}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "#e2e8f0", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: 3,
            background: "linear-gradient(90deg, #1e88e5, #1565c0)",
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
        {truck.load_code && <DetailItem label="Tracking" value={truck.load_code} />}
        {truck.commodity && <DetailItem label="Commodity" value={truck.commodity} />}
        {weight && <DetailItem label="Weight" value={weight} />}
        {truck.eta && <DetailItem label="ETA" value={truck.eta} />}
        {truck.miles > 0 && <DetailItem label="Miles" value={truck.miles.toLocaleString()} />}
        {truck.hos_remaining !== undefined && <DetailItem label="HOS Left" value={`${truck.hos_remaining}h`} />}
      </div>
    </div>
  )
}

function DetailItem({ label, value }) {
  return (
    <div>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.3,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#334155", marginTop: 1 }}>
        {value}
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{
        width: 48,
        height: 48,
        border: "4px solid #e2e8f0",
        borderTop: "4px solid #1e88e5",
        borderRadius: "50%",
        margin: "0 auto 20px",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{ fontSize: 16, fontWeight: 600, color: "#334155" }}>Loading fleet data...</div>
      <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>Fetching live positions and status</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "80px 20px",
      background: "white",
      borderRadius: 16,
      border: "1px solid #fecaca",
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>&#9888;</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#0a2540", marginBottom: 8 }}>
        Failed to Load Fleet Data
      </div>
      <div style={{ fontSize: 15, color: "#64748b", marginBottom: 24 }}>{message}</div>
      <button
        onClick={onRetry}
        style={{
          padding: "12px 32px",
          background: "linear-gradient(135deg, #1e88e5, #1565c0)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Retry
      </button>
    </div>
  )
}

function EmptyState({ search, companyName }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "80px 20px",
      background: "white",
      borderRadius: 16,
      border: "1px solid #e2e8f0",
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>&#128722;</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#0a2540", marginBottom: 8 }}>
        {search ? "No Matching Vehicles" : "No Vehicles Found"}
      </div>
      <div style={{ fontSize: 15, color: "#64748b" }}>
        {search
          ? `No trucks in ${companyName} match "${search}". Try a different search term.`
          : `${companyName} does not have any active vehicles right now.`}
      </div>
    </div>
  )
}
