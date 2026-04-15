export const metadata = {
  title: "Help Center - FleetCommand Pro",
  description: "Find answers, guides, and support resources for FleetCommand Pro fleet management platform.",
}

const categories = [
  {
    icon: "🚀",
    title: "Getting Started",
    description: "Set up your account, add your first truck, and configure dispatch settings in under 10 minutes.",
    slug: "getting-started",
  },
  {
    icon: "🚛",
    title: "Fleet Management",
    description: "Manage vehicles, maintenance schedules, driver assignments, and compliance documents.",
    slug: "fleet-management",
  },
  {
    icon: "📍",
    title: "Dispatch & Routing",
    description: "Create loads, optimize routes, manage pickups and deliveries, and track shipments in real time.",
    slug: "dispatch-routing",
  },
  {
    icon: "💳",
    title: "Billing & Subscriptions",
    description: "Update payment methods, view invoices, change plans, and manage per-truck billing.",
    slug: "billing",
  },
  {
    icon: "🏷️",
    title: "White Label Partners",
    description: "Brand the platform as your own. Custom domains, logos, colors, and client-facing tracking pages.",
    slug: "white-label",
  },
  {
    icon: "🔌",
    title: "API & Integrations",
    description: "Connect to ELD providers, accounting software, load boards, and third-party logistics tools.",
    slug: "api-integrations",
  },
]

const popularArticles = [
  { title: "How do I add a new truck to my fleet?", slug: "add-truck" },
  { title: "Setting up your first dispatch load", slug: "first-load" },
  { title: "How to invite drivers to the platform", slug: "invite-drivers" },
  { title: "Connecting your ELD device", slug: "connect-eld" },
  { title: "Understanding the live tracking dashboard", slug: "tracking-dashboard" },
  { title: "How billing works for multi-truck fleets", slug: "billing-explained" },
  { title: "Setting up a white label domain", slug: "white-label-setup" },
  { title: "Generating fleet performance reports", slug: "fleet-reports" },
]

export default function HelpPage() {
  return (
    <main>
      <section className="hero" style={{ padding: "140px 32px 80px" }}>
        <div className="hero-content">
          <h1>Help Center</h1>
          <p className="subtitle">
            Search our knowledge base or browse by category to find the answers you need.
          </p>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              overflow: "hidden",
            }}>
              <input
                type="text"
                placeholder="Search help articles..."
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: 16,
                  fontFamily: "inherit",
                }}
              />
              <button style={{
                padding: "16px 28px",
                background: "linear-gradient(135deg, #ff9800, #f57c00)",
                border: "none",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
              }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p>Pick a topic below to find step-by-step guides and troubleshooting tips.</p>
        </div>
        <div className="card-grid">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/help/${cat.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card" style={{ height: "100%" }}>
                <div
                  className="card-icon"
                  style={{ background: "rgba(30,136,229,0.08)", fontSize: 28 }}
                >
                  {cat.icon}
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div style={{
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1e88e5",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  View Articles
                  <span style={{ fontSize: 18 }}>&rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-header">
          <h2>Popular Articles</h2>
          <p>These are the questions our support team answers most often.</p>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {popularArticles.map((article, i) => (
            <a
              key={article.slug}
              href={`/help/articles/${article.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 24px",
                background: "white",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                marginBottom: 10,
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
            >
              <span style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(30,136,229,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#1e88e5",
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#1e293b",
              }}>
                {article.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: "center" }}>
        <div className="section-header">
          <h2>Still Need Help?</h2>
          <p>Our support team typically responds within 2 hours during business days.</p>
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/support" className="btn-primary">Contact Support</a>
          <a
            href="mailto:support@getfleetcommand.com"
            className="btn-outline"
          >
            Email Us
          </a>
        </div>
      </section>
    </main>
  )
}
