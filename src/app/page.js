"use client"

import { useEffect, useState } from 'react'
import Movie from './Movie'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/account/20104985/favorite/movies',
      params: { language: 'en-US', page: '1', sort_by: 'created_at.asc' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTAwOTZmNjUwOTk3Y2EwYzU3OWJlYzEyNjAzOWYxYSIsInN1YiI6IjY0YTNjMDM2MTEzODZjMDExYzNiMmExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvfGV_JD6bF4c0oZDwZdRXr6jKHlRtDAyTsTrBwHMM0'
      }
    }
    async function getData() {
      await axios
        .request(options)
        .then((response) => {
          setData(response.data.results)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    getData()
  }, [])
  // const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  // const res = await data.json()
  return (
    <main className="flex flex-col justify-between p-24 py-12">
      <div>
        <h1 className='text-2xl font-bold'>Favorite movie's list</h1>
        <hr className='my-2' />
        <div className='grid grid-cols-fluid'>
          {
            data.map((elm) => (
              <Movie
                key={elm.id}
                id={elm.id}
                title={elm.title}
                poster_path={elm.poster_path}
                release_date={elm.release_date}
              />
            ))
          }
        </div>
      </div>
    </main>
  )
}
