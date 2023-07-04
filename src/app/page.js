import Movie from './Movie'

export default async function Home() {
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTAwOTZmNjUwOTk3Y2EwYzU3OWJlYzEyNjAzOWYxYSIsInN1YiI6IjY0YTNjMDM2MTEzODZjMDExYzNiMmExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WvfGV_JD6bF4c0oZDwZdRXr6jKHlRtDAyTsTrBwHMM0'
  //   }
  // };
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()
  console.log(res)
  return (
    <main className="flex flex-col justify-between p-24 py-12">
      <div>
        <h1 className='text-2xl font-bold'>Favorite movie's list</h1>
        <hr className='my-2' />
        <div className='grid grid-cols-fluid'>
          {
            res.results.map((elm) => (
              <Movie
                key={elm.id}
                id={elm.id}
                title={elm.title}
                poster_path={elm.poster_path}
                release_date={elm.release_date}
              />
            ))
          }
        </div>
      </div>
    </main>
  )
}
