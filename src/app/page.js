"use client"

import { useEffect, useState } from 'react'
import Movie from './Movie'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import useGetSearchedMovie from '@/hooks/useGetSearchedMovie'

export default function Home() {
  const { getMovies, movieData } = useGetAllMovies()
  const { getMovieDetails, searchMoviesData } = useGetSearchedMovie()
  const [searchText, setSearchText] = useState()
  console.log('movieData: ', movieData);
  console.log('searchMoviesData: ', searchMoviesData);
  useEffect(() => {
    getMovies()
  }, [])
  useEffect(() => {
    if (searchText) {
      getMovieDetails(searchText)
    }
  }, [searchText])
  return (
    <main className="flex flex-col justify-between p-24 py-12 overflow-y-auto">
      <div>
        <div className='flex flex-row justify-end items-center'>
          <h1 className='text-xl font-normal px-4'>Search :</h1>
          <div className="flex max-w-md gap-x-4">
            <input id="search" name="search" type="text" onChange={(e) => setSearchText(e.target.value)} className="min-w-0 flex-auto border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset transition-all sm:text-sm sm:leading-6" placeholder="Search movie here" />
            {/* <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all">search</button> */}
          </div>
        </div>
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
        <hr className='my-2 mb-1' />
        <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>Favorite Movies</h1>
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
