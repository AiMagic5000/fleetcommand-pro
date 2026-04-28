"use client";
// FleetCommand Pro -- editorial dispatch-deck landing
// Scoped under .fcp-page to avoid colliding with global .hero / .section / .pricing-card
// from globals.css (used by other routes).

import { useState, useEffect, useRef } from "react";

const STYLE = `
.fcp-page {
  --paper: oklch(0.985 0.005 85);
  --paper-2: oklch(0.965 0.006 85);
  --rule: oklch(0.88 0.008 70);
  --rule-strong: oklch(0.72 0.01 70);
  --ink: oklch(0.20 0.012 60);
  --ink-2: oklch(0.36 0.01 60);
  --ink-mute: oklch(0.52 0.008 60);
  --signal: oklch(0.65 0.17 240);
  --signal-2: oklch(0.55 0.18 245);
  --signal-deep: oklch(0.42 0.18 250);
  --alert: oklch(0.58 0.21 28);
  --green: oklch(0.66 0.13 145);
  --term-bg: oklch(0.18 0.012 65);
  --term-fg: oklch(0.94 0.012 85);
  --term-mute: oklch(0.66 0.012 65);
  --term-rule: oklch(0.30 0.012 65);

  --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --serif: var(--sans);
  --mono: var(--sans);

  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: 0;
  padding-top: var(--header-h, 96px);
}
.fcp-page * { box-sizing: border-box; }
.fcp-page p { color: var(--ink-2); max-width: 64ch; }
.fcp-page strong { color: var(--ink); font-weight: 600; }

.fcp-shell { max-width: 1320px; margin: 0 auto; padding: 0 40px; }
@media (max-width: 768px) { .fcp-shell { padding: 0 20px; } }

/* === HERO ============================================================== */
.fcp-hero {
  position: relative;
  border-bottom: 1px solid var(--ink);
  padding: 0;
  overflow: hidden;
  min-height: 640px;
  background: var(--ink);
}
.fcp-hero-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}
.fcp-hero-scrim {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(110deg, oklch(0.18 0.012 65 / 0.82) 0%, oklch(0.18 0.012 65 / 0.45) 55%, oklch(0.18 0.012 65 / 0.20) 100%),
    linear-gradient(0deg, oklch(0.18 0.012 65 / 0.55), transparent 35%);
}
.fcp-hero-inner {
  position: relative; z-index: 2;
  padding: 112px 0 88px;
  min-height: 640px;
  display: flex; align-items: center;
}
.fcp-hero-content {
  max-width: 760px;
}
@media (max-width: 768px) { .fcp-hero-inner { padding: 88px 0 64px; min-height: 560px; } }

.fcp-hero .fcp-kicker { color: oklch(1 0 0 / 0.78); }
.fcp-hero .fcp-kicker::after { background: oklch(1 0 0 / 0.25); }
.fcp-hero .fcp-h1 { color: var(--paper); }
.fcp-hero .fcp-lede { color: oklch(1 0 0 / 0.92); }
.fcp-hero .fcp-btn-primary { background: var(--paper); color: var(--ink); }
.fcp-hero .fcp-btn-primary:hover { background: var(--signal); color: var(--paper); }
.fcp-hero .fcp-btn-ghost { color: var(--paper); border-color: var(--paper); }
.fcp-hero .fcp-btn-ghost:hover { color: var(--signal); border-color: var(--signal); }
.fcp-hero .fcp-hero-meta {
  border-top-color: oklch(1 0 0 / 0.22);
}
.fcp-hero .fcp-hero-meta dt { color: oklch(1 0 0 / 0.65); }
.fcp-hero .fcp-hero-meta dd { color: var(--paper); }

.fcp-kicker {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: flex;
  align-items: center;
  gap: 14px;
}
.fcp-kicker::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--rule);
}

.fcp-h1 {
  font-family: var(--sans);
  font-weight: 800;
  font-size: clamp(44px, 6vw, 84px);
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: var(--ink);
  margin: 28px 0 0;
}
.fcp-h1 em {
  font-style: normal;
  background: linear-gradient(transparent 60%, var(--signal) 60% 92%, transparent 92%);
  color: var(--paper);
  padding: 0 0.08em;
}

.fcp-lede {
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  margin: 28px 0 0;
  max-width: 52ch;
}

.fcp-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; align-items: center; }
.fcp-btn-primary {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--ink); color: var(--paper);
  font-family: var(--sans); font-weight: 600; font-size: 15px;
  padding: 16px 24px; border-radius: 2px;
  text-decoration: none;
  transition: transform 280ms cubic-bezier(.2,.9,.3,1), background 200ms;
}
.fcp-btn-primary:hover { background: var(--signal-deep); color: var(--ink); transform: translateY(-1px); }
.fcp-btn-primary .fcp-arrow { width: 18px; height: 1px; background: currentColor; position: relative; }
.fcp-btn-primary .fcp-arrow::after {
  content: ""; position: absolute; right: 0; top: -3px;
  width: 7px; height: 7px; border-top: 1px solid currentColor; border-right: 1px solid currentColor;
  transform: rotate(45deg);
}
.fcp-btn-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink); text-decoration: none;
  padding: 16px 4px; border-bottom: 1px solid var(--ink);
}
.fcp-btn-ghost:hover { color: var(--signal-deep); border-color: var(--signal-deep); }

.fcp-hero-meta {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--rule);
  font-family: var(--mono); font-size: 12px;
}
.fcp-hero-meta dt { color: var(--ink-mute); letter-spacing: 0.14em; text-transform: uppercase; font-size: 10px; margin-bottom: 6px; }
.fcp-hero-meta dd { font-family: var(--sans); font-size: 30px; line-height: 1; color: var(--ink); margin: 0; font-weight: 800; letter-spacing: -0.02em; }

/* === Terminal panel ===================================================== */
.fcp-term {
  background: var(--term-bg);
  color: var(--term-fg);
  border: 1px solid var(--term-rule);
  border-radius: 4px;
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.55;
  display: flex; flex-direction: column;
  min-height: 520px;
  overflow: hidden;
}
.fcp-term-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 18px; border-bottom: 1px solid var(--term-rule);
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--term-mute);
}
.fcp-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--green); margin-right: 8px;
  display: inline-block; vertical-align: middle;
  animation: fcpPulse 2.4s ease-out infinite;
}
@keyframes fcpPulse {
  0% { box-shadow: 0 0 0 0 oklch(0.66 0.13 145 / 0.55); }
  70% { box-shadow: 0 0 0 9px oklch(0.66 0.13 145 / 0); }
  100% { box-shadow: 0 0 0 0 oklch(0.66 0.13 145 / 0); }
}
.fcp-term-head {
  display: grid;
  grid-template-columns: 70px 1fr 90px 70px 70px;
  gap: 12px;
  padding: 10px 18px;
  color: var(--term-mute);
  font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  border-bottom: 1px solid var(--term-rule);
}
.fcp-term-row {
  display: grid;
  grid-template-columns: 70px 1fr 90px 70px 70px;
  gap: 12px; align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid var(--term-rule);
}
.fcp-term-row:last-of-type { border-bottom: none; }
.fcp-term-id { color: var(--signal); font-weight: 500; }
.fcp-term-route { color: var(--term-fg); }
.fcp-term-route small { display: block; color: var(--term-mute); font-size: 10.5px; margin-top: 2px; letter-spacing: 0.06em; }
.fcp-term-status {
  font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 2px; display: inline-block;
}
.fcp-st-rolling { background: oklch(0.66 0.13 145 / 0.18); color: var(--green); }
.fcp-st-load { background: oklch(0.86 0.17 92 / 0.18); color: var(--signal); }
.fcp-st-hos { background: oklch(0.58 0.21 28 / 0.18); color: oklch(0.78 0.18 28); }
.fcp-st-yard { background: var(--term-rule); color: var(--term-mute); }
.fcp-term-num { text-align: right; color: var(--term-fg); font-variant-numeric: tabular-nums; }
.fcp-term-foot {
  margin-top: auto;
  padding: 12px 18px;
  border-top: 1px solid var(--term-rule);
  display: flex; justify-content: space-between;
  font-size: 11px; color: var(--term-mute); letter-spacing: 0.06em;
}
.fcp-cursor::after {
  content: "_";
  display: inline-block;
  margin-left: 2px;
  color: var(--signal);
  animation: fcpBlink 1s steps(1) infinite;
}
@keyframes fcpBlink { 50% { opacity: 0; } }

/* === Hero video panel ================================================== */
.fcp-video-panel {
  position: relative;
  border: 1px solid var(--term-rule);
  background: var(--term-bg);
  overflow: hidden;
  border-radius: 4px;
  min-height: 520px;
  display: flex; flex-direction: column;
}
.fcp-video-panel .fcp-term-bar {
  position: absolute; top: 0; left: 0; right: 0; z-index: 3;
  background: linear-gradient(180deg, oklch(0.18 0.012 65 / 0.92), oklch(0.18 0.012 65 / 0));
  border-bottom: none;
}
.fcp-video-panel video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.fcp-video-panel .fcp-video-foot {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
  background: linear-gradient(0deg, oklch(0.18 0.012 65 / 0.95), oklch(0.18 0.012 65 / 0));
  padding: 18px;
  display: flex; justify-content: space-between; align-items: end;
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em;
  color: var(--term-mute);
  text-transform: uppercase;
}
.fcp-video-panel .fcp-video-foot strong {
  color: var(--term-fg); font-weight: 600; font-family: var(--serif);
  font-size: 22px; letter-spacing: 0; text-transform: none;
  display: block; margin-bottom: 2px;
}
.fcp-video-corner {
  position: absolute; z-index: 3; width: 18px; height: 18px;
  border: 1px solid var(--signal); pointer-events: none;
}
.fcp-video-corner.tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
.fcp-video-corner.tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
.fcp-video-corner.bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
.fcp-video-corner.br { bottom: 12px; right: 12px; border-left: none; border-top: none; }

/* === Tape =============================================================== */
.fcp-tape {
  background: var(--ink);
  color: var(--paper);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
  overflow: hidden;
  position: relative;
}
.fcp-tape::before, .fcp-tape::after {
  content: ""; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
}
.fcp-tape::before { left: 0; background: linear-gradient(90deg, var(--ink), transparent); }
.fcp-tape::after { right: 0; background: linear-gradient(-90deg, var(--ink), transparent); }
.fcp-tape-track {
  display: flex; gap: 56px; padding: 18px 0;
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
  white-space: nowrap;
  animation: fcpScroll 48s linear infinite;
}
.fcp-tape-track span { color: var(--paper); display: inline-flex; align-items: center; gap: 14px; }
.fcp-tape-track span::before { content: "\\25C6"; color: var(--signal); font-size: 8px; }
@keyframes fcpScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* === Numbers =========================================================== */
.fcp-numbers {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 0;
  border-bottom: 1px solid var(--rule);
}
@media (max-width: 900px) { .fcp-numbers { grid-template-columns: 1fr 1fr; } }
.fcp-num {
  padding: 56px 32px;
  border-right: 1px solid var(--rule);
  display: flex; flex-direction: column; gap: 10px;
}
.fcp-num:last-child { border-right: none; }
@media (max-width: 900px) { .fcp-num:nth-child(2) { border-right: none; } .fcp-num { border-bottom: 1px solid var(--rule); } }
.fcp-num-tag { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); }
.fcp-num-val { font-family: var(--sans); font-weight: 800; line-height: 0.96; color: var(--ink); font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
.fcp-num-1 .fcp-num-val { font-size: clamp(60px, 8vw, 120px); }
.fcp-num-2 .fcp-num-val { font-size: clamp(48px, 6vw, 88px); }
.fcp-num-3 .fcp-num-val { font-size: clamp(48px, 6vw, 88px); }
.fcp-num-4 .fcp-num-val { font-size: clamp(40px, 5vw, 64px); }
.fcp-num-cap { font-family: var(--sans); font-size: 13px; color: var(--ink-2); }

/* === Section frame ===================================================== */
.fcp-sec { padding: 96px 0; border-bottom: 1px solid var(--rule); }
.fcp-sec-head { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; margin-bottom: 64px; }
@media (max-width: 900px) { .fcp-sec-head { grid-template-columns: 1fr; gap: 24px; } }
.fcp-sec-eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute); }
.fcp-sec-title { font-family: var(--sans); font-weight: 800; font-size: clamp(32px, 3.5vw, 52px); line-height: 1.06; letter-spacing: -0.025em; margin: 12px 0 0; color: var(--ink); }
.fcp-sec-deck { font-size: 18px; color: var(--ink-2); margin: 0; max-width: 56ch; }

/* === Features (editorial entries) ====================================== */
.fcp-entries { display: flex; flex-direction: column; }
.fcp-entry {
  display: grid;
  grid-template-columns: 80px 1.6fr 1fr;
  gap: 32px;
  padding: 36px 0;
  border-top: 1px solid var(--rule);
  align-items: start;
}
.fcp-entry:last-child { border-bottom: 1px solid var(--rule); }
@media (max-width: 768px) {
  .fcp-entry { grid-template-columns: 56px 1fr; }
  .fcp-entry-aside { grid-column: 1 / -1; padding-left: 56px; }
}
.fcp-entry-num {
  font-family: var(--mono); font-size: 13px; color: var(--ink-mute);
  padding: 6px 10px; background: var(--paper-2); border: 1px solid var(--rule);
  display: inline-block; align-self: start; letter-spacing: 0.08em;
}
.fcp-entry-num.fcp-plate {
  background: var(--signal); border-color: var(--signal-deep);
  color: var(--ink); font-weight: 600;
}
.fcp-entry-body h3 {
  font-family: var(--sans); font-weight: 700;
  font-size: clamp(22px, 2.2vw, 30px); line-height: 1.18;
  margin: 0 0 12px; letter-spacing: -0.015em; color: var(--ink);
}
.fcp-entry-body p { font-size: 16.5px; line-height: 1.6; max-width: 50ch; margin: 0; }
.fcp-entry-aside {
  font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.04em;
  color: var(--ink-mute); display: flex; flex-direction: column; gap: 6px;
  padding-top: 8px; border-top: 1px solid var(--rule);
}
.fcp-entry-aside b { color: var(--ink); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; font-size: 10px; }
.fcp-entry-aside .fcp-row { display: flex; justify-content: space-between; gap: 12px; padding: 4px 0; }
.fcp-entry-aside .fcp-row em {
  font-style: normal; flex: 1; align-self: center;
  border-top: 1px dotted var(--rule); margin: 0 8px;
}
.fcp-entry-aside .fcp-row > strong:last-child { color: var(--ink); }

/* === Inter-entry motion strip ========================================== */
.fcp-flow {
  position: relative;
  height: 36px;
  margin: 0 -32px;
  overflow: hidden;
  border-top: 1px solid var(--rule);
  background: var(--paper-2);
}
.fcp-flow::before {
  content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1px;
  background: repeating-linear-gradient(90deg, var(--rule-strong) 0 8px, transparent 8px 18px);
  transform: translateY(-50%);
}
.fcp-flow-truck {
  position: absolute; top: 50%; left: -80px;
  width: 56px; height: 22px; transform: translateY(-50%);
  background: var(--ink);
  font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.08em;
  color: var(--signal);
  display: flex; align-items: center; justify-content: center;
  animation: fcpRoll 14s linear infinite;
  border-radius: 1px;
}
.fcp-flow-truck::before {
  content: ""; position: absolute; right: 100%; top: 50%; transform: translateY(-50%);
  width: 18px; height: 1px; background: var(--signal-deep);
}
.fcp-flow-truck::after {
  content: ""; position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
  width: 0; height: 0; border-left: 10px solid var(--ink); border-top: 6px solid transparent; border-bottom: 6px solid transparent;
}
.fcp-flow-truck.fcp-flow-2 { animation-delay: -4.5s; animation-duration: 18s; }
.fcp-flow-truck.fcp-flow-3 { animation-delay: -9s; animation-duration: 12s; }
@keyframes fcpRoll { from { left: -80px; } to { left: 100%; } }
.fcp-flow-mile {
  position: absolute; right: 18px; top: 50%; transform: translateY(-50%);
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--ink-mute);
  background: var(--paper-2); padding: 0 8px;
  z-index: 2;
}
@media (max-width: 768px) { .fcp-flow { margin: 0 -20px; } }

/* === Carousel ========================================================== */
.fcp-gallery {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  background: var(--paper-2);
  position: relative;
  overflow: hidden;
}
.fcp-gallery-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  background: oklch(0.14 0.012 65);
  background-image:
    linear-gradient(45deg, oklch(0.18 0.012 65) 25%, transparent 25%),
    linear-gradient(-45deg, oklch(0.18 0.012 65) 25%, transparent 25%);
  background-size: 24px 24px;
  background-position: 0 0, 0 12px;
  overflow: hidden;
}
.fcp-gallery-track {
  position: absolute; inset: 0;
  display: flex;
  transition: transform 600ms cubic-bezier(.2,.9,.3,1);
}
.fcp-gallery-slide {
  flex: 0 0 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.fcp-gallery-slide img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  box-shadow: 0 8px 32px oklch(0.10 0.012 65 / 0.5);
}
.fcp-gallery-cap {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
  padding: 24px 32px;
  background: linear-gradient(0deg, oklch(0.14 0.012 65 / 0.94), transparent);
  color: var(--paper);
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  display: flex; justify-content: space-between; align-items: end; gap: 24px;
}
.fcp-gallery-cap strong {
  color: var(--paper); font-family: var(--serif); font-weight: 400;
  font-size: 22px; letter-spacing: 0; text-transform: none;
  display: block; margin-bottom: 4px;
}
.fcp-gallery-controls {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 24px;
  border-top: 1px solid var(--rule);
  background: var(--paper);
}
.fcp-gallery-counter { font-family: var(--mono); font-size: 12px; color: var(--ink-mute); letter-spacing: 0.12em; }
.fcp-gallery-counter b { color: var(--ink); font-weight: 600; }
.fcp-gallery-arrows { display: flex; gap: 8px; }
.fcp-gallery-arrow {
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--paper); color: var(--ink);
  border: 1px solid var(--rule-strong);
  cursor: pointer; transition: all 200ms;
  font-family: var(--mono); font-size: 18px;
}
.fcp-gallery-arrow:hover { background: var(--ink); color: var(--signal); border-color: var(--ink); }
.fcp-gallery-arrow:disabled { opacity: 0.4; cursor: not-allowed; }
.fcp-gallery-thumbs {
  display: flex; gap: 8px; padding: 0 24px 18px;
  background: var(--paper);
  overflow-x: auto;
}
.fcp-gallery-thumb {
  flex: 0 0 96px; aspect-ratio: 16 / 9;
  border: 1px solid var(--rule);
  cursor: pointer;
  background: oklch(0.14 0.012 65);
  overflow: hidden;
  padding: 0;
  transition: border-color 200ms;
}
.fcp-gallery-thumb img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; transition: opacity 200ms; display: block; }
.fcp-gallery-thumb.active { border-color: var(--ink); border-width: 2px; }
.fcp-gallery-thumb.active img { opacity: 1; }

/* === Process timeline =================================================== */
.fcp-timeline { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--rule); }
@media (max-width: 768px) { .fcp-timeline { grid-template-columns: 1fr; } }
.fcp-step {
  padding: 40px 32px;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  display: grid; grid-template-columns: 88px 1fr; gap: 24px;
  align-items: start;
}
.fcp-step:nth-child(2n) { border-right: none; }
@media (max-width: 768px) { .fcp-step { border-right: none; } }
.fcp-step-num { font-family: var(--sans); font-weight: 800; font-size: 64px; line-height: 0.9; color: var(--signal-deep); font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
.fcp-step-body h4 { font-family: var(--sans); font-weight: 700; font-size: 22px; margin: 0 0 6px; line-height: 1.2; color: var(--ink); letter-spacing: -0.01em; }
.fcp-step-body p { font-size: 15.5px; margin: 0; }
.fcp-step-meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-mute); margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--rule); }

/* === Future ============================================================= */
.fcp-future { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--rule); }
@media (max-width: 900px) { .fcp-future { grid-template-columns: 1fr; } }
.fcp-future-cell { padding: 40px 32px; border-right: 1px solid var(--rule); }
.fcp-future-cell:last-child { border-right: none; }
@media (max-width: 900px) { .fcp-future-cell { border-right: none; border-bottom: 1px solid var(--rule); } }
.fcp-tag {
  display: inline-block;
  font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 999px;
  background: var(--ink); color: var(--paper);
}
.fcp-tag.fcp-tag-dev { background: var(--signal); color: var(--ink); }
.fcp-tag.fcp-tag-soon { background: var(--paper-2); color: var(--ink); border: 1px solid var(--rule-strong); }
.fcp-future-cell h4 { font-family: var(--sans); font-weight: 700; font-size: 22px; line-height: 1.2; margin: 20px 0 12px; color: var(--ink); letter-spacing: -0.01em; }
.fcp-future-cell p { font-size: 15.5px; margin: 0; }

/* === Pricing ============================================================ */
.fcp-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--rule); }
@media (max-width: 900px) { .fcp-pricing { grid-template-columns: 1fr; } }
.fcp-tier { padding: 48px 32px; border-right: 1px solid var(--rule); display: flex; flex-direction: column; gap: 16px; position: relative; }
.fcp-tier:last-child { border-right: none; }
@media (max-width: 900px) { .fcp-tier { border-right: none; border-bottom: 1px solid var(--rule); } }
.fcp-tier-mark { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute); }
.fcp-tier h4 { font-family: var(--sans); font-weight: 700; font-size: 26px; margin: 0; line-height: 1.15; color: var(--ink); letter-spacing: -0.015em; }
.fcp-tier-price { font-family: var(--sans); font-weight: 800; font-size: clamp(48px, 5.5vw, 72px); line-height: 0.95; color: var(--ink); font-variant-numeric: tabular-nums; letter-spacing: -0.03em; }
.fcp-tier-price small { display: block; font-family: var(--sans); font-size: 13px; color: var(--ink-mute); margin-top: 6px; letter-spacing: 0; line-height: 1.5; }
.fcp-tier-list { list-style: none; padding: 0; margin: 8px 0 0; display: flex; flex-direction: column; gap: 10px; }
.fcp-tier-list li { font-size: 14.5px; color: var(--ink-2); padding-left: 22px; position: relative; }
.fcp-tier-list li::before {
  content: ""; position: absolute; left: 0; top: 8px;
  width: 12px; height: 1px; background: var(--ink);
}
.fcp-tier-cta { margin-top: auto; padding-top: 28px; }
.fcp-tier.fcp-tier-feat { background: var(--signal); padding-top: 84px; color: var(--paper); }
.fcp-tier.fcp-tier-feat h4,
.fcp-tier.fcp-tier-feat .fcp-tier-price { color: var(--paper); }
.fcp-tier.fcp-tier-feat .fcp-tier-price small { color: oklch(1 0 0 / 0.78); }
.fcp-tier.fcp-tier-feat .fcp-tier-list li { color: oklch(1 0 0 / 0.92); }
.fcp-tier.fcp-tier-feat .fcp-tier-mark { color: oklch(1 0 0 / 0.85); font-weight: 600; }
.fcp-tier.fcp-tier-feat .fcp-tier-list li::before { background: var(--paper); }
.fcp-tier.fcp-tier-feat .fcp-btn-primary { background: var(--paper); color: var(--ink); }
.fcp-tier.fcp-tier-feat .fcp-btn-primary:hover { background: var(--ink); color: var(--paper); }
.fcp-tier-feat-flag {
  position: absolute; top: 0; left: 0; right: 0;
  background: var(--ink); color: var(--signal);
  font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
  padding: 8px 32px;
}

/* === Quotes ============================================================ */
.fcp-quotes { display: grid; grid-template-columns: 5fr 4fr; gap: 0; border-top: 1px solid var(--rule); }
@media (max-width: 900px) { .fcp-quotes { grid-template-columns: 1fr; } }
.fcp-quote { padding: 48px 40px; border-right: 1px solid var(--rule); }
.fcp-quote:nth-child(2) { border-right: none; }
.fcp-quote-r2 {
  grid-column: 1 / -1;
  display: grid; grid-template-columns: 1fr 5fr; gap: 0;
  border-top: 1px solid var(--rule);
}
.fcp-quote-r2 .fcp-q-meta { padding: 48px 32px; background: var(--paper-2); border-right: 1px solid var(--rule); }
.fcp-quote-r2 .fcp-q-body { padding: 48px 40px; }
@media (max-width: 900px) {
  .fcp-quote-r2 { grid-template-columns: 1fr; }
  .fcp-quote-r2 .fcp-q-meta { border-right: none; border-bottom: 1px solid var(--rule); }
}
.fcp-quote blockquote, .fcp-q-body blockquote {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(20px, 1.8vw, 26px); line-height: 1.4; letter-spacing: -0.012em;
  color: var(--ink); margin: 0 0 28px; max-width: 42ch;
}
.fcp-q-meta { font-family: var(--mono); font-size: 12px; }
.fcp-q-meta b { display: block; font-family: var(--sans); font-size: 15px; color: var(--ink); font-weight: 700; letter-spacing: 0; margin-bottom: 4px; }
.fcp-q-meta span { color: var(--ink-mute); letter-spacing: 0.06em; text-transform: uppercase; font-size: 11px; }

/* === Demo ============================================================== */
.fcp-demo { padding: 80px 0; border-bottom: 1px solid var(--rule); }
.fcp-demo-frame {
  background: var(--term-bg); color: var(--term-fg);
  border: 1px solid var(--term-rule);
  padding: 80px 40px;
  display: flex; align-items: center; justify-content: space-between;
  font-family: var(--mono); font-size: 13px;
  flex-wrap: wrap; gap: 24px;
}
.fcp-demo-frame > div:first-child { display: flex; align-items: center; gap: 24px; }
.fcp-demo-play {
  width: 64px; height: 64px; border: 1px solid var(--signal);
  display: flex; align-items: center; justify-content: center;
  color: var(--signal);
}
.fcp-demo-play svg { width: 22px; height: 22px; }

/* === Closer CTA ======================================================== */
.fcp-closer { background: var(--signal); color: var(--paper); padding: 120px 0; border-bottom: 1px solid var(--ink); }
.fcp-closer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: end; }
@media (max-width: 900px) { .fcp-closer-grid { grid-template-columns: 1fr; gap: 32px; } }
.fcp-closer h2 {
  font-family: var(--sans); font-weight: 800;
  font-size: clamp(40px, 5.2vw, 76px); line-height: 1.02; letter-spacing: -0.025em;
  margin: 0; color: var(--paper);
}
.fcp-closer p { color: oklch(1 0 0 / 0.92); max-width: 36ch; margin: 0 0 24px; font-size: 17px; }
.fcp-closer .fcp-btn-primary { background: var(--ink); color: var(--paper); }
.fcp-closer .fcp-btn-primary:hover { background: var(--paper); color: var(--ink); }
.fcp-closer .fcp-btn-ghost { color: var(--paper); border-color: var(--paper); }
.fcp-closer .fcp-btn-ghost:hover { color: var(--ink); border-color: var(--ink); }
`;

