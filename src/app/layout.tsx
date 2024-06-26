import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@/styles/globals.css'

const monserat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Typo - Master your typing skills',
  description:
    "Hi, let's connect https://www.linkedin.com/in/tair-sairanbekov/",
  authors: {
    name: 'Tair Sairanbekov',
    url: 'https://www.linkedin.com/in/tair-sairanbekov/',
  },
  icons: '/images/Keyboard.svg'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={monserat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
