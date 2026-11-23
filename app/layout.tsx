import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '@/lib/ads';

export const metadata: Metadata = {
  title: 'ScrollStream',
  description: 'A simple vertical short-video feed.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ScrollStream',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense site-verification meta tag (always present if client set) */}
        {ADSENSE_CLIENT && (
          <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        )}

        {/* AdSense loader — only when a real slot is configured */}
        {ADSENSE_ENABLED && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </head>
      <body className="bg-black text-white">
        {children}
        <BottomNav />

        {/* Service worker registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(()=>{});
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}