const GALLERY = [
  { src: "/dispatch-screen-1.webp", title: "Live tracking map", note: "T-1147 rolling I-40 W &middot; 401 mi to OKC" },
  { src: "/dispatch-screen-2.webp", title: "Dispatch board", note: "Loads scored, drivers assigned, HOS aware" },
  { src: "/dispatch-screen-3.webp", title: "Compliance binder", note: "HOS, DVIR, IFTA generated from telemetry" },
  { src: "/dispatch-screen-4.webp", title: "Settlement statement", note: "Invoiced on delivery, paid on factoring" },
  { src: "/dispatch-screen-5.webp", title: "Analytics panel", note: "Revenue per loaded mile by lane" },
];

function FlowStrip({ label }) {
  return (
    <div className="fcp-flow" aria-hidden="true">
      <span className="fcp-flow-truck">T-1147</span>
      <span className="fcp-flow-truck fcp-flow-2">T-2208</span>
      <span className="fcp-flow-truck fcp-flow-3">T-0394</span>
      <span className="fcp-flow-mile">{label}</span>
    </div>
  );
}

function Gallery() {
  const [idx, setIdx] = useState(0);
  const total = GALLERY.length;
  const prev = () => setIdx((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIdx((i) => (i === total - 1 ? 0 : i + 1));
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="fcp-gallery">
      <div className="fcp-gallery-frame">
        <div className="fcp-gallery-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {GALLERY.map((g, i) => (
            <figure className="fcp-gallery-slide" key={g.src}>
              <img src={g.src} alt={g.title} loading={i === 0 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>
        <div className="fcp-gallery-cap">
          <div>
            <strong>{GALLERY[idx].title}</strong>
            <span dangerouslySetInnerHTML={{ __html: GALLERY[idx].note }} />
          </div>
          <span>frame {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="fcp-gallery-controls">
        <div className="fcp-gallery-counter">
          <b>{String(idx + 1).padStart(2, "0")}</b> &middot; {String(total).padStart(2, "0")}
        </div>
        <div className="fcp-gallery-arrows">
          <button className="fcp-gallery-arrow" aria-label="Previous image" onClick={prev}>&larr;</button>
          <button className="fcp-gallery-arrow" aria-label="Next image" onClick={next}>&rarr;</button>
        </div>
      </div>
      <div className="fcp-gallery-thumbs" role="tablist" aria-label="Screen thumbnails">
        {GALLERY.map((g, i) => (
          <button
            key={g.src}
            className={`fcp-gallery-thumb ${i === idx ? "active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Show ${g.title}`}
            aria-selected={i === idx}
            role="tab"
          >
            <img src={g.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <main className="fcp-page">

        {/* HERO */}
        <section className="fcp-hero">
          <video
            className="fcp-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
          >
            <source media="(min-width: 768px)" src="/hero-960.webm" type="video/webm" />
            <source media="(min-width: 768px)" src="/hero-960.mp4" type="video/mp4" />
            <source src="/hero-640.mp4" type="video/mp4" />
          </video>
          <div className="fcp-hero-scrim" aria-hidden="true"></div>
          <div className="fcp-hero-inner">
            <div className="fcp-shell">
              <div className="fcp-hero-content">
                <div className="fcp-kicker">Volume 04 / Dispatch &middot; Compliance &middot; Autonomy</div>
                <h1 className="fcp-h1">
                  The yard runs at <em>four-thirty</em> a.m. We run with it.
                </h1>
                <p className="fcp-lede">
                  FleetCommand is the operations layer for trucking companies that move America. Live tracking,
                  AI dispatch, ELD compliance, invoicing, and an outreach engine, working from one console.
                </p>
                <div className="fcp-cta-row">
                  <a href="/fcp-dashboard.html" className="fcp-btn-primary">
                    Start a 7-day trial<span className="fcp-arrow" aria-hidden="true"></span>
                  </a>
                  <a href="#pricing" className="fcp-btn-ghost">View pricing</a>
                </div>
                <dl className="fcp-hero-meta">
                  <div><dt>Fleets on the platform</dt><dd>500+</dd></div>
                  <div><dt>Trucks tracked nightly</dt><dd>15,000</dd></div>
                  <div><dt>Uptime, last 12 months</dt><dd>99.9%</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER TAPE */}
        <section className="fcp-tape" aria-label="Customer companies">
          <div className="fcp-tape-track">
            <span>Apex Freight Group</span><span>Titan Logistics</span><span>CrossCountry Carriers</span>
            <span>Liberty Transport Co.</span><span>Redline Hauling</span><span>Summit Express</span>
            <span>Pinnacle Fleet Services</span><span>Horizon Trucking</span>
            <span>Apex Freight Group</span><span>Titan Logistics</span><span>CrossCountry Carriers</span>
            <span>Liberty Transport Co.</span><span>Redline Hauling</span><span>Summit Express</span>
            <span>Pinnacle Fleet Services</span><span>Horizon Trucking</span>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="fcp-shell">
          <div className="fcp-numbers">
            <div className="fcp-num fcp-num-1">
              <div className="fcp-num-tag">01 / Fleets</div>
              <div className="fcp-num-val">500+</div>
              <div className="fcp-num-cap">Active fleet customers across 47 states.</div>
            </div>
            <div className="fcp-num fcp-num-2">
              <div className="fcp-num-tag">02 / Units</div>
              <div className="fcp-num-val">15,000</div>
              <div className="fcp-num-cap">Trucks tracked across the network nightly.</div>
            </div>
            <div className="fcp-num fcp-num-3">
              <div className="fcp-num-tag">03 / Uptime</div>
              <div className="fcp-num-val">99.9%</div>
              <div className="fcp-num-cap">Twelve-month rolling average.</div>
            </div>
            <div className="fcp-num fcp-num-4">
              <div className="fcp-num-tag">04 / Support</div>
              <div className="fcp-num-val">24 / 7</div>
              <div className="fcp-num-cap">Live, dispatch-aware coverage from real operators.</div>
            </div>
          </div>
        </section>

        {/* OPERATIONS */}
        <section className="fcp-sec" id="features">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section I &middot; Operations</div>
                <h2 className="fcp-sec-title">Six tools that retire the spreadsheet, the radio, and the guesswork.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  Every feature ships on day one of the contract. No phased rollouts. No "professional services"
                  upcharge. The platform you sign for is the platform you run on Monday.
                </p>
              </div>
            </div>

            <div className="fcp-entries">
              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">01</div>
                <div className="fcp-entry-body">
                  <h3>Live GPS Tracking</h3>
                  <p>
                    Every truck on a single map, refreshed every thirty seconds. Geofence alerts fire to dispatch
                    when a unit enters or leaves a yard, customer site, or restricted corridor. Breadcrumb trails
                    and idle-time reports come standard.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Standard tier</b>
                  <div className="fcp-row"><span>Refresh interval</span><em></em><strong>30 s</strong></div>
                  <div className="fcp-row"><span>Geofences per fleet</span><em></em><strong>Unlimited</strong></div>
                  <div className="fcp-row"><span>History retained</span><em></em><strong>24 months</strong></div>
                </div>
              </article>

              <FlowStrip label="01 / Live" />

              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">02</div>
                <div className="fcp-entry-body">
                  <h3>AI Dispatch Routing</h3>
                  <p>
                    The routing engine picks the right driver for each load by location, hours of service,
                    equipment type, and customer scoring. The result: fewer empty miles, more loaded ones,
                    and a dispatcher who is no longer doing math at six in the morning.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Pro+ tier</b>
                  <div className="fcp-row"><span>Avg. empty mile cut</span><em></em><strong>11.3%</strong></div>
                  <div className="fcp-row"><span>Loads scored / hr</span><em></em><strong>1,200</strong></div>
                  <div className="fcp-row"><span>HOS-aware</span><em></em><strong>Yes</strong></div>
                </div>
              </article>

              <FlowStrip label="02 / Routing" />

              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">03</div>
                <div className="fcp-entry-body">
                  <h3>Compliance and ELD</h3>
                  <p>
                    Hours-of-service logs, DVIR forms, and IFTA filings are generated from telemetry, not
                    typed in by hand. When the audit shows up, the binder is already printed, signed, and dated.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Standard tier</b>
                  <div className="fcp-row"><span>FMCSA compliant</span><em></em><strong>Yes</strong></div>
                  <div className="fcp-row"><span>IFTA jurisdictions</span><em></em><strong>All 48 + CA</strong></div>
                  <div className="fcp-row"><span>DVIR templates</span><em></em><strong>Custom</strong></div>
                </div>
              </article>

              <FlowStrip label="03 / Compliance" />

              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">04</div>
                <div className="fcp-entry-body">
                  <h3>Invoicing &amp; Settlement</h3>
                  <p>
                    Generate invoices the moment a load is marked delivered. Factoring partners, QuickBooks,
                    and custom net terms wire in at setup. The driver sees a settlement statement before the
                    truck is back at the yard.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Standard tier</b>
                  <div className="fcp-row"><span>QuickBooks sync</span><em></em><strong>Live</strong></div>
                  <div className="fcp-row"><span>Factoring partners</span><em></em><strong>9</strong></div>
                  <div className="fcp-row"><span>Avg. days to pay</span><em></em><strong>14</strong></div>
                </div>
              </article>

              <FlowStrip label="04 / Settlement" />

              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">05</div>
                <div className="fcp-entry-body">
                  <h3>Multi-Tenant White Label</h3>
                  <p>
                    Run FleetCommand under your own brand, your domain, and your customer accounts. We keep
                    the platform updated; you keep the relationship and the margin.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Enterprise only</b>
                  <div className="fcp-row"><span>Custom domain</span><em></em><strong>Yes</strong></div>
                  <div className="fcp-row"><span>Subtenant accounts</span><em></em><strong>Unlimited</strong></div>
                  <div className="fcp-row"><span>Brand asset kit</span><em></em><strong>Provided</strong></div>
                </div>
              </article>

              <FlowStrip label="05 / White-Label" />

              <article className="fcp-entry">
                <div className="fcp-entry-num fcp-plate">06</div>
                <div className="fcp-entry-body">
                  <h3>Analytics Dashboard</h3>
                  <p>
                    Revenue per loaded mile, fuel by tractor, on-time delivery by lane, driver performance by
                    week. Real numbers, exportable to anywhere your CFO already lives.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>All tiers</b>
                  <div className="fcp-row"><span>Pre-built reports</span><em></em><strong>34</strong></div>
                  <div className="fcp-row"><span>Custom dashboards</span><em></em><strong>Pro+</strong></div>
                  <div className="fcp-row"><span>Exports</span><em></em><strong>CSV / PDF / API</strong></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SALES */}
        <section className="fcp-sec">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section II &middot; Growth</div>
                <h2 className="fcp-sec-title">Every Enterprise license ships with an outreach engine.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  Most fleet platforms stop at the dispatch board. We bolt on the cold call, the drip email, and
                  the inbound qualifier, because dispatch software does not pay for itself unless the trucks are full.
                </p>
              </div>
            </div>

            <div className="fcp-entries">
              <article className="fcp-entry">
                <div className="fcp-entry-num">A</div>
                <div className="fcp-entry-body">
                  <h3>AI Voice Drops</h3>
                  <p>
                    Ringless voicemail campaigns scheduled by region, fleet size, or lead score. A broker with
                    forty trucks hears your pitch at 11:14 a.m. on a Tuesday, when the yard is calm.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Capacity</b>
                  <div className="fcp-row"><span>Drops / day</span><em></em><strong>10,000</strong></div>
                  <div className="fcp-row"><span>Suppressions</span><em></em><strong>DNC + custom</strong></div>
                </div>
              </article>
              <article className="fcp-entry">
                <div className="fcp-entry-num">B</div>
                <div className="fcp-entry-body">
                  <h3>Email Campaign Engine</h3>
                  <p>
                    Multi-step drips with open tracking, A/B subject testing, and smart retries. Connect any
                    domain, warm it through our pool, and start sending the same week you sign.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Capacity</b>
                  <div className="fcp-row"><span>Domains</span><em></em><strong>Unlimited</strong></div>
                  <div className="fcp-row"><span>Inbox placement</span><em></em><strong>96.4%</strong></div>
                </div>
              </article>
              <article className="fcp-entry">
                <div className="fcp-entry-num">C</div>
                <div className="fcp-entry-body">
                  <h3>AI Sales Assistant</h3>
                  <p>
                    A trained voice agent answers inbound, qualifies the lead, books the demo, and follows up
                    twice. It works the third shift, the weekend, and the holiday your sales team does not.
                  </p>
                </div>
                <div className="fcp-entry-aside">
                  <b>Coverage</b>
                  <div className="fcp-row"><span>Hours</span><em></em><strong>24 / 7 / 365</strong></div>
                  <div className="fcp-row"><span>Languages</span><em></em><strong>EN &middot; ES</strong></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="fcp-sec">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section III &middot; Onboarding</div>
                <h2 className="fcp-sec-title">We do not sell software. We build your fleet operation.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  The first call is an audit, not a pitch. A senior operator walks your yard, your tech stack,
                  and your compliance binder, then writes the rollout plan you and your team will actually run.
                </p>
              </div>
            </div>

            <div className="fcp-timeline">
              <div className="fcp-step">
                <div className="fcp-step-num">01</div>
                <div className="fcp-step-body">
                  <h4>Fleet Assessment</h4>
                  <p>
                    Routes, compliance gaps, driver management, and existing tech reviewed line by line.
                    Every fleet leaves the call with a custom onboarding plan in writing.
                  </p>
                  <div className="fcp-step-meta">Typically 90 minutes &middot; No charge</div>
                </div>
              </div>
              <div className="fcp-step">
                <div className="fcp-step-num">02</div>
                <div className="fcp-step-body">
                  <h4>Platform Configuration</h4>
                  <p>
                    Branding, integrations, ELD providers, and payment processors wired into your instance.
                    Imported customer and load history reconciled against the live platform.
                  </p>
                  <div className="fcp-step-meta">Typical setup &middot; 5 to 7 business days</div>
                </div>
              </div>
              <div className="fcp-step">
                <div className="fcp-step-num">03</div>
                <div className="fcp-step-body">
                  <h4>Training and Launch</h4>
                  <p>
                    Hands-on training for dispatchers, drivers, and managers. Our team stays on the call until
                    the first ten loads have moved through the new system without help.
                  </p>
                  <div className="fcp-step-meta">2 days dispatcher &middot; 1 day driver</div>
                </div>
              </div>
              <div className="fcp-step">
                <div className="fcp-step-num">04</div>
                <div className="fcp-step-body">
                  <h4>Ongoing Optimization</h4>
                  <p>
                    Monthly performance reviews, route optimization, and compliance audits. Your account
                    manager keeps the dial moving long after the quarter ends.
                  </p>
                  <div className="fcp-step-meta">Monthly cadence &middot; Indefinite</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE */}
        <section className="fcp-sec">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section IV &middot; Roadmap</div>
                <h2 className="fcp-sec-title">Built for the next ten years of freight, not the last.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  Autonomous tractors, robotic loading, and accessible workforce systems are not press releases
                  for us. They are line items on a roadmap with delivery dates.
                </p>
              </div>
            </div>

            <div className="fcp-future">
              <div className="fcp-future-cell">
                <span className="fcp-tag fcp-tag-dev">In Development</span>
                <h4>AI-Powered Autonomous Rigs</h4>
                <p>
                  The platform is being upgraded to integrate with autonomous semi-trucks. Add AI-driven rigs
                  to your existing fleet and manage them from the same dashboard alongside human-operated vehicles.
                </p>
              </div>
              <div className="fcp-future-cell">
                <span className="fcp-tag">Early Access</span>
                <h4>Robotics for Loading and Unloading</h4>
                <p>
                  We are building partnerships with robotics manufacturers to bring automated terminal handling
                  to mid-sized yards. Early access list opens this quarter.
                </p>
              </div>
              <div className="fcp-future-cell">
                <span className="fcp-tag fcp-tag-soon">Coming Soon</span>
                <h4>Accessibility Load Management</h4>
                <p>
                  Specialized assist systems designed to reduce physical strain on aging warehouse workers
                  while keeping throughput intact. Pilot opens late 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="fcp-sec" id="pricing">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section V &middot; Pricing</div>
                <h2 className="fcp-sec-title">One setup fee. No surprise contracts.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  Every plan ships with a seven-day trial. Setup is a one-time line item. Monthly support and
                  licensing scale with the size of your fleet, not with the number of features unlocked.
                </p>
              </div>
            </div>

            <div className="fcp-pricing">
              <div className="fcp-tier">
                <div className="fcp-tier-mark">Tier 01</div>
                <h4>Owner Operator</h4>
                <div className="fcp-tier-price">$1,295<small>One-time setup &middot; up to 3 trucks</small></div>
                <ul className="fcp-tier-list">
                  <li>Live GPS tracking</li>
                  <li>Basic dispatch board</li>
                  <li>ELD compliance logging</li>
                  <li>Invoicing with QuickBooks sync</li>
                  <li>Email support</li>
                  <li>7-day free trial included</li>
                </ul>
                <div className="fcp-tier-cta">
                  <a href="/fcp-dashboard.html" className="fcp-btn-primary">
                    Start trial<span className="fcp-arrow" aria-hidden="true"></span>
                  </a>
                </div>
              </div>

              <div className="fcp-tier fcp-tier-feat">
                <div className="fcp-tier-feat-flag">Most Common Choice</div>
                <div className="fcp-tier-mark">Tier 02</div>
                <h4>Small Fleet Pro</h4>
                <div className="fcp-tier-price">$2,495<small>Setup &middot; then $129 / mo support &amp; licensing</small></div>
                <ul className="fcp-tier-list">
                  <li>Everything in Owner Operator</li>
                  <li>AI-powered dispatch routing</li>
                  <li>IFTA reporting</li>
                  <li>Driver performance analytics</li>
                  <li>Factoring integration</li>
                  <li>Priority phone &amp; chat support</li>
                </ul>
                <div className="fcp-tier-cta">
                  <a href="/fcp-dashboard.html" className="fcp-btn-primary">
                    Start trial<span className="fcp-arrow" aria-hidden="true"></span>
                  </a>
                </div>
              </div>

              <div className="fcp-tier">
                <div className="fcp-tier-mark">Tier 03</div>
                <h4>Enterprise</h4>
                <div className="fcp-tier-price">$7,995+<small>Custom buildout &middot; $495 / mo support</small></div>
                <ul className="fcp-tier-list">
                  <li>Everything in Small Fleet Pro</li>
                  <li>White-label option</li>
                  <li>Multi-terminal support</li>
                  <li>Custom API integrations</li>
                  <li>Dedicated account manager</li>
                  <li>SLA-backed uptime guarantee</li>
                </ul>
                <div className="fcp-tier-cta">
                  <a href="/support" className="fcp-btn-primary">
                    Talk to sales<span className="fcp-arrow" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTES */}
        <section className="fcp-sec">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section VI &middot; The Operators</div>
                <h2 className="fcp-sec-title">Three fleets. Three quiet weeks. Three reasons they stayed.</h2>
              </div>
            </div>

            <div className="fcp-quotes">
              <div className="fcp-quote">
                <blockquote>
                  &ldquo;We cut dispatch time in half the first week. The AI routing alone saved enough fuel
                  to pay for three months of subscription.&rdquo;
                </blockquote>
                <div className="fcp-q-meta">
                  <b>Marcus Delgado</b>
                  <span>Fleet Manager &middot; Delgado Freight &middot; 38 trucks</span>
                </div>
              </div>
              <div className="fcp-quote">
                <blockquote>
                  &ldquo;Before FleetCommand we ran paper logs and a whiteboard. Now hours log themselves
                  and I see every truck on a map. Night and day.&rdquo;
                </blockquote>
                <div className="fcp-q-meta">
                  <b>Sharon Pratt</b>
                  <span>Owner-Operator &middot; Pratt Hauling &middot; 4 trucks</span>
                </div>
              </div>
              <div className="fcp-quote-r2">
                <div className="fcp-q-meta">
                  <b>James Okoro</b>
                  <span>Safety Director</span><br />
                  <span>Great Lakes Transport</span><br />
                  <span>120 trucks &middot; Joined 2024</span>
                </div>
                <div className="fcp-q-body">
                  <blockquote>
                    &ldquo;Compliance reporting paid for itself after our first DOT audit. Everything was
                    organized, signed, and ready to hand over. No scrambling, no late nights, no overtime
                    bill the next pay period.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="fcp-sec" id="demo">
          <div className="fcp-shell">
            <div className="fcp-sec-head">
              <div>
                <div className="fcp-sec-eyebrow">Section VII &middot; See It In Action</div>
                <h2 className="fcp-sec-title">Five screens. The same five your team will live in.</h2>
              </div>
              <div>
                <p className="fcp-sec-deck">
                  Tracking, dispatch, compliance, settlement, analytics. Click through the gallery, or use the
                  arrow keys.
                </p>
              </div>
            </div>
            <Gallery />
          </div>
        </section>

        {/* CLOSER */}
        <section className="fcp-closer">
          <div className="fcp-shell fcp-closer-grid">
            <h2>Move what you said you would move this week.</h2>
            <div>
              <p>
                Five hundred fleets already run on FleetCommand. Start the seven-day trial, then keep going if
                the dispatch board looks better than the spreadsheet you woke up to.
              </p>
              <div className="fcp-cta-row">
                <a href="/fcp-dashboard.html" className="fcp-btn-primary">
                  Start trial<span className="fcp-arrow" aria-hidden="true"></span>
                </a>
                <a href="/support" className="fcp-btn-ghost">Talk to sales</a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
