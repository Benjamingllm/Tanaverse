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
  title: company.meta.title,
  description: company.meta.description,
  openGraph: {
    title: company.meta.title,
    description: company.meta.description,
    images: [company.meta.ogImage],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink">
        {children}
      </body>
    </html>
  )
}
