import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styling/castPage.css"
import "../../styling/feed.css"
import FilmCard from "../Feed/FilmCard/FilmCard";

export default function CastPage() {
    const [person, setPerson] = useState([])
    const urlPararms = useParams()
    console.log(urlPararms.id)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${urlPararms.id}?api_key=017864b5160abacb16620d2413135901&append_to_response=combined_credits,images`)
            .then(res => res.json())
            .then(json => setPerson(json))
    }, [urlPararms])

    console.log(person)
    return (
        <>
            {person && (
            <div className="profile-container">
            <header className="profile-header">
                <h1>{person.name}</h1>
                <section className="profile-header-bio">
                    <img 
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={`${person.name}'s profile image`}
                    id="persons_profile_img"
                    />
                    <p>{person.biography}</p>
                </section>
            </header>
            <section className="film-list-container">
                <h2>Films</h2>
                <ul className="film-list">
                    {person.length === 0 ? (
                        <li></li>
                    ) : (
                    person.combined_credits.cast.map((film) => (
                        <>
                        <FilmCard film={film} key={film.id}/>
                        </>
                        
                    ))
                    )}
                </ul>
            </section>
        </div>
        )}
        </>
    )
}