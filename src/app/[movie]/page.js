"use client"

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Item = ({ params }) => {
  const [data, setData] = useState([])
  const { movie } = params
  const [imgPath, setImgPath] = useState('')
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movie}`,
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTAwOTZmNjUwOTk3Y2EwYzU3OWJlYzEyNjAzOWYxYSIsInN1YiI6IjY0YTNjMDM2MTEzODZjMDExYzNiMmExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvfGV_JD6bF4c0oZDwZdRXr6jKHlRtDAyTsTrBwHMM0'
      }
    };
    async function getData() {
      await axios
        .request(options)
        .then((response) => {
          setData(response.data);
          setImgPath(`https://image.tmdb.org/t/p/original${response.data.backdrop_path}`)
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getData()
  }, [])
  // const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
  // const res = await data.json()
  return (
    <div className="flex flex-col justify-between p-24 py-12">
      <h1 className='text-2xl font-bold'>{data.title}</h1>
      <hr className='my-2' />
      <h2 className='text-sm'>Release Date : {data.release_date}</h2>
      <h2 className='text-sm'>Runtime : {data.runtime} minutes </h2>
      <div className='flex flex-row '>
        <h2 className='text-sm bg-green-600 my-2 py-2 px-4 rounded-md'>Status: {data.status}</h2>
        <button className='text-sm mx-4 my-2 py-2 px-4 rounded-md bg-blue-600'>Watch Now</button>
      </div>
      <Image
        className='my-12 w-full'
        src={`${imgPath}`}
        width={2000}
        height={2000}
        alt={`${data.title}`}
        priority
      />
      <p>{data.overview}</p>
    </div>
  )
}

export default Item