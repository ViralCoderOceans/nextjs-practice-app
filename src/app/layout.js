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
      <body className={inter.className}>
        <nav className='flex flex-row justify-between mx-14 my-6'>
          <h1 className='text-2xl font-bold'>
            <Link href={`/`}>Movie app</Link>
          </h1>
          <ul className='flex flex-row'>
            <li className='mx-4'>
              <Link href={`/`}>
                Home
              </Link>
            </li>
            <li className='mx-4'>
              <Link href={`/about`}>
                About
              </Link>
            </li>
            <li className='mx-4'>
              Contact-Us
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
