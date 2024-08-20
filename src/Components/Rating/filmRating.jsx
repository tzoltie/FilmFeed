import { useEffect, useState } from "react"
import StarRating from "."
import useAuth from "../hooks/useAuth"
import "./styling.css"

export default function FilmRating({film}) {
    const { loggedInUser } = useAuth()
    const [filmRating, setFilmRating] = useState(0)
    useEffect(() => {
        getUserRating(film)
    })
    const getUserRating = (film) => {
        const found = film.reviews.find((rating) => rating.userId === loggedInUser.id)
        console.log(found)
        if(!found) {
            return 
        }
        return setFilmRating(found.rating)
    }

    return (
        <StarRating userRating={filmRating} styling={"watchlist-rating-stars"}/>
    )
}