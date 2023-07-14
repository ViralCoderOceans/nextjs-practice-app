"use client"

import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { createContext, useState } from 'react'
import PictureInPicture from '@/components/PictureInPicture'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const piPContext = createContext();

export default function RootLayout({ children, modal }) {
  const path = usePathname()
  const [pictureInPicture, setPictureInPicture] = useState({
    isPIP: false,
    title: '',
    imgPath: '',
    movieId: ''
  })
  const [isMinimize, setIsMinimize] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <title>Movie Mania</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} flex flex-col h-screen relative overflow-hidden`}>
        <piPContext.Provider value={{
          pictureInPicture,
          setPictureInPicture,
          isMinimize,
          setIsMinimize,
          isModalOpen,
          setIsModalOpen
        }}>
          <nav className='w-full z-[99] flex flex-row justify-between px-6 lg:px-24 bg-zinc-950 hover:bg-zinc-900 transition-all'>
            <Link href={`/`}>
              <h1 className='text-lg md:text-xl lg:text-2xl px-1 lg:px-3 py-3 lg:py-6 font-semibold bg-white text-black transition-all'>
                Movie Mania
              </h1>
            </Link>
            <ul className='flex flex-row items-center'>
              <li className='h-full'>
                <Link href={`/`} className={`text-sm lg:text-base flex items-center px-1 lg:px-4 mr-2 h-full hover:bg-white hover:text-black transition-all ${path == '/' ? 'bg-white text-black' : ''}`}>
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
          <div id='myApp' className="next flex flex-col justify-between p-4 lg:px-24 lg:py-12 overflow-y-auto overflow-x-hidden transition-all">
            {children}
            <div className='absolute bottom-0 right-0 '>
              {pictureInPicture.isPIP && <PictureInPicture />}
            </div>
          </div>
          {modal}
        </piPContext.Provider>
      </body>
    </html>
  )
}
