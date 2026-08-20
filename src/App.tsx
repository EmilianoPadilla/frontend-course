import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './day17/Home'
import About from './day17/About'
import UserList from './day17/UserList'
import UserDetail from './day17/UserDetail'
import NotFound from './day17/NotFound'
import RegisterForm from './day18/RegisterForm'
import SearchPage from './day19/SearchPage'
import MovieDetail from './day19/MovieDetail'
import InfiniteSearchPage from './day21/InfiniteSearchPage'
import DependentQueries from './day21/DependentQueries'
import OptimisticUpdates from './day21/OptimisticUpdate'
import AuthDemo from './day22/AuthDemo'
import CartDemo from './day22/CartDemo'
import SearchPageDebounce from './day24/SearchPageDebounce'
import LocalStorageDemo from './day24/LocalStorageDemo'
import MediaQueryDemo from './day24/MediaQueryDemo'
import MovieDetail2 from './day24/MovieDetail'
import SearchPageV2 from './day25/SearchPage'
import MovieDetailV2 from './day25/MovieDetail'
import ComponentsDemo from './day26/ComponentsDemo'
import RegisterFormV2 from './day26/RegisterForm'
import UXDemo from './day27/UXDemo'

function App() {
  const [isOpen, setIsOpen] = useState(false) //A state variable that tracks whether the mobile menu is open or closed. Starts as false — menu is closed by default.

  return (
    <BrowserRouter>
      <nav className="bg-gray-800 px-6 py-4">
        {/* top bar — always visible */}
        <div className="flex justify-between items-center">  {/* The top bar that's always visible. justify-between pushes the app name to the left and the hamburger button to the right. items-center vertically centers both.*/}
          <span className="text-white font-bold text-4xl">My App</span>   {/* The app name on the left side of the top bar — always visible on all screen sizes */}
            
          {/* hamburger button — only shows on mobile / md are medium screens, 768px and up. */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* links — always visible on desktop, toggles on mobile */}
        <div className={`flex flex-col gap-2 mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}> {/* ${isopen? on mobile, shows links when isOpen is true, hides them when false / md:block — on desktop  always visible regardless of isOpen / mt-0 — margin top  */}
          <div className="flex gap-4 justify-center">
            <Link to="/" className="text-white hover:text-blue-300 transition-colors text-lg">Home</Link>
            <Link to="/users" className="text-white hover:text-blue-300 transition-colors text-lg">Users</Link>
            <Link to="/about" className="text-white hover:text-blue-300 transition-colors text-lg">About</Link>
            <Link to="/register" className="text-white hover:text-blue-300 transition-colors text-lg">Register</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/search" className="text-white hover:text-blue-300 transition-colors text-lg">Movies</Link>
            <Link to="/infinite" className="text-white hover:text-blue-300 transition-colors text-lg">Infinite Search</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/dependent" className="text-white hover:text-blue-300 transition-colors text-lg">Dependent Queries</Link>
            <Link to="/optimistic" className="text-white hover:text-blue-300 transition-colors text-lg">Optimistic Updates</Link>
            <Link to="/auth" className="text-white hover:text-blue-300 transition-colors text-lg">Auth</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/cart" className="text-white hover:text-blue-300 transition-colors text-lg">Cart</Link>
            <Link to="/search-debounced" className="text-white hover:text-blue-300 transition-colors text-lg">Debounced Search</Link>
            <Link to="/localstorage" className="text-white hover:text-blue-300 transition-colors text-lg">LocalStorage</Link>
            <Link to="/mediaquery" className="text-white hover:text-blue-300 transition-colors text-lg">Media Query</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/search-v2" className="text-white hover:text-blue-300 transition-colors text-lg">Movies V2</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/components" className="text-white hover:text-blue-300 transition-colors">Components</Link>
            <Link to="/register-v2" className="text-white hover:text-blue-300 transition-colors">Register V2</Link>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/ux" className="text-white hover:text-blue-300 transition-colors">UX Demo</Link>
          </div>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/infinite" element={<InfiniteSearchPage />} />
        <Route path="/dependent" element={<DependentQueries />} />
        <Route path="/optimistic" element={<OptimisticUpdates />} />
        <Route path="/auth" element={<AuthDemo />} />
        <Route path="/cart" element={<CartDemo />} />
        <Route path="/search-debounced" element={<SearchPageDebounce />} />
        <Route path="/localstorage" element={<LocalStorageDemo />} />
        <Route path="/mediaquery" element={<MediaQueryDemo />} />
        <Route path="/movie-v2/:id" element={<MovieDetail2 />} />
        <Route path="/search-v2" element={<SearchPageV2 />} />
        <Route path="/movie-v3/:id" element={<MovieDetailV2 />} />
        <Route path="/components" element={<ComponentsDemo />} />
        <Route path="/register-v2" element={<RegisterFormV2 />} />
        <Route path="/ux" element={<UXDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App