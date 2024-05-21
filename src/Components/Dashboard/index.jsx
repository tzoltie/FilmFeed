import search from '../../assets/svg/search.svg'
import '../../styling/dashboard.css'
import film from '../../assets/svg/filmreel.svg'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <>
            <header className="header">
                <section 
                className="logo-container">
                    <Link to="/">
                    <img 
                    src={film}
                    className='icon'
                    id='film-reel'
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
                
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}