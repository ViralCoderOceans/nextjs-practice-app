"use client"

import { useContext, useEffect, useState } from 'react'
import useGetAllMovies from '@/hooks/useGetAllMovies'
import useGetSearchedMovie from '@/hooks/useGetSearchedMovie'
import FiveLoadingSke from '@/components/FiveLoadingSke'
import { useRouter } from 'next/navigation'
import Movie from './Movie'
import { allCategories } from '../../constants/constants'
import Link from 'next/link'
import { piPContext } from './layout'

export default function Home() {
  const { push } = useRouter()
  const { getMovies, movieData } = useGetAllMovies()
  const { getMovieDetails, searchMoviesData } = useGetSearchedMovie()
  const [searchText, setSearchText] = useState()
  const [isSearched, setIsSearched] = useState(false)
  const { setIsModalOpen, pictureInPicture } = useContext(piPContext);
  useEffect(() => {
    getMovies('account/20104985/favorite/movies')
  }, [])
  const searchMovies = () => {
    if (searchText) {
      getMovieDetails(searchText)
    }
  }
  return (
    <>
      <div>
        {
          movieData.length === 0
            ? <div className='animate-pulse my-1'>
              <div className='flex flex-row items-center gap-2'>
                <div className='h-11 w-[250px] bg-zinc-900'></div>
                <div className='h-11 w-[90px] bg-zinc-900'></div>
              </div>
              <div className='my-2 bg-zinc-900 py-px h-px' />
              <div className='flex flex-col transition-all'>
                <div className='my-1'>
                  <ul className='grid grid-cols-category gap-2 lg:gap-4 transition-all'>
                    {
                      allCategories.map((elm) => (
                        <li key={elm.id} className='h-8 bg-zinc-900'></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
            : <>
              <div className='flex flex-col my-1 transition-all'>
                <form
                  className="flex max-w-md gap-x-2 items-center transition-all"
                  onSubmit={(e) => {
                    e.preventDefault()
                    searchMovies()
                    setIsSearched(true)
                  }}>
                  <input
                    id="search"
                    name="search"
                    type="text"
                    onChange={(e) => {
                      setSearchText(e.target.value)
                      setIsSearched(false)
                    }}
                    className="min-w-0 flex-auto border-0 bg-white/5 p-2 md:px-3.5 md:py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset transition-all md:text-lg sm:leading-3"
                    placeholder="Search movie here"
                  />
                  <button type="submit" className="text-black hover:text-white font-semibold p-1.5 md:py-2 mg:px-4 border-2 border-white bg-white hover:bg-zinc-900 transition-all">Search</button>
                </form>
                <hr className='my-2' />
                <div className='my-1'>
                  <ul className='grid grid-cols-category gap-2 lg:gap-4 transition-all'>
                    {
                      allCategories.map((elm) => (
                        <li key={elm.id} onClick={() => push(`/movie/category/${elm.path}`)} className='flex justify-center cursor-pointer lg:text-base px-1 md:px-2 lg:px-4 py-1 mr-1 lg:mr-2 transition-all hover:bg-white hover:text-black'>
                          {elm.title}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </>
        }
        {searchText && <>
          {isSearched &&
            <>
              <hr className='my-2 mb-1' />
              <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>Search results of "{searchText}"</h1>
              <hr className='my-2 mt-1' />
              {
                searchMoviesData.length === 0
                  ? <h1 className='text-xl text-center my-4'>No results found</h1>
                  : pictureInPicture.isPIP
                    ? <div className='grid grid-cols-movie mt-4 gap-2 overflow-y-auto transition-all'>
                      {searchMoviesData.map((elm) => (
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
                      {searchMoviesData.map((elm) => (
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
            </>
          }
        </>}
        {
          movieData.length === 0
            ?
            <div className='animate-pulse'>
              <div className='my-2 mb-1 bg-zinc-900 py-px h-px' />
              <div className='text-2xl font-bold py-2 bg-zinc-900 h-12' />
              <div className='my-4 mt-1 bg-zinc-900 py-px h-px' />
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
      </div>
    </>
  )
}
