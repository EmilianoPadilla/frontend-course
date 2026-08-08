import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { searchMoviesPage } from '../day19/api'
import type { SearchResult } from '../day19/types'
import MovieCard from '../day19/MovieCard'

interface InfiniteMovieListProps {
  searchTerm: string
}

function InfiniteMovieList({ searchTerm }: InfiniteMovieListProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infinite-movies', searchTerm],
    queryFn: ({ pageParam }) => searchMoviesPage(searchTerm, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined
    },
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
  })

  // ref for the invisible div at the bottom
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // create the observer
    const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  },
   { 
    threshold: 0.1, // triggers when 10% of the div is visible
    rootMargin: '1200px'  // start loading 1200px before reaching the bottom
   }
   )

    // start observing the bottom div
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    // cleanup when component unmounts
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong!</p>

  const allMovies = data?.pages.flatMap((page) => page.movies) ?? []

  return (
    <div>
      <div className="movies-grid">
        {allMovies.map((movie: SearchResult) => (
        <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* invisible div at the bottom — triggers loading when visible */}
      <div ref={bottomRef} style={{ height: '20px' }} />

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && allMovies.length > 0 && <p>No more movies!</p>}
    </div>
  )
}

export default InfiniteMovieList