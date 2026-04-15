import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
  title: "FleetCommand Pro - AI-Powered Fleet Management Platform",
  description: "Enterprise fleet management, dispatch, compliance, and live tracking platform. White-label ready. Owned and operated by Start My Business Inc.",
  keywords: "fleet management, trucking software, dispatch, fleet tracking, white label, TMS",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
        <body>
          <nav className="site-nav">
            <a href="/" className="nav-brand">
              <img src="/fc-logo.png" alt="FleetCommand Enterprise" style={{height:"88px",width:"auto"}} />
            </a>
            <ul className="nav-links">
              <li><a href="/#features">Features</a></li>
              <li><a href="/#pricing">Pricing</a></li>
              <li><a href="/white-label">White Label</a></li>
              <li><a href="/add-fleet">Add Your Fleet</a></li>
              <li><a href="/tracking">Live Tracking</a></li>
              <li><a href="/help">Help</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/dashboard" className="nav-cta">Launch Dashboard</a></li>
            </ul>
            <button className="hamburger-btn" id="hamburger" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </nav>

          {children}

          <footer className="site-footer">
            <div className="footer-grid">
              <div className="footer-brand">
                <img src="/fc-logo.png" alt="FleetCommand Enterprise" style={{height:"72px",width:"auto",marginBottom:"8px"}} />
                <p>
                  AI-powered fleet management platform for trucking companies of every size.
                  Built, owned, and maintained by Start My Business Inc.
                </p>
              </div>
              <div className="footer-col">
                <h4>Platform</h4>
                <a href="/#features">Features</a>
                <a href="/#pricing">Pricing</a>
                <a href="/white-label">White Label</a>
                <a href="/add-fleet">Add Your Fleet</a>
              </div>
              <div className="footer-col">
                <h4>Resources</h4>
                <a href="/help">Help Center</a>
                <a href="/support">Contact Support</a>
                <a href="/tracking">Live Tracking</a>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <a href="/terms">Terms of Use</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/esign">E-Sign Consent</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div>2026 FleetCommand Pro. All rights reserved. Owned and operated by Start My Business Inc.</div>
              <div>
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
                <a href="/esign">E-Sign</a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
