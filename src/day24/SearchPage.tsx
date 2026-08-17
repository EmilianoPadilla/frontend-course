import { useState } from 'react'
import MovieCard from '../day19/MovieCard'
import useDebounce from './useDebounce'
import useMovieSearch from './useMovieSearch'
import type { SearchResult } from '../day19/types'

function SearchPage() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500)
  const { data: movies, isLoading, isError } = useMovieSearch(debouncedSearch)

  return (
    <div>
      <h1>Movie Browser</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a movie..."
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}
      {movies?.length === 0 && <p>No movies found!</p>}

      <div className="movies-grid">
        {movies?.map((movie: SearchResult) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage