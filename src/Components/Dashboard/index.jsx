import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import film from '../../assets/svg/filmreel.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import user from '../../assets/svg/userIcon.svg'
import logout from '../../assets/svg/logout.svg'
import useAuth from '../hooks/useAuth'
import Search from '../Search'
import FilmCard from '../Feed/FilmCard/FilmCard'
import useSearch from '../hooks/useSearch'
import AddToWatchList from '../Assets/AddToWatchlist'
import UserIcon from '../Assets/UserIcon'
import DiaryIcon from '../Assets/Diary'
import ListIcon from '../Assets/List'
import ProfileIcon from '../Assets/Profile'
import TheatreMaskIcon from '../Assets/TheatreMasks'
import PopularReleasesIcon from '../Assets/Popular'
import LogoutIcon from '../Assets/Logout'
import Button from '../Button'
import FilmfeedLogo from '../Assets/FilmfeedLogo'

export default function Dashboard() {
    const { loggedInUser, handleLogout } = useAuth()
    const { request, setRequest, setSearchForm, searchResRef } = useSearch()
    const [searchComplete, setSearchComplete] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userSearch, setUserSearch] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        userLoggedIn()
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    function userLoggedIn() {
        const token = localStorage.getItem('token')
        if(token) {
            setIsLoggedIn(true)
        }
    }

    function logOut() {
        setIsLoggedIn(false)
        handleLogout
        navigate('/')
    }

    function goHome() {
        navigate('/home')
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
                    <Button text={
                        <div className='logo-text-box'>
                            <FilmfeedLogo />
                            <h1 className='header-title'>Filmfeed</h1>
                        </div>
                    } className={"logo-btn"} onClick={() => goHome()}/>
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
                    <div className='nav-bar-list-container'>
                        <PopularReleasesIcon />
                        <h2>Popular Films</h2>
                    </div>
                </Link>
                <Link className='link'>
                    <div className='nav-bar-list-container'>
                        <TheatreMaskIcon />
                        <h2>Cinema Greats</h2>
                    </div>
                </Link>
                {isLoggedIn &&
                <>
                <Link to='/watchlist' className='link'>
                    <div className='nav-bar-list-container'>
                        <AddToWatchList />
                        <h2>Watchlist</h2>
                    </div>
                </Link>
                <Link to="/profile" className='link'>
                    <div className='nav-bar-list-container'>
                        <ProfileIcon />
                        <h2>Profile</h2>
                    </div>
                </Link>
                <Link to='/diary' className='link'>
                    <div className='nav-bar-list-container'>
                        <DiaryIcon />
                        <h2>Diary</h2>
                    </div>
                </Link>
                <Link to='/lists' className='link'>
                    <div className='nav-bar-list-container'>
                        <ListIcon />
                        <h2>Lists</h2>
                    </div>
                </Link>
                <Link to='/' className='link'>
                    <div className='nav-bar-list-container' onClick={() => logOut()}>
                        <LogoutIcon className={"logout-btn"}/>
                        <h2>Logout</h2>
                    </div>
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