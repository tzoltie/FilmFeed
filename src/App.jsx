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
import UsersLists from './Components/UsersList/index.jsx';
import { SearchProvider } from './Components/Context/search.jsx';
import ListPage from './Components/UsersList/listPage.jsx';
import Diary from './Components/Diary/index.jsx';

function App() {


  return (
    <div className='app-container'>
      <AuthProvider>
        <SearchProvider>
          <Dashboard />
          <Routes>
            <Route 
            path='/'
            element={<LandingPage />}
            />
            <Route 
            path='/home'
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
            element={<ListPage />}
            />
            <Route 
            path='/lists'
            element={<UsersLists />}
            />
            <Route 
            path='/:listId/list'
            element={<ListPage />}
            />
            <Route 
            path='/popular'
            />
            <Route 
            path='/diary'
            element={<Diary />}/>
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </div>
  )
}

export default App
