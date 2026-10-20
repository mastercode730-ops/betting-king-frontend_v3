import Link from "next/link";
import { WHATSAPP_URL, REDDY_URL } from "../../lib/constants";

export const metadata = {
  title: "Privacy Policy | Satta King Live",
  description: "Read the Privacy Policy for Satta King Live to understand how we handle visitor data, cookies, analytics, and security.",
};

export default function PrivacyPolicyPage() {
  return (
    <div id="wrapper">
      <header className="appbar">
        <Link href="/" className="burger" style={{ textDecoration: "none", color: "var(--gold)", fontSize: "18px" }}>
          ← Home
        </Link>
        <span className="title">PRIVACY POLICY</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <a
            href={REDDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-app"
            style={{ backgroundColor: "#007bff", color: "#fff" }}
          >
            Login
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-app"
          >
            💬 Support
          </a>
        </div>
      </header>

      <div className="wrap legal-page-container">
        <div className="legal-card">
          <div className="legal-header">
            <span className="legal-badge">Security & Data Privacy</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-subtitle">Last Updated: January 2026</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Satta King Live</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to protecting any non-personal or personal information collected while you access our website, live informational scoreboards, and archive charts.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Do Not Collect</h2>
              <p>
                We do not require users to create accounts, provide credit card credentials, or disclose sensitive personal identifiable information (PII) to view public results and historical record charts.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Information We Collect Automatically</h2>
              <p>When you browse our portal, certain standard diagnostic data may be recorded automatically by server logs and CDN providers:</p>
              <ul>
                <li>Device type, operating system, and browser version.</li>
                <li>Anonymized IP addresses and general geographical location (country/region).</li>
                <li>Pages viewed, access times, referring website addresses, and interaction statistics.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Cookies & Web Beacons</h2>
              <p>
                We may use standard cookies and local storage tokens to store user preferences (such as selected language or active chart views) and to measure website speed and caching performance. You may disable cookies in your browser settings at any time without restricting access to live result listings.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Third-Party Links & External Platforms</h2>
              <p>
                Our portal may feature links to external communication tools (e.g. WhatsApp, Telegram) or third-party partner portals. We do not control or take responsibility for the privacy practices, content, or policies of third-party websites. Users are advised to review the respective privacy terms of any third-party links visited.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Data Security</h2>
              <p>
                We implement industry-standard SSL encryption and firewall protocols to safeguard our infrastructure from unauthorized access, alteration, or interception.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Children&apos;s Privacy</h2>
              <p>
                Our services and content are strictly intended for adults of legal age (18 years and older). We do not knowingly gather any details from minors.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Policy Updates & Contact</h2>
              <p>
                We reserve the right to revise this Privacy Policy periodically. Continued use of the website represents acceptance of changes. For inquiries regarding our privacy standards, reach out via our official communication channels.
              </p>
            </section>
          </div>

          <div className="legal-footer-nav">
            <Link href="/" className="app-btn">← Back to Live Results</Link>
            <div className="legal-links-inline">
              <Link href="/terms">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
