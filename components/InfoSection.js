"use client";

import { useState } from "react";
import { CONTENT } from "../lib/infoContent";

export default function InfoSection() {
  const [lang, setLang] = useState("hi");
  const t = CONTENT[lang] || CONTENT.hi;

  return (
    <section className="info-guide-section" id="info-guide" aria-label="Satta Matka Information Guide">
      {/* ── Language Switcher Header ── */}
      <div className="info-guide-header">
        <div className="info-guide-header-title">
          <span className="info-guide-badge">📚 GUIDE & INFO</span>
          <span className="info-guide-subtext">जानकारी एवं नियम</span>
        </div>
        <div className="lang-switcher" role="group" aria-label="Language selector">
          <button
            type="button"
            className={`lang-btn ${lang === "hi" ? "active" : ""}`}
            onClick={() => setLang("hi")}
            aria-pressed={lang === "hi"}
          >
            🇮🇳 हिन्दी
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      <div className="info-guide-card">
        {/* Main Title & Intros */}
        <h2 className="info-main-title">{t.mainTitle}</h2>
        <div className="info-intro-text">
          <p>{t.intro1}</p>
          <p>{t.intro2}</p>
          <p>{t.intro3}</p>
        </div>

        {/* Notice Disclaimer Banner */}
        <div className="info-disclaimer-badge">
          <span className="info-alert-icon">⚠️</span>
          <span>{t.disclaimerBox}</span>
        </div>

        {/* What is Satta Matka */}
        <div className="info-block">
          <h3 className="info-block-title">{t.whatIsTitle}</h3>
          <p>{t.whatIsDesc1}</p>
          <p className="info-sub-label">{t.whatIsDesc2}</p>
          <ul className="info-tags-grid">
            {t.whatIsList.map((item, idx) => (
              <li key={idx} className="info-tag-chip">
                {item}
              </li>
            ))}
          </ul>
          <p className="info-note-p">{t.whatIsNote1}</p>
          <p className="info-note-p">{t.whatIsNote2}</p>
        </div>

        {/* Satta King and Matka Results */}
        <div className="info-block">
          <h3 className="info-block-title">{t.sattaKingTitle}</h3>
          <p>{t.sattaKingDesc1}</p>
          <p>{t.sattaKingDesc2}</p>
          <p>{t.sattaKingDesc3}</p>
          <p className="info-callout">{t.sattaKingDesc4}</p>
        </div>

        {/* Understanding Format */}
        <div className="info-block">
          <h3 className="info-block-title">{t.formatTitle}</h3>
          <p>{t.formatIntro}</p>
          <div className="info-definitions-grid">
            {t.terms.map((item, idx) => (
              <div key={idx} className="info-def-card">
                <div className="info-def-term">{item.term}</div>
                <div className="info-def-desc">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="info-note-p">{t.formatNote}</p>
        </div>

        {/* Satta King Historical Charts */}
        <div className="info-block">
          <h3 className="info-block-title">{t.chartsTitle}</h3>
          <p>{t.chartsDesc1}</p>
          <p className="info-sub-label">{t.chartsDesc2}</p>
          <ul className="info-bullet-list">
            {t.chartsList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>{t.chartsDesc3}</p>
          <p>{t.chartsDesc4}</p>
          <p className="info-callout">{t.chartsDesc5}</p>
        </div>

        {/* Market Specific Results Cards */}
        <div className="info-block">
          <div className="info-markets-grid">
            {t.markets.map((m, idx) => (
              <div key={idx} className="info-market-card">
                <h4 className="info-market-title">{m.title}</h4>
                <p className="info-market-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Historical Results Should Be Read Carefully */}
        <div className="info-block info-caution-box">
          <h3 className="info-block-title caution-heading">{t.cautionTitle}</h3>
          <p>{t.cautionDesc1}</p>
          <p>{t.cautionDesc2}</p>
          <p className="info-sub-label">{t.cautionDesc3}</p>
          <ul className="info-bullet-list">
            {t.cautionList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="info-note-p">{t.cautionDesc4}</p>
        </div>

        {/* Daily and Monthly Record Charts */}
        <div className="info-block">
          <h3 className="info-block-title">{t.dailyMonthlyTitle}</h3>
          <p>{t.dailyMonthlyDesc1}</p>
          <p>{t.dailyMonthlyDesc2}</p>
        </div>

        {/* Common Satta Matka Terms / Glossary */}
        <div className="info-block">
          <h3 className="info-block-title">{t.glossaryTitle}</h3>
          <p>{t.glossaryDesc}</p>
          <div className="info-glossary-table-wrap">
            <table className="info-glossary-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Term / शब्द</th>
                  <th>Meaning / अर्थ</th>
                </tr>
              </thead>
              <tbody>
                {t.glossary.map((g, idx) => (
                  <tr key={idx}>
                    <td className="glossary-term">{g.term}</td>
                    <td>{g.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="info-block">
          <h3 className="info-block-title">{t.faqsTitle}</h3>
          <div className="info-faqs-accordion">
            {t.faqs.map((faq, idx) => (
              <details key={idx} className="info-faq-item">
                <summary className="info-faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-chevron">&#9662;</span>
                </summary>
                <div className="info-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* About FastMatkaSatta.com */}
        <div className="info-block">
          <h3 className="info-block-title">{t.aboutTitle}</h3>
          <p>{t.aboutDesc1}</p>
          <p>{t.aboutDesc2}</p>
          <p>{t.aboutDesc3}</p>
        </div>

        {/* Important Disclaimer */}
        <div className="info-block info-disclaimer-container">
          <h3 className="info-block-title disclaimer-heading">
            ⚖️ {t.disclaimerTitle}
          </h3>
          <ul className="info-disclaimer-list">
            {t.disclaimerPoints.map((dp, idx) => (
              <li key={idx}>{dp}</li>
            ))}
          </ul>
        </div>

        {/* Explore Section */}
        <div className="info-block info-explore-box">
          <h3 className="info-block-title">{t.exploreTitle}</h3>
          <p>{t.exploreDesc}</p>
          <div className="explore-quote">
            <p>{t.exploreHighlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
