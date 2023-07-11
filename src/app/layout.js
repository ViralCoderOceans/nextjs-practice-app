"use client"

import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { createContext, useEffect, useState } from 'react'
import PictureInPicture from '@/components/PictureInPicture'
import { usePathname } from 'next/navigation'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export const piPContext = createContext();

export default function RootLayout({ children }) {
  const path = usePathname()
  const [pictureInPicture, setPictureInPicture] = useState({
    isPIP: false,
    title: '',
    imgPath: '',
    movieId: ''
  })
  const [isMinimize, setIsMinimize] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const { data } = axios.get("/api/auth/getUserDetails")
    console.log(JSON.stringify(data));
  }, [])
  return (
    <html lang="en">
      <head>
        <title>Movie_app</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} flex flex-col h-screen relative overflow-hidden`}>
        {isLoggedIn &&
          <nav className='w-full z-[99] flex flex-row justify-between px-6 lg:px-24 bg-zinc-950 hover:bg-zinc-900 transition-all'>
            <Link href={`/home`}>
              <h1 className='text-lg md:text-xl lg:text-2xl px-1 lg:px-3 py-3 lg:py-6 font-semibold bg-white text-black transition-all'>
                Movie_app
              </h1>
            </Link>
            <ul className='flex flex-row items-center'>
              <li className='h-full'>
                <Link href={`/home`} className={`text-sm lg:text-base flex items-center px-1 lg:px-4 mr-2 h-full hover:bg-white hover:text-black transition-all ${path == '/home' ? 'bg-white text-black' : ''}`}>
                  Home
                </Link>
              </li>
              <li className='h-full'>
                <Link href={`/about`} className={`text-sm lg:text-base flex items-center px-1 lg:px-4 mr-2 h-full hover:bg-white hover:text-black transition-all ${path == '/about' ? 'bg-white text-black' : ''}`}>
                  About
                </Link>
              </li>
              <li className='h-full'>
                <Link href={`/profile`} className={`text-sm lg:text-base flex items-center px-1 lg:px-4 h-full hover:bg-white hover:text-black transition-all ${path == '/profile' ? 'bg-white text-black' : ''}`}>
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        }
        <piPContext.Provider value={{ pictureInPicture, setPictureInPicture, isMinimize, setIsMinimize, isLoggedIn, setIsLoggedIn }}>
          <div className="flex flex-col justify-between p-4 lg:px-24 lg:py-12 overflow-y-auto overflow-x-hidden transition-all">
            {children}
            <div className='absolute bottom-0 right-0 '>
              {pictureInPicture.isPIP && <PictureInPicture />}
            </div>
          </div>
        </piPContext.Provider>
      </body>
    </html>
  )
}
