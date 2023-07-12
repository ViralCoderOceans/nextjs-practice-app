"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useGetMovieDetails from '@/hooks/useGetMovieDetails'
import { Modal } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import placeHolder from 'src/app/placeholder.png'
import { piPContext } from '@/app/layout'

const page = () => {
  const router = useRouter()
  const { movieId } = useParams()
  const { getMovieDetails, movieDetails } = useGetMovieDetails()
  const [genres, setGenres] = useState([])
  const { isModalOpen, setIsModalOpen } = useContext(piPContext);
  useEffect(() => {
    if (movieDetails.length !== 0) {
      const refArr = []
      movieDetails.genres.map((elm) => refArr.push(elm.name))
      setGenres([...refArr])
    }
  }, [movieDetails])
  useEffect(() => {
    getMovieDetails(movieId)
  }, [])

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(false)
        router.push('/home')
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[700px] lg:w-[1000px] max-h-full p-4 md:p-10 bg-zinc-900 text-white border border-white transition-all overflow-y-scroll" >
        <hr className='my-2 mb-1' />
        <div className='text-lg md:text-xl lg:text-2xl font-bold py-2 bg-white text-black px-4 flex sm:flex-row flex-col justify-between transition-all'>
          <div className='flex justify-center md:justify-start items-center transition-all'>
            {movieDetails.title}
          </div>
          <button onClick={() => {
            setIsModalOpen(false)
            window.location.reload();
          }} className='text-sm font-semibold py-2 px-4 text-white bg-black hover:bg-zinc-900 transition-all'>
            Go to page
          </button>
        </div>
        <hr className='my-2 mt-1' />
        <h2 className='text-base'>&bull; {movieDetails.release_date} &bull; {genres.join(', ')} &bull; {movieDetails.runtime} minutes </h2>
        <div className='flex flex-row items-stretch my-2'>
          <h2 className='text-sm bg-green-600 p-2 md:px-4 flex items-center mr-2 md:mr-4 transition-all'>Status: {movieDetails.status || 'Fetching...'}</h2>
          <Link href={`${movieDetails?.homepage}`} target='_blank'>
            <button className='text-sm font-semibold p-2 md:px-4 border-2 border-blue-600 bg-blue-600 hover:bg-zinc-900 transition-all'>
              Watch Now
            </button>
          </Link>
        </div>
        <div className='my-2 md:my-6'>
          <div className='lg:flex lg:flex-row transition-all'>
            <div className='basis-1/2'>
              <Image
                draggable="false"
                src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
                width={2000}
                height={2000}
                alt={`${movieDetails.title}`}
                className='w-full transition-all opacity-0 duration-[1s] animate-pulse bg-zinc-800 border border-white'
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0')
                  image.classList.remove('animate-pulse')
                  image.classList.remove('bg-zinc-800')
                }}
                priority
              />
            </div>
            <div className='basis-1/2 m-2'>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default page