"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { WHATSAPP_URL, WHATSAPP_NUMBER, REDDY_URL } from "../lib/constants";
import InfoSection from "../components/InfoSection";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const REFRESH_MS = 15_000;

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [announcement, setAnnouncement] = useState(null);
  const [todayDate, setTodayDate] = useState("");
  const [yesterdayDate, setYDate] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [chartMonth, setChartMonth] = useState(() =>
    String(new Date().getMonth() + 1).padStart(2, "0"),
  );
  const [chartYear, setChartYear] = useState(() =>
    String(new Date().getFullYear()),
  );
  const [chartData, setChartData] = useState(null);

  // Fetch today results from backend API
  const loadAnnouncement = useCallback(async () => {
    try {
      const res = await fetch("/api/announcement");
      const json = await res.json();
      if (json && json.success) setAnnouncement(json);
    } catch (e) {}
  }, []);

  const loadResults = useCallback(async () => {
    try {
      setSyncing(true);
      const res = await fetch("/api/results/today");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setGames(json.data);
        if (json.today_date) setTodayDate(json.today_date);
        if (json.yesterday_date) setYDate(json.yesterday_date);
      }
    } catch (e) {
      console.warn("[SK] API failed:", e.message);
    } finally {
      setTimeout(() => setSyncing(false), 800);
    }
  }, []);

  useEffect(() => {
    loadResults();
    loadAnnouncement();
    const id = setInterval(() => {
      loadResults();
      loadAnnouncement();
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, [loadResults, loadAnnouncement]);

  // Load monthly chart from backend API
  const loadChart = useCallback(async (month, year) => {
    try {
      const res = await fetch(`/api/chart/monthly?month=${month}&year=${year}`);
      const json = await res.json();
      if (json.success && json.rows) {
        setChartData(json);
      }
    } catch (e) {
      console.warn("[SK] Chart API failed:", e.message);
    }
  }, []);

  useEffect(() => {
    loadChart(chartMonth, chartYear);
  }, [loadChart, chartMonth, chartYear]);

  const filtered = searchQ
    ? games.filter(
        (g) =>
          g.name.toLowerCase().includes(searchQ.toLowerCase()) ||
          g.code.toLowerCase().includes(searchQ.toLowerCase()),
      )
    : games;

  const topHero = games.find((g) => g.is_highlight && g.is_main) || games[0];

  const goToMonth = (month, year) => {
    setChartMonth(month);
    setChartYear(year);
  };

  const mIdx = parseInt(chartMonth, 10) - 1;
  const prevMIdx = mIdx === 0 ? 11 : mIdx - 1;
  const prevYear = mIdx === 0 ? parseInt(chartYear) - 1 : parseInt(chartYear);
  const nextMIdx = mIdx === 11 ? 0 : mIdx + 1;
  const nextYear = mIdx === 11 ? parseInt(chartYear) + 1 : parseInt(chartYear);
  const todayDay = todayDate ? todayDate.split("-")[2] : "";

  const fmtDay = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const SpinnerIcon = () => (
    <span className="wait-spinner" title="लाइव रिजल्ट का इंतज़ार">
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9.5" />
        <line className="clock-hand" x1="12" y1="12" x2="12" y2="6.5" />
      </svg>
    </span>
  );

  return (
    <div id="wrapper">
      {/* ── BREAKING RESULT FLASH BAR ── */}
      {topHero && (
        <div className="lrs">
          <span className="lrs-tag">
            <i className="lrs-dot" />
            अभी आया रिजल्ट
          </span>
          <span className="lrs-game">{topHero.name}</span>
          <span className="lrs-time">({topHero.draw_time})</span>
          <span className="lrs-arrow">&#10148;</span>
          <span className="lrs-num">
            {!topHero.today_number ||
            topHero.today_number === "XX" ||
            topHero.today_number === "--"
              ? "??"
              : topHero.today_number}
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-app"
            style={{ padding: "2px 10px", fontSize: "11px", marginLeft: 8 }}
          >
            💬 WhatsApp
          </a>
        </div>
      )}

      {/* ── STICKY APP BAR ── */}
      <header className="appbar">
        <span className="burger">&#9776;</span>
        <span className="title">SATTA KING LIVE</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <a
            href={REDDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-app"
            style={{ backgroundColor: '#007bff', color: '#fff' }}
          >
            🔐 Login
          </a>
          <a
            href={REDDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-app"
            style={{ backgroundColor: '#28a745', color: '#fff' }}
          >
            📝 Register
          </a>
          <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa-app"
        >
          💬 WhatsApp
        </a>
        </div>
        <span
          className="wallet"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <span
            className="lrs-dot"
            style={{ background: syncing ? "var(--gold)" : "#43e660" }}
          />
          {syncing ? "सिंक..." : `${games.length} गेम`}
        </span>
      </header>

      {/* ── LIVE ANNOUNCEMENT / ADVERTISEMENT BANNER ── */}
      {announcement && announcement.active && announcement.text && (
        <div className="adv-banner" role="alert">
          <div className="adv-banner-inner">
            <span className="adv-badge">📢 SPECIAL NOTICE</span>
            <span
              className="adv-text"
              dangerouslySetInnerHTML={{
                __html: announcement.text.replace(
                  /(https?:\/\/[^\s]+)/g,
                  '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
                ),
              }}
            />
          </div>
        </div>
      )}

      <div className="wrap">
        {/* ── WHATSAPP HERO BANNER ── */}
        <div className="wa-app-banner">
          <div>
            <div className="wa-app-title">👑 सीधा खाईवाल से गेम पास करवाएं</div>
            <div className="wa-app-sub">
              सिंगल जोड़ी और हरूफ के लिए WhatsApp करें &bull; {WHATSAPP_NUMBER}
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            style={{ background: "#ffffff", color: "#0c3e23" }}
          >
            📲 WhatsApp चैट
          </a>
        </div>

        {/* ── HERO BANNER ── */}
        {topHero && (
          <section className="banner">
            <span className="chip">&#9210; लाइव रिजल्ट (LIVE DRAW)</span>
            <h2>{topHero.name}</h2>
            <div className="num">
              {!topHero.today_number ||
              topHero.today_number === "XX" ||
              topHero.today_number === "--" ? (
                <SpinnerIcon />
              ) : (
                topHero.today_number
              )}
            </div>
            <div className="meta">
              समय: {topHero.draw_time} &nbsp;|&nbsp; कल:{" "}
              {topHero.yesterday_number || "—"}
            </div>
          </section>
        )}

        {/* ── QUICK ACTIONS ── */}
        <div className="actions">
          <a
            href={REDDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            style={{ background: "#007bff", color: "#fff" }}
          >
            🔐 Login
          </a>
          <a
            href={REDDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="action"
            style={{ background: "#28a745", color: "#fff" }}
          >
            📝 Register
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="action green"
          >
            💬 WhatsApp
          </a>
          <a className="action alt" href="#monthly-chart">
            📊 रिकॉर्ड चार्ट
          </a>
          <button className="action" onClick={() => window.location.reload()}>
            🔄 रिफ्रेश
          </button>
        </div>

        {/* ── NOTICE ── */}
        <div className="notice">
          <a href="#monthly-chart">
            सबसे फास्ट रिजल्ट के लिए यहाँ क्लिक करें &bull; हाँ भाई, सबसे पहले
            खबर यहीं आती है
          </a>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input-app"
            placeholder="🔍 गेम सर्च करें (Gali, Desawar, Faridabad...)"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>

        {/* ── GAME GRID ── */}
        <div className="section-heading">
          <span>गेम लिस्ट (ALL GAMES)</span>
          <span style={{ fontSize: 13, color: "var(--dim)" }}>
            {fmtDay(todayDate)} रिजल्ट्स
          </span>
        </div>

        <div className="game-grid">
          {filtered.map((g) => {
            const isPending =
              !g.today_number ||
              g.today_number === "XX" ||
              g.today_number === "--";
            const chartHref = `/${g.slug || g.code.toLowerCase()}/satta-result-chart/${g.code.toLowerCase()}/`;

            return (
              <div key={g.code} className="game-card">
                <span className="ribbon">{fmtDay(todayDate)}</span>
                <div className={`badge ${isPending ? "pending" : ""}`}>
                  {isPending ? <SpinnerIcon /> : g.today_number}
                </div>
                <h3>{g.name}</h3>
                <div className="game-times">
                  <div>
                    <b>{g.yesterday_number || "—"}</b>
                    <span>कल</span>
                  </div>
                  <div>
                    <b>{g.draw_time}</b>
                    <span>समय</span>
                  </div>
                  <div>
                    <b>{g.today_number || "—"}</b>
                    <span>आज</span>
                  </div>
                </div>
                <Link href={chartHref} className="game-cta">
                  चार्ट देखें →
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── MONTHLY ARCHIVE TABLE ── */}
        <div
          className="section-heading"
          id="monthly-chart"
          style={{ marginTop: 36 }}
        >
          <span>
            मासिक रिकॉर्ड चार्ट &mdash;{" "}
            {chartData
              ? `${MONTH_NAMES[parseInt(chartData.month, 10) - 1]?.toUpperCase()} ${chartData.year}`
              : "ARCHIVE"}
          </span>
        </div>

        <div className="chart-card-app">
          <table className="app-table" aria-label="Monthly Satta Chart">
            <thead>
              <tr>
                <th style={{ width: 60 }}>तारीख</th>
                <th>DESAWAR</th>
                <th>FARIDABAD</th>
                <th>GAZIYABAD</th>
                <th>GALI</th>
              </tr>
            </thead>
            <tbody>
              {chartData?.rows?.map((r) => {
                const isToday = r.day === todayDay;
                const hasNum = (val) => val && val !== "XX" && val !== "--";
                return (
                  <tr key={r.day} className={isToday ? "today-row" : ""}>
                    <td>
                      <b>{r.day}</b>
                    </td>
                    <td className={hasNum(r.DS) ? "has-num" : ""}>
                      {r.DS === "XX" && isToday ? <SpinnerIcon /> : r.DS || "—"}
                    </td>
                    <td className={hasNum(r.FB) ? "has-num" : ""}>
                      {r.FB === "XX" && isToday ? <SpinnerIcon /> : r.FB || "—"}
                    </td>
                    <td className={hasNum(r.GB) ? "has-num" : ""}>
                      {r.GB === "XX" && isToday ? <SpinnerIcon /> : r.GB || "—"}
                    </td>
                    <td className={hasNum(r.GL) ? "has-num" : ""}>
                      {r.GL === "XX" && isToday ? <SpinnerIcon /> : r.GL || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="app-nav-btns">
            <button
              className="app-btn"
              onClick={() =>
                goToMonth(
                  String(prevMIdx + 1).padStart(2, "0"),
                  String(prevYear),
                )
              }
            >
              ← {MONTH_NAMES[prevMIdx]?.substring(0, 3)} {prevYear}
            </button>
            <button
              className="app-btn"
              onClick={() =>
                goToMonth(
                  String(nextMIdx + 1).padStart(2, "0"),
                  String(nextYear),
                )
              }
            >
              {MONTH_NAMES[nextMIdx]?.substring(0, 3)} {nextYear} →
            </button>
          </div>
        </div>

        {/* ── INFORMATIONAL & EDUCATIONAL GUIDE SECTION (WITH LANGUAGE TOGGLE) ── */}
        <InfoSection />

        {/* ── APP FOOTER ── */}
        <footer className="app-footer">
          <p style={{ color: "var(--dim)", marginBottom: 12 }}>
            SATTA KING LIVE APP &bull; FASTEST RESULT PORTAL
          </p>
          <div style={{ marginBottom: 16 }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-app"
            >
              💬 WhatsApp हेल्पलाइन: {WHATSAPP_NUMBER}
            </a>
          </div>
          <div>
            <select
              value={chartMonth}
              onChange={(e) => setChartMonth(e.target.value)}
              aria-label="Select month"
            >
              {MONTH_NAMES.map((m, i) => (
                <option key={m} value={String(i + 1).padStart(2, "0")}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={chartYear}
              onChange={(e) => setChartYear(e.target.value)}
              aria-label="Select year"
            >
              {[2026, 2025, 2024, 2023, 2022].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </footer>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="floating-wa">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="app-fab-wa"
        >
          💬 WhatsApp
        </a>
      </div>

      {/* FAB */}
      <div className="floating-bar">
        <button className="app-fab" onClick={() => window.location.reload()}>
          ⚡ रिफ्रेश
        </button>
      </div>
    </div>
  );
}
