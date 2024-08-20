import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import film from '../../assets/svg/filmreel.svg'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import user from '../../assets/svg/userIcon.svg'
import logout from '../../assets/svg/logout.svg'
import useAuth from '../hooks/useAuth'
import Search from '../Search'
import FilmCard from '../Feed/FilmCard/FilmCard'
import useSearch from '../hooks/useSearch'

export default function Dashboard() {
    const { loggedInUser, handleLogout } = useAuth()
    const { request, setRequest, setSearchForm } = useSearch()
    const [searchComplete, setSearchComplete] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const searchResRef = useRef()
    const [userSearch, setUserSearch] = useState(false)
    useEffect(() => {
        userLoggedIn()
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [loggedInUser])

    function userLoggedIn() {
        const token = localStorage.getItem('token')
        if(token) {
            setIsLoggedIn(true)
        }
    }

    function logOut() {
        setIsLoggedIn(false)
        handleLogout
    }

    function onClick() {
        setUserSearch(true)
    }

    function searchResOnClick() {
        setRequest({results: []})
        setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
        setSearchComplete(true)
    }

    const handleClickOutside = (e) => {
        if(
            searchResRef.current &&
            !searchResRef.current.contains(e.target)
        ) {
            setUserSearch(false)
            setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
            setRequest({results: []})
        }
    }

    return (
        <>
            <header className="header">
                <section 
                className="logo-container">
                    <Link to="/home" className='link'>
                    <img 
                    src={film}
                    className='icon'
                    id='film-reel'
                    />
                    </Link>
                    <Link to="/" className='link'>
                    <img
                    src={user}
                    className='icon'
                    id='user-icon'
                    onClick={logOut}
                    />
                    </Link>
                </section>
                <section className='search-bar-container-dashboard' ref={searchResRef}>
                    {!userSearch &&
                    <div className="search-bar-icon-container">
                        <img 
                        src={search} 
                        className='icon' 
                        id='search'
                        onClick={onClick}/>
                    </div>
                    }
                    {userSearch &&
                    <Search />}
                    {request.results.length > 0 && userSearch &&
                    <div className="search-results-container-dashboard">
                        <ul className="search-results-list-dashboard" onClick={() => searchResOnClick()}>
                            {request.results.map((film) => 
                            <FilmCard film={film} key={film.id} styling={"search-result"}/>)}
                        </ul>
                    </div>}
                </section>
            </header>
            <aside className='left-sidebar'>
                <section className='sidebar-nav'>
                <Link to='/popular' className='link' id='popular-films-link'>
                <h2>Popular Films</h2>
                </Link>
                <h2>Cinema Greats</h2>
                {isLoggedIn &&
                <>
                <Link to='/watchlist' className='link'>
                <h2>Watchlist</h2>
                </Link>
                
                <h2>Reviews</h2>
                <Link to='/diary' className='link'>
                <h2>Diary</h2>
                </Link>
                <Link to='/lists' className='link'>
                <h2>Lists</h2>
                </Link>
                </>
                }
                </section>
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}