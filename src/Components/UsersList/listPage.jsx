import { useNavigate } from "react-router-dom"
import "./styling.css"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import ListPageList from "./listPageList"

export default function ListPage({list}) {
    const [showRating, setShowRating] = useState(false)

    const navigate = useNavigate()
    const onClick = (filmId) => {
        navigate(`/${filmId}`)
    }
    const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

    return (
        <div className="list-page-container">
            <header>
                <div className="list-title-container">
                    <h2>{list.title}</h2>
                </div>
            </header>
            <main>
                <div className="list-page-main">
                    {typeof list[0].filmListId === 'undefined' ? (
                    isDesktop ?
                    <ListPageList list={list} onClick={onClick} showRating={showRating} setShowRating={setShowRating} styling={"list-page-list"} posterId={"watchlist-image"}/> : 
                    <ListPageList list={list} onClick={onClick} showRating={showRating} setShowRating={setShowRating} styling={"list-page-list-mobile"} posterId={"watchlist-image-mobile"}/>
                ) : (
                    <ul className="list-page-list">
                        {list.map((li) => 
                        <li key={li.filmId} onClick={() => onClick(li.filmId)} className="list-page-list-item" onMouseEnter={() => setShowRating(true)} onMouseLeave={() => setShowRating(false)}>
                            <img
                            src={`https://image.tmdb.org/t/p/w500${li.film.poster}`}
                            className="list-image"
                            id="watchlist-image"/>
                        </li>)}
                    </ul>
                    )}
                </div>
            </main>
        </div>
    )
}