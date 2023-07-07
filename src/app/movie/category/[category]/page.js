"use client"

import { useEffect, useState } from 'react'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import Link from 'next/link'
import Movie from '@/app/Movie'
import { useParams } from 'next/navigation'
import FiveLoadingSke from '@/components/FiveLoadingSke'

export default function NowPlaying() {
  const params = useParams();
  const category = params.category;
  const [currentCategory, setCurrentCategory] = useState({})
  const [allCategories] = useState([
    {
      id: 1,
      path: 'now_playing',
      title: 'Now Playing',
      api_url: 'movie/now_playing'
    },
    {
      id: 2,
      path: 'popular',
      title: 'Popular',
      api_url: 'movie/popular'
    },
    {
      id: 3,
      path: 'top_rated',
      title: 'Top Rated',
      api_url: 'movie/top_rated'
    },
    {
      id: 4,
      path: 'upcoming',
      title: 'Upcoming',
      api_url: 'movie/upcoming'
    }
  ])
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
            ? <>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-between my-1'>
                  <ul className='flex flex-row items-center'>
                    {
                      allCategories.map((elm) => (
                        <div key={elm.id} className='h-8 w-[105px] bg-zinc-900 mx-1'></div>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className='animate-pulse'>
                <div className='my-2 mb-1 bg-zinc-900 h-px' />
                <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
                <div className='my-4 mt-1 bg-zinc-900 h-px' />
              </div>
            </>
            : <>
              <div className='flex flex-row justify-between items-center my-1'>
                <ul className='flex flex-row items-center'>
                  {
                    allCategories.map((elm) => (
                      <li key={elm.id}>
                        <Link className={`text-sm lg:text-base px-1 md:px-2 lg:px-4 py-1 mr-1 lg:mr-2 transition-all hover:bg-white hover:text-black ${elm.path === category ? 'bg-white text-black' : ''}`} href={`/movie/category/${elm.path}`}>
                          {elm.title}
                        </Link>
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
        {movieData.length === 0
          ? <FiveLoadingSke />
          : <div className='grid grid-cols-fluid mt-4 gap-2 overflow-y-auto transition-all'>
            {movieData.map((elm) => (
              <Movie
                key={elm.id}
                id={elm.id}
                title={elm.title}
                poster_path={elm.poster_path}
                release_date={elm.release_date}
              />
            ))}
          </div>}
      </div>
    </>
  )
}
