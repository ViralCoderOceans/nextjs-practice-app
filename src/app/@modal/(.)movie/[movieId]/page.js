"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useGetMovieDetails from '@/hooks/useGetMovieDetails'
import { Backdrop, Fade, Modal } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import placeHolder from 'src/app/placeholder.png'
import { piPContext } from '@/app/layout'
import CloseIcon from '@mui/icons-material/Close';

const page = () => {
  const router = useRouter()
  const { movieId } = useParams()
  const { getMovieDetails, movieDetails } = useGetMovieDetails()
  const [genres, setGenres] = useState([])
  const [description, setDescription] = useState('')
  const { isModalOpen, setIsModalOpen } = useContext(piPContext);
  useEffect(() => {
    if (movieDetails.length !== 0) {
      const refArr = []
      movieDetails.genres.map((elm) => refArr.push(elm.name))
      setGenres([...refArr])
      setDescription(movieDetails.overview.substring(0, 143))
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
        router.back()
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full md:w-fit focus:outline-none" >
          <div className='p-4 pt-7 md:p-10 w-full md:w-[700px] lg:w-[1000px] max-h-full bg-zinc-900 text-white border border-white overflow-y-auto'>
            {
              movieDetails.length === 0
                ? <>
                  <div className='animate-pulse'>
                    <div className='my-2 mb-1 bg-zinc-800 py-px h-px' />
                    <div className='text-2xl font-bold py-2 bg-zinc-800 h-20 md:h-12' />
                    <div className='my-2 mt-1 bg-zinc-800 py-px h-px' />
                  </div>
                  <div className='animate-pulse'>
                    <div className='bg-zinc-800 h-6 w-full' />
                  </div>
                  <div className='animate-pulse flex gap-4 my-2'>
                    <div className='bg-zinc-800 h-10 w-[145px]' />
                    <div className='bg-zinc-800 h-10 w-[110px]' />
                  </div>
                  <div className='mt-2 md:mt-6 lg:flex lg:flex-row transition-all'>
                    <div className='animate-pulse bg-zinc-800 h-[250px] md:h-[350px] lg:h-[250px] basis-1/2' />
                    <div className='animate-pulse basis-1/2 my-2 lg:mx-4 lg:my-0 transition-all'>
                      <div className='bg-zinc-800 h-4 w-full mb-1' />
                      <div className='bg-zinc-800 h-4 w-full mb-1' />
                      <div className='bg-zinc-800 h-4 w-full mb-1' />
                      <div className='bg-zinc-800 h-4 w-5/12' />
                    </div>
                  </div>
                </>
                : <>
                  <hr className='my-2 mb-1' />
                  <button onClick={() => {
                    setIsModalOpen(false)
                    router.back()
                  }} className='absolute top-4 right-4 flex items-center border border-white bg-white text-black hover:bg-black hover:text-white transition-all p-1'>
                    <CloseIcon />
                  </button>
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
                    {movieDetails?.homepage
                      ? <Link href={`${movieDetails?.homepage}`} target='_blank'>
                        <button className='text-sm font-semibold py-2 px-4 border-2 border-blue-600 bg-blue-600 hover:bg-zinc-900 transition-all'>
                          Watch Now
                        </button>
                      </Link>
                      : <button disabled className='text-sm text-zinc-600 cursor-no-drop font-semibold py-2 px-4 border-2 border-zinc-600 bg-zinc-900 transition-all'>
                        Watch Now
                      </button>
                    }
                  </div>
                  <div className='mt-2 md:mt-6 transition-all'>
                    <div className='lg:flex lg:flex-row transition-all'>
                      <div className='basis-1/2 md:max-h-[350px] lg:max-h-[250px] transition-all'>
                        <Image
                          draggable="false"
                          src={movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : placeHolder}
                          width={2000}
                          height={2000}
                          alt={`${movieDetails.title}`}
                          className='h-full transition-all opacity-0 duration-[1s] animate-pulse bg-zinc-700 border border-white'
                          onLoadingComplete={(image) => {
                            image.classList.remove('opacity-0')
                            image.classList.remove('animate-pulse')
                            image.classList.remove('bg-zinc-800')
                          }}
                          priority
                        />
                      </div>
                      <div className='basis-1/2 my-2 lg:mx-4 lg:my-0 transition-all'>
                        <p>
                          {description}{'... '}
                          <span className='text-blue-500 cursor-pointer'
                            onClick={() => {
                              setIsModalOpen(false)
                              window.location.reload();
                            }}>
                            Read more
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default page