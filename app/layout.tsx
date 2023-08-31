import ToastProvider from '@/provider/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Knitter',
  description: 'Suggest Smart',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
            <ToastProvider />
            {children}
        </body>

      </html>
    </>
  )
}
