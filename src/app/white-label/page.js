export default function WhiteLabel() {
  return (
    <main>
      {/* Hero with background image + dark overlay */}
      <section className="hero" style={{backgroundImage:"url(/hero-bg.png)",backgroundSize:"cover",backgroundPosition:"center",padding:0}}>
        <div className="hero-overlay">
        <div className="hero-content">
          <h1>Launch Your Own Fleet Management Platform</h1>
          <p className="subtitle">
            Put your brand on a proven, full-featured TMS.
            We build and maintain the technology -- you own the customer relationship.
          </p>
          <div className="hero-btns">
            <a href="/support" className="btn-primary">Apply for White Label</a>
            <a href="#pricing-wl" className="btn-outline" style={{color:"white"}}>See Pricing</a>
          </div>
        </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="section">
        <div className="section-header">
          <h2>What You Get</h2>
          <p>
            A turnkey fleet management platform that looks and feels like yours from day one.
          </p>
        </div>
        <div className="card-grid">
          <div className="card">
            <div className="card-icon icon-blue">&#127912;</div>
            <h3>Your Brand and Domain</h3>
            <p>
              Custom logo, colors, and domain name. Your customers never see "FleetCommand" anywhere.
              The whole experience carries your company identity.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-orange">&#128187;</div>
            <h3>Full Platform Access</h3>
            <p>
              Every feature included -- GPS tracking, AI dispatch, compliance,
              invoicing, analytics. Nothing held back, nothing extra to unlock.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-green">&#128272;</div>
            <h3>Admin Control Panel</h3>
            <p>
              Manage your clients, monitor usage, set pricing tiers,
              and pull reports from a dedicated admin dashboard.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-purple">&#128179;</div>
            <h3>Payment Processing</h3>
            <p>
              Integrated Stripe billing. Charge your customers directly,
              set your own prices, and keep the margin between your rate and ours.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-teal">&#128222;</div>
            <h3>Dedicated Support</h3>
            <p>
              Priority onboarding, a dedicated account manager, and
              technical support for your team so your customers always get fast answers.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-red">&#128640;</div>
            <h3>Ongoing Updates</h3>
            <p>
              Every new feature, security patch, and platform improvement rolls
              out to your instance automatically. Zero maintenance on your end.
            </p>
          </div>
        </div>
      </section>

      {/* How the Business Works */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>How the Business Model Works</h2>
          <p>
            Sell fleet management subscriptions under your brand.
            We split the revenue and handle all the infrastructure.
          </p>
        </div>
        <div className="steps-row">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Set Up Your Platform</h3>
            <p>
              We configure your branded instance with your logo, domain, and color scheme.
              Typical setup takes 5-7 business days.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Sign Up Fleets</h3>
            <p>
              Market to trucking companies, freight brokers, and owner-operators.
              They sign up through your platform and pay you directly.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Earn Commissions</h3>
            <p>
              50% on every referral sale and 50% on every monthly subscription.
              The more fleets you bring on, the more you earn.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing-wl">
        <div className="section-header">
          <h2>White Label Pricing</h2>
          <p>One-time setup, then a flat monthly fee. No per-seat or per-truck charges on your end.</p>
        </div>
        <div className="pricing-grid wl-pricing">
          <div className="pricing-card featured">
            <div className="badge">White Label Partner</div>
            <h3>Branded Platform</h3>
            <div className="price">$2,495</div>
            <div className="price-note">One-time setup fee</div>
            <ul>
              <li>Custom branding (logo, colors, domain)</li>
              <li>Full platform -- all features included</li>
              <li>Admin control panel</li>
              <li>Integrated Stripe billing</li>
              <li>Priority onboarding and support</li>
              <li>3 months of hosting included</li>
            </ul>
            <a href="/support" className="btn-primary">Apply Now</a>
          </div>
          <div className="pricing-card">
            <h3>After Included Period</h3>
            <div className="price">$129<span>/mo</span></div>
            <div className="price-note">Starts month 4</div>
            <ul>
              <li>Platform hosting and maintenance</li>
              <li>All feature updates and patches</li>
              <li>Continued admin panel access</li>
              <li>Technical support for your team</li>
              <li>SSL certificate management</li>
              <li>99.9% uptime SLA</li>
            </ul>
            <a href="/support" className="btn-primary">Get Started</a>
          </div>
        </div>
      </section>

      {/* Commission Breakdown */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>Commission Breakdown</h2>
          <p>Two revenue streams: a payout on every sale plus ongoing monthly residuals.</p>
        </div>
        <div className="commission-grid">
          <div className="card commission-card">
            <h3>Per-Referral Commission</h3>
            <div className="commission-amount">$1,247.50</div>
            <p>50% of the $2,495 setup fee for each new white-label partner you bring in.</p>
          </div>
          <div className="card commission-card">
            <h3>Recurring Revenue</h3>
            <div className="commission-amount">$64.50<span>/mo each</span></div>
            <p>50% of the $129 monthly fee from every active subscriber on your platform.</p>
          </div>
          <div className="card commission-card">
            <h3>Enterprise Referrals</h3>
            <div className="commission-amount">$3,997.50<span> per sale</span></div>
            <p>
              50% of the $7,995+ Enterprise setup fee, plus $247.50/mo recurring
              from each $495/mo Enterprise subscriber on your platform.
            </p>
          </div>
        </div>
      </section>

      {/* Owned by SMB */}
      <section className="section">
        <div className="section-header">
          <h2>Backed by Start My Business Inc.</h2>
          <p>
            FleetCommand Pro is built, owned, and operated by Start My Business Inc. --
            a brand management and business buildout company that specializes
            in launching SaaS products for underserved industries. You are partnering
            with an established company, not a weekend project.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="section-header">
          <h2>Ready to Launch Your Fleet Platform?</h2>
          <p>
            Fill out the application and our team will reach out within 24 hours
            to walk you through the setup process.
          </p>
        </div>
        <div className="cta-btns">
          <a href="/support" className="btn-primary">Apply for White Label</a>
          <a href="/#pricing" className="btn-outline">Compare Plans</a>
        </div>
      </section>
    </main>
  )
}
