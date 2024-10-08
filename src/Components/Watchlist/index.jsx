import { useEffect, useState } from "react"
import { getUserWatchlist } from "../../Utils/apiClient"
import "./styling.css"
import useAuth from "../hooks/useAuth.jsx"
import { FilmList } from "../FilmLists/index.jsx"

export default function Watchlist() {
    const { loggedInUser } = useAuth()
    const [usersFilms, setUsersFilms] = useState({status: "pending"})
    const [watchlist, setWatchlist] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getUserWatchlist(user.id).then(setUsersFilms)
    }, [user, watchlist])


    return (
        <div className="list-container">
            {usersFilms.status === "success" &&
            <FilmList loggedInUser={user} list={"watchlist"} results={usersFilms} />}
        </div>
    )
}