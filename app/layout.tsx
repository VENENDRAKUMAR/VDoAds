"use client"

import type React from "react"
import { Inter } from "next/font/google"
import './globals.css'
import { Header } from "@/components/Header"
import { SimpleFooter } from "@/components/simple-footer"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/redux/store';
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header/>
            {children}
            <Toaster />
            <SimpleFooter/>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}