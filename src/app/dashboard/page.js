"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded) {
      window.location.href = "/fcp-dashboard.html"
    }
  }, [isLoaded])

  return (
    <div style={{ minHeight: "100vh", background: "#0f1724", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 48, height: 48, border: "4px solid #1e293b", borderTop: "4px solid #1e88e5", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
