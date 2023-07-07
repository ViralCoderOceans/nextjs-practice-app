"use client"

import { useEffect, useState } from 'react'
import Movie from './Movie'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import useGetSearchedMovie from '@/hooks/useGetSearchedMovie'
import Link from 'next/link'
import FiveLoadingSke from '@/components/FiveLoadingSke'

export default function Home() {
  const { getMovies, movieData } = useGetAllMovies()
  const { getMovieDetails, searchMoviesData } = useGetSearchedMovie()
  const [searchText, setSearchText] = useState()
  useEffect(() => {
    getMovies('account/20104985/favorite/movies')
  }, [])
  useEffect(() => {
    if (searchText) {
      getMovieDetails(searchText)
    }
  }, [searchText])
  return (
    <>
      <div>
        {
          movieData.length === 0
            ? <div className='animate-pulse'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-2'>
                  <div className='h-8 w-[125px] bg-zinc-900'></div>
                  <div className='h-8 w-[90px] bg-zinc-900'></div>
                  <div className='h-8 w-[100px] bg-zinc-900'></div>
                  <div className='h-8 w-[115px] bg-zinc-900'></div>
                </div>
                <div className='flex flex-row items-center gap-8'>
                  <div className='h-10 w-[80px] bg-zinc-900'></div>
                  <div className='h-10 w-[195px] bg-zinc-900'></div>
                </div>
              </div>
            </div>
            : <>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-between'>
                  <ul className='flex flex-row items-center'>
                    <li>
                      <Link href={`/movie/category/now_playing`} className='px-4 py-1 mr-2 hover:bg-white hover:text-black transition-all'>
                        Now Playing
                      </Link>
                    </li>
                    <li>
                      <Link href={`/movie/category/popular`} className='px-4 py-1 mr-2 hover:bg-white hover:text-black transition-all'>
                        Popular
                      </Link>
                    </li>
                    <li>
                      <Link href={`/movie/category/top_rated`} className='px-4 py-1 mr-2 hover:bg-white hover:text-black transition-all'>
                        Top Rated
                      </Link>
                    </li>
                    <li >
                      <Link href={`/movie/category/upcoming`} className='px-4 py-1 hover:bg-white hover:text-black transition-all'>
                        Upcoming
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex max-w-md gap-x-4 items-center">
                  <h1 className='text-xl font-normal px-4'>Search :</h1>
                  <input id="search" name="search" type="text" onChange={(e) => setSearchText(e.target.value)} className="min-w-0 flex-auto border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset transition-all sm:text-sm sm:leading-6" placeholder="Search movie here" />
                  {/* <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all">search</button> */}
                </div>
              </div>
            </>
        }
        {searchText && <>
          <hr className='my-2 mb-1' />
          <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>Search results of "{searchText}"</h1>
          <hr className='my-2 mt-1' />
          {
            searchMoviesData.length === 0
              ? <h1 className='text-xl text-center my-4'>No results found</h1>
              : <div className='grid grid-cols-fluid mt-4 gap-2'>
                {searchMoviesData.map((elm) => (
                  <Movie
                    key={elm.id}
                    id={elm.id}
                    title={elm.title}
                    poster_path={elm.poster_path}
                    release_date={elm.release_date}
                  />
                ))}
              </div>
          }
        </>}
        {
          movieData.length === 0
            ?
            <div className='animate-pulse'>
              <div className='my-2 mb-1 bg-zinc-900 h-px' />
              <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
              <div className='my-4 mt-1 bg-zinc-900 h-px' />
            </div>
            : <>
              <hr className='my-2 mb-1' />
              <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>Favorite Movies</h1>
              <hr className='my-4 mt-1' />
            </>
        }
        {
          movieData.length === 0
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
            </div>
        }
      </div>
    </>
  )
}
