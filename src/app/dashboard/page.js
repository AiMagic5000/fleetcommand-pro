"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"

export default function Dashboard() {
  const { user, isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f1724", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid #1e293b", borderTop: "4px solid #1e88e5", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f1724", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 96 }}>
        <div style={{
          maxWidth: 420, background: "#1a2332", borderRadius: 20, padding: 48, textAlign: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: "1px solid #253040",
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>&#128274;</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Sign In Required</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            Sign in to access your FleetCommand Pro dashboard, manage your fleet, and track shipments.
          </p>
          <a href="/sign-in" style={{
            display: "inline-block", padding: "14px 40px",
            background: "linear-gradient(135deg, #ff9800, #f57c00)",
            color: "white", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none",
          }}>
            Sign In
          </a>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 16 }}>
            Don&apos;t have an account? <a href="/sign-up" style={{ color: "#1e88e5", textDecoration: "none" }}>Sign up free</a>
          </p>
        </div>
      </div>
    )
  }

  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "there"

  const stats = [
    { label: "Active Trucks", value: "0", icon: "\uD83D\uDE9A" },
    { label: "Loads Today", value: "0", icon: "\uD83D\uDCE6" },
    { label: "Drivers Online", value: "0", icon: "\uD83D\uDC64" },
    { label: "Compliance Score", value: "--", icon: "\u2705" },
  ]

  const quickActions = [
    { label: "Add a Truck", href: "/add-fleet", icon: "\u2795" },
    { label: "Live Tracking", href: "/tracking", icon: "\uD83D\uDDFA\uFE0F" },
    { label: "Help Center", href: "/help", icon: "\u2753" },
    { label: "Contact Support", href: "/support", icon: "\uD83D\uDCDE" },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#0f1724", paddingTop: 100, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0 }}>
              Welcome back, {firstName}
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 15, marginTop: 4 }}>
              FleetCommand Pro Dashboard
            </p>
          </div>
          <SignOutButton>
            <button style={{
              padding: "10px 20px", background: "#1e293b", color: "#94a3b8", border: "1px solid #334155",
              borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600,
            }}>
              Sign Out
            </button>
          </SignOutButton>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 36,
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "#1a2332", borderRadius: 16, padding: "24px 20px",
              border: "1px solid #253040",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "linear-gradient(135deg, #1e3a5f, #1e88e5)", borderRadius: 20,
          padding: 36, marginBottom: 36, border: "1px solid rgba(30,136,229,0.3)",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: 8 }}>
            Get Started with FleetCommand Pro
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, marginBottom: 20, maxWidth: 600 }}>
            Add your trucks, connect your ELD devices, and start managing your fleet. Our team is here to help you get set up.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/add-fleet" style={{
              padding: "12px 24px", background: "#ff9800", color: "#fff", borderRadius: 10,
              fontWeight: 700, fontSize: 15, textDecoration: "none",
            }}>
              Add Your Fleet
            </a>
            <a href="/support" style={{
              padding: "12px 24px", background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 10,
              fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)",
            }}>
              Schedule a Demo
            </a>
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Quick Actions</h3>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14,
        }}>
          {quickActions.map((a) => (
            <a key={a.label} href={a.href} style={{
              background: "#1a2332", borderRadius: 14, padding: "20px 18px",
              border: "1px solid #253040", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 14,
              transition: "border-color 0.15s",
            }}>
              <span style={{ fontSize: 24 }}>{a.icon}</span>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15 }}>{a.label}</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
