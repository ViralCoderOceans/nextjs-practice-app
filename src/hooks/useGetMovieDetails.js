import axios from 'axios'
import { useParams } from "next/navigation";
import { useCallback, useState } from 'react'

const useGetMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([])
  const params = useParams();
  const movie = params.movie;

  const getMovieDetails = useCallback(async () => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movie}`,
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    };
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setMovieDetails(response.data)
      } else {
        console.error(response)
      }
    })
  }, [])


  return { getMovieDetails, movieDetails }
}

export default useGetMovieDetails
