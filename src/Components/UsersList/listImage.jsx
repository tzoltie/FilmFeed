import { useNavigate } from "react-router-dom"

export default function ListImage({films}) {
    const navigate = useNavigate()
    const onClick = (filmId) => {
        navigate(`/${filmId}`)
    }
    console.log("listImage",films)
    return (
        <div className="list-image-container">
            {films.map(filmObj => 
            <img key={filmObj.film.id}
            src={`https://image.tmdb.org/t/p/w500${filmObj.film.poster}`}
            className="list-image" onClick={() => onClick(filmObj.film.id)}/>)}
        </div>
    )
}