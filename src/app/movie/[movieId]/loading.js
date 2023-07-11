'use client'

import { Spinner } from '@chakra-ui/react'
import React from 'react'

const loading = () => {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
      <Spinner size='xl' thickness='8px' className='h-20 w-20' />
    </div>
  )
}

export default loading