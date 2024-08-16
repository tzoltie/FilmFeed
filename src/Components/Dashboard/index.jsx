import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
// import film from '../../assets/svg/filmreel.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import user from '../../assets/svg/userIcon.svg'
import logout from '../../assets/svg/logout.svg'
import useAuth from '../hooks/useAuth'
import Search from '../Search'
import FilmCard from '../Feed/FilmCard/FilmCard'

export default function Dashboard() {
    const { loggedInUser, handleLogout } = useAuth()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userSearch, setUserSearch] = useState(false)
    useEffect(() => {
        userLoggedIn()
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

    const film = {title: "The Green Mile", poster: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg", release_date: "2000-03-03"}
    return (
        <>
            <header className="header">
                <section 
                className="logo-container">
                    <Link to="/" className='link'>
                    <img 
                    src={film}
                    className='icon'
                    id='film-reel'
                    />
                    </Link>
                    <Link to="/welcome" className='link'>
                    <img
                    src={user}
                    className='icon'
                    id='user-icon'
                    onClick={logOut}
                    />
                    </Link>
                </section>
                <section 
                className='search-bar-container-dashboard'>
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
                    {/* <div className="search-results-container-dashboard">
                        <ul className="search-results-list-dashboard">
                            <li>
                                <FilmCard film={film} styling="search-result"/>
                            </li>
                        </ul>
                    </div> */}
                </section>
            </header>
            <aside className='left-sidebar'>
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
                <h2>Diary</h2>
                <Link to='/lists' className='link'>
                <h2>Lists</h2>
                </Link>
                </>
                }
                
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}