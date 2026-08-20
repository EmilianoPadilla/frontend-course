import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../day19/api'
import type { SearchResult } from '../day19/types'
import useDebounce from '../day24/useDebounce'
import MovieCard from './MovieCard'

function SearchPageV2() {
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500)

  const { data: movies, isLoading, isError } = useQuery<SearchResult[]>({
    queryKey: ['movies', debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Movie Browser</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">Something went wrong!</p>
      )}

      {movies?.length === 0 && (
        <p className="text-center text-gray-500">No movies found!</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie: SearchResult) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default SearchPageV2