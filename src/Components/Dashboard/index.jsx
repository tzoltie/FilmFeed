import '../../styling/dashboard.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useSearch from '../hooks/useSearch'
import AddToWatchList from '../Assets/AddToWatchlist'
import DiaryIcon from '../Assets/Diary'
import ListIcon from '../Assets/List'
import ProfileIcon from '../Assets/Profile'
import TheatreMaskIcon from '../Assets/TheatreMasks'
import PopularReleasesIcon from '../Assets/Popular'
import LogoutIcon from '../Assets/Logout'
import { useMediaQuery } from 'react-responsive'
import LogoBtn from './header/logoBtn'
import Searchbar from './header/searchbar'
import MobileSearchbar from './header/mobileSearchbar'


export default function Dashboard() {
    const { loggedInUser, onLogout } = useAuth()
    const { request, setRequest, setSearchForm, searchResRef } = useSearch()
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

    const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

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

    function goToLists() {
        navigate('/lists')
    }

    const appTitle = document.getElementsByClassName("header-title")
    const mobileDashHeader = document.getElementsByClassName("header")
    const mobileDashSearchbar = document.getElementsByClassName("search-bar-container-dashboard")
    const mobileDashTextInput = document.getElementsByClassName("search-films-searchbar")

    function onClick() {
        if(isMobile) {
            appTitle[0].style.display = "none"
            mobileDashHeader[0].style.gridTemplateColumns = "0.2fr 1fr"
            mobileDashSearchbar[0].style.width = "100%"
            // mobileDashTextInput[0].style.width = "91%"
        }
        setUserSearch(true)
    }

    const handleClickOutside = (e) => {
        if(
            searchResRef.current &&
            !searchResRef.current.contains(e.target)
        ) {
            setUserSearch(false)
            setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
            setRequest({results: []})
            appTitle[0].style.display = ""
            mobileDashHeader[0].style.gridTemplateColumns = "1fr 1fr"
            mobileDashSearchbar[0].style.width = "85%"
        }
    }

    return (
        <>
            <header className="header">
                {isDesktop &&
                <>
                <LogoBtn />
                <Searchbar searchResRef={searchResRef} userSearch={userSearch} request={request} onClick={onClick}/>
                </>}
                {isMobile &&
                <>
                <LogoBtn />
                <MobileSearchbar searchResRef={searchResRef} userSearch={userSearch} request={request} onClick={onClick}/>
                </>
                }
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