import { Link } from 'react-router-dom'
import type { SearchResult } from '../day19/types'

interface MovieCardProps {
  movie: SearchResult
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie-v3/${movie.imdbID}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445?text=No+Poster'}
          alt={movie.Title}
          className="w-full object-cover h-64"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800">{movie.Title}</h3>
          <p className="text-gray-500 text-sm">{movie.Year}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard