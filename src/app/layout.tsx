import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { PortfolioProvider } from '@/components/portfolio-provider';
import { Background } from '@/components/background';
import './globals.css';

export const metadata: Metadata = {
  title: "Prayas's Portfolio",
  description: 'A cyberpunk themed personal portfolio for Prayas Dhand.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <PortfolioProvider>
          <Background />
          <main>{children}</main>
          <Toaster />
        </PortfolioProvider>
      </body>
    </html>
  );
}
