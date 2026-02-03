import type { Metadata } from 'next';
import './globals.css';
import SidebarWrapper from '@/components/SidebarWrapper';

export const metadata: Metadata = {
  title: 'REVD Gallery',
  description: 'Contemporary Art Gallery',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-gallery-light min-h-screen w-full overflow-x-hidden"
        suppressHydrationWarning
      >
        <SidebarWrapper>
          {children}
        </SidebarWrapper>
      </body>
    </html>
  );
}

