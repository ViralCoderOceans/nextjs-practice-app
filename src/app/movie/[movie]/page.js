"use client"

import useGetMovieDetails from '@/hooks/useGetMovieDetails'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import placeHolder from 'src/app/placeholder.png'

const Item = () => {
  // const [imgPath, setImgPath] = useState('')
  const { getMovieDetails, movieDetails } = useGetMovieDetails()
  useEffect(() => {
    getMovieDetails()
  }, [])
  // useEffect(() => {
  //   setImgPath(`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`)
  // }, [movieDetails])
  // const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
  // const res = await data.json()
  return (
    <>
      {
        movieDetails.length === 0
          ? <>
            <div className='animate-pulse'>
              <div className='my-2 mb-1 bg-zinc-900 h-px' />
              <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
              <div className='my-2 mt-1 bg-zinc-900 h-px' />
            </div>
            <div className='animate-pulse'>
              <div className='bg-zinc-900 h-5 w-[200px]' />
              <div className='bg-zinc-900 h-5 w-[150px]' />
            </div>
            <div className='animate-pulse flex gap-4 my-2'>
              <div className='bg-zinc-900 h-10 w-[145px]' />
              <div className='bg-zinc-900 h-10 w-[110px]' />
            </div>
            <div className='animate-pulse my-6'>
              <div className='bg-zinc-900 h-[610px] w-full' />
            </div>
            <div className='animate-pulse'>
              <div className='bg-zinc-900 h-6 w-full' />
              <div className='bg-zinc-900 h-6 w-full' />
              <div className='bg-zinc-900 h-6 w-5/12' />
            </div>
          </>
          : <>
            <hr className='my-2 mb-1' />
            <h1 className='text-2xl font-bold py-2 bg-white text-black ps-4'>{movieDetails.title}</h1>
            <hr className='my-2 mt-1' />
            <h2 className='text-sm'>Release Date : {movieDetails.release_date}</h2>
            <h2 className='text-sm'>Runtime : {movieDetails.runtime} minutes </h2>
            <div className='flex flex-row items-stretch'>
              <h2 className='text-sm bg-green-600 my-2 py-2 px-4 flex items-center'>Status: {movieDetails.status || 'Fetching...'}</h2>
              <Link href={`${movieDetails?.homepage}`}>
                <button className='text-sm font-semibold mx-4 my-2 py-2 px-4 border-2 border-blue-600 bg-blue-600 hover:bg-zinc-900 transition-all'>
                  Watch Now
                </button>
              </Link>
            </div>

            <Image
              src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
              width={2000}
              height={2000}
              alt={`${movieDetails.title}`}
              className='my-6 w-full transition-all opacity-0 blur-xl duration-[1s]'
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0')
                image.classList.remove('blur-xl')
              }}
              priority
            />
            <p>{movieDetails.overview}</p>
          </>
      }
    </>
  )
}

export default Item