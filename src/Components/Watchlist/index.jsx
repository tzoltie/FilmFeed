import { useEffect, useState } from "react"
import { getUserWatchlist } from "../../Utils/apiClient"
import "./styling.css"
import useAuth from "../hooks/useAuth.jsx"
import { FilmList } from "../FilmLists/index.jsx"
import { useNavigate } from "react-router-dom"

export default function Watchlist() {
    const { loggedInUser } = useAuth()
    const navigate = useNavigate()
    const [usersFilms, setUsersFilms] = useState({status: "pending"})
    useEffect(() => {
        getUserWatchlist(loggedInUser.id).then(setUsersFilms)
        navigate({pathname: '/watchlist', state: usersFilms })
    }, [loggedInUser])

console.log("watchlist comp",usersFilms)
    return (
        <div className="list-container">
            {/* {usersFilms.status === "success" &&
            <FilmList loggedInUser={loggedInUser} list={"watchlist"} results={usersFilms} />} */}
        </div>
    )
}