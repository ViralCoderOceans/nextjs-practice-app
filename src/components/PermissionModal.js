"use client"

import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useContext, useState } from 'react'
import WarningIcon from '@mui/icons-material/Warning';
import { piPContext } from '@/app/layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const PermissionModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { pictureInPicture, setPictureInPicture, isMinimize, setIsMinimize } = useContext(piPContext);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setIsOpen(false)
    }
  }
  const Button = ({ text, handleBtnClick }) => {
    return (
      <button onClick={() => {
        handleBtnClick()
      }} className='w-auto text-base lg:text-lg m-1 md:mb-3 lg:mx-2 rounded-none bg-black p-2 md:py-2 md:px-3 lg:py-3 lg:px-5 border-2 border-white hover:bg-white hover:border-black hover:text-black transition-all'>
        {text}
      </button>
    )
  }
  return (
    <>
      <Modal
        open={pictureInPicture.isPIP ? isOpen : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      // disableBackdropClick
      >
        <Fade in={isOpen}>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[450px] lg:w-[600px] bg-white border-2 border-black flex flex-col justify-evenly transition-all'>
            <div className='text-black text-center py-6 pt-8 lg:pt-10 transition-all' >
              <WarningIcon className='text-3xl' />
              <h1 className='text-black text-center font-semibold text-lg md:text-xl lg:text-2xl pt-2 transition-all'>Permission needed</h1>
              <h1 className='text-black text-center text-base md:text-lg lg:text-xl pt-1 lg:pt-2 px-6 transition-all'>Do you want to continue with picture-in-picture?</h1>
            </div>
            <div className='md:flex md:justify-center grid grid-col-3'>
              <Button text='Allow' handleBtnClick={() => handleClose()} />
              {!isMinimize && <Button text='Minimize it' handleBtnClick={() => {
                setIsMinimize(true)
                handleClose()
              }} />}
              <Button text='Denied, Close it' handleBtnClick={() => {
                setPictureInPicture({
                  isPIP: false,
                  title: '',
                  imgPath: '',
                  movieId: ''
                })
                handleClose()
              }} />
            </div>
            <button onClick={() => {
              handleClose()
              router.back()
            }} className='absolute text-base flex items-center lg:text-lg top-0 left-0 w-auto rounded-none bg-black p-2 lg:px-3 border-2 border-white hover:bg-white hover:border-black hover:text-black transition-all'>
              <ArrowBackIcon /> back
            </button>
          </div>
        </Fade>
      </Modal >
    </>
  )
}

export default PermissionModal