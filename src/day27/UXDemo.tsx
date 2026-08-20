import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'

function UXDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<string[]>([])
  const [search, setSearch] = useState('')

  // simulate loading data
  function handleLoad() {
    setIsLoading(true)
    setItems([]) //Clears existing items

    setTimeout(() => { //setTimeout is a built in browser function — no import needed, it's always available just like console.log
      setItems(['React', 'TypeScript', 'Tailwind', 'TanStack Query', 'Zustand'])
      setIsLoading(false)
      toast.success('Data loaded successfully!')
    }, 2000) //waits 2 seconds to simulate a real API call, in a real app setTimeout would be replaced with an actual API call
  }

  // filtered items based on search
  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())  //Filters items based on search input
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-800">UX Polish Demo</h1>

      {/* Toasts */}
      <Card>
        <CardHeader>
          <CardTitle>Toasts</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button onClick={() => toast.success('Success!')}>
            Success Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error('Something went wrong!')}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.loading('Loading...', { duration: 2000 })}
          >
            Loading Toast
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast('Default toast', { position: 'top-center' })}
          >
            Top Center Toast
          </Button>
        </CardContent>
      </Card>

      {/* Skeleton loaders */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loaders & Empty State</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4"> 
          <Button onClick={handleLoad} disabled={isLoading}> {/* Button that triggers the simulated data fetch. Disabled while loading to prevent double clicking.*/}
            {isLoading ? 'Loading...' : 'Load Data'}  {/* Text changes between "Load Data" and "Loading..." based on state */}
          </Button>
        
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading || items.length === 0}  
          /> {/* Search input — disabled when loading OR when no items are loaded yet. No point searching an empty list*/}

          {/* Shows skeleton loaders ONLY when isLoading is true. Five bars of decreasing width to mimic the shape of the content that's coming */} 
          {isLoading && (  
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          )}

          {/* Empty state shown when NOT loading AND no items exist yet */}
          {!isLoading && items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-medium">No data yet</p>
              <p className="text-sm">Click Load Data to fetch items</p>
            </div>
          )}

          {/* Second empty state — shown when data IS loaded (items.length > 0) but the search has no matches.*/}
          {!isLoading && items.length > 0 && filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}

          {/* actual items */}
          {!isLoading && filtered.map((item) => (
            <div
              key={item}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transitions */}
      <Card>
        <CardHeader>
          <CardTitle>Transitions & Hover Effects</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
            Scale on hover
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:rotate-3 transition-transform duration-300">
            Rotate on hover
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:shadow-xl transition-shadow duration-300">
            Shadow on hover
          </button>
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
            Fill on hover
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

export default UXDemo