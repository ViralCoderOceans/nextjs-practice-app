"use client"

import useGetUserData from '@/hooks/useGetUserData'
import React, { useEffect } from 'react'
import placeholder from '../placeholder_ver.png'
import Image from 'next/image'

const page = () => {
  const { getUserData, userData } = useGetUserData()
  console.log('userData: ', userData);
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <div>
      {userData !== {} &&
        <>
          <hr className='my-2 mb-1' />
          <h1 className='text-2xl font-bold py-2 bg-white text-black text-center'>Profile</h1>
          <hr className='my-4 mt-1' />
          <div className='flex items-center m-4'>
            <Image
              draggable="false"
              src={
                userData?.avatar?.tmdb.avatar_path
                  ? `https://image.tmdb.org/t/p/original${userData.avatar.tmdb.avatar_path}`
                  : placeholder
              }
              alt='profile-picture'
              width={1000}
              height={1000}
              className='h-20 w-20 transition-all opacity-0 blur-xl duration-[1s] object-cover rounded-full'
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0')
                image.classList.remove('blur-xl')
              }}
            />
            <div className='ml-6 flex flex-col justify-between'>
              <h1 className='text-xl'>Name: {userData.name}</h1>
              <h1>Username: {userData.username}</h1>
            </div>
          </div>
          <hr className='my-4 mt-1' />
        </>
      }
    </div>
  )
}

export default page