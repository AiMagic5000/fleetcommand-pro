"use client"

import { useEffect } from "react"

export default function MobileNav() {
  useEffect(() => {
    const hamburger = document.getElementById("hamburger")
    const overlay = document.getElementById("mobileNavOverlay")
    const closeBtn = document.getElementById("mobileNavClose")
    const nav = document.getElementById("mobileNav")
    if (!hamburger || !nav) return

    function toggle() {
      nav.classList.toggle("active")
      overlay.classList.toggle("active")
    }

    function close() {
      nav.classList.remove("active")
      overlay.classList.remove("active")
    }

    hamburger.addEventListener("click", toggle)
    if (overlay) overlay.addEventListener("click", close)
    if (closeBtn) closeBtn.addEventListener("click", close)

    // Close on link click
    const links = nav.querySelectorAll("a")
    links.forEach((a) => a.addEventListener("click", close))

    return () => {
      hamburger.removeEventListener("click", toggle)
      if (overlay) overlay.removeEventListener("click", close)
      if (closeBtn) closeBtn.removeEventListener("click", close)
      links.forEach((a) => a.removeEventListener("click", close))
    }
  }, [])

  return (
    <>
      <div className="mobile-nav-overlay" id="mobileNavOverlay" />
      <div className="mobile-nav" id="mobileNav">
        <button className="mobile-nav-close" id="mobileNavClose">&times;</button>
        <a href="/">Home</a>
        <a href="/#features">Features</a>
        <a href="/#pricing">Pricing</a>
        <a href="/white-label">White Label</a>
        <a href="/add-fleet">Add Your Fleet</a>
        <a href="/tracking">Live Tracking</a>
        <a href="/help">Help Center</a>
        <a href="/support">Support</a>
        <a href="/api/tms" className="mobile-nav-cta">Launch Dashboard</a>
      </div>
    </>
  )
}
