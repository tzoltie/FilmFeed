import './App.css'
import Dashboard from './Components/Dashboard'
import Feed from './Components/Feed';
import { Routes, Route } from 'react-router';
import FilmPage from './Components/Film';

function App() {


  return (
    <div className='app-container'>
      <Dashboard />
      <Routes>
        <Route 
        path='/'
        element={<Feed />}
        />
        <Route 
        path='/:id'
        element={<FilmPage />}/>
      </Routes>
      
    </div>
  )
}

export default App
