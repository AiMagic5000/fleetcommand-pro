import "./globals.css"
import MobileNav from "./mobile-nav"
import Chatbot from "./chatbot"

export const metadata = {
  title: "FleetCommand Pro - AI-Powered Fleet Management Platform",
  description: "Enterprise fleet management, dispatch, compliance, and live tracking platform. White-label ready. Owned and operated by Start My Business Inc.",
  keywords: "fleet management, trucking software, dispatch, fleet tracking, white label, TMS",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
}

const BRAND_STYLES = `
.nav-brand-pair { display: flex; align-items: center; gap: 14px; }
.nav-brand-pair img { display: block; }
.nav-brand-pair .nav-brand-secondary { height: 64px; width: auto; padding-left: 14px; border-left: 1px solid var(--gray-200); }
@media (max-width: 1100px) { .nav-brand-pair .nav-brand-secondary { display: none; } }

.footer-brand-pair { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 12px; }
.footer-logo-plate {
  background: #ffffff;
  border-radius: 10px;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18);
}
.footer-logo-plate img { display: block; height: 56px; width: auto; }
@media (max-width: 768px) {
  .footer-brand-pair { justify-content: center; }
  .footer-logo-plate img { height: 48px; }
}
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      </head>
      <body>
        <nav className="site-nav">
          <a href="/" className="nav-brand nav-brand-pair">
            <img src="/fc-logo.png" alt="FleetCommand Enterprise" style={{height:"88px",width:"auto"}} />
            <img src="/fleetcommand-pro-logo.png" alt="FleetCommand Pro" className="nav-brand-secondary" />
          </a>
          <ul className="nav-links">
            <li><a href="/#features">Features</a></li>
            <li><a href="/#pricing">Pricing</a></li>
            <li><a href="/white-label">White Label</a></li>
            <li><a href="/add-fleet">Add Your Fleet</a></li>
            <li><a href="/tracking">Live Tracking</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/fcp-dashboard.html" className="nav-cta">Launch Dashboard</a></li>
          </ul>
          <button className="hamburger-btn" id="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </nav>

        <MobileNav />
        <Chatbot />

        {children}

        <footer className="site-footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-pair">
                <span className="footer-logo-plate">
                  <img src="/fc-logo.png" alt="FleetCommand Enterprise" />
                </span>
                <span className="footer-logo-plate">
                  <img src="/fleetcommand-pro-logo.png" alt="FleetCommand Pro" />
                </span>
              </div>
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
  )
}
