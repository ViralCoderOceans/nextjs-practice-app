"use client"

import { piPContext } from '@/app/layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Draggable from 'react-draggable';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Maximize';
import CloseIcon from '@mui/icons-material/Close';

const PictureInPicture = () => {
  const { pictureInPicture, setPictureInPicture, isMinimize, setIsMinimize } = useContext(piPContext);
  return (
    <>
      {
        pictureInPicture.isPIP &&
        <Draggable>
          <div className={`fixed bottom-0 right-0 border-2 border-white w-[450px] z-[999]`}>
            <div className={`absolute top-0 z-[99] flex ${!isMinimize ? 'block' : 'hidden'} transition-all`}>
              <Link href={`/movie/${pictureInPicture.movieId}`}>
                <button onClick={() => setPictureInPicture({
                  isPIP: false,
                  title: '',
                  imgPath: '',
                  movieId: ''
                })
                } className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                  <OpenInNewIcon className='-rotate-90' />
                  {/* <p className='hidden md:block'>Pip</p> */}
                </button>
              </Link>
              <button onClick={() => setIsMinimize(isMinimize ? false : true)} className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                {!isMinimize ? <MinimizeIcon /> : <MaximizeIcon />}
                {/* <p className='hidden md:block'>Pip</p> */}
              </button>
              <button onClick={() => setPictureInPicture({
                isPIP: false,
                title: '',
                imgPath: '',
                movieId: ''
              })
              } className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                <CloseIcon />
                {/* <p className='hidden md:block'>Pip</p> */}
              </button>
            </div>
            {
              !isMinimize &&
              <Image
                draggable="false"
                src={pictureInPicture.imgPath ? pictureInPicture.imgPath : placeHolder}
                width={2000}
                height={2000}
                alt={`${pictureInPicture.title}`}
                className='h-full transition-all opacity-0 duration-[1s] object-cover animate-pulse bg-zinc-800'
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0')
                  // image.classList.remove('blur-xl')
                  image.classList.remove('animate-pulse')
                  image.classList.remove('bg-zinc-800')
                }}
                priority
              />
            }
            <div className={`w-full py-3 text-xl text-black font-semibold flex items-center ${!isMinimize ? 'justify-center' : 'justify-between px-4'} bg-white transition-all`}>
              <div className={`${!isMinimize ? 'hidden' : 'flex'} transition-all`}>
                <Link href={`/movie/${pictureInPicture.movieId}`}>
                  <button onClick={() => setPictureInPicture({
                    isPIP: false,
                    title: '',
                    imgPath: '',
                    movieId: ''
                  })
                  } className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                    <OpenInNewIcon className='-rotate-90' />
                    {/* <p className='hidden md:block'>Pip</p> */}
                  </button>
                </Link>
                <button onClick={() => setIsMinimize(isMinimize ? false : true)} className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                  {!isMinimize ? <MinimizeIcon /> : <MaximizeIcon />}
                  {/* <p className='hidden md:block'>Pip</p> */}
                </button>
                <button onClick={() => setPictureInPicture({
                  isPIP: false,
                  title: '',
                  imgPath: '',
                  movieId: ''
                })
                } className='flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                  <CloseIcon />
                  {/* <p className='hidden md:block'>Pip</p> */}
                </button>
              </div>
              <p className='border-b-2 border-b-black'>
              {pictureInPicture.title}
              </p>
            </div>
          </div>
        </Draggable>
      }
    </>
  )
}

export default PictureInPicture