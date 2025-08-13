import "./globals.css";

export const metadata = {
  title: "FraudGuard - Fraud Awareness eLearning",
  description: "Interactive learning platform to protect yourself from digital fraud, scams, and cybercrime. Learn to identify UPI fraud, bank impersonation, KYC scams, and more.",
  keywords: "fraud awareness, cybersecurity, UPI fraud, bank scams, digital safety, online security",
  authors: [{ name: "FraudGuard Team" }],
  creator: "FraudGuard",
  publisher: "FraudGuard",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M50 5L20 20v30c0 18.75 12.5 36.25 30 40 17.5-3.75 30-21.25 30-40V20L50 5z' fill='url(%23grad)'/%3E%3Cpath d='M42 52l-8-8-4 4 12 12 20-20-4-4-16 16z' fill='white'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M16 2L6 6v10c0 6 4 11.5 10 12.8C22 27.5 26 22 26 16V6L16 2z' fill='url(%23grad)'/%3E%3Cpath d='M13.5 16.5l-2.5-2.5-1.3 1.3 3.8 3.8 6.5-6.5-1.3-1.3-5.2 5.2z' fill='white'/%3E%3C/svg%3E",
        type: "image/svg+xml", 
        sizes: "32x32",
      },
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M8 1L3 3v5c0 3 2 5.75 5 6.4 3-.65 5-3.4 5-6.4V3L8 1z' fill='url(%23grad)'/%3E%3Cpath d='M6.75 8.25L5.5 7l-.65.65L6.75 9.5l3.25-3.25L9.35 5.6l-2.6 2.65z' fill='white'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='180' height='180' rx='40' fill='url(%23grad)'/%3E%3Cpath d='M90 25L45 45v50c0 31.25 20.83 60.42 45 66.67C114.17 155.42 135 126.25 135 95V45L90 25z' fill='white'/%3E%3Cpath d='M78 95l-13.33-13.33L58 88.33 78 108.33l33.33-33.33-6.66-6.67L78 95z' fill='%232563eb'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "180x180",
      },
    ],
    shortcut: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M50 5L20 20v30c0 18.75 12.5 36.25 30 40 17.5-3.75 30-21.25 30-40V20L50 5z' fill='url(%23grad)'/%3E%3Cpath d='M42 52l-8-8-4 4 12 12 20-20-4-4-16 16z' fill='white'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "96x96",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fraudguard.app",
    title: "FraudGuard - Fraud Awareness eLearning",
    description: "Interactive learning platform to protect yourself from digital fraud, scams, and cybercrime.",
    siteName: "FraudGuard",
  },
  twitter: {
    card: "summary_large_image",
    title: "FraudGuard - Fraud Awareness eLearning",
    description: "Interactive learning platform to protect yourself from digital fraud, scams, and cybercrime.",
    creator: "@fraudguard",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
