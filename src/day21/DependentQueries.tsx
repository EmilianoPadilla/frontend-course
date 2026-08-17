import { useQuery } from '@tanstack/react-query'

// Simulating fetching a user by username
async function fetchUser(username: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
  const data = await response.json()
  return data[0]  // returns first matching user
}

// Simulating fetching posts by user ID
async function fetchUserPosts(userId: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const data = await response.json()
  return data
}

function DependentQueries() {
  // Query 1 — fetch user first
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', 'Bret'],
    queryFn: () => fetchUser('Bret'),
  })

  // Query 2 — only runs when user exists and has an ID, fetches their posts
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['posts', user?.id], //uses user?.id in the key. ?. safely accesses id even if user is still undefined
    queryFn: () => fetchUserPosts(user!.id), //the ! tells TypeScript "user definitely exists here" since enabled already guarantees it
    enabled: !!user?.id,  // waits for Query 1 to finish, !!user?.id means "is user.id a real value?" — converts whatever it is to true or false
  })

  if (isLoadingUser) return <p>Loading user...</p>
  if (isLoadingPosts) return <p>Loading posts...</p>

  return (
    <div>
      <h1>Posts by {user?.name}</h1>
      {posts?.map((post: { id: number, title: string }) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default DependentQueries