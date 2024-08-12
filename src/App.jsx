import './App.css'
import Dashboard from './Components/Dashboard'
import Feed from './Components/Feed';
import { Routes, Route } from 'react-router';
import FilmPage from './Components/Film';
import Images from './Components/Film/Images';
import CastPage from './Components/People/castPage';
import Login from './Components/User/login';
import Watchlist from './Components/Watchlist';
import { AuthProvider } from './Components/Context/auth.jsx';
import LandingPage from './Components/landingPage';

function App() {


  return (
    <div className='app-container'>
      <AuthProvider>
        <Dashboard />
        <Routes>
          <Route 
          path='/welcome'
          element={<LandingPage />}
          />
          <Route 
          path='/'
          element={<Feed />}
          />
          <Route 
          path='/:id'
          element={<FilmPage />}
          />
          <Route 
          path='/:id/images'
          element={<Images />}
          />
          <Route 
          path='/:id/cast&crew'
          element={<CastPage />}
          />
          <Route 
          path='/login'
          element={<Login />}
          />
          <Route 
          path='/watchlist'
          element={<Watchlist />}
          />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
