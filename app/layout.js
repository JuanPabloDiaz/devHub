import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation, Footer, CategoryBanner } from '@/components'
import GoogleAnalytics from '@/lib/analytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'DevHub | Developer Resources Collection',
  description:
    'Discover helpful resources for developers including tools, libraries, frameworks, and learning materials.',
  keywords:
    'developer resources, programming tools, web development, libraries, frameworks, learning materials',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <GoogleAnalytics />
        <Navigation />
        <CategoryBanner />
        <div className="flex-grow main-content-with-sidebar">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
