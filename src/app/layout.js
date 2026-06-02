import './globals.css'

export const metadata = {
  title: 'Tanaverse',
  description: 'Plateforme SaaS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
