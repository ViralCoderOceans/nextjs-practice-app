"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import placeHolder from '../app/placeholder_ver.png'
import { piPContext } from './layout'

const Movie = ({ title, id, poster_path, release_date, backdrop_path }) => {
  const { pictureInPicture, setPictureInPicture } = useContext(piPContext);
  const handleOnClick = () => {
    if (pictureInPicture.isPIP) {
      setPictureInPicture({
        ...pictureInPicture,
        title: title,
        imgPath: backdrop_path !== null ? `https://image.tmdb.org/t/p/original${backdrop_path}` : null,
        movieId: id
      })
    }
  }
  return (
    <div onClick={handleOnClick} className={`p-4 h-full flex flex-col justify-between text-center hover:bg-zinc-900 transition-all cursor-pointer`}>
      <h1 className='text-lg hover:font-semibold transition-all'>{title}</h1>
      <hr className='my-2' />
      <h2 className='text-sm transition-all'>Release Date : {release_date}</h2>
      <div className='h-auto my-4'>
        <Image
          draggable="false"
          src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : placeHolder}
          width={1000}
          height={1000}
          alt={`${title}`}
          className='w-full transition-all opacity-0 duration-[1s] animate-pulse bg-zinc-800 h-[360px]'
          onLoadingComplete={(image) => {
            image.classList.remove('opacity-0')
            image.classList.remove('animate-pulse')
            image.classList.remove('bg-zinc-800')
            image.classList.remove('h-[360px]')
          }}
          priority
        />
      </div>
    </div >
  )
}

export default Movie