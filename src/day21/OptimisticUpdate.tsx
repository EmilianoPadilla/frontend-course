import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  liked: boolean
}

// fetch posts from JSONPlaceholder
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5') //fetching 5 posts from JSON Placeholder
  const data = await response.json()
  return data.map((post: Post) => ({ ...post, liked: false })) //adds liked: false to every post since JSONPlaceholder doesn't have that field. The ...post spreads all existing properties and then adds liked: false on top
} //...post copies all properties of the post object into a new object:

// simulate liking a post (JSONPlaceholder doesn't really save it)
async function likePost(postId: number): Promise<void> {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ liked: true }),
  })
}

function OptimisticUpdate() {
  const queryClient = useQueryClient() //Gets direct access to the QueryClient cache. This lets you manually read and write to the cache — needed for optimistic updates

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'], //Fetches all posts and caches them with key ['posts']
    queryFn: fetchPosts,
  })

  const { mutate: toggleLike } = useMutation({ //Creates a mutation and renames mutate to toggleLike
    mutationFn: likePost, //The actual API call that happens when you call toggleLike(postId). Receives the postId you pass to toggleLike

    // runs BEFORE the request — update UI immediately
    onMutate: async (postId: number) => {
      
      await queryClient.cancelQueries({ queryKey: ['posts'] }) // cancel any outgoing refetches

      const previousPosts = queryClient.getQueryData<Post[]>(['posts']) // snapshot the previous value

      queryClient.setQueryData<Post[]>(['posts'], (old) => // optimistically update the cache on the cache, this line directly writes to the cache
        old?.map((post) => //loops through all cached posts
          post.id === postId ? { ...post, liked: !post.liked } : post //if this is the liked post, toggle its liked value. Otherwise keep it unchanged
        ) ?? [] //if old is undefined, use empty array
      )
      
      return { previousPosts } // return snapshot for rollback
    },

    // if mutation fails, roll back to previous value
    onError: (err, postId, context) => { //If the API request FAILS, this runs. returns the cache to previous snapshot
      queryClient.setQueryData(['posts'], context?.previousPosts)
    },

    // always refetch after mutation to make sure cache is accurate
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }) //invalidateQueries marks the posts cache as stale and triggers a refetch to make sure our cache matches what's actually on the server
    },
  })

  if (isLoading) return <p>Loading posts...</p>

  //Renders each post with a like button.
  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => toggleLike(post.id)}>
            {post.liked ? '❤️ Liked' : '🤍 Like'}
          </button>
        </div>
      ))}
    </div>
  )
}

/* THE COMPLETE FLOW:
1. Click like button → toggleLike(postId) called
2. onMutate fires:
   → cancel any refetches
   → snapshot current cache
   → update cache immediately → UI shows ❤️ instantly
3. API request sent to server in background
4a. Success → onSettled fires → refetch to confirm
4b. Failure → onError fires → restore snapshot → UI shows 🤍 again
*/

export default OptimisticUpdate