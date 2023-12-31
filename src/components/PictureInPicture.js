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
import placeHolder from '../app/placeholder.png'

const PictureInPicture = () => {
  const { pictureInPicture, setPictureInPicture, isMinimize, setIsMinimize, setIsModalOpen } = useContext(piPContext);
  return (
    <>
      {
        pictureInPicture.isPIP &&
        <Draggable cancel=".btn">
          <div>
            <div className={`border-2 border-white w-[250px] md:w-[250px] lg:w-[450px] z-[999] bg-white`}>
              {!isMinimize &&
                <div className='absolute top-[2px] z-[99] flex'>
                  <Link href={`/movie/${pictureInPicture.movieId}`}>
                    <button onClick={() => {
                      setPictureInPicture({
                        isPIP: false,
                        title: '',
                        imgPath: '',
                        movieId: ''
                      })
                      setIsModalOpen(true)
                    }
                    } className='btn flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                      <OpenInNewIcon className='-rotate-90' />
                    </button>
                  </Link>
                  <button onClick={() => setIsMinimize(isMinimize ? false : true)} className='btn flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                    {!isMinimize ? <MinimizeIcon /> : <MaximizeIcon />}
                  </button>
                  <button onClick={() => setPictureInPicture({
                    isPIP: false,
                    title: '',
                    imgPath: '',
                    movieId: ''
                  })
                  } className='btn flex items-center bg-white text-black hover:bg-black hover:text-white transition-all px-2 py-1'>
                    <CloseIcon />
                  </button>
                </div>
              }
              <div className={`${isMinimize ? '' : 'h-full flex flex-col justify-evenly'}`}>
                {
                  !isMinimize &&
                  <Image
                    draggable="false"
                    src={pictureInPicture.imgPath || placeHolder}
                    width={1000}
                    height={1000}
                    alt={`${pictureInPicture.title}`}
                    // placeholder="blur"
                    // blurDataURL={`${placeHolder}`}
                    className='transition-all opacity-0 duration-[1s] object-cover bg-zinc-800'
                    onLoadingComplete={(image) => {
                      image.classList.remove('opacity-0')
                      image.classList.remove('bg-zinc-800')
                    }}
                  // priority
                  />
                }
                <div className={`w-full h-fit py-1 text-lg lg:text-xl text-black font-medium lg:font-semibold flex items-center ${!isMinimize ? 'justify-center' : 'flex-col px-4'} bg-white`}>
                  {isMinimize &&
                    <div className='w-full flex justify-start'>
                      <Link href={`/movie/${pictureInPicture.movieId}`}>
                        <button onClick={() => {
                          setPictureInPicture({
                            isPIP: false,
                            title: '',
                            imgPath: '',
                            movieId: ''
                          })
                          setIsModalOpen(true)
                        }
                        } className='btn flex items-center bg-white text-black hover:bg-black hover:text-white px-2 py-1'>
                          <OpenInNewIcon className='-rotate-90' />
                        </button>
                      </Link>
                      <button onClick={() => setIsMinimize(isMinimize ? false : true)} className='btn flex items-center bg-white text-black hover:bg-black hover:text-white px-2 py-1'>
                        {!isMinimize ? <MinimizeIcon /> : <MaximizeIcon />}
                      </button>
                      <button onClick={() => setPictureInPicture({
                        isPIP: false,
                        title: '',
                        imgPath: '',
                        movieId: ''
                      })
                      } className='btn flex items-center bg-white text-black hover:bg-black hover:text-white px-2 py-1'>
                        <CloseIcon />
                      </button>
                    </div>
                  }
                  <p className='border-b-2 bg-white border-b-black cursor-default'>
                    {pictureInPicture.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      }
    </>
  )
}

export default PictureInPicture