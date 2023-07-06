import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie_app',
  description: 'This is a movie-list app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <nav className='flex flex-row justify-between px-6 lg:px-24 border-y bg-zinc-950 hover:bg-zinc-900 transition-all'>
          <Link href={`/`}>
            <h1 className='text-lg md:text-xl lg:text-2xl px-1 lg:px-3 py-3 lg:py-6 font-semibold bg-white text-black transition-all'>
              Movie_app
            </h1>
          </Link>
          <ul className='flex flex-row items-center'>
            <li className='h-full'>
              <Link href={`/`} className='text-sm lg:text-base flex items-center px-1 lg:px-4 mr-2 h-full hover:bg-white hover:text-black transition-all'>
                Home
              </Link>
            </li>
            <li className='h-full'>
              <Link href={`/about`} className='text-sm lg:text-base flex items-center px-1 lg:px-4 py-1 h-full hover:bg-white hover:text-black transition-all'>
                About
              </Link>
            </li>
            <li className='text-sm lg:text-base md:flex items-center hidden px-4 py-1 h-full hover:bg-white hover:text-black transition-all'>
              Contact-Us
            </li>
          </ul>
        </nav>
        <div className="flex flex-col justify-between p-6 lg:px-24 lg:py-12 overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
