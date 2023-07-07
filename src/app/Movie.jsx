"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import placeHolder from 'src/app/placeholder_ver.png'
import { piPContext } from './layout'
import { useRouter } from 'next/navigation'

const Movie = ({ title, id, poster_path, release_date, backdrop_path }) => {
  // const imgPath = `https://image.tmdb.org/t/p/original${poster_path}`
  const router = useRouter()
  const { pictureInPicture, setPictureInPicture } = useContext(piPContext);
  const handleOnClick = () => {
    if (pictureInPicture.isPIP) {
      setPictureInPicture({
        ...pictureInPicture,
        title: title,
        imgPath: `https://image.tmdb.org/t/p/original${backdrop_path}`,
        movieId: id
      })
    } else {
      router.push(`/movie/${id}`)
    }
  }
  return (
    <div key={id} className={`p-4 flex flex-col justify-between text-center hover:bg-zinc-900 transition-all`}>
      <Link href={`/movie/${id}`}>
        <h1 className='text-lg hover:font-semibold transition-all'>{title}</h1>
      </Link>
      <hr className='my-2' />
      <h2 className='mb-4 text-sm'>Release Date : {release_date}</h2>
      <Image
        src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : placeHolder}
        width={1000}
        height={1000}
        alt={`${title}`}
        className='my-6 w-full transition-all opacity-0 blur-xl duration-[1s] cursor-pointer'
        onLoadingComplete={(image) => {
          image.classList.remove('opacity-0')
          image.classList.remove('blur-xl')
        }}
        // priority
        onClick={handleOnClick}
      />
    </div>
  )
}

export default Movie