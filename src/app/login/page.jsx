'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const { push } = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);

      console.log(JSON.stringify(data));

      // redirect the user to /
      push("/");
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <>
      <div className='absolute top-0 left-0'>
        <h1 className='text-lg md:text-xl lg:text-2xl px-1 lg:px-3 py-3 lg:py-6 font-semibold bg-white text-black transition-all'>
          Movie_app
        </h1>
      </div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[400px] lg:w-[450px]'>
        <div className='bg-zinc-900 border-2 border-zinc-700 p-4 mx-4 md:mx-0 transition-all'>
          <h1 className='text-3xl font-semibold text-center m-4'>Login</h1>
          <hr className='my-2 border-zinc-700' />
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div className='flex flex-col'>
              <label htmlFor="username" className='text-lg mb-3'>Username :</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="min-w-0 flex-auto border-0 bg-white/5 p-2 md:px-3.5 md:py-2 focus:outline-zinc-600 text-white shadow-sm transition-all md:text-lg sm:leading-3"
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password" className='text-lg mb-3'>Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="min-w-0 flex-auto border-0 bg-white/5 p-2 md:px-3.5 md:py-2 text-white shadow-sm focus:outline-zinc-600 transition-all md:text-lg sm:leading-3"
              />
            </div>

            <button
              type="submit"
              className="text-black mt-2 mb-4 hover:text-white font-semibold p-1.5 md:py-2 mg:px-4 border-2 border-white bg-white hover:bg-zinc-900 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page