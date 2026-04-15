"use client"

import { useState } from "react"

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most fleets are fully online within 48 hours. If you already have ELD devices or GPS trackers installed, the process is even faster -- sometimes under an hour."
  },
  {
    q: "Do I need to install any hardware?",
    a: "Not necessarily. FleetCommand Pro integrates with most major ELD and GPS providers over the air. If your devices support API connections, there is nothing new to mount or wire."
  },
  {
    q: "What happens after the 7-day free trial?",
    a: "Your account converts to the plan you selected during signup. You will not be charged until day 8, and you can cancel any time before that with no obligation."
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade from your account settings at any point. Changes take effect on your next billing cycle."
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. We use SOC 2-compliant infrastructure hosted in US-based data centers. Role-based access controls let you decide who on your team sees what."
  },
  {
    q: "Do you offer training or onboarding help?",
    a: "Every new account includes a guided onboarding session with our support team. Small Fleet and Enterprise plans also get dedicated account managers who can train your dispatchers and drivers."
  }
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <div key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
          <button
            className="faq-q"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {item.q}
            <span className="faq-arrow">{openIndex === i ? "-" : "+"}</span>
          </button>
          <div className="faq-a">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
