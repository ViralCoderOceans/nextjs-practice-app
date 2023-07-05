import axios from 'axios'
import { useCallback, useState } from 'react'

const useGetSearchedMovie = () => {
  const [searchMoviesData, setSearchMoviesData] = useState([])

  const getMovieDetails = useCallback(async (searchText) => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: { query: `${searchText}`, include_adult: 'false', language: 'en-US', page: '1' },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setSearchMoviesData(response.data.results)
        console.log(response.data.results)
      } else {
        console.error(response)
      }
    })
  }, [])


  return { getMovieDetails, searchMoviesData }
}

export default useGetSearchedMovie
