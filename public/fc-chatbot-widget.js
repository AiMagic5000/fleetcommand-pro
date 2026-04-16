(function () {
  // -------------------- Config (data-attribute driven) --------------------
  const script = document.currentScript;
  const CONFIG = {
    webhookUrl:
      (script && script.dataset.webhook) ||
      "",
    logoUrl:
      (script && script.dataset.logo) ||
      "dt-logo.png",
    accent: (script && script.dataset.accent) || "#1e88e5",
    position: (script && script.dataset.position) || "bottom-right",
    autoOpen: (script && script.dataset.autoOpen) === "on",
    greeting:
      (script && script.dataset.greeting) ||
      "Hi! I'm your Fleet Assistant. I can help you track loads, answer questions about our services, or connect you with dispatch. How can I help?",
    retellTokenUrl:
      (script && script.dataset.retellToken) || "",
    agentId: (script && script.dataset.retellAgent) || "",
    dripWebhook: (script && script.dataset.dripWebhook) || "",
  };

  // -------------------- Session + Lead storage --------------------
  const SESSION_KEY = "dt_session_id";
  const LEAD_KEY = "dt_lead";

  const ensureSessionId = () => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        (crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now()) + "-" + Math.random().toString(36).slice(2);
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  };

  const getStoredLead = () => {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const storeLead = (lead) => localStorage.setItem(LEAD_KEY, JSON.stringify(lead));

  let leadInfo = getStoredLead();
  let messageCount = 0;
  let leadFormShown = false;
  const transcript = [];
  let transcriptSent = false;

  // -------------------- Inject CSS --------------------
  const pos = CONFIG.position.includes("left") ? "left" : "right";
  const accentColor = CONFIG.accent;

  const css = `
    :root{
      --dt-accent:${accentColor};
      --dt-accent-2:color-mix(in srgb, ${accentColor} 70%, white);
      --dt-navy:#0a2540;
      --dt-green:#10b981;
      --dt-text:#0f172a;
      --dt-muted:#6b7280;
      --dt-bg:#ffffff;
      --dt-bot-bg:#f0f6ff;
      --dt-border:#dde5f0;
      --dt-radius:22px;
      --dt-shadow:0 24px 60px rgba(10,37,64,.18);
    }
    #dtWidget *{ box-sizing:border-box; }
    #dtWidget{ position:fixed; ${pos}:20px; bottom:20px; z-index:9999; }
    #dtOverlay{ position:fixed; inset:0; background:rgba(10,37,64,.32); z-index:9998; display:none; }
    #dtOverlay[aria-hidden="false"]{ display:block; }

    /* Launcher button */
    #dtLauncher{
      position:fixed; ${pos}:20px; bottom:20px; z-index:9999;
      border-radius:32px; border:0; cursor:pointer;
      background:#ffffff; box-shadow:0 14px 32px rgba(10,37,64,.25);
      display:flex; align-items:center; gap:8px; padding:10px 18px 10px 12px;
      transition:transform .15s ease;
    }
    #dtLauncher:hover{ transform:scale(1.06); }
    #dtLauncher .launcher-inner{
      width:40px; height:40px; display:grid; place-items:center; flex-shrink:0;
    }
    #dtLauncher img{
      width:40px; height:40px; object-fit:contain; border-radius:50%;
    }
    #dtLauncher .launcher-truck-svg{
      width:32px; height:32px;
    }
    #dtLauncher .launcher-label{
      color:var(--dt-navy); font-size:14px; font-weight:600; white-space:nowrap;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    }
    @media(max-width:768px){
      #dtLauncher{ padding:0; width:56px; height:56px; border-radius:50%; display:grid; place-items:center; }
      #dtLauncher .launcher-label{ display:none; }
      #dtLauncher .launcher-inner{ width:36px; height:36px; }
      #dtLauncher img{ width:36px; height:36px; }
    }

    /* Panel */
    #dtPanel{ display:none; }
    #dtPanel[aria-hidden="false"]{ display:block; }
    #dtPanel .dt-chat{
      width:min(420px, 94vw); height:min(720px, 90vh);
      background:var(--dt-bg); border:1px solid var(--dt-border);
      border-radius:28px; box-shadow:var(--dt-shadow); overflow:hidden;
      display:grid; grid-template-rows:auto 1fr auto;
      font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      color:var(--dt-text);
      position:relative;
    }

    /* Header */
    #dtPanel .dt-hdr{
      display:flex; align-items:center; justify-content:space-between;
      gap:12px; padding:14px 18px;
      background:linear-gradient(135deg, var(--dt-navy) 0%, #0e3560 100%);
      border-bottom:2px solid rgba(30,136,229,.4);
    }
    #dtPanel .hdr-left{ display:flex; align-items:center; gap:12px; }
    #dtPanel .dt-logo-wrap{
      width:42px; height:42px; border-radius:12px;
      display:grid; place-items:center;
      background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
      overflow:hidden; flex:0 0 42px;
    }
    #dtPanel .dt-logo-wrap img{
      width:100%; height:100%; object-fit:cover; border-radius:50%;
    }
    #dtPanel .dt-logo-wrap .avatar-truck{
      width:28px; height:28px; color:#fff;
    }
    #dtPanel .dt-title{
      font-weight:800; font-size:17px; color:#ffffff !important;
      text-shadow:none !important; letter-spacing:.2px; margin:0; line-height:1.2;
    }
    #dtPanel .dt-subtitle{
      font-size:11px; color:rgba(255,255,255,.7) !important;
      text-shadow:none !important; display:flex; align-items:center; gap:6px;
    }
    #dtPanel .dt-dot{
      width:7px; height:7px; border-radius:50%;
      background:var(--dt-green); box-shadow:0 0 0 3px rgba(16,185,129,.25);
    }
    #dtPanel .dt-close{
      border:0; background:rgba(255,255,255,.12); color:#fff;
      font-size:18px; line-height:1; cursor:pointer;
      width:32px; height:32px; border-radius:8px;
      display:grid; place-items:center;
      transition:background .15s;
    }
    #dtPanel .dt-close:hover{ background:rgba(255,255,255,.22); }

    /* Quick-action bar */
    #dtPanel .dt-track-bar{
      padding:0 14px;
      background:#f7faff;
      border-bottom:1px solid var(--dt-border);
    }
    #dtPanel .dt-btn-row{
      display:flex; flex-direction:column; gap:6px;
      padding:8px 0;
    }
    #dtPanel .track-btn, #dtPanel .quick-btn{
      display:block; width:100%; text-align:center;
      padding:9px 12px; border-radius:10px; border:none;
      font-family:inherit; font-size:13px;
      font-weight:600; cursor:pointer; transition:all .15s ease;
      text-decoration:none; line-height:1; color:#fff;
    }
    #dtPanel .track-btn:hover, #dtPanel .quick-btn:hover{ opacity:.85; }
    #dtPanel .track-btn{ background:var(--dt-accent); }
    #dtPanel .quick-btn.upgrade{ background:#7c3aed; }
    #dtPanel .quick-btn.payment{ background:#0891b2; }
    #dtPanel .quick-btn.whitelabel{ background:#d97706; }
    #dtPanel .quick-btn.dispatch{ background:var(--dt-green); }
    #dtPanel .track-input-row{
      display:none; align-items:center; gap:8px;
      margin-bottom:10px;
    }
    #dtPanel .track-input-row.visible{ display:flex; }
    #dtPanel .track-input-row input{
      flex:1; padding:9px 14px; border:1.5px solid var(--dt-border);
      border-radius:9999px; font:inherit; font-size:13px; color:var(--dt-text);
      outline:none; background:#fff;
      transition:border-color .15s;
    }
    #dtPanel .track-input-row input:focus{ border-color:var(--dt-accent); }
    #dtPanel .track-input-row input::placeholder{ color:var(--dt-muted); }
    #dtPanel .track-submit-btn{
      padding:9px 16px; border-radius:9999px; border:0;
      background:var(--dt-accent); color:#fff; font:inherit; font-size:13px;
      font-weight:700; cursor:pointer; white-space:nowrap;
      transition:filter .15s;
    }
    #dtPanel .track-submit-btn:hover{ filter:brightness(1.08); }
    #dtPanel .track-cancel-btn{
      padding:9px 12px; border-radius:9999px; border:1px solid var(--dt-border);
      background:#fff; color:var(--dt-muted); font:inherit; font-size:13px;
      cursor:pointer; transition:all .15s;
    }
    #dtPanel .track-cancel-btn:hover{ color:var(--dt-text); }

    /* Messages */
    #dtPanel .dt-msgs{
      padding:10px 14px 14px; overflow:auto;
      background:linear-gradient(180deg,#f5f8ff 0%, #ffffff 100%);
    }
    #dtPanel .dt-msgs::-webkit-scrollbar{ width:8px; }
    #dtPanel .dt-msgs::-webkit-scrollbar-thumb{ background:#dde5f0; border-radius:8px; }

    /* Voice tip banner */
    #dtPanel .voice-tip{
      display:flex; align-items:center; gap:12px;
      margin:0; padding:10px 14px;
      background:#fff; border-bottom:1px solid var(--dt-border);
    }
    #dtPanel .voice-tip.hidden{ display:none; }
    #dtPanel .voice-tip .blob-mini{
      width:44px; height:44px; flex:0 0 44px; border-radius:50%;
      background:radial-gradient(60% 60% at 40% 35%,
        #e8f4ff 0%, #90c8f8 35%, #3aa0ee 65%, #1e88e5 100%);
      animation:dtBlobWobble 6s ease-in-out infinite;
      box-shadow:0 10px 28px rgba(30,136,229,.28);
    }
    @keyframes dtBlobWobble{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
    #dtPanel .voice-tip .tip-text{ line-height:1.25; }
    #dtPanel .voice-tip .tip-title{ font-weight:800; font-size:14px; }
    #dtPanel .voice-tip .tip-sub{ font-size:12px; color:var(--dt-muted); }
    #dtPanel .tip-mic{
      margin-left:auto; width:44px; height:44px; border:none; border-radius:12px;
      cursor:pointer;
      background:linear-gradient(135deg, var(--dt-accent-2), var(--dt-accent));
      color:#fff; display:grid; place-items:center;
      box-shadow:0 12px 28px rgba(30,136,229,.30);
    }
    #dtPanel .tip-mic svg{ width:22px; height:22px; }

    /* Bubbles */
    #dtPanel .msg{ display:flex; margin:10px 6px; }
    #dtPanel .msg.user{ justify-content:flex-end; }
    #dtPanel .bubble{
      max-width:78%; border-radius:18px; padding:12px 16px;
      box-shadow:0 6px 20px rgba(10,37,64,.07);
      line-height:1.5; word-break:break-word;
    }
    #dtPanel .msg.bot .bubble{
      background:var(--dt-bot-bg); color:var(--dt-text);
      border:1px solid var(--dt-border);
    }
    #dtPanel .msg.user .bubble{
      color:#fff;
      background:linear-gradient(135deg, var(--dt-navy), var(--dt-accent));
      border:0;
    }
    #dtPanel .bubble.streaming{ opacity:.9; }
    #dtPanel .typing{ display:flex; gap:6px; align-items:center; margin:10px 10px; }
    #dtPanel .dot{
      width:8px; height:8px; border-radius:50%;
      background:#bdd5f0; animation:dtBlink 1s infinite;
    }
    #dtPanel .dot:nth-child(2){ animation-delay:.15s; }
    #dtPanel .dot:nth-child(3){ animation-delay:.3s; }
    @keyframes dtBlink{ 0%,100%{opacity:.45} 50%{opacity:1} }

    /* Bubble actions */
    #dtPanel .msg.bot .bubble{ position:relative; }
    #dtPanel .bubble-actions{
      display:flex; gap:14px; margin:6px 6px 0 6px;
      opacity:0; transition:opacity .18s ease;
    }
    #dtPanel .msg.bot:hover .bubble-actions{ opacity:1; }
    @media (hover:none){ #dtPanel .bubble-actions{ opacity:1; } }
    #dtPanel .action-btn{
      width:32px; height:32px; display:grid; place-items:center;
      background:transparent; border:none; color:var(--dt-muted);
      cursor:pointer; border-radius:8px;
    }
    #dtPanel .action-btn:hover{ color:var(--dt-text); }
    #dtPanel .action-btn.like.liked{ color:var(--dt-accent); }
    #dtPanel .action-btn svg{ width:20px; height:20px; }
    #dtPanel .action-btn svg *{
      stroke:currentColor; fill:none; stroke-width:2;
      stroke-linecap:round; stroke-linejoin:round;
    }

    /* Input area */
    #dtPanel .dt-input{
      padding:12px; border-top:1px solid var(--dt-border); background:#fff;
    }
    #dtPanel .input-wrap{
      display:grid; grid-template-columns:1fr auto auto; gap:10px;
      border:1.5px solid var(--dt-border); border-radius:9999px;
      padding:5px 7px; background:#fff; transition:border-color .15s;
    }
    #dtPanel .input-wrap:focus-within{ border-color:var(--dt-accent); }
    #dtPanel .input-wrap input{
      border:0; outline:0; padding:10px 12px; font:inherit; color:var(--dt-text);
      background:transparent; min-width:0;
    }
    #dtPanel .btn{
      width:42px; height:42px; display:grid; place-items:center;
      border:0; background:var(--dt-navy); color:#fff;
      border-radius:14px; cursor:pointer;
      box-shadow:0 10px 24px rgba(10,37,64,.28);
      transition:filter .15s;
    }
    #dtPanel .btn:hover{ filter:brightness(1.15); }
    #dtPanel .icon-btn{
      width:42px; height:42px; display:grid; place-items:center;
      border:1px solid var(--dt-border); background:#fff; color:var(--dt-accent);
      border-radius:14px; cursor:pointer; transition:box-shadow .15s;
    }
    #dtPanel .icon-btn:hover{ box-shadow:0 6px 16px rgba(30,136,229,.15); }
    #dtPanel .icon-btn svg{ width:20px; height:20px; }

    /* Toast */
    #dtPanel .toast{
      position:fixed; ${pos}:26px; bottom:96px;
      background:#0a2540; color:#fff; padding:8px 14px;
      border-radius:10px; font-size:12px; pointer-events:none;
      opacity:0; transform:translateY(8px);
      transition:opacity .2s, transform .2s; z-index:10000;
    }
    #dtPanel .toast.show{ opacity:1; transform:translateY(0); }

    /* Voice dock */
    #dtPanel .voice-dock{
      position:absolute; left:12px; right:12px; bottom:74px;
      background:#fff; border:1px solid var(--dt-border); border-radius:20px;
      box-shadow:0 16px 40px rgba(10,37,64,.14);
      padding:14px; display:none; z-index:3;
    }
    #dtPanel .voice-dock[aria-hidden="false"]{ display:block; }
    #dtPanel .voice-row{
      display:grid; grid-template-columns:1fr auto; align-items:center; gap:14px;
    }
    #dtPanel .voice-left{
      display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:center;
    }
    #dtPanel .dock-controls{ display:flex; align-items:center; gap:10px; }
    #dtPanel .dock-mic{
      width:52px; height:52px; border-radius:50%; border:none; cursor:pointer;
      background:linear-gradient(135deg, var(--dt-accent-2), var(--dt-accent));
      color:#fff; display:grid; place-items:center;
      box-shadow:0 16px 36px rgba(30,136,229,.32);
      transition:filter .15s;
    }
    #dtPanel .dock-mic[aria-pressed="true"]{ filter:brightness(.9); }
    #dtPanel .dock-mic svg{ width:24px; height:24px; }
    #dtPanel .dock-x{
      width:38px; height:38px; border-radius:10px;
      border:1px solid var(--dt-border); background:#fff;
      color:var(--dt-text); display:grid; place-items:center; cursor:pointer;
    }
    #dtPanel .dock-status{ font-size:12px; color:var(--dt-muted); margin-top:8px; padding-left:72px; }

    /* Lead capture overlay */
    #dtPanel .lead-overlay{
      position:absolute; inset:0; z-index:10;
      background:rgba(255,255,255,.96); backdrop-filter:blur(6px);
      display:flex; align-items:center; justify-content:center;
      padding:20px; border-radius:28px;
    }
    #dtPanel .lead-overlay.hidden{ display:none; }
    #dtPanel .lead-form{ width:100%; max-width:340px; text-align:center; }
    #dtPanel .lead-form .lead-icon{
      width:56px; height:56px; margin:0 auto 16px;
      background:linear-gradient(135deg, var(--dt-navy), var(--dt-accent));
      border-radius:16px; display:grid; place-items:center;
    }
    #dtPanel .lead-form .lead-icon svg{ width:30px; height:30px; color:#fff; }
    #dtPanel .lead-form h3{
      font-size:20px; font-weight:800; margin:0 0 6px 0; color:var(--dt-text);
    }
    #dtPanel .lead-form p{
      font-size:14px; color:var(--dt-muted); margin:0 0 20px 0; line-height:1.4;
    }
    #dtPanel .lead-form input{
      display:block; width:100%; padding:13px 16px; margin:0 0 12px 0;
      border:1.5px solid var(--dt-border); border-radius:14px; font:inherit;
      color:var(--dt-text); background:#fff; outline:none; transition:border-color .15s;
    }
    #dtPanel .lead-form input:focus{
      border-color:var(--dt-accent);
      box-shadow:0 0 0 3px rgba(30,136,229,.12);
    }
    #dtPanel .lead-form button{
      width:100%; padding:14px; border:none; border-radius:14px; cursor:pointer;
      font:inherit; font-weight:700; color:#fff;
      background:linear-gradient(135deg, var(--dt-navy), var(--dt-accent));
      box-shadow:0 12px 28px rgba(10,37,64,.22); transition:filter .15s;
    }
    #dtPanel .lead-form button:hover{ filter:brightness(1.08); }
    #dtPanel .lead-form .lead-error{
      color:#ef4444; font-size:13px; margin:0 0 8px 0; display:none;
    }
  `;

  const style = document.createElement("style");
  style.id = "dt-widget-style";
  style.textContent = css;
  document.head.appendChild(style);

  // -------------------- SVGs --------------------
  const TRUCK_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="avatar-truck" aria-hidden="true">
    <path d="M1 3h13v13H1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M14 8h4l3 4v4h-7V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2" stroke="currentColor" stroke-width="1.8"/>
    <circle cx="17.5" cy="18.5" r="2" stroke="currentColor" stroke-width="1.8"/>
    <path d="M1 12h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`;

  const TRUCK_SVG_LAUNCHER = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="launcher-truck-svg" aria-hidden="true">
    <path d="M2 5h17v15H2z" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M19 11h5l4 5v4H19V11z" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="7" cy="23" r="2.5" fill="#1e88e5" stroke="#fff" stroke-width="1.5"/>
    <circle cx="23" cy="23" r="2.5" fill="#1e88e5" stroke="#fff" stroke-width="1.5"/>
    <path d="M2 15h6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`;

  const MIC_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" stroke="currentColor" stroke-width="2"/>
    <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" stroke-width="2"/>
    <path d="M12 18v4" stroke="currentColor" stroke-width="2"/>
  </svg>`;

  const MIC_SVG_WHITE = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" fill="#fff"/>
    <path d="M5 11a7 7 0 0 0 14 0" stroke="#fff" stroke-width="2"/>
    <path d="M12 18v4" stroke="#fff" stroke-width="2"/>
  </svg>`;

  const SEND_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 21L21 12L3 3v7l11 2-11 2z" fill="currentColor" stroke="none"/>
  </svg>`;

  const TRACK_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 4h14v10H1z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M15 7h4l3 4v3h-7V7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="4.5" cy="17" r="1.8" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="16.5" cy="17" r="1.8" stroke="currentColor" stroke-width="1.6"/>
  </svg>`;

  // -------------------- DOM: Overlay --------------------
  const overlay = document.createElement("div");
  overlay.id = "dtOverlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  // -------------------- DOM: Launcher button --------------------
  const launcher = document.createElement("button");
  launcher.id = "dtLauncher";
  launcher.setAttribute("aria-label", "Open DLW Fleet Assistant chat");

  // Use logo image if available, else show truck SVG
  const launcherInner = document.createElement("div");
  launcherInner.className = "launcher-inner";
  const launcherImg = document.createElement("img");
  launcherImg.alt = "FleetCommand Pro";
  launcherImg.src = CONFIG.logoUrl;
  launcherImg.style.display = "none";
  launcherImg.onload = () => { launcherImg.style.display = ""; launcherInner.innerHTML = ""; launcherInner.appendChild(launcherImg); };
  launcherImg.onerror = () => { launcherInner.innerHTML = TRUCK_SVG_LAUNCHER; };
  launcherInner.innerHTML = TRUCK_SVG_LAUNCHER;
  document.body.appendChild(launcherImg); // preload check
  launcher.appendChild(launcherInner);
  const launcherLabel = document.createElement("span");
  launcherLabel.className = "launcher-label";
  launcherLabel.textContent = "Need help?";
  launcher.appendChild(launcherLabel);
  document.body.appendChild(launcher);

  // -------------------- DOM: Widget root + panel --------------------
  const root = document.createElement("div");
  root.id = "dtWidget";

  const panel = document.createElement("div");
  panel.id = "dtPanel";
  panel.setAttribute("aria-hidden", "true");
  root.appendChild(panel);

  const chat = document.createElement("div");
  chat.className = "dt-chat";
  chat.setAttribute("role", "dialog");
  chat.setAttribute("aria-label", "DLW Fleet Assistant Chat");
  chat.setAttribute("aria-modal", "true");

  // ---------- Header ----------
  const hdr = document.createElement("div");
  hdr.className = "dt-hdr";
  hdr.innerHTML = `
    <div class="hdr-left">
      <div class="dt-logo-wrap" aria-hidden="true"><img src="fc-logo.png" alt="Fleet Assistant"></div>
      <div>
        <div class="dt-title">Fleet Assistant</div>
        <div class="dt-subtitle">
          <span class="dt-dot" aria-hidden="true"></span>
          Online &bull; FleetCommand Pro
        </div>
      </div>
    </div>
    <button id="dtClose" class="dt-close" aria-label="Close chat">&times;</button>
  `;

  // ---------- Quick action buttons bar ----------
  const trackBar = document.createElement("div");
  trackBar.className = "dt-track-bar";
  // Buttons row
  const btnRow = document.createElement("div");
  btnRow.className = "dt-btn-row";
  btnRow.innerHTML = `
    <button id="dtTrackBtn" class="track-btn">Track My Load</button>
    <a href="/#pricing" class="quick-btn upgrade">Upgrade</a>
    <a href="/#pricing" class="quick-btn payment">Make a Payment</a>
    <a href="/white-label" class="quick-btn whitelabel">White Label</a>
    <a href="/support" class="quick-btn dispatch">Contact Support</a>
  `;
  trackBar.appendChild(btnRow);
  const trackInputRow = document.createElement("div");
  trackInputRow.id = "dtTrackInputRow";
  trackInputRow.className = "track-input-row";
  trackInputRow.setAttribute("role", "search");
  trackInputRow.innerHTML = `
    <input id="dtTrackNumber" type="text" placeholder="Enter load # (e.g. DLW-001-2024)" aria-label="Load tracking number" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false"/>
    <button id="dtTrackSubmit" class="track-submit-btn">Track</button>
    <button id="dtTrackCancel" class="track-cancel-btn">Cancel</button>
  `;
  trackBar.appendChild(trackInputRow);

  // ---------- Messages area ----------
  const msgsEl = document.createElement("div");
  msgsEl.className = "dt-msgs";
  msgsEl.id = "dtMsgs";
  msgsEl.setAttribute("aria-live", "polite");
  msgsEl.setAttribute("aria-label", "Chat messages");

  // Voice tip banner
  const voiceTipEl = document.createElement("div");
  voiceTipEl.id = "dtVoiceTip";
  voiceTipEl.className = "voice-tip";
  voiceTipEl.setAttribute("role", "status");
  voiceTipEl.setAttribute("aria-label", "Voice call available");
  voiceTipEl.innerHTML = `
    <div class="blob-mini" aria-hidden="true"></div>
    <div class="tip-text">
      <div class="tip-title">AI Fleet Assistant</div>
      <div class="tip-sub">Tap to speak with AI Fleet Assistant</div>
    </div>
    <button id="dtTipMic" class="tip-mic" aria-label="Start voice call">
      ${MIC_SVG_WHITE}
    </button>
  `;
  // voiceTipEl appended after trackBar below

  // ---------- Lead capture overlay ----------
  const leadOverlay = document.createElement("div");
  leadOverlay.id = "dtLeadOverlay";
  leadOverlay.className = "lead-overlay hidden";
  leadOverlay.innerHTML = `
    <div class="lead-form">
      <div class="lead-icon" aria-hidden="true">${TRUCK_SVG}</div>
      <h3>Quick intro first</h3>
      <p>So we can personalize your experience and follow up when needed.</p>
      <p class="lead-error" id="dtLeadError">Please fill in both fields.</p>
      <input type="text" id="dtLeadName" placeholder="First name" autocomplete="given-name" />
      <input type="email" id="dtLeadEmail" placeholder="Email address" autocomplete="email" />
      <button id="dtLeadSubmit">Start chatting</button>
    </div>
  `;

  // ---------- Voice dock ----------
  const voiceDockEl = document.createElement("div");
  voiceDockEl.id = "dtVoiceDock";
  voiceDockEl.className = "voice-dock";
  voiceDockEl.setAttribute("aria-hidden", "true");
  voiceDockEl.innerHTML = `
    <div class="voice-row">
      <div class="voice-left">
        <div class="blob-mini" aria-hidden="true"></div>
        <div>
          <div style="font-weight:800;font-size:14px">Voice dispatch</div>
          <div style="font-size:12px;color:var(--dt-muted)">Tap to talk. Tap again to stop.</div>
        </div>
      </div>
      <div class="dock-controls">
        <button id="dtDockMic" class="dock-mic" aria-pressed="false" aria-label="Start voice call">
          ${MIC_SVG_WHITE}
        </button>
        <button id="dtDockClose" class="dock-x" title="Close voice panel">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="dtDockStatus" class="dock-status">Idle</div>
  `;

  // ---------- Input area ----------
  const inputArea = document.createElement("div");
  inputArea.className = "dt-input";
  inputArea.innerHTML = `
    <div class="input-wrap">
      <input
        id="dtInput"
        type="text"
        placeholder="Ask about loads, rates, or services..."
        autocomplete="off"
        aria-label="Message input"
      />
      <button id="dtBtnMicInline" class="icon-btn" title="Voice call" aria-label="Start voice call" style="display:none">
        ${MIC_SVG}
      </button>
      <button class="btn" id="dtBtnSend" title="Send message" aria-label="Send message">
        ${SEND_SVG}
      </button>
    </div>
  `;

  // Assemble chat
  chat.appendChild(hdr);
  chat.appendChild(trackBar);
  chat.appendChild(voiceTipEl);
  chat.appendChild(voiceDockEl);
  chat.appendChild(msgsEl);
  chat.appendChild(leadOverlay);
  chat.appendChild(inputArea);
  panel.appendChild(chat);
  document.body.appendChild(root);

  // -------------------- State --------------------
  const SESSION_ID = ensureSessionId();
  let greetedThisSession = false;
  let pendingMessage = null;

  // -------------------- Open / Close --------------------
  const openPanel = () => {
    panel.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const buildTranscriptWebhookUrl = () => {
    // Derives a transcript endpoint from the main webhook by replacing the last UUID segment
    // Falls back to same URL with a ?transcript=1 param so n8n can route it
    try {
      const u = new URL(CONFIG.webhookUrl);
      u.searchParams.set("transcript", "1");
      return u.toString();
    } catch {
      return CONFIG.webhookUrl + (CONFIG.webhookUrl.includes("?") ? "&" : "?") + "transcript=1";
    }
  };

  const sendTranscript = () => {
    if (transcriptSent || transcript.length < 2 || !CONFIG.webhookUrl) return;
    transcriptSent = true;
    const payload = {
      sessionId: SESSION_ID,
      transcript,
      name: leadInfo ? leadInfo.name : "Anonymous",
      email: leadInfo ? leadInfo.email : "Not provided",
      page: window.location.href,
      closedAt: new Date().toISOString(),
      source: "dt-fleet-chatbot",
    };
    fetch(buildTranscriptWebhookUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  };

  const closePanel = () => {
    panel.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    sendTranscript();
  };

  const closeBtn = panel.querySelector("#dtClose");
  launcher.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });
  window.addEventListener("beforeunload", sendTranscript);

  // Public API
  window.DTWidget = {
    open: (opts = {}) => { openPanel(); if (opts.greeting) maybeGreet(opts.greeting); },
    close: closePanel,
    toggle: () => panel.getAttribute("aria-hidden") === "true" ? openPanel() : closePanel(),
    isOpen: () => panel.getAttribute("aria-hidden") === "false",
  };

  // -------------------- Track My Load feature --------------------
  const trackBtn = panel.querySelector("#dtTrackBtn");
  // trackInputRow already defined above when creating DOM
  const trackNumberInput = panel.querySelector("#dtTrackNumber");
  const trackSubmitBtn = panel.querySelector("#dtTrackSubmit");
  const trackCancelBtn = panel.querySelector("#dtTrackCancel");

  trackBtn.addEventListener("click", () => {
    trackBtn.style.display = "none";
    trackInputRow.classList.add("visible");
    trackNumberInput.focus();
  });

  trackCancelBtn.addEventListener("click", () => {
    trackInputRow.classList.remove("visible");
    trackBtn.style.display = "";
    trackNumberInput.value = "";
  });

  const submitTrackingNumber = () => {
    const num = trackNumberInput.value.trim();
    if (!num) { trackNumberInput.focus(); return; }
    // Redirect to status page with tracking code as URL param
    window.location.href = "/tracking?track=" + encodeURIComponent(num.toUpperCase());
  };

  trackSubmitBtn.addEventListener("click", submitTrackingNumber);
  trackNumberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); submitTrackingNumber(); }
    if (e.key === "Escape") { trackCancelBtn.click(); }
  });

  // -------------------- Message helpers --------------------
  const inputEl = panel.querySelector("#dtInput");
  const btnSend = panel.querySelector("#dtBtnSend");

  const addMsg = (role, text, opts = {}) => {
    const wrap = document.createElement("div");
    wrap.className = "msg " + (role === "user" ? "user" : "bot");
    const bubble = document.createElement("div");
    bubble.className = "bubble" + (opts.streaming ? " streaming" : "");
    bubble.textContent = text;
    wrap.appendChild(bubble);
    if (role === "bot") {
      const actions = document.createElement("div");
      actions.className = "bubble-actions";
      actions.setAttribute("role", "group");
      actions.setAttribute("aria-label", "Message actions");
      actions.innerHTML = `
        <button class="action-btn copy" title="Copy message">
          <svg viewBox="0 0 24 24">
            <rect x="9" y="9" width="11" height="11" rx="2"></rect>
            <rect x="4" y="4" width="11" height="11" rx="2"></rect>
          </svg>
        </button>
        <button class="action-btn like" title="Helpful">
          <svg viewBox="0 0 24 24">
            <path d="M2 10h4v10H2z"></path>
            <path d="M8 20h8.5a3 3 0 0 0 3-2.4l1.1-5A2 2 0 0 0 18.7 10H14V6a3 3 0 0 0-3-3l-3 7v10z"></path>
          </svg>
        </button>
      `;
      wrap.appendChild(actions);
    }
    msgsEl.appendChild(wrap);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!opts.streaming) {
      transcript.push({ role, text, time: new Date().toISOString() });
    }
    return bubble;
  };

  const showTyping = (show) => {
    let row = panel.querySelector("#dtTyping");
    if (show) {
      if (!row) {
        row = document.createElement("div");
        row.id = "dtTyping";
        row.className = "typing";
        row.setAttribute("aria-label", "Fleet Assistant is typing");
        row.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        msgsEl.appendChild(row);
      }
    } else if (row) {
      row.remove();
    }
    msgsEl.scrollTop = msgsEl.scrollHeight;
  };

  const toast = (msg) => {
    let t = document.getElementById("dtToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "dtToast";
      t.className = "toast";
      panel.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove("show"), 1400);
  };

  // Message action buttons
  msgsEl.addEventListener("click", async (e) => {
    const btn = e.target.closest(".action-btn");
    if (!btn) return;
    const row = btn.closest(".msg");
    const text = row?.querySelector(".bubble")?.textContent || "";
    if (btn.classList.contains("copy")) {
      try { await navigator.clipboard.writeText(text); toast("Copied"); } catch { toast("Copy failed"); }
    }
    if (btn.classList.contains("like")) {
      btn.classList.toggle("liked");
      toast(btn.classList.contains("liked") ? "Thanks for the feedback!" : "Like removed");
    }
  });

  // -------------------- Webhook --------------------
  const sendToWebhook = async (message) => {
    if (!CONFIG.webhookUrl) throw new Error("No webhook URL configured.");
    const payload = { message, sessionId: SESSION_ID, source: "dt-fleet-chatbot" };
    if (leadInfo) {
      payload.name = leadInfo.name;
      payload.firstName = leadInfo.name;
      payload.email = leadInfo.email;
    }
    const res = await fetch(CONFIG.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const data = await res.json();
      let reply =
        data.output ??
        data.reply ??
        data.response ??
        data.message ??
        data.text ??
        (data.data && (data.data.output || data.data.reply || data.data.response || data.data.text));
      if (!reply && Array.isArray(data.messages) && data.messages.length) {
        const last = data.messages[data.messages.length - 1];
        reply = last.text || last.message || last.response || last.output;
      }
      return reply || JSON.stringify(data);
    }
    return await res.text();
  };

  // -------------------- Lead capture --------------------
  function showLeadForm() {
    if (leadFormShown || leadInfo) return;
    leadFormShown = true;
    leadOverlay.classList.remove("hidden");
    const nameInput = panel.querySelector("#dtLeadName");
    setTimeout(() => nameInput && nameInput.focus(), 200);
  }

  function hideLeadForm() {
    leadOverlay.classList.add("hidden");
  }

  const enrollInDrip = (name, email) => {
    if (!CONFIG.dripWebhook) return;
    fetch(CONFIG.dripWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        firstName: name,
        email,
        sessionId: SESSION_ID,
        source: "dt-fleet-chatbot",
        page: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  };

  const leadSubmitBtn = panel.querySelector("#dtLeadSubmit");
  const leadError = panel.querySelector("#dtLeadError");

  leadSubmitBtn.addEventListener("click", () => {
    const nameVal = panel.querySelector("#dtLeadName").value.trim();
    const emailVal = panel.querySelector("#dtLeadEmail").value.trim();
    if (!nameVal || !emailVal || !emailVal.includes("@")) {
      leadError.style.display = "block";
      leadError.textContent = !nameVal
        ? "Please enter your first name."
        : "Please enter a valid email.";
      return;
    }
    leadError.style.display = "none";
    leadInfo = { name: nameVal, email: emailVal };
    storeLead(leadInfo);
    hideLeadForm();
    addMsg("bot", "Thanks, " + nameVal + "! How can I help with your shipment today?");
    enrollInDrip(nameVal, emailVal);
    if (pendingMessage) {
      const msg = pendingMessage;
      pendingMessage = null;
      doSend(msg);
    }
  });

  panel.querySelector("#dtLeadEmail").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); leadSubmitBtn.click(); }
  });
  panel.querySelector("#dtLeadName").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); panel.querySelector("#dtLeadEmail").focus(); }
  });

  // -------------------- Send logic --------------------
  async function doSend(text) {
    showTyping(true);
    try {
      const reply = await sendToWebhook(text);
      showTyping(false);
      addMsg("bot", String(reply));
    } catch (err) {
      showTyping(false);
      addMsg("bot", "Sorry, I couldn't reach dispatch. Please try again or call (your dispatch number). (" + err.message + ")");
    }
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMsg("user", text);
    inputEl.value = "";
    messageCount++;
    if (!leadInfo && messageCount >= 1) {
      pendingMessage = text;
      showLeadForm();
      return;
    }
    await doSend(text);
  }

  btnSend.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleSend(); }
  });

  // -------------------- Greeting --------------------
  function maybeGreet(customText) {
    if (greetedThisSession) return;
    greetedThisSession = true;
    addMsg("bot", customText || CONFIG.greeting);
  }

  // -------------------- Voice (Retell) --------------------
  const voiceDock = panel.querySelector("#dtVoiceDock");
  const btnMicInline = panel.querySelector("#dtBtnMicInline");
  const dockMic = panel.querySelector("#dtDockMic");
  const dockClose = panel.querySelector("#dtDockClose");
  const dockStatus = panel.querySelector("#dtDockStatus");
  const tipMic = panel.querySelector("#dtTipMic");
  const voiceTip = panel.querySelector("#dtVoiceTip");

  // Show/hide voice features based on Retell config
  if (!CONFIG.retellTokenUrl && !CONFIG.agentId) {
    voiceTipEl.classList.add("hidden");
    btnMicInline.style.display = "none";
  } else {
    btnMicInline.style.display = "";
  }

  let inCall = false;
  let retell = null;
  let isLoadingSDK = false;
  let agentStreamBubble = null;

  const openDock = () => voiceDock.setAttribute("aria-hidden", "false");
  const closeDock = () => { voiceDock.setAttribute("aria-hidden", "true"); if (inCall) stopCall(); };
  dockClose.addEventListener("click", closeDock);

  async function ensureRetell() {
    if (retell) return retell;
    if (isLoadingSDK) {
      return new Promise((resolve, reject) => {
        const check = setInterval(() => {
          if (retell) { clearInterval(check); resolve(retell); }
          else if (!isLoadingSDK) { clearInterval(check); reject(new Error("SDK load failed")); }
        }, 100);
        setTimeout(() => { clearInterval(check); reject(new Error("SDK load timeout")); }, 15000);
      });
    }
    isLoadingSDK = true;
    try {
      const mod = await import("https://esm.sh/retell-client-js-sdk@2?bundle&target=es2020");
      const { RetellWebClient } = mod || {};
      if (!RetellWebClient) throw new Error("Retell Web SDK failed to load.");
      retell = new RetellWebClient();
      return retell;
    } finally {
      isLoadingSDK = false;
    }
  }

  const acquireAccessToken = async () => {
    if (!CONFIG.retellTokenUrl) throw new Error("No Retell token URL configured.");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const r = await fetch(CONFIG.retellTokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "cache-control": "no-store" },
        body: JSON.stringify({
          sessionId: SESSION_ID,
          agentId: CONFIG.agentId || undefined,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.access_token) {
        throw new Error(j.error || j.message || "No access_token in response");
      }
      return j.access_token;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") throw new Error("Token request timed out");
      throw err;
    }
  };

  const streamAgentText = (text) => {
    if (!agentStreamBubble) {
      agentStreamBubble = addMsg("bot", text || "", { streaming: true });
    } else if (agentStreamBubble.textContent !== text) {
      agentStreamBubble.textContent = text || "";
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
  };
  const endAgentStream = () => {
    if (agentStreamBubble) agentStreamBubble.classList.remove("streaming");
    agentStreamBubble = null;
  };

  async function requestMicrophoneAccess() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Your browser doesn't support microphone access.");
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      if (err.name === "NotAllowedError") throw new Error("Microphone permission denied. Please allow mic access in browser settings.");
      if (err.name === "NotFoundError") throw new Error("No microphone found. Please connect a microphone.");
      if (err.name === "NotReadableError") throw new Error("Microphone is in use by another application.");
      if (err.name === "SecurityError") throw new Error("Microphone requires a secure (HTTPS) connection.");
      throw new Error("Microphone error: " + (err.message || err.name));
    }
  }

  async function startCall() {
    if (inCall) { await stopCall(); return; }
    try {
      if (retell) { try { retell.stopCall(); } catch (_) {} retell = null; }
      await ensureRetell();
      openDock();
      voiceTip.classList.add("hidden");
      dockStatus.textContent = "Requesting microphone...";
      try {
        await requestMicrophoneAccess();
      } catch (micErr) {
        dockStatus.textContent = "Mic access failed";
        addMsg("bot", micErr.message);
        voiceTip.classList.remove("hidden");
        return;
      }
      dockStatus.textContent = "Connecting to dispatch...";
      dockMic.setAttribute("aria-pressed", "true");
      const token = await acquireAccessToken();
      await retell.startCall({ accessToken: token });
      inCall = true;
      dockStatus.textContent = "Listening... tap mic to end call";
      retell.on("call_started", () => { dockStatus.textContent = "Connected"; });
      retell.on("call_ended", () => {
        dockStatus.textContent = "Call ended";
        inCall = false;
        dockMic.setAttribute("aria-pressed", "false");
        endAgentStream();
        voiceTip.classList.remove("hidden");
      });
      retell.on("update", (u) => {
        const t = u && Array.isArray(u.transcript) ? u.transcript.at(-1) : null;
        if (t && t.content && t.role === "agent") streamAgentText(t.content);
      });
      retell.on("error", (err) => {
        addMsg("bot", "Voice error: " + (err?.message || String(err)));
        dockStatus.textContent = "Error";
        try { retell.stopCall(); } catch (_) {}
        inCall = false;
        dockMic.setAttribute("aria-pressed", "false");
        endAgentStream();
        voiceTip.classList.remove("hidden");
      });
    } catch (err) {
      let msg = "Failed to start voice call.";
      if (err.message.includes("access_token")) msg = "Could not connect to voice dispatch.";
      else if (err.message.includes("SDK")) msg = "Voice feature failed to load. Please refresh.";
      else if (err.message.includes("timeout")) msg = "Connection timed out. Please try again.";
      else if (err.message) msg = err.message;
      addMsg("bot", msg);
      dockStatus.textContent = "Failed";
      dockMic.setAttribute("aria-pressed", "false");
      inCall = false;
      voiceTip.classList.remove("hidden");
    }
  }

  async function stopCall() {
    try { if (retell) await retell.stopCall(); } catch (_) {}
    inCall = false;
    dockMic.setAttribute("aria-pressed", "false");
    dockStatus.textContent = "Call ended";
    endAgentStream();
    voiceTip.classList.remove("hidden");
  }

  const startFromTip = async (e) => {
    e?.stopPropagation?.();
    if (!inCall) await startCall(); else await stopCall();
  };

  tipMic.addEventListener("click", startFromTip);
  voiceTip.addEventListener("click", async () => { if (!inCall) await startCall(); });
  btnMicInline.addEventListener("click", startFromTip);
  dockMic.addEventListener("click", startFromTip);

  // -------------------- Auto-open once per session --------------------
  if (CONFIG.autoOpen) {
    const key = "dt_auto_opened";
    if (!sessionStorage.getItem(key)) {
      openPanel();
      maybeGreet();
      sessionStorage.setItem(key, "1");
    }
  }
})();

/*
 * FleetCommand Pro - Fleet Assistant Widget v1.0
 * Based on SMB Widget v4.3
 *
 * EMBED CODE:
 * -----------
 * <script
 *   src="https://derricktransport.com/dt-chatbot-widget.js"
 *   data-webhook="https://n8n.yourdomain.com/webhook/YOUR-WEBHOOK-ID"
 *   data-retell-token="https://n8n.yourdomain.com/webhook/YOUR-RETELL-TOKEN-ID"
 *   data-retell-agent="YOUR_RETELL_AGENT_ID"
 *   data-drip-webhook="https://n8n.yourdomain.com/webhook/YOUR-DRIP-ID"
 *   data-logo="dt-logo.png"
 *   data-accent="#1e88e5"
 *   data-greeting="Hi! I'm your Fleet Assistant. How can I help?"
 *   defer
 * ></script>
 *
 * TRACK MY LOAD:
 * --------------
 * When user submits a tracking number, a message is sent to the webhook:
 *   { message: "TRACK_LOAD: DLW-001-2024", sessionId: "...", ... }
 * In n8n, route on message.startsWith("TRACK_LOAD:") to query Cognabase.
 *
 * TRANSCRIPT:
 * -----------
 * On panel close / page unload, transcript is POSTed to:
 *   webhookUrl?transcript=1
 * with payload: { sessionId, transcript[], name, email, page, closedAt, source }
 *
 * VOICE:
 * ------
 * Retell SDK loaded dynamically from esm.sh. Configure via data-retell-token
 * and data-retell-agent. If neither is set, voice UI is hidden automatically.
 */
