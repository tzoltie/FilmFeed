import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import film from '../../assets/svg/filmreel.svg'
import user from '../../assets/svg/userIcon.svg'
import { Link } from 'react-router-dom'

export default function Dashboard() {
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
                
                
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}