import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../day19/api'
import type { SearchResult } from '../day19/types'

function useMovieSearch(searchTerm: string) {
  return useQuery<SearchResult[]>({
    queryKey: ['movies', searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: searchTerm.length >= 2,
    staleTime: 1000 * 60 * 5,
  })
}

export default useMovieSearch