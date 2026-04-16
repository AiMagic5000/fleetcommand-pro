export default function Home() {
  return (
    <main>
      {/* Hero with background image + dark overlay */}
      <section className="hero" style={{backgroundImage:"url(/hero-bg.png)",backgroundSize:"cover",backgroundPosition:"center",padding:0}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="trusted-badge">&#9733; Trusted by 500+ Fleets Nationwide</div>
            <h1>Enterprise Fleet Intelligence Platform</h1>
            <p className="subtitle">
              AI-powered dispatch, real-time tracking, compliance automation, and autonomous fleet
              readiness -- built for the companies that move America.
            </p>
            <div className="hero-btns">
              <a href="/fcp-dashboard.html" className="btn-primary pulse-glow">Start Free Trial</a>
              <a href="#demo" className="btn-outline" style={{color:"white"}}>Watch Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Company Logos */}
      <section className="marquee-section">
        <div className="marquee-label">Trusted by Industry Leaders</div>
        <div className="marquee-track">
          <div className="marquee-item">Apex Freight Group</div>
          <div className="marquee-item">Titan Logistics</div>
          <div className="marquee-item">CrossCountry Carriers</div>
          <div className="marquee-item">Liberty Transport Co.</div>
          <div className="marquee-item">Redline Hauling</div>
          <div className="marquee-item">Summit Express</div>
          <div className="marquee-item">Pinnacle Fleet Services</div>
          <div className="marquee-item">Horizon Trucking</div>
          <div className="marquee-item">Apex Freight Group</div>
          <div className="marquee-item">Titan Logistics</div>
          <div className="marquee-item">CrossCountry Carriers</div>
          <div className="marquee-item">Liberty Transport Co.</div>
          <div className="marquee-item">Redline Hauling</div>
          <div className="marquee-item">Summit Express</div>
          <div className="marquee-item">Pinnacle Fleet Services</div>
          <div className="marquee-item">Horizon Trucking</div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-alt">
        <div className="stats-row stagger-children">
          <div className="stat-box animate-fadeInUp">
            <div className="stat-number">500+</div>
            <div className="stat-label">Fleets Managed</div>
          </div>
          <div className="stat-box animate-fadeInUp">
            <div className="stat-number">15,000+</div>
            <div className="stat-label">Trucks Tracked</div>
          </div>
          <div className="stat-box animate-fadeInUp">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Platform Uptime</div>
          </div>
          <div className="stat-box animate-fadeInUp">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Live Support</div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section" id="features">
        <div className="section-header">
          <h2>Everything Your Fleet Needs</h2>
          <p>
            Six core tools that replace a dozen spreadsheets,
            three phone calls, and a whole lot of guesswork.
          </p>
        </div>
        <div className="card-grid stagger-children">
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-blue">&#128205;</div>
            <h3>Live GPS Tracking</h3>
            <p>
              See every truck on a map, updated every 30 seconds.
              Geofence alerts, breadcrumb trails, and idle-time reports come standard.
            </p>
          </div>
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-orange">&#129302;</div>
            <h3>AI Dispatch</h3>
            <p>
              Our routing engine picks the best driver for each load based on
              location, hours of service, and equipment type. Fewer empty miles, more revenue.
            </p>
          </div>
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-green">&#128221;</div>
            <h3>Compliance and ELD</h3>
            <p>
              Automatic HOS logging, DVIR forms, and IFTA reporting.
              Stay audit-ready without manual data entry.
            </p>
          </div>
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-purple">&#128176;</div>
            <h3>Invoicing</h3>
            <p>
              Generate invoices from completed loads in one click.
              Supports factoring integration, QuickBooks sync, and custom payment terms.
            </p>
          </div>
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-teal">&#127760;</div>
            <h3>Multi-Tenant White Label</h3>
            <p>
              Run FleetCommand Pro under your own brand. Your logo, your domain,
              your customers -- we handle the tech behind the scenes.
            </p>
          </div>
          <div className="card animate-fadeInUp">
            <div className="card-icon icon-red">&#128200;</div>
            <h3>Analytics Dashboard</h3>
            <p>
              Revenue per mile, fuel costs, driver performance, and on-time delivery rates.
              Real numbers that help you make better decisions.
            </p>
          </div>
        </div>
      </section>

      {/* AI Automation Suite */}
      <section className="section section-alt" id="automation">
        <div className="section-header">
          <h2>Built-In Sales and Outreach Automation</h2>
          <p>
            Every FleetCommand Enterprise license includes a full AI-powered sales engine
            to help you grow.
          </p>
        </div>
        <div className="ai-grid stagger-children">
          <div className="ai-card animate-fadeInUp">
            <div className="ai-card-icon icon-orange">&#128266;</div>
            <h3>AI Voice Drops</h3>
            <p>
              Automated ringless voicemail campaigns reach prospects without interrupting their day.
              Schedule drops by region, fleet size, or lead score.
            </p>
          </div>
          <div className="ai-card animate-fadeInUp">
            <div className="ai-card-icon icon-blue">&#9993;</div>
            <h3>Email Campaign Engine</h3>
            <p>
              Multi-step drip sequences with open tracking, A/B testing, and smart follow-ups.
              Connect your domain and start sending in minutes.
            </p>
          </div>
          <div className="ai-card animate-fadeInUp">
            <div className="ai-card-icon icon-green">&#129302;</div>
            <h3>AI Sales Assistant</h3>
            <p>
              A trained AI agent handles inbound calls, qualifies leads, books demos, and follows
              up automatically. Works 24/7 so your team does not have to.
            </p>
          </div>
        </div>
      </section>

      {/* How We Partner */}
      <section className="section" id="how-we-work">
        <div className="section-header">
          <h2>How We Partner With Logistics Companies</h2>
          <p>
            We do not just sell software. We build your entire fleet management operation
            from the ground up.
          </p>
        </div>
        <div className="timeline">
          <div className="timeline-item animate-fadeInUp">
            <div className="timeline-dot">1</div>
            <div className="timeline-content">
              <h3>Fleet Assessment</h3>
              <p>
                We audit your current operations -- routes, compliance gaps, driver management,
                and tech stack. Every fleet gets a custom onboarding plan.
              </p>
            </div>
          </div>
          <div className="timeline-item animate-fadeInUp">
            <div className="timeline-dot">2</div>
            <div className="timeline-content">
              <h3>Platform Configuration</h3>
              <p>
                Your FleetCommand instance is configured with your branding, integrations,
                ELD providers, and payment processing. Typical setup: 5-7 business days.
              </p>
            </div>
          </div>
          <div className="timeline-item animate-fadeInUp">
            <div className="timeline-dot">3</div>
            <div className="timeline-content">
              <h3>Training and Launch</h3>
              <p>
                Hands-on training for dispatchers, drivers, and managers. We stay on the call
                until your team is comfortable running every feature.
              </p>
            </div>
          </div>
          <div className="timeline-item animate-fadeInUp">
            <div className="timeline-dot">4</div>
            <div className="timeline-content">
              <h3>Ongoing Optimization</h3>
              <p>
                Monthly performance reviews, route optimization recommendations, and compliance
                audits. Your dedicated account manager keeps your fleet dialed in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous Fleet Readiness */}
      <section className="section section-dark" id="autonomous">
        <div className="section-header">
          <h2>Future-Ready: Autonomous Fleet Integration</h2>
          <p>FleetCommand is being upgraded to support the next generation of freight.</p>
        </div>
        <div className="future-grid stagger-children">
          <div className="future-card animate-fadeInUp">
            <div className="future-card-icon">&#128665;</div>
            <h3>AI-Powered Autonomous Rigs</h3>
            <p>
              Our platform is actively being upgraded to integrate with autonomous semi-trucks.
              Add AI-driven rigs to your existing fleet and manage them from the same dashboard
              alongside your human-operated vehicles.
            </p>
            <div className="future-badge">In Development</div>
          </div>
          <div className="future-card animate-fadeInUp">
            <div className="future-card-icon">&#9881;</div>
            <h3>Robotics for Loading and Unloading</h3>
            <p>
              We are building partnerships with robotics manufacturers to bring automated loading
              and unloading to your terminals. Currently accepting early access applications for
              our waiting list.
            </p>
            <div className="future-badge">Early Access</div>
          </div>
          <div className="future-card animate-fadeInUp">
            <div className="future-card-icon">&#9829;</div>
            <h3>Elderly and Accessibility Load Management</h3>
            <p>
              Specialized autonomous systems designed to assist with load management for aging
              workforce members. Reducing physical strain while maintaining productivity.
            </p>
            <div className="future-badge">Coming Soon</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="section-header">
          <h2>Simple, Honest Pricing</h2>
          <p>One-time setup. No long-term contracts. 7-day free trial on every plan.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Owner Operator</h3>
            <div className="price">$1,295</div>
            <div className="price-note">3 trucks or fewer</div>
            <ul>
              <li>Live GPS tracking</li>
              <li>Basic dispatch board</li>
              <li>ELD compliance logging</li>
              <li>Invoicing with QuickBooks sync</li>
              <li>Email support</li>
              <li>7-day free trial included</li>
            </ul>
            <a href="/fcp-dashboard.html" className="btn-primary">Start Free Trial</a>
          </div>
          <div className="pricing-card featured">
            <div className="badge">Most Popular</div>
            <img src="/fc-pro-logo.png" alt="FleetCommand Pro" style={{height:64,width:"auto",margin:"0 auto 12px",display:"block"}} />
            <h3>Small Fleet Pro</h3>
            <div className="price">$2,495</div>
            <div className="price-note">4+ trucks -- then $129/mo support and licensing</div>
            <ul>
              <li>Everything in Owner Operator</li>
              <li>AI-powered dispatch routing</li>
              <li>IFTA reporting</li>
              <li>Driver performance analytics</li>
              <li>Factoring integration</li>
              <li>Priority phone and chat support</li>
            </ul>
            <a href="/fcp-dashboard.html" className="btn-primary">Start Free Trial</a>
          </div>
          <div className="pricing-card">
            <img src="/fc-enterprise-logo.png" alt="FleetCommand Enterprise" style={{height:64,width:"auto",margin:"0 auto 12px",display:"block"}} />
            <h3>Enterprise</h3>
            <div className="price">$7,995<span>+</span></div>
            <div className="price-note">Custom buildout -- $495/mo support (licensing included)</div>
            <ul>
              <li>Everything in Small Fleet Pro</li>
              <li>White-label option</li>
              <li>Multi-terminal support</li>
              <li>Custom API integrations</li>
              <li>Dedicated account manager</li>
              <li>SLA-backed uptime guarantee</li>
            </ul>
            <a href="/support" className="btn-primary">Call Sales</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>What Fleet Managers Say</h2>
          <p>Real feedback from operators who switched to FleetCommand Pro.</p>
        </div>
        <div className="card-grid testimonial-grid">
          <div className="card testimonial-card">
            <p className="testimonial-text">
              "We cut our dispatch time in half the first week. The AI routing
              alone saved us enough in fuel to pay for three months of the subscription."
            </p>
            <div className="testimonial-author">
              <strong>Marcus Delgado</strong>
              <span>Fleet Manager, Delgado Freight -- 38 trucks</span>
            </div>
          </div>
          <div className="card testimonial-card">
            <p className="testimonial-text">
              "Before FleetCommand we were using paper logs and a whiteboard.
              Now my guys log their hours automatically and I can see every truck on a map. Night and day."
            </p>
            <div className="testimonial-author">
              <strong>Sharon Pratt</strong>
              <span>Owner-Operator, Pratt Hauling -- 4 trucks</span>
            </div>
          </div>
          <div className="card testimonial-card">
            <p className="testimonial-text">
              "The compliance reporting paid for itself after our first DOT audit.
              Everything was organized and ready to go. No scrambling for paperwork."
            </p>
            <div className="testimonial-author">
              <strong>James Okoro</strong>
              <span>Safety Director, Great Lakes Transport -- 120 trucks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo placeholder */}
      <section className="section section-dark" id="demo">
        <div className="section-header">
          <h2>See It in Action</h2>
          <p>A 3-minute walkthrough of the dispatch board, tracking map, and analytics panel.</p>
        </div>
        <div className="demo-placeholder">
          <div className="demo-play">&#9654;</div>
          <p>Demo video coming soon</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section cta-section">
        <div className="section-header">
          <h2>Ready to Modernize Your Fleet?</h2>
          <p>
            Join 500+ fleets that already run on FleetCommand Pro.
            Start your free trial today -- you will not be charged for 7 days.
          </p>
        </div>
        <div className="cta-btns">
          <a href="/fcp-dashboard.html" className="btn-primary">Start Free Trial</a>
          <a href="/support" className="btn-outline-dark">Talk to Sales</a>
        </div>
      </section>
    </main>
  )
}
