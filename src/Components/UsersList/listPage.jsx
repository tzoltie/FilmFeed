import { useNavigate } from "react-router-dom"
import "./styling.css"
import { useState } from "react"
import FilmRating from "../Rating/filmRating"

export default function ListPage({list}) {
    const [showRating, setShowRating] = useState(false)

    const navigate = useNavigate()
    const onClick = (filmId) => {
        navigate(`/${filmId}`)
    }

    return (
        <div className="list-page-container">
            <header>
                <div className="list-title-container">
                    <h2>{list.title}</h2>
                </div>
            </header>
            <main>
                <div className="list-page-main">
                    <ul className="list-page-list">
                        {list.map((film) => 
                        <li key={film.id} onClick={() => onClick(film.id)} className="list-page-list-item" onMouseEnter={() => setShowRating(true)} onMouseLeave={() => setShowRating(false)}>
                            <img 
                            src={`https://image.tmdb.org/t/p/w500${film.poster}`}
                            className="list-image"
                            id="watchlist-image"
                            />
                            {showRating && <FilmRating film={film}/>}
                        </li>)}
                    </ul>
                </div>
            </main>
        </div>
    )
}