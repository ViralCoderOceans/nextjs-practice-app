"use client"

import { useContext, useEffect, useState } from 'react'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import Link from 'next/link'
import Movie from '@/app/Movie'
import { useParams, useRouter } from 'next/navigation'
import FiveLoadingSke from '@/components/FiveLoadingSke'
import { allCategories } from '../../../../../constants/constants'
import { piPContext } from '@/app/layout'

export default function CategoryPage() {
  const { push } = useRouter()
  const params = useParams()
  const category = params.category
  const [currentCategory, setCurrentCategory] = useState({})
  const { setIsModalOpen, pictureInPicture } = useContext(piPContext);

  const { getMovies, movieData } = useGetAllMovies()
  useEffect(() => {
    setCurrentCategory({ ...allCategories.filter((elm) => elm.path === category)[0] })
    getMovies(`movie/${category}`)
  }, [category])
  return (
    <>
      <div>
        {
          movieData.length === 0
            ? <div className='animate-pulse'>
              <div className='my-1'>
                <ul className='grid grid-cols-category gap-2 lg:gap-4 transition-all'>
                  {
                    allCategories.map((elm) => (
                      <li key={elm.id} className='h-8 bg-zinc-900'></li>
                    ))
                  }
                </ul>
              </div>
              <div className='my-2 mb-1 bg-zinc-900 py-px h-px' />
              <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
              <div className='my-4 mt-1 bg-zinc-900 py-px h-px' />
            </div>
            : <>
              <div className='my-1'>
                <ul className='grid grid-cols-category gap-2 lg:gap-4 transition-all'>
                  {
                    allCategories.map((elm) => (
                      <li key={elm.id} onClick={() => push(`/movie/category/${elm.path}`)} className={`flex justify-center cursor-pointer lg:text-base px-1 md:px-2 lg:px-4 py-1 transition-all hover:bg-white hover:text-black ${elm.path === category ? 'bg-white text-black' : ''}`}>
                        {elm.title}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <hr className='my-2 mb-1' />
              <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>{currentCategory.title}</h1>
              <hr className='my-4 mt-1' />
            </>
        }
        {
          movieData.length === 0
            ? <FiveLoadingSke />
            : pictureInPicture.isPIP
              ? <div className='grid grid-cols-movie mt-4 gap-2 overflow-y-auto transition-all'>
                {movieData.map((elm) => (
                  <div key={elm.id}>
                    <Movie
                      id={elm.id}
                      title={elm.title}
                      poster_path={elm.poster_path}
                      release_date={elm.release_date}
                      backdrop_path={elm.backdrop_path}
                    />
                  </div>
                ))}
              </div>
              : <div className='grid grid-cols-movie mt-4 gap-2 overflow-y-auto transition-all'>
                {movieData.map((elm) => (
                  <div key={elm.id} onClick={() => setIsModalOpen(true)}>
                    <Link href={`/movie/${elm.id}`}>
                      <Movie
                        id={elm.id}
                        title={elm.title}
                        poster_path={elm.poster_path}
                        release_date={elm.release_date}
                        backdrop_path={elm.backdrop_path}
                      />
                    </Link>
                  </div>
                ))}
              </div>
        }
      </div >
    </>
  )
}
