import ToastProvider from '@/provider/toast-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ModalProvider from '@/provider/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body suppressHydrationWarning={true} className={inter.className}>
          <ToastProvider />
          {children}</body>

      </html>
    </>
  )
}
