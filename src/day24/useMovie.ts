import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../day19/api'
import type { Movie } from '../day19/types'

function useMovie(id: string | undefined) {
  return useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export default useMovie