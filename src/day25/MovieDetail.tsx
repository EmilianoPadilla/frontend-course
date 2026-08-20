import { useParams, Link } from 'react-router-dom'
import useMovie from '../day24/useMovie'

function MovieDetailV2() {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError } = useMovie(id)

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen"> //minimum height of the full screen height
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  )

  if (isError) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-lg">Something went wrong!</p>
    </div>
  )

  if (!movie) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-lg">Movie not found!</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/search-v2"
        className="text-blue-500 hover:text-blue-700 mb-6 inline-block" //hover: darker blue on hover,    inline-block makes the link behave like a block but stay inline so margin works correctly
      >
        ← Back to search
      </Link>

      <div className="flex flex-col md:flex-row gap-8"> //stacked on mobile, side by side on desktop
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full md:w-64 rounded-lg shadow-lg object-cover"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{movie.Title}</h1>

          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">  //completely round corners — used for badge/pill shapes
              {movie.Year}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ⭐ {movie.imdbRating}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {movie.Runtime}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{movie.Plot}</p> //more line spacing for easier reading

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Director</p>
              <p className="text-gray-800">{movie.Director}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Genre</p>
              <p className="text-gray-800">{movie.Genre}</p>
            </div>
            <div className="col-span-2"> //this grid item spans 2 columns instead of 1
              <p className="text-sm text-gray-500 font-medium">Actors</p>
              <p className="text-gray-800">{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailV2