import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthProvider } from '@/context/auth';
import AuthButtons from '@/components/auth-buttons';
import { HomeIcon } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  icons: '/favicon.svg',
  title: 'Prism Property',
  description:
    'PrismProperty is a modern real estate platform that simplifies property search and management. Discover, favorite, and manage listings — all in one place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between relative z-10">
            <Link
              href="/"
              className="text-3xl tracking-widest flex gap-2 items-center"
            >
              <HomeIcon />
              <span className="hidden sm:block">PRISM PROPERTY</span>
            </Link>
            <ul className="flex gap-6 items-center uppercase tracking-widest [&_a:hover]:underline">
              <li>
                <Link href="/property-search">
                  <span className="hidden sm:inline">Property</span> Search
                </Link>
              </li>
              <li>
                <AuthButtons />
              </li>
            </ul>
          </nav>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
