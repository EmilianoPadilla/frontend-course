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

function App() {
  return (
    <BrowserRouter>
      <nav>
        <div>
          <Link to="/">Home</Link> |{' '}
          <Link to="/users">Users</Link> |{' '}
          <Link to="/about">About</Link> |{' '}
          <Link to="/register">Register</Link>
        </div>

        <div>
          <Link to="/search">Movies</Link> |{' '}
          <Link to="/infinite">Infinite Search</Link> |{' '}
        </div>

        <div>
          <Link to="/dependent">Dependent Queries</Link> |{' '}
          <Link to="/optimistic">Optimistic Updates</Link> |{' '}
          <Link to="/auth">Auth</Link>
        </div>

        <div>
          <Link to="/cart">Cart</Link> |{' '}
          <Link to="/search-debounced">Debounced Search</Link> |{' '}
          <Link to="/localstorage">LocalStorage</Link> |{' '}
          <Link to="/mediaquery">Media Query</Link>
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
      </Routes>

    </BrowserRouter>
  )
}

export default App