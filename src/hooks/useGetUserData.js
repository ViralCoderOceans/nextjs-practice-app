import axios from 'axios'
import { useCallback, useState } from 'react'

const useGetUserData = () => {
  const [userData, setUserData] = useState({})

  const getUserData = useCallback(async () => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/account/20104985',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    }
    await axios.request(options).then((response) => {
      if (response.status === 200) {
        setUserData(response.data)
      } else {
        console.error('Error--------', response)
      }
    })
  }, [])


  return { getUserData, userData }
}

export default useGetUserData
