"use client"

import { useEffect, useState } from 'react'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import Link from 'next/link'
import Movie from '@/app/Movie'
import { useParams } from 'next/navigation'

export default function NowPlaying() {
  const params = useParams();
  const category = params.category;
  const [currentCategory, setCurrentCategory] = useState({})
  const [allCategories] = useState([
    {
      id: 1,
      path: 'now-playing',
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
      path: 'top-rated',
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
    setCurrentCategory(allCategories.filter((elm) => elm.path === category)[0])
  }, [category])
  useEffect(() => {
    getMovies(currentCategory.api_url)
  }, [currentCategory])
  return (
    <main className="flex flex-col justify-between p-24 py-12 overflow-y-auto">
      <div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row justify-between my-1'>
            <ul className='flex flex-row items-center'>
              {
                allCategories.map((elm) => (
                  <Link href={`/movie/category/${elm.path}`}>
                    <li className={`px-4 py-1 mr-2 transition-all hover:bg-white hover:text-black ${elm.path===category ? 'bg-white text-black' : ''}`}>
                      {elm.title}
                    </li>
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
        <hr className='my-2 mb-1' />
        <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>{currentCategory.title}</h1>
        <hr className='my-4 mt-1' />
        <div className='grid grid-cols-fluid mt-4 gap-2 overflow-y-auto'>
          {movieData.map((elm) => (
            <Movie
              key={elm.id}
              id={elm.id}
              title={elm.title}
              poster_path={elm.poster_path}
              release_date={elm.release_date}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
