import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './api/providers/provider';
import { AlertProvider } from './context/AlertContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SustainWear',
  description: 'At SustainWear, we believe fashion can be both stylish and sustainable. We reduce clothing waste by promoting donations, recycling, and conscious choices. Together, we give every garment a second life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider><AuthProvider>{children}</AuthProvider></AlertProvider>
      </body>
    </html>
  );
}