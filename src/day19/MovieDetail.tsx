import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from './api'
import type { Movie } from './types'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: movie, isLoading, isError } = useQuery<Movie>({ //destructuring UseQuery's return value to get the movie data, loading state, and error state
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id!),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong!</p>
  if (!movie) return <p>Movie not found!</p>

  return (
    <div>
      <Link to="/search">← Back to search</Link>
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

export default MovieDetail