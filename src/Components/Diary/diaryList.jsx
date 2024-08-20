import { useNavigate } from "react-router-dom"
import StarRating from "../Rating"

export default function DiaryList({monthList, month}) {
    const navigate = useNavigate()
    const onClick = (filmId) => {
        navigate({ 
            pathname: `/${filmId}`
        })
    }

    const getDay = (review) => {
        const day = review.slice(8,10)
        return day
    }

    return (
        <div className="monthly-diary-container">
            <div className="month-title-box"><h2>{month}</h2></div>
            <ul>
                {monthList.sort((a, b) => a.createdAt - b.createdAt).toReversed().map(review => 
                    <li key={review.id} className="diary-list-item" onClick={() => onClick(review.filmId)}>
                        <div className="date-box-container">
                            <div className="date-box">
                                <h4>{getDay(review.createdAt)}</h4>
                            </div>
                        </div>
                        <img src={`https://image.tmdb.org/t/p/w500${review.film.poster}`}
                        className="list-image"
                        onClick={() => onClick(review.filmId)}/>
                        <div className="diary-list-titleRating">
                            <div className="diary-film-title"><h3>{review.film.title}</h3></div>
                            {<StarRating userRating={review.rating} styling={"user-rating-stars"}/>}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}