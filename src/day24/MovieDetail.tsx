import { useParams, Link } from 'react-router-dom'
import useMovie from './useMovie'

function MovieDetail2() {
  const { id } = useParams<{ id: string }>()

  const { data: movie, isLoading, isError } = useMovie(id)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong!</p>
  if (!movie) return <p>Movie not found!</p>

  return (
    <div>
      <Link to="/search-debounced">← Back to search</Link>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
    </div>
  )
}

export default MovieDetail2