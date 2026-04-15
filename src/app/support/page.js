"use client"

import { useState } from "react"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  const faqs = [
    {
      q: "What are your support hours?",
      a: "Our team is available Monday through Friday, 8:00 AM to 6:00 PM Central Time. Emergency support for fleet-down situations is available 24/7 for Business and Enterprise plans.",
    },
    {
      q: "How fast will I get a response?",
      a: "Most inquiries receive a reply within 2 hours during business hours. Technical issues affecting active fleets are prioritized and typically handled within 30 minutes.",
    },
    {
      q: "Can I schedule a live demo of the platform?",
      a: "Absolutely. Select 'General Inquiry' in the form above and mention you want a demo. We will set up a 30-minute walkthrough at a time that works for you.",
    },
    {
      q: "I am a white label partner. Who handles my clients' support?",
      a: "White label partners on the Enterprise tier get a dedicated support channel. Your clients contact you directly, and you can escalate technical issues to our partner team.",
    },
    {
      q: "Where do I find API documentation?",
      a: "API docs are available in the Help Center under the API & Integrations category. Every endpoint is documented with request examples and response schemas.",
    },
  ]

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 15,
    fontFamily: "inherit",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    outline: "none",
    transition: "border-color 0.2s",
    background: "white",
    color: "#1e293b",
  }

  const labelStyle = {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
  }

  return (
    <main>
      <section className="hero" style={{ padding: "140px 32px 80px" }}>
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p className="subtitle">
            Have a question, need technical help, or want to explore a partnership?
            We are here and ready to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 48,
        }}>
          {/* Contact Form */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0a2540", marginBottom: 8 }}>
              Send Us a Message
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", marginBottom: 32 }}>
              Fill out the form below and our team will get back to you within 2 hours on business days.
            </p>

            {submitted ? (
              <div style={{
                padding: 48,
                textAlign: "center",
                background: "#f0fdf4",
                borderRadius: 16,
                border: "1px solid #bbf7d0",
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0a2540", marginBottom: 8 }}>
                  Message Sent
                </h3>
                <p style={{ fontSize: 15, color: "#64748b" }}>
                  We received your message and will respond within 2 business hours. Check your email for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject *</label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="white-label">White Label</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 36px" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{
              background: "#f8fafc",
              borderRadius: 16,
              padding: 32,
              border: "1px solid #e2e8f0",
              marginBottom: 24,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0a2540", marginBottom: 20 }}>
                Support Info
              </h3>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  Email
                </div>
                <a href="mailto:support@getfleetcommand.com" style={{ fontSize: 15, fontWeight: 500 }}>
                  support@getfleetcommand.com
                </a>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  Phone
                </div>
                <a href="tel:+18889889439" style={{ fontSize: 15, fontWeight: 500, color: "#1e293b", textDecoration: "none" }}>
                  (888) 988-9439
                </a>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  Hours
                </div>
                <div style={{ fontSize: 15, color: "#334155" }}>
                  Mon - Fri, 8:00 AM - 6:00 PM CT
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                  Response Time
                </div>
                <div style={{ fontSize: 15, color: "#334155", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#16a34a",
                    display: "inline-block",
                  }} />
                  Under 2 hours
                </div>
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #0a2540, #1b3a5c)",
              borderRadius: 16,
              padding: 32,
              color: "white",
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Need It Faster?
              </h3>
              <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 16 }}>
                Business and Enterprise plans include priority support with 30-minute response times and a dedicated account manager.
              </p>
              <a
                href="/#pricing"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #ff9800, #f57c00)",
                  color: "white",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to the questions we hear most from new and existing customers.</p>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <details
              key={i}
              style={{
                background: "white",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                marginBottom: 10,
                overflow: "hidden",
              }}
            >
              <summary style={{
                padding: "18px 24px",
                fontSize: 16,
                fontWeight: 600,
                color: "#0a2540",
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                {faq.q}
                <span style={{ fontSize: 20, color: "#94a3b8", marginLeft: 12 }}>+</span>
              </summary>
              <div style={{
                padding: "0 24px 18px",
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.7,
              }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
