import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Upseli — Convert Competitors Into Revenue',
  description: 'Turn any competitor landing page into an original, converting page for your Shopify store. No copy-pasting. One click to publish.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-bg text-fg">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
