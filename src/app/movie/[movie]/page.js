"use client"

import useGetMovieDetails from '@/hooks/useGetMovieDetails'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import placeHolder from 'src/app/placeholder.png'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useParams } from 'next/navigation'

const Item = () => {
  const params = useParams()
  const { movie } = params
  const { getMovieDetails, movieDetails } = useGetMovieDetails()
  const [genres, setGenres] = useState([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  useEffect(() => {
    getMovieDetails(movie)
  }, [])
  useEffect(() => {
    if (movieDetails.length !== 0) {
      const refArr = []
      movieDetails.genres.map((elm) => refArr.push(elm.name))
      setGenres([...refArr])
    }
  }, [movieDetails])
  return (
    <>
      {
        !isFullScreen ? movieDetails.length === 0
          ? <>
            <div className='animate-pulse'>
              <div className='my-2 mb-1 bg-zinc-900 h-px' />
              <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
              <div className='my-2 mt-1 bg-zinc-900 h-px' />
            </div>
            <div className='animate-pulse'>
              <div className='bg-zinc-900 h-5 w-full' />
            </div>
            <div className='animate-pulse flex gap-4 my-2'>
              <div className='bg-zinc-900 h-10 w-[145px]' />
              <div className='bg-zinc-900 h-10 w-[110px]' />
            </div>
            <div className='animate-pulse my-6'>
              <div className='bg-zinc-900 h-[300px] md:h-[500px] lg:h-[675px] w-full' />
            </div>
            <div className='animate-pulse'>
              <div className='bg-zinc-900 h-4 w-full mb-1' />
              <div className='bg-zinc-900 h-4 w-full mb-1' />
              <div className='bg-zinc-900 h-4 w-5/12' />
            </div>
          </>
          : <>
            <hr className='my-2 mb-1' />
            <h1 className='text-lg md:text-xl lg:text-2xl font-bold py-2 bg-white text-black ps-4'>{movieDetails.title}</h1>
            <hr className='my-2 mt-1' />
            <h2 className='text-base'>&bull; {movieDetails.release_date} &bull; {genres.join(', ')} &bull; {movieDetails.runtime} minutes </h2>
            <div className='flex flex-row items-stretch my-2'>
              <h2 className='text-sm bg-green-600 py-2 px-4 flex items-center mr-4'>Status: {movieDetails.status || 'Fetching...'}</h2>
              <Link href={`${movieDetails?.homepage}`} target='_blank'>
                <button className='text-sm font-semibold py-2 px-4 border-2 border-blue-600 bg-blue-600 hover:bg-zinc-900 transition-all'>
                  Watch Now
                </button>
              </Link>
            </div>
            <div className='relative my-6'>
              <button onClick={() => setIsFullScreen(true)} className='absolute top-0 right-0 flex items-center bg-black text-white border-2 border-white hover:bg-white hover:border-black hover:text-black transition-all px-2 py-1 z-[999]'>
                <FullscreenIcon className='md:mr-2' />
                <p className='hidden md:block'>Full-screen</p>
              </button>
              <Image
                src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
                width={2000}
                height={2000}
                alt={`${movieDetails.title}`}
                className='w-full transition-all opacity-0 blur-xl duration-[1s]'
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0')
                  image.classList.remove('blur-xl')
                }}
                priority
              />
            </div>
            <p>{movieDetails.overview}</p>
          </>
          :
          <>
            <button onClick={() => setIsFullScreen(false)} className='absolute top-0 right-0 m-2 md:m-6 flex items-center bg-black text-white border-2 border-white hover:bg-white hover:border-black hover:text-black transition-all px-2 py-1 z-[9999]'>
              <FullscreenExitIcon className='md:mr-2' />
              <p className='hidden md:block'>Exit</p>
            </button>
            <div className='fixed top-0 left-0 h-screen z-[999] flex justify-center items-center'>
              <Image
                src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
                width={2000}
                height={2000}
                alt={`${movieDetails.title}`}
                className='h-full transition-all opacity-30 blur-xl duration-[1s] object-contain'
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-30')
                  image.classList.remove('blur-xl')
                }}
                priority
              />
            </div>
            <div className='fixed top-0 left-0 h-screen z-[99] flex justify-center items-center bg-black'>
              <Image
                src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
                width={2000}
                height={2000}
                alt={`${movieDetails.title}`}
                className='h-full transition-all opacity-0 blur-xl duration-[0.7s] object-cover'
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0')
                }}
                priority
              />
            </div>
          </>
      }
    </>
  )
}

export default Item