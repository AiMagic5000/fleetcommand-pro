import Faq from "./faq"

export default function AddFleet() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Get Your Fleet Online in Minutes</h1>
          <p className="subtitle">
            Five simple steps between you and a fully managed dispatch,
            tracking, and compliance system. No hardware required.
          </p>
          <div className="hero-btns">
            <a href="/fcp-dashboard.html" className="btn-primary">Create Your Account</a>
            <a href="#steps" className="btn-outline">See the Steps</a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" id="steps">
        <div className="section-header">
          <h2>Five Steps to Go Live</h2>
          <p>Walk through each step at your own pace. Most fleets finish the same day they start.</p>
        </div>
        <div className="steps-vertical">
          <div className="step-v-card">
            <div className="step-v-number">1</div>
            <div className="step-v-content">
              <h3>Create Your Account</h3>
              <p>
                Pick a plan (or start with the 7-day free trial) and enter your
                company name, email, and phone number. You will get a confirmation
                email with your login credentials right away.
              </p>
            </div>
          </div>
          <div className="step-v-card">
            <div className="step-v-number">2</div>
            <div className="step-v-content">
              <h3>Enter Fleet Details</h3>
              <p>
                Add your trucks by VIN, unit number, or license plate. Then add
                your drivers with their CDL information. You can do this one at a
                time or upload a CSV for bulk import.
              </p>
            </div>
          </div>
          <div className="step-v-card">
            <div className="step-v-number">3</div>
            <div className="step-v-content">
              <h3>Connect ELD or GPS</h3>
              <p>
                Link your existing ELD or GPS devices. We integrate with
                KeepTruckin, Samsara, Geotab, Omnitracs, and dozens more.
                If your provider supports API access, the connection takes under five minutes.
              </p>
            </div>
          </div>
          <div className="step-v-card">
            <div className="step-v-number">4</div>
            <div className="step-v-content">
              <h3>Configure Dispatch Settings</h3>
              <p>
                Set your service areas, load preferences, rate sheets, and driver
                availability windows. The AI dispatch engine uses these settings to
                assign loads automatically when you are ready.
              </p>
            </div>
          </div>
          <div className="step-v-card">
            <div className="step-v-number">5</div>
            <div className="step-v-content">
              <h3>Go Live</h3>
              <p>
                Hit the launch button and your dashboard lights up. Start
                dispatching, tracking, and invoicing from one place. Our onboarding
                team is available to walk you through your first load if you want a guided start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section section-alt" id="requirements">
        <div className="section-header">
          <h2>What You Need to Get Started</h2>
          <p>Have these ready and the setup process goes fast.</p>
        </div>
        <div className="card-grid requirements-grid">
          <div className="card">
            <div className="card-icon icon-blue">&#128196;</div>
            <h3>USDOT Number</h3>
            <p>
              Your active USDOT number is required for compliance features
              and ELD integration. If you do not have one yet, we can point
              you to the FMCSA registration process.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-orange">&#128666;</div>
            <h3>Truck List</h3>
            <p>
              VIN, unit number, year, make, and model for each vehicle.
              You can add trucks individually or upload a spreadsheet.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-green">&#128100;</div>
            <h3>Driver Information</h3>
            <p>
              Name, CDL number, and state of issue for each driver.
              Phone numbers are optional but help with in-app messaging.
            </p>
          </div>
          <div className="card">
            <div className="card-icon icon-purple">&#128225;</div>
            <h3>ELD Device or GPS Tracker</h3>
            <p>
              Any FMCSA-registered ELD or commercial GPS tracker that offers API access.
              Not sure if yours is compatible? Check our integrations page or ask support.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to the questions we hear most during onboarding.</p>
        </div>
        <div className="container">
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="section-header">
          <h2>Start Your Free 7-Day Trial</h2>
          <p>
            You will not be charged for 7 days. Full access to every feature.
            Cancel before day 8 and you pay nothing.
          </p>
        </div>
        <div className="cta-btns">
          <a href="/fcp-dashboard.html" className="btn-primary">Start Free Trial</a>
          <a href="/#pricing" className="btn-outline">Compare Plans</a>
        </div>
      </section>
    </main>
  )
}
