import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Search from '../Search'
import FilmCard from '../Feed/FilmCard/FilmCard'
import useSearch from '../hooks/useSearch'
import AddToWatchList from '../Assets/AddToWatchlist'
import DiaryIcon from '../Assets/Diary'
import ListIcon from '../Assets/List'
import ProfileIcon from '../Assets/Profile'
import TheatreMaskIcon from '../Assets/TheatreMasks'
import PopularReleasesIcon from '../Assets/Popular'
import LogoutIcon from '../Assets/Logout'
import Button from '../Button'
import FilmfeedLogo from '../Assets/FilmfeedLogo'


export default function Dashboard() {
    const { loggedInUser, onLogout } = useAuth()
    const { request, setRequest, setSearchForm, searchResRef } = useSearch()
    const [searchComplete, setSearchComplete] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userSearch, setUserSearch] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        userLoggedIn()
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    function userLoggedIn() {
        if(token) {
            setIsLoggedIn(true)
        }
    }

    function logOut() {
        setIsLoggedIn(false)
        localStorage.removeItem('user')
        onLogout
        navigate('/')
    }

    function goHome() {
        navigate('/home')
    }

    function goToLists() {
        navigate('/lists')
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
                    <div className='nav-bar-list-container' onClick={() => navigate('/popular')}>
                        <PopularReleasesIcon />
                        <h2>Popular Films</h2>
                    </div>
                    <div className='nav-bar-list-container'>
                        <TheatreMaskIcon />
                        <h2>Cinema Greats</h2>
                    </div>
                {typeof token === 'string' &&
                <>
                <div className='nav-bar-list-container' onClick={() => navigate("/watchlist")}>
                    <AddToWatchList />
                    <h2>Watchlist</h2>
                </div>
                <div className='nav-bar-list-container' onClick={() => navigate("/profile")}>
                    <ProfileIcon />
                    <h2>Profile</h2>
                </div>
                <div className='nav-bar-list-container' onClick={() => navigate('/diary')}>
                    <DiaryIcon />
                    <h2>Diary</h2>
                </div>
                <div className='nav-bar-list-container' onClick={() => goToLists()}>
                    <ListIcon />
                    <h2>Lists</h2>
                </div>
                <div className='nav-bar-list-container' onClick={() => logOut()}>
                    <LogoutIcon className={"logout-btn"}/>
                    <h2>Logout</h2>
                </div>
                </>
                }
                </section>
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}