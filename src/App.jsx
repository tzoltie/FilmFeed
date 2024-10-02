import './App.css'
import Dashboard from './Components/Dashboard'
import Feed from './Components/Feed';
import { Routes, Route, redirect } from 'react-router';
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
import PrivateRoutes from './Components/Redirect/index.jsx';
import List from './Components/List/index.jsx';
import Profile from './Components/Profile/index.jsx';
import SearchResultsDash from './Components/Dashboard/header/searchResults.jsx';
import MobileMenuDropDown from './Components/MobileDropDownMenu/index.jsx';

function App() {

  return (
    <div className='app-container'>
      <AuthProvider>
        <SearchProvider>
          <Dashboard />
          <Routes>
            <Route 
            path='/'
            element={<LandingPage />}/>
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/home'
              element={<Feed />}
            />
            </Route>
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
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/watchlist'
              element={<Watchlist />}
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/lists'
              element={<UsersLists />}
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/:listId/list'
              element={<List />}
              />
            </Route>
            <Route 
            path='/popular'
            />
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/diary'
              element={<Diary />}
              />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route 
              path='/profile'
              element={<Profile />}/>
            </Route>
            <Route
              path='/search-result'
              element={<SearchResultsDash />}
            />
            <Route 
              path='/menu'
              element={<MobileMenuDropDown />}
            />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </div>
  )
}

export default App
