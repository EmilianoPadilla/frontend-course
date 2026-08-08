// Import the types we defined in types.ts, Using 'import type' because these are TypeScript types, not runtime values
import type { SearchResult, Movie } from './types'

// Get the API key from the environment variable we set in .env, import.meta.env is how Vite exposes environment variables to your app
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

// Store the base URL in a constant so we don't repeat it in every function, If the URL ever changes, we only update it here
const BASE_URL = 'https://www.omdbapi.com'

// Function that searches for movies by a search query, Returns a Promise of an array of SearchResult objects (less detail), Example: searchMovies("inception") → returns list of matching movies
export async function searchMovies(query: string): Promise<SearchResult[]> {
  
  // Build the URL and fetch from OMDb API, ?s= means "search" in OMDb's API, &apikey= appends our API key to authenticate the request
  const response = await fetch(`${BASE_URL}/?s=${query}&apikey=${API_KEY}`)
  
  // Convert the raw response into a JavaScript object we can work with
  const data = await response.json()

  // OMDb returns Response: "False" when no movies match the search, instead of returning an empty array like most APIs would, So we handle that case manually and return an empty array 
  if (data.Response === 'False') {
    return []
  }

  // OMDb wraps the results inside a "Search" property, data.Search is the actual array of movies, OMDb uses capital letters for all their property names
  return data.Search
}

// Function that gets full details for one specific movie by its IMDb ID, Returns a Promise of a single Movie object (more detail than SearchResult), Example: getMovieById("tt1375666") → returns full Inception details
export async function getMovieById(id: string): Promise<Movie> {
  
  // Build the URL and fetch from OMDb API, ?i= means "by IMDb ID" in OMDb's API 
  const response = await fetch(`${BASE_URL}/?i=${id}&apikey=${API_KEY}`)
  
  // Convert the raw response into a JavaScript object
  const data = await response.json()
  
  // Return the full movie object, This time OMDb returns the movie directly, not wrapped in a property
  return data
}

//adding pagination
export async function searchMoviesPage(query: string, page: number): Promise<{
  movies: SearchResult[]
  totalResults: number
  hasMore: boolean
}> {
  const response = await fetch(`${BASE_URL}/?s=${query}&page=${page}&apikey=${API_KEY}`)
  const data = await response.json()

  if (data.Response === 'False') {
    return { movies: [], totalResults: 0, hasMore: false }
  }

  const totalResults = parseInt(data.totalResults)
  const hasMore = page * 10 < totalResults

  return {
    movies: data.Search,
    totalResults,
    hasMore
  }
}