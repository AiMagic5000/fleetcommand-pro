"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = "/fcp-dashboard.html"
    }
  }, [isLoaded, isSignedIn])

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid #e2e8f0", borderTop: "4px solid #1e88e5", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
        <div style={{
          maxWidth: 400, background: "white", borderRadius: 16, padding: 40, textAlign: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0",
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>&#128274;</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a2540", marginBottom: 8 }}>Sign In Required</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 24 }}>
            You need to sign in to access the FleetCommand Pro dashboard.
          </p>
          <a href="/sign-in" style={{
            display: "inline-block", padding: "14px 36px",
            background: "linear-gradient(135deg, #ff9800, #f57c00)",
            color: "white", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none",
          }}>
            Sign In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid #e2e8f0", borderTop: "4px solid #1e88e5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#64748b", fontSize: 15 }}>Loading dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
