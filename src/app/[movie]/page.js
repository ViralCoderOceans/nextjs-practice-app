import Image from 'next/image'
import React from 'react'

const Item = async ({ params }) => {
    const { movie } = params
    const imgPath = 'https://image.tmdb.org/t/p/original'
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return (
        <div className="flex flex-col justify-between p-24 py-12">
            <h1 className='text-2xl font-bold'>{res.title}</h1>
            <hr className='my-2' />
            <h2 className='text-sm'>Release Date : {res.release_date}</h2>
            <h2 className='text-sm'>Runtime : {res.runtime} minutes </h2>
            <h2 className='text-sm bg-green-600 w-min my-2 py-2 px-4 rounded-md'>{res.status}</h2>
            <Image
                className='my-12 w-full'
                src={imgPath + res.backdrop_path}
                width={2000}
                height={2000}
                priority
            />
            <p>{res.overview}</p>
        </div>
    )
}

export default Item