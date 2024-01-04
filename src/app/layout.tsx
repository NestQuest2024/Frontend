import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from "react";
import Navbar from "@/components/NavBar/Navbar";
import { Provider } from "@/context/authContext";
import { Footer } from '@/components/footer/footer';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Nest Quest',
    description: '',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <Provider>
        <html lang="en">
        <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
        </Provider>
    )
}
