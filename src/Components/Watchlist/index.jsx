import { useEffect, useState } from "react"
import { getUserWatchlist } from "../../Utils/apiClient"
import "./styling.css"
import useAuth from "../hooks/useAuth.jsx"
import { FilmList } from "../FilmLists/index.jsx"

export default function Watchlist() {
    const { loggedInUser } = useAuth()
    const [usersFilms, setUsersFilms] = useState({status: "pending"})
    useEffect(() => {
        getUserWatchlist(loggedInUser.id).then(setUsersFilms)
    }, [loggedInUser])


    return (
        <div className="list-container">
            {usersFilms.status === "success" &&
            <FilmList loggedInUser={loggedInUser} list={"watchlist"} usersFilms={usersFilms}/>}
        </div>
    )
}