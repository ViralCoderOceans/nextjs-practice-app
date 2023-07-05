import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie app',
  description: 'This is a movie-list app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <nav className='flex flex-row justify-between px-14 py-6 border-y  bg-zinc-950'>
          <Link href={`/`}>
            <h1 className='text-2xl p-1 px-3 font-semibold bg-white text-black'>
              Movie_app
            </h1>
          </Link>
          <ul className='flex flex-row items-center'>
            <Link href={`/`}>
              <li className='px-4 py-1 mr-2 hover:bg-white hover:text-black transition-all'>
                Home
              </li>
            </Link>
            <Link href={`/about`}>
              <li className='px-4 py-1 hover:bg-white hover:text-black transition-all'>
                About
              </li>
            </Link>
            <li className='px-4 py-1 hover:bg-white hover:text-black transition-all'>
              Contact-Us
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
