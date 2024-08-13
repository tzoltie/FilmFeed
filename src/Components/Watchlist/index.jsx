import { useEffect, useState } from "react"
import { getUserWatchlist } from "../../Utils/apiClient"
import "./styling.css"
import FilmCard from "../Feed/FilmCard/FilmCard.jsx"
import useAuth from "../hooks/useAuth.jsx"

export default function Watchlist() {
    const { loggedInUser } = useAuth()
    const [usersFilms, setUsersFilms] = useState([])
    const [emptyWatchlist, setEmptyWatchlist] = useState([{}, {}, {}, {}, {}, {}, {}])
    useEffect(() => {
        getUserWatchlist(loggedInUser.id).then(setUsersFilms)
    }, [loggedInUser.id])

    console.log(usersFilms)
    return (
        <div className="watchlist-container">
            <header>
                <h2>{`${loggedInUser.profile.name}'s`} watchlist</h2>
            </header>
            <main>
                {usersFilms.length === 0 || usersFilms.status === "fail" ? (
                <div className="empty-watchlist-container">
                    <div className="empty-watchlist-header">
                        <h3>{loggedInUser.username}, add films to your watchlist</h3>
                    </div>
                    <div>
                        <ul className="empty-watchlist-list">
                        {usersFilms.map((li, index) => 
                            <li key={index} className="empty-watchlist-item"></li>)}
                        </ul>
                    </div>
                </div>
                ) : (
                    <div className="watchlist-container">
                        <ul className="watchlist-list">
                        {usersFilms.data.watchlist.map((film) => 
                            <FilmCard film={film} key={film.id}/>)}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    )
}