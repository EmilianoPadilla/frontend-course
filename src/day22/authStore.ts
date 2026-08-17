import { create } from 'zustand' //create is the only thing you need from Zustand to create a store

interface User {
  id: number
  name: string
  email: string
}

//Defines the shape of the entire store — both the state AND the functions.
interface AuthStore { 
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

//Creates the store and names it useAuthStore. The use prefix is convention — it signals this is a hook
const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  login: (user: User, token: string) => {
    set({ user, token }) //set is the function you call to update the store's state. Similar to setState in useState
  },

  logout: () => {
    set({ user: null, token: null })
  },
}))

export default useAuthStore

/* THE COMPLETE FLOW in a real app:
1. User fills login form (email + password)
2. Frontend sends POST request to your backend API
3. Backend checks if user exists in database
4. Backend verifies password hash
5. Backend generates JWT token
6. Backend returns { user, token }
7. Frontend receives response
8. Frontend calls login(user, token) → stores in Zustand                    this is what we implemented above */
