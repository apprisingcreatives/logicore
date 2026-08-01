import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Logicore — AI-Powered Logistics Intelligence',
    template: '%s | Logicore',
  },
  description:
    'Enterprise logistics management platform for the Philippine logistics industry. AI-powered shipment tracking, fleet management, warehouse operations, and freight forwarding.',
  keywords: [
    'logistics',
    'Philippines',
    'supply chain',
    'AI',
    'fleet management',
    'warehouse management',
    'freight forwarding',
    'customs',
    'tracking',
  ],
  authors: [{ name: 'Logicore' }],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    siteName: 'Logicore',
    title: 'Logicore — AI-Powered Logistics Intelligence',
    description:
      'Enterprise logistics management platform for the Philippine logistics industry.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface text-text-primary">
        {children}
      </body>
    </html>
  );
}
