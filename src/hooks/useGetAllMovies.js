import axios from 'axios'
import { useCallback, useState } from 'react'

const useGetAllMovies = () => {
  const [movieData, setMovieData] = useState([])

  const getMovies = useCallback(async (api_url) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/${api_url}`,
      params: { language: 'en-US', page: '1', sort_by: 'created_at.asc' },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setMovieData(response.data.results)
      } else {
        console.error('Error--------',response)
      }
    })
  }, [])


  return { getMovies, movieData }
}

export default useGetAllMovies
