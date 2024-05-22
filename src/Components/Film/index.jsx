import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../../styling/FilmPage.css'

export default function FilmPage() {
    const [film, setFilm] = useState({})
    const urlPararms = useParams()

    // const id = film.id

      
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${urlPararms.id}?api_key=017864b5160abacb16620d2413135901&append_to_response=credits,images`)
        .then(response => response.json())
        .then(json => setFilm(json))
    }, [urlPararms, setFilm])
    console.log(film)

    // function checkSynopsis() {
    //     const synopsis = film.overview
    //         if(synopsis.length < 5) {
    //             return <p>Oops, looks like this synopsis is unavailable. Pesky borrowers upto their mischief</p>
    //         }
    //     return synopsis
    // }

    if(!film) {
       return <p>Loading...</p>
    }  
    // const crewCredit = film.credits.crew
    // console.log(crewCredit)


    return (
        <>
        {film && (
            <div className="film-page-container">
                <h1>{film.title}</h1>
                <div className="film-page-header">
                    <section className="poster-title-box">
                        <h4 id="release-date">{film.release_date}</h4>
                        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        className="poster" id="page-poster"/>
                        <p id="synopsis">{film.overview}</p>
                        {/* <p id="synopsis">{checkSynopsis()}</p> */}
                    </section>
                    <section className="crew-box">
                        <h4>Director: {}</h4>
                        <h4>Writer: </h4>
                    </section>
                </div>
                <div className="cast-crew-box">
                    <ul className="cast-list">
                        {/* {film.credits.cast.map((cast) =>
                        <li key={cast.id} className="cast-list-item">
                            <img src={`http://image.tmdb.org/t/p/w92${cast.profile_path}`}/>
                            <p>{cast.character}</p>
                            <h6>{cast.name}</h6>
                        </li>
                    )}  */}
                    </ul>
                </div>
            </div>
        )}
        </>
    )
}