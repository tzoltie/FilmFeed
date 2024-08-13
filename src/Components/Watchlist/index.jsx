import { useEffect, useState } from "react"
import { getUserWatchlist } from "../../Utils/apiClient"
import "./styling.css"
import useAuth from "../hooks/useAuth.jsx"
import { FilmList } from "../FilmLists/index.jsx"

export default function Watchlist() {
    const { loggedInUser } = useAuth()
    const [usersFilms, setUsersFilms] = useState([])
    const [emptyWatchlist, setEmptyWatchlist] = useState([{}, {}, {}, {}, {}, {}, {}])
    useEffect(() => {
        getUserWatchlist(loggedInUser.id).then(setUsersFilms)
    }, [loggedInUser.id])

    console.log(usersFilms)
    return (
        <div className="list-container">
            <FilmList loggedInUser={loggedInUser} list={"watchlist"} usersFilms={usersFilms}/>
        </div>
    )
}