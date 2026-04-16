"use client"

import { useEffect } from "react"

export default function Chatbot() {
  useEffect(() => {
    if (document.getElementById("fc-chatbot-script")) return
    const s = document.createElement("script")
    s.id = "fc-chatbot-script"
    s.src = "/fc-chatbot-widget.js"
    s.defer = true
    s.dataset.webhook = "https://n8n.alwaysencrypted.com/webhook/fc-chatbot"
    s.dataset.logo = "/fc-logo.png"
    s.dataset.accent = "#1e88e5"
    s.dataset.retellToken = "https://n8n.alwaysencrypted.com/webhook/fc-retell-token"
    s.dataset.retellAgent = "agent_86b2174417970acd9de3e37f42"
    document.body.appendChild(s)
  }, [])

  return null
}
