'use client';

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-100 font-sans antialiased">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </body>
    </html>
  );
}
