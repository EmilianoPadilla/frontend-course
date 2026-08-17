import useAuthStore from './authStore'

//This is how to read from a Zustand store. The pattern is always: const value = useAuthStore((state) => state.whatYouWant)
function AuthDemo() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  //Simulates a login by calling the store's login function with a fake user and token. In a real app this would be called after a successful API response from your backend
  function handleLogin() {
    login(
      { id: 1, name: 'Emiliano', email: 'emiliano@gmail.com' },
      'fake-token-123'
    )
  }

  return (
    <div> 
      {user ? ( //Ternary conditional rendering — if user exists show the logged in view, otherwise show the logged out view.
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Token: {token}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>You are not logged in</h1>
          <button onClick={handleLogin}>Login as Emiliano</button>
        </div>
      )}
    </div>
  )
}

export default AuthDemo