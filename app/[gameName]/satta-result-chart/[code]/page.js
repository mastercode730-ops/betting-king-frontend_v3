'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { WHATSAPP_URL, WHATSAPP_NUMBER, REDDY_URL } from '../../../../lib/constants';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function GameChartPage() {
  const params = useParams();
  const gameCode = params.code?.toUpperCase() || 'FB';

  const currentYear = new Date().getFullYear();
  const [year, setYear]           = useState(String(currentYear));
  const [gameData, setGameData]   = useState(null);
  const [monthlyData, setMonthly] = useState({});
  const [todayResults, setToday]  = useState([]);
  const [todayDate, setTDate]     = useState('');
  const [yesterdayDate, setYDate] = useState('');
  const [loading, setLoading]     = useState(true);

  const loadGameChart = useCallback(async (yr) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chart/game/${gameCode}?year=${yr}`);
      const json = await res.json();
      if (json.success && json.monthly_data) {
        setGameData(json.game || { name: gameCode, code: gameCode });
        setMonthly(json.monthly_data);
      }
    } catch (e) {
      console.warn('[SK] Failed to fetch game chart:', e.message);
    } finally {
      setLoading(false);
    }
  }, [gameCode]);

  const loadToday = useCallback(async () => {
    try {
      const res = await fetch('/api/results/today');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setToday(json.data);
        if (json.today_date) setTDate(json.today_date);
        if (json.yesterday_date) setYDate(json.yesterday_date);
      }
    } catch (e) {
      console.warn('[SK] Failed to fetch today results:', e.message);
    }
  }, []);

  useEffect(() => { loadGameChart(year); }, [loadGameChart, year]);
  useEffect(() => { loadToday(); const id = setInterval(loadToday, 15000); return () => clearInterval(id); }, [loadToday]);

  const years = [2026, 2025, 2024, 2023, 2022];
  const thisGame = todayResults.find(g => g.code === gameCode) || gameData;

  const SpinnerIcon = () => (
    <span className="wait-spinner" title="लाइव रिजल्ट का इंतज़ार">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9.5" />
        <line className="clock-hand" x1="12" y1="12" x2="12" y2="6.5" />
      </svg>
    </span>
  );

  return (
    <div id="wrapper">
      {/* ── STICKY APP BAR ── */}
      <header className="appbar">
        <Link href="/" className="burger" style={{ textDecoration: 'none' }}>
          ←
        </Link>
        <span className="title">{gameData?.name || gameCode} चार्ट</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa-app" style={{ marginLeft: 'auto' }}>
          💬 WhatsApp
        </a>
        <span className="wallet">{year}</span>
      </header>

      <div className="wrap">
        {/* ── WHATSAPP BANNER ── */}
        <div className="wa-app-banner" style={{ marginTop: 14 }}>
          <div>
            <div className="wa-app-title">👑 {gameData?.name || gameCode} का लीक सिंगल नंबर पाएं</div>
            <div className="wa-app-sub">सीधा खाईवाल से जुड़े &bull; WhatsApp: {WHATSAPP_NUMBER}</div>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="action" style={{ background: '#ffffff', color: '#0c3e23' }}>
            📲 WhatsApp चैट
          </a>
        </div>

        {/* ── FEATURED BANNER ── */}
        {thisGame && (
          <section className="banner" style={{ marginTop: 14 }}>
            <span className="chip">&#9210; आज का परिणाम (TODAY RESULT)</span>
            <h2>{thisGame.name}</h2>
            <div className="num">
              {!thisGame.today_number || thisGame.today_number === 'XX' || thisGame.today_number === '--' ? <SpinnerIcon /> : thisGame.today_number}
            </div>
            <div className="meta">
              समय: {thisGame.draw_time || '—'} &nbsp;|&nbsp; कल का नंबर: {thisGame.yesterday_number || '—'}
            </div>
          </section>
        )}

        {/* ── QUICK ACTIONS ── */}
        <div className="actions" style={{ margin: '14px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a href={REDDY_URL} target="_blank" rel="noopener noreferrer" className="action" style={{ background: '#007bff', color: '#fff', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            🔐 Login
          </a>
          <a href={REDDY_URL} target="_blank" rel="noopener noreferrer" className="action" style={{ background: '#28a745', color: '#fff', flex: 1, textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            📝 Register
          </a>
        </div>

        {/* ── YEAR NAV BUTTONS ── */}
        <div className="app-nav-btns" style={{ margin: '20px 0' }}>
          {years.map(y => (
            <button
              key={y}
              className={`app-btn ${year === String(y) ? 'active' : ''}`}
              onClick={() => setYear(String(y))}
            >
              {y} चार्ट
            </button>
          ))}
        </div>

        {/* ── ANNUAL CHART MATRIX ── */}
        <div className="section-heading">
          <span>वार्षिक रिकॉर्ड तालिका {year}</span>
        </div>

        <div className="chart-card-app">
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--dim)' }}>
              <SpinnerIcon /> [ चार्ट लोड हो रहा है... ]
            </div>
          ) : (
            <table className="app-table" aria-label="Annual Game Chart">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>तारीख</th>
                  {MONTH_SHORT.map(m => <th key={m}>{m}</th>)}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 31 }, (_, i) => {
                  const dPad = String(i + 1).padStart(2, '0');
                  return (
                    <tr key={dPad}>
                      <td><b>{dPad}</b></td>
                      {Array.from({ length: 12 }, (_, m) => {
                        const mPad = String(m + 1).padStart(2, '0');
                        const num = monthlyData?.[mPad]?.[dPad];
                        const hasNum = num && num !== 'XX' && num !== '--';
                        return (
                          <td key={mPad} className={hasNum ? 'has-num' : ''}>
                            {num === 'XX' ? <SpinnerIcon /> : (num || '—')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── OTHER GAMES ── */}
        <div className="section-heading" style={{ marginTop: 32 }}>
          <span>अन्य गेम के आज के परिणाम</span>
        </div>

        <div className="game-grid">
          {todayResults.map((g) => {
            const isPending = !g.today_number || g.today_number === 'XX' || g.today_number === '--';
            const chartHref = `/${g.slug || g.code.toLowerCase()}/satta-result-chart/${g.code.toLowerCase()}/`;

            return (
              <div key={g.code} className="game-card">
                <span className="ribbon">TODAY</span>
                <div className={`badge ${isPending ? 'pending' : ''}`}>
                  {isPending ? <SpinnerIcon /> : g.today_number}
                </div>
                <h3>{g.name}</h3>
                <div className="game-times">
                  <div>
                    <b>{g.yesterday_number || '—'}</b>
                    <span>कल</span>
                  </div>
                  <div>
                    <b>{g.draw_time}</b>
                    <span>समय</span>
                  </div>
                  <div>
                    <b>{g.today_number || '—'}</b>
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
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="floating-wa">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="app-fab-wa">
          💬 WhatsApp
        </a>
      </div>

      <div className="floating-bar">
        <button className="app-fab" onClick={() => window.location.reload()}>
          ⚡ रिफ्रेश
        </button>
      </div>
    </div>
  );
}
