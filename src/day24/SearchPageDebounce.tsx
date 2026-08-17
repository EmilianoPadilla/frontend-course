import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../day19/api'
import MovieCard from '../day19/MovieCard'
import type { SearchResult } from '../day19/types'
import useDebounce from './useDebounce'

function SearchPageDebounce() {
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 500)

  const { data: movies, isLoading, isError } = useQuery<SearchResult[]>({
    queryKey: ['movies', debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

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
        {movies?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default SearchPageDebounce