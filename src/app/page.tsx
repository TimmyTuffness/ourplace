"use client";

import React, { useState, useEffect } from "react";

type RoleMode = "council" | "resident";

interface PriorityItem {
  id: string;
  title: string;
  category: string;
  status: "URGENT" | "FLAGGED" | "PRIORITY" | "ACTIVE";
  metric: string;
  summary: string;
  details: string;
  actionLabel: string;
}

const COUNCIL_ITEMS: PriorityItem[] = [
  {
    id: "c1",
    title: "Stormwater & Drainage Sensor Alert — Sector 4",
    category: "Infrastructure • Flagged 18m ago",
    status: "URGENT",
    metric: "94% Capacity",
    summary: "IoT sensors and 14 resident reports indicate rapid water pooling near station underpass.",
    details: "AI Cross-Reference: Combined rainfall telemetry and 14 geotagged resident submissions confirm a blocked culvert. Dispatching rapid maintenance crew now prevents peak-hour commuter disruption.",
    actionLabel: "Dispatch Rapid Crew"
  },
  {
    id: "c2",
    title: "Park Lighting & Night Safety Upgrade Petition",
    category: "Community Safety • Flagged by AI Sentiment",
    status: "FLAGGED",
    metric: "312 Signatures",
    summary: "High community engagement requesting solar LED bollard lighting along the central walking track.",
    details: "AI Overview: 89% positive resident consensus. Fits within Q4 Sustainable Infrastructure Grant budget ($42,000 remaining). Recommended for fast-track approval.",
    actionLabel: "Approve Grant Allocation"
  },
  {
    id: "c3",
    title: "Youth Civic Hub & Sports Court Booking Overhaul",
    category: "Parks & Recreation • Q4 Priority",
    status: "PRIORITY",
    metric: "+68% Demand",
    summary: "Weekend table tennis, cricket nets, and multipurpose court bookings have exceeded capacity.",
    details: "AI Recommendation: Introduce automated smart-lock access and extended twilight lighting hours between 5:00 PM and 9:00 PM to double community throughput at zero staffing cost.",
    actionLabel: "Review Smart Schedule"
  }
];

const RESIDENT_ITEMS: PriorityItem[] = [
  {
    id: "r1",
    title: "Central Park Solar Lighting & Pathway Upgrade",
    category: "Local Upgrade • 450m from you",
    status: "ACTIVE",
    metric: "78% Complete",
    summary: "New high-efficiency LED pathways, shaded seating pods, and smart hydration stations installing this week.",
    details: "Community Impact: Directly funded through resident voting on OurPlace. Pathways remain open during construction with completion scheduled for Friday.",
    actionLabel: "Vote on Next Phase"
  },
  {
    id: "r2",
    title: "Green Waste & Bulky Kerbside Collection",
    category: "Council Service • Next Scheduled Pickup",
    status: "PRIORITY",
    metric: "This Thursday",
    summary: "Your street is scheduled for garden organics and bundled branch collection this Thursday at 6:00 AM.",
    details: "Smart Reminder: Place green lid bins and tied branches on the nature strip by Wednesday night. Need an extra bulky item pickup? Book an instant slot below.",
    actionLabel: "Book Bulky Pickup"
  },
  {
    id: "r3",
    title: "Weekend Community Micro-Grants Now Open",
    category: "Civic Initiative • Up to $2,500",
    status: "URGENT",
    metric: "5 Days Left",
    summary: "Pitch a neighbourhood event, youth tournament, or street beautification project for instant micro-funding.",
    details: "Fast-Track Process: Submit a 2-minute proposal. OurPlace AI helps format your budget and safety checklist automatically so residents can vote on it.",
    actionLabel: "Launch Proposal"
  }
];

