"use client"

import { piPContext } from '@/app/layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import Draggable from 'react-draggable';

const PictureInPicture = () => {
  const { pictureInPicture, setPictureInPicture } = useContext(piPContext);
  return (
    <>
      {
        pictureInPicture.isPIP &&
        <Draggable>
          <div className='fixed bottom-0 right-0 h-[300px] w-[450px] border-2 border-white z-[999]'>
            <Link href={`/movie/${pictureInPicture.movieId}`} className='absolute top-0 z-[99]'>
              <button onClick={() => {
                setPictureInPicture({
                  isPIP: false,
                  title: '',
                  imgPath: '',
                  movieId: ''
                })
              }} className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                <OpenInFullIcon className='rotate-90' />
                {/* <p className='hidden md:block'>Pip</p> */}
              </button>
            </Link>
            <Image
              draggable="false"
              src={pictureInPicture.imgPath ? pictureInPicture.imgPath : placeHolder}
              width={2000}
              height={2000}
              alt={`${pictureInPicture.title}`}
              className='h-full transition-all opacity-0 blur-xl duration-[1s] object-cover'
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0')
                image.classList.remove('blur-xl')
              }}
              priority
            />
            <div className='absolute bottom-0 w-full py-3 text-xl text-black font-semibold flex justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white '>
              {pictureInPicture.title}
            </div>
          </div>
        </Draggable>
      }
    </>
  )
}

export default PictureInPicture