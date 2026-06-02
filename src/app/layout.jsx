import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { company } from '@/data/company'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: company.meta.title,
  description: company.meta.description,
  openGraph: {
    title: company.meta.title,
    description: company.meta.description,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:text-sm focus:tracking-widest focus:uppercase focus:border focus:border-ink"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  )
}
