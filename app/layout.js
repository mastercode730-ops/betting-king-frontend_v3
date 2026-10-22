import './globals.css';

export const metadata = {
  title: 'Satta King Live — Superfast Live Results 2026 | Gali Desawar Chart',
  description: 'Satta King Live — Watch real-time Gali, Desawar, Ghaziabad, Faridabad results as they happen. Full monthly chart archive for all satta games 2026.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: [
      'dp4IbX2hBEDSPImsqTcMgO_NhQp-qPgTejAjN7trUkY',
      'U-5Zhz65SxIHA9xDAUnqZWXKc3cYdAvBfTzIIweGOEU',
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://central-admin-system.onrender.com/client.js" data-site-id="betting-king-frontend_v3" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
