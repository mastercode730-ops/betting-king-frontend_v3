import Link from "next/link";
import { WHATSAPP_URL, REDDY_URL } from "../../lib/constants";

export const metadata = {
  title: "Disclaimer & Legal Warning | Satta King Live",
  description: "Official Disclaimer and Legal Notice regarding informational use, gambling risks, and jurisdictional compliance for Satta King Live.",
};

export default function DisclaimerPage() {
  return (
    <div id="wrapper">
      <header className="appbar">
        <Link href="/" className="burger" style={{ textDecoration: "none", color: "var(--gold)", fontSize: "18px" }}>
          ← Home
        </Link>
        <span className="title">DISCLAIMER &amp; WARNING</span>
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
            <span className="legal-badge">
              Information &amp; Guidance
            </span>
            <h1 className="legal-title">Disclaimer</h1>
            <p className="legal-subtitle">Strictly for Informational, Research &amp; Entertainment Purposes</p>
          </div>

          <div className="legal-content">

            <section className="legal-section">
              <h2>1. Informational &amp; Educational Purpose Only</h2>
              <p>
                <strong>Satta King Live</strong> is not a betting operator, bookmaker, or gambling syndicate. We do not accept bets, stake money, manage wagering funds, or facilitate any financial gaming transactions. All numbers, game names, results, and archives displayed on this portal are compiled strictly from public web channels for informational, archival, and journalistic reporting.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. No Affiliation with Unlawful Companies</h2>
              <p>
                We have no direct ownership or corporate affiliation with any unofficial local satta cartels, matka organizers, or unauthorized syndicates. References to names such as Desawar, Gali, Faridabad, or Ghaziabad are based strictly on common market nomenclature for public tracking.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Financial Risk &amp; Addiction Warning</h2>
              <p>
                Gambling involves grave financial risk, psychological distress, and potential addiction. Users are strictly urged to recognize that past numbers or pattern charts carry no mathematical predictability or guaranteed outcomes. Never wager money you cannot afford to lose.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Zero Liability for Losses</h2>
              <p>
                Any decision made by a user based on information displayed on this platform is undertaken entirely at their personal discretion and risk. Satta King Live, its creators, host providers, and associates disclaim all liability for monetary losses, legal penalties, or damages incurred directly or indirectly.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Age Restriction (18+ Only)</h2>
              <p>
                This platform is strictly forbidden to minors. You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to browse this portal.
              </p>
            </section>
          </div>

          <div className="legal-footer-nav">
            <Link href="/" className="app-btn">← Back to Live Results</Link>
            <div className="legal-links-inline">
              <Link href="/privacy">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
