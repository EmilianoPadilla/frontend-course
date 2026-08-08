import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from './api'
import MovieCard from './MovieCard'
import type { SearchResult } from './types'

const searchSchema = z.object({
  query: z.string().min(2, 'Search must be at least 2 characters'),
})

type SearchFormData = z.infer<typeof searchSchema>

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { data: movies, isLoading, isError } = useQuery<SearchResult[]>({
    queryKey: ['movies', searchTerm], //stores what the user searched for. useQuery watches this and refetches when it changes
    queryFn: () => searchMovies(searchTerm), 
    enabled: !!searchTerm, //the !! converts a string to boolean. Empty string "" becomes false, any other string becomes true. So the query only runs when there's actually a search term
    staleTime: 1000 * 60 * 5,  // 5 minutes fresh
    gcTime: 1000 * 60 * 10,    // 10 minutes in cache
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  function onSubmit(data: SearchFormData) {
    setSearchTerm(data.query)
  }

  //OnSubmit just updates searchTerm, useQuery handles the rest automatically
  return (
    <div> 
      <h1>Movie Browser</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}> 
        <input
          {...register('query')}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
        {errors.query && <p>{errors.query.message}</p>}
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong!</p>}
      {movies?.length === 0 && <p>No movies found!</p>}

      <div className="movies-grid">
        {movies?.map((movie) => ( //Since movies could be undefined before the first search, the ? prevents crashing if it's not there yet
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage 