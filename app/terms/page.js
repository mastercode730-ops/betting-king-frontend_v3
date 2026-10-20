import Link from "next/link";
import { WHATSAPP_URL, REDDY_URL } from "../../lib/constants";

export const metadata = {
  title: "Terms and Conditions | Satta King Live",
  description: "Terms and Conditions governing the use of Satta King Live website, results scoreboard, and archive services.",
};

export default function TermsPage() {
  return (
    <div id="wrapper">
      <header className="appbar">
        <Link href="/" className="burger" style={{ textDecoration: "none", color: "var(--gold)", fontSize: "18px" }}>
          ← Home
        </Link>
        <span className="title">TERMS &amp; CONDITIONS</span>
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
            <span className="legal-badge">User Agreement</span>
            <h1 className="legal-title">Terms &amp; Conditions</h1>
            <p className="legal-subtitle">Last Updated: January 2026</p>
          </div>

          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or browsing <strong>Satta King Live</strong> (&quot;the Website&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to these terms, you must discontinue using this portal immediately.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Informational &amp; Archival Nature Only</h2>
              <p>
                This website is strictly an informational and historical record-keeping portal. We aggregate publicly available result updates and archival charts for analytical, statistical, and news tracking purposes.
              </p>
              <p>
                We do not organize, operate, host, promote, or solicit any form of illegal betting, wagering, or gambling activities.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Eligibility &amp; Local Legal Compliance</h2>
              <p>
                Access to this website is restricted to individuals aged <strong>18 years or older</strong>. Users are individually and exclusively responsible for ensuring that accessing information regarding lottery or numbers is legal within their respective state, country, or jurisdiction under applicable local laws (including the Public Gambling Act, 1867 or regional statutes).
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Intellectual Property &amp; Acceptable Use</h2>
              <p>
                The user interface styling, branding components, design layouts, and aggregated presentations are protected by copyright and intellectual property standards. You agree not to:
              </p>
              <ul>
                <li>Scrape, duplicate, or redistribute content with malicious intent or distributed denial-of-service (DDoS) vectors.</li>
                <li>Misrepresent affiliation with Satta King Live or deceive third parties using our brand assets.</li>
                <li>Use the platform for any unlawful, fraudulent, or harmful operations.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>5. Accuracy of Data &amp; No Warranty</h2>
              <p>
                All data, numbers, charts, schedules, and timing indicators provided on this site are presented &quot;as is&quot; without warranties of any kind, either express or implied. While we strive to maintain real-time speed and data accuracy, we do not guarantee that the site will be error-free, uninterrupted, or completely devoid of transmission delays.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall Satta King Live, its developers, or affiliates be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from the use or inability to use this site, reliance on published numbers, or interactions with third-party links.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Modifications to Service and Terms</h2>
              <p>
                We reserve the right to alter, pause, or terminate any aspect of the portal or revise these Terms at any time without prior notice.
              </p>
            </section>
          </div>

          <div className="legal-footer-nav">
            <Link href="/" className="app-btn">← Back to Live Results</Link>
            <div className="legal-links-inline">
              <Link href="/privacy">Privacy Policy</Link>
              <span>•</span>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
