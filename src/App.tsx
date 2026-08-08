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

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/users">Users</Link> |{' '}
        <Link to="/about">About</Link>  |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/search">Movies</Link> |{' '}
        <Link to="/infinite">Infinite Search</Link>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App