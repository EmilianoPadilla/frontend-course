import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InfiniteMovieList from './InfiniteMovieList'

const searchSchema = z.object({
  search: z.string().min(2, 'Search must be at least 2 characters'),
})

type SearchFormData = z.infer<typeof searchSchema>

function InfiniteSearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  function onSubmit(data: SearchFormData) {
    setSearchTerm(data.search)
  }

  return (
    <div>
      <h1>Infinite Movie Search</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('search')}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
        {errors.search && <p>{errors.search.message}</p>}
      </form>

      {searchTerm && <InfiniteMovieList searchTerm={searchTerm} />}
    </div>
  )
}

export default InfiniteSearchPage