"use client"

import useGetMovieDetails from '@/hooks/useGetMovieDetails'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import placeHolder from 'src/app/placeholder.png'

const Item = () => {
  const [imgPath, setImgPath] = useState('')
  const { getMovieDetails, movieDetails } = useGetMovieDetails()
  useEffect(() => {
    getMovieDetails()
  }, [])
  useEffect(() => {
    setImgPath(`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`)
  }, [movieDetails])
  // const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
  // const res = await data.json()
  return (
    <div className="flex flex-col justify-between p-24 py-12">
      <h1 className='text-2xl font-bold'>{movieDetails.title}</h1>
      <hr className='my-2' />
      <h2 className='text-sm'>Release Date : {movieDetails.release_date}</h2>
      <h2 className='text-sm'>Runtime : {movieDetails.runtime} minutes </h2>
      <div className='flex flex-row '>
        <h2 className='text-sm bg-green-600 my-2 py-2 px-4 rounded-md'>Status: {movieDetails.status}</h2>
        {movieDetails?.homepage && (<button className='text-sm mx-4 my-2 py-2 px-4 rounded-md bg-blue-600'><a href={`${movieDetails?.homepage}`} target="_blank">Watch Now</a></button>)}
      </div>
      {
        movieDetails.backdrop_path ? <Image
          className='my-12 w-full'
          src={`${imgPath}`}
          width={2000}
          height={2000}
          alt={`${movieDetails.title}`}
          priority
        /> : <Image
          className='my-12 w-full'
          src={placeHolder}
          width={2000}
          height={2000}
          alt={`${movieDetails.title}`}
          priority
        />
      }
      <p>{movieDetails.overview}</p>
    </div>
  )
}

export default Item