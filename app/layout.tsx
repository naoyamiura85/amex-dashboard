import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CategoryModeProvider } from '@/contexts/category-mode-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: '--font-noto-sans-jp' });

export const metadata: Metadata = {
  title: 'YAPPI - AI-Powered Consumer Intelligence',
  description: 'AI-driven consumer intelligence platform for FMCG/CPG',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <CategoryModeProvider>
          {children}
        </CategoryModeProvider>
        <Analytics />
      </body>
    </html>
  )
}
