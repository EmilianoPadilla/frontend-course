import { Link } from 'react-router-dom'
import type { SearchResult } from './types'

interface MovieCardProps { //Props (short for properties) are how you pass data from a parent component to a child component.
  movie: SearchResult
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="movie-card">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445?text=No+Poster'}
          alt={movie.Title}
        />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  )
}

export default MovieCard