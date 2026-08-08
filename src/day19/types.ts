export interface SearchResult { //what the API returns when you search (less detail)
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

export interface Movie { //what the API returns for a specific movie (full detail)
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Plot: string
  Director: string
  Actors: string
  Genre: string
  imdbRating: string
  Runtime: string
}