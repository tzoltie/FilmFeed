import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import film from '../../assets/svg/filmreel.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import user from '../../assets/svg/userIcon.svg'

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        userLoggedIn()
    }, [])

    function userLoggedIn() {
        const token = localStorage.getItem('token')
        if(token.length > 1 && typeof token === 'string') {
            setIsLoggedIn(true)
        }
    }


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
                    <Link to="/login" className='link'>
                    <img
                    src={user}
                    className='icon'
                    id='user-icon'
                    />
                    </Link>
                </section>
                <section 
                className='search-bar-container'>
                    <img 
                    src={search} 
                    className='icon' 
                    id='search'
                    />
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
                <h2>Lists</h2>
                </>
                }
                
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}