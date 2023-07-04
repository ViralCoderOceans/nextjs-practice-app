import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Movie = ({ title, id, poster_path, release_date }) => {
  const imgPath = 'https://image.tmdb.org/t/p/original'
  return (
    <div key={id} className='m-4 flex flex-col justify-between'>
      <h1 className='text-lg'>{title}</h1>
      <hr className='my-2' />
      <h2 className='mb-4 text-sm'>Release Date : {release_date}</h2>
      <Link href={`/${id}`}>
        <Image src={imgPath + poster_path} width={1000} height={1000} alt={title} />
      </Link>
    </div>
  )
}

export default Movie