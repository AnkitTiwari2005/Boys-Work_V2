import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Boys@Work',
  description: 'Delhi NCR\'s Most Trusted Home & Facility Services',
}

import { QueryProvider } from '@/components/providers/QueryProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="font-body bg-background text-onBackground antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