export default function OurPlaceApp() {
  const [mode, setMode] = useState<RoleMode>("council");
  const [selectedItem, setSelectedItem] = useState<PriorityItem | null>(null);
  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [aiQuery, setAiQuery] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>(
    "Pentagon Intelligence active. Ask about urgent priorities, flagged anomalies, or local resident briefings."
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeFacet, setActiveFacet] = useState<string>("Unity & Strength");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerAiPrompt = (promptText: string) => {
    setAiOpen(true);
    setAiQuery(promptText);
    setIsTyping(true);

    setTimeout(() => {
      const lower = promptText.toLowerCase();
      if (lower.includes("urgent")) {
        setAiResponse(
          "🚨 URGENT BRIEFING: 1 critical item requires immediate sign-off. Sector 4 Stormwater sensors hit 94% capacity with 14 matching resident hazard pins. Recommend dispatching Crew B within 30 minutes."
        );
      } else if (lower.includes("flagged")) {
        setAiResponse(
          "🚩 FLAGGED ANOMALIES: AI detected a 310% spike in resident mentions around evening park lighting and a backlog in community sports court bookings. Both can be resolved using existing Q4 reserve funds."
        );
      } else if (lower.includes("priorities") || lower.includes("priority")) {
        setAiResponse(
          "⚡ TODAY'S TOP 3 PRIORITIES:\n1. Approve Sector 4 drainage dispatch (High Impact)\n2. Sign off on Central Park LED grant allocation ($42k)\n3. Publish the weekly Resident Transparency Overview."
        );
      } else if (lower.includes("resident") || lower.includes("happening")) {
        setAiResponse(
          "🏡 NEIGHBOURHOOD PULSE: Central Park pathway upgrades are 78% complete, green waste pickup runs this Thursday at 6 AM, and 312 neighbours voted to expand twilight sports lighting."
        );
      } else {
        setAiResponse(
          `✨ Pentagon AI Analysis for "${promptText}": Based on live civic telemetry, community engagement is up 42% this week with 91% resolution speed on resident-reported issues.`
        );
      }
      setIsTyping(false);
    }, 550);
  };

  const items = mode === "council" ? COUNCIL_ITEMS : RESIDENT_ITEMS;

  return (
    <div className="op-root">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .op-root {
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #162038 0%, #070b14 55%, #04060c 100%);
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow-x: hidden;
          position: relative;
        }
        .bg-glow {
          position: fixed;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 70%);
          top: -220px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }
        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 28px 24px 100px;
          position: relative;
          z-index: 1;
        }
        /* Top Nav */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          margin-bottom: 42px;
          animation: slideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.03em;
        }
        .brand-badge {
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.1));
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fbbf24;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .mode-switcher {
          display: flex;
          background: rgba(2, 6, 23, 0.8);
          padding: 5px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          gap: 6px;
        }
        .mode-btn {
          border: none;
          background: transparent;
          color: #94a3b8;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .mode-btn.active {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #090d16;
          transform: scale(1.03);
          box-shadow: 0 8px 20px -4px rgba(245, 158, 11, 0.45);
        }
        /* Hero Section */
        .hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: center;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; text-align: center; }
          .nav { flex-direction: column; gap: 14px; }
        }
        .hero-title {
          font-size: clamp(2.3rem, 4.5vw, 3.7rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin-bottom: 18px;
          opacity: 0;
          animation: popIn 0.8s 0.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .gradient-gold {
          background: linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: 1.12rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 26px;
          opacity: 0;
          animation: popIn 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Quick AI Chips */
        .chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          opacity: 0;
          animation: popIn 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ai-chip {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fde68a;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ai-chip:hover {
          transform: translateY(-3px) scale(1.04);
          background: rgba(245, 158, 11, 0.2);
          border-color: #fbbf24;
          box-shadow: 0 12px 24px -8px rgba(245, 158, 11, 0.4);
        }
        /* Interactive Pentagon Emblem Showcase */
        .pentagon-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          position: relative;
          backdrop-filter: blur(20px);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease;
          opacity: 0;
          animation: popIn 0.9s 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .pentagon-stage:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(245, 158, 11, 0.45);
          box-shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.22);
        }
        .pentagon-svg {
          width: 210px;
          height: 210px;
          filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.35));
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .pentagon-stage:hover .pentagon-svg {
          transform: rotate(72deg) scale(1.08);
        }
        .pillar-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 18px;
        }
        .pillar-tag {
          font-size: 0.75rem;
          padding: 5px 11px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid transparent;
        }
        .pillar-tag:hover {
          background: rgba(245, 158, 11, 0.18);
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.4);
          transform: scale(1.08);
        }
        /* AI Overview Banner */
        .ai-banner {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 22px;
          padding: 24px 28px;
          margin-bottom: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
          animation: popIn 0.7s 0.35s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @media (max-width: 768px) {
          .ai-banner { flex-direction: column; align-items: flex-start; }
        }
        /* Cards Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 22px;
        }
        .card {
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 22px;
          padding: 26px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          animation: popIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .card:nth-child(1) { animation-delay: 0.4s; }
        .card:nth-child(2) { animation-delay: 0.52s; }
        .card:nth-child(3) { animation-delay: 0.64s; }
        .card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 22px 44px -12px rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(245, 158, 11, 0.2);
        }
        .badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.06em;
        }
        .badge.URGENT { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); }
        .badge.FLAGGED { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.4); }
        .badge.PRIORITY, .badge.ACTIVE { background: rgba(56, 189, 248, 0.2); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.4); }
        /* Modal Pop-up */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.78);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
          animation: fadeIn 0.25s ease forwards;
        }
        .modal-box {
          background: linear-gradient(145deg, #0f172a, #1e293b);
          border: 1px solid rgba(245, 158, 11, 0.45);
          border-radius: 26px;
          max-width: 580px;
          width: 100%;
          padding: 32px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.85);
          animation: modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .primary-btn {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #090d16;
          border: none;
          padding: 12px 22px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .primary-btn:hover {
          transform: scale(1.05);
        }
        /* Keyframes */
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(28px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.86) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="bg-glow" />

      <div className="container">
        {/* Top Navigation */}
        <nav className="nav">
          <div className="brand">
            <span style={{ color: "#f59e0b", fontSize: "1.6rem" }}>⬠</span>
            <span>OurPlace</span>
            <span className="brand-badge">Pentagon Intelligence</span>
          </div>

          <div className="mode-switcher">
            <button
              className={`mode-btn ${mode === "council" ? "active" : ""}`}
              onClick={() => setMode("council")}
            >
              🏛️ Council Staff View
            </button>
            <button
              className={`mode-btn ${mode === "resident" ? "active" : ""}`}
              onClick={() => setMode("resident")}
            >
              🏡 Resident Portal
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div>
            <h1 className="hero-title">
              {mode === "council" ? (
                <>
                  Civic Command.{" "}
                  <span className="gradient-gold">Powered by AI.</span>
                </>
              ) : (
                <>
                  Your Neighbourhood.{" "}
                  <span className="gradient-gold">Connected & Heard.</span>
                </>
              )}
            </h1>
            <p className="hero-sub">
              {mode === "council"
                ? "Instant executive synthesis of urgent council priorities, flagged infrastructure anomalies, and real-time citizen sentiment."
                : "Track local park upgrades, check street schedules, vote on community micro-grants, and ask the OurPlace AI anything."}
            </p>

            <div className="chip-row">
              {mode === "council" ? (
                <>
                  <button
                    className="ai-chip"
                    onClick={() => triggerAiPrompt("What are my priorities today?")}
                  >
                    ⚡ What are my priorities?
                  </button>
                  <button
                    className="ai-chip"
                    onClick={() => triggerAiPrompt("What seems urgent right now?")}
                  >
                    🚨 What seems urgent?
                  </button>
                  <button
                    className="ai-chip"
                    onClick={() => triggerAiPrompt("Any flagged things to review?")}
                  >
                    🚩 Any flagged things?
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="ai-chip"
                    onClick={() => triggerAiPrompt("What upgrades are happening near me?")}
                  >
                    🌳 Local upgrades near me
                  </button>
                  <button
                    className="ai-chip"
                    onClick={() => triggerAiPrompt("Resident overview for this week")}
                  >
                    📅 Weekly neighbourhood brief
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Interactive Pentagon Core */}
          <div className="pentagon-stage" onClick={() => setAiOpen(true)}>
            <svg viewBox="0 0 200 200" className="pentagon-svg">
              <defs>
                <linearGradient id="pentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              {/* Outer Pentagon */}
              <polygon
                points="100,12 186,74 153,176 47,176 14,74"
                fill="rgba(245, 158, 11, 0.08)"
                stroke="url(#pentGrad)"
                strokeWidth="4"
              />
              {/* Middle Pentagon */}
              <polygon
                points="100,38 160,82 137,154 63,154 40,82"
                fill="rgba(56, 189, 248, 0.08)"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* Inner Core Pentagon */}
              <polygon
                points="100,65 134,90 121,130 79,130 66,90"
                fill="url(#pentGrad)"
                opacity="0.9"
              />
            </svg>
            <div style={{ marginTop: "12px", fontWeight: 800, color: "#fde68a" }}>
              Pillar: {activeFacet}
            </div>
            <div className="pillar-pills">
              {["Strength", "Power", "Unity", "Prosperity", "Community"].map((pillar) => (
                <span
                  key={pillar}
                  className="pillar-tag"
                  onMouseEnter={() => setActiveFacet(pillar)}
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Live AI Intelligence Overview Bar */}
        <section className="ai-banner">
          <div>
            <div style={{ fontSize: "0.78rem", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              ✦ Google Gemini Civic Synthesis • Live Overview
            </div>
            <div style={{ fontSize: "1.02rem", color: "#e2e8f0", lineHeight: 1.5 }}>
              {isTyping ? "Synthesizing live civic telemetry..." : aiResponse}
            </div>
          </div>
          <button className="primary-btn" onClick={() => setAiOpen(!aiOpen)}>
            {aiOpen ? "Hide AI Console" : "Ask Pentagon AI"}
          </button>
        </section>

        {/* Expandable Interactive AI Input Drawer */}
        {aiOpen && (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "32px",
              display: "flex",
              gap: "12px",
              animation: "modalPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            }}
          >
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && triggerAiPrompt(aiQuery)}
              placeholder={
                mode === "council"
                  ? "Ask e.g. 'What are my priorities?' or 'Summarize flagged drainage alerts'..."
                  : "Ask e.g. 'When is green waste pickup?' or 'How do I apply for a park grant?'..."
              }
              style={{
                flex: 1,
                background: "rgba(2, 6, 23, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
            <button className="primary-btn" onClick={() => triggerAiPrompt(aiQuery)}>
              Run AI Brief
            </button>
          </div>
        )}

        {/* Interactive Priority & Community Cards Grid */}
        <section className="grid">
          {mounted &&
            items.map((item) => (
              <div
                key={item.id}
                className="card"
                onClick={() => setSelectedItem(item)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span className={`badge ${item.status}`}>{item.status}</span>
                  <span style={{ fontWeight: 800, color: "#fbbf24", fontSize: "0.95rem" }}>
                    {item.metric}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.22rem", fontWeight: 800, marginBottom: "8px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "14px", fontWeight: 600 }}>
                  {item.category}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.94rem", lineHeight: 1.55, marginBottom: "18px" }}>
                  {item.summary}
                </p>
                <div style={{ color: "#38bdf8", fontSize: "0.88rem", fontWeight: 700 }}>
                  Click for AI Deep-Dive & Action →
                </div>
              </div>
            ))}
        </section>
      </div>

      {/* Pop-Up Detail Modal */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span className={`badge ${selectedItem.status}`}>{selectedItem.status}</span>
              <button
                onClick={() => setSelectedItem(null)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "1.4rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <h2 style={{ fontSize: "1.55rem", fontWeight: 800, marginBottom: "8px" }}>
              {selectedItem.title}
            </h2>
            <p style={{ color: "#fbbf24", fontSize: "0.88rem", fontWeight: 700, marginBottom: "18px" }}>
              {selectedItem.category} • {selectedItem.metric}
            </p>
            <div
              style={{
                background: "rgba(2, 6, 23, 0.65)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                padding: "16px",
                borderRadius: "14px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                fontSize: "0.95rem",
                marginBottom: "24px"
              }}
            >
              {selectedItem.details}
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                className="mode-btn"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
              <button
                className="primary-btn"
                onClick={() => {
                  triggerAiPrompt(`Action initiated: ${selectedItem.actionLabel} for ${selectedItem.title}`);
                  setSelectedItem(null);
                }}
              >
                {selectedItem.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
