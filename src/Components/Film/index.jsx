import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function FilmPage() {
    const [film, setFilm] = useState({})
    const urlPararms = useParams()

    // const title = film.node.titleText.text
    // const poster = film.node.primaryImage.url
    // const release = film.node.releaseYear.year

    if(!film) {
        <p>Getting film</p>
    }

    useEffect(() => {
        fetch(`https://online-movie-database.p.rapidapi.com/title/v2/get-details?tconst=${urlPararms.id}&country=US&language=en-US`,
        {method: 'GET',
        headers: {
          'x-rapidapi-key': '700d36cd97msh5886fe3882d5a97p1e376bjsn524492e792ba',
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
      })
        .then(response => response.json())
        .then(json => console.log(json))
    }, [urlPararms, setFilm])
    console.log(film)
    

    return (
        <div className="film-page-container">
            {/* <h1>{title}</h1>
            <p>{release}</p>
            <img src={poster}
            className="poster"/> */}
        </div>
    )
}