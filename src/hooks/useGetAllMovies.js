import axios from 'axios'
import { useState } from 'react'

const useGetAllMovies = () => {
  const [movieData, setMovieData] = useState([])
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/account/20104985/favorite/movies',
    params: { language: 'en-US', page: '1', sort_by: 'created_at.asc' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
  }

  const getMovies = async () => {
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setMovieData(response.data.results)
      } else {
        console.error(response)
      }
    })
  }


  return { getMovies, movieData }
}

export default useGetAllMovies