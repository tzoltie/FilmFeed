import { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";
import '../../styling/feed.css'
import { json } from "react-router-dom";

export default function Feed() {

    const [allFilms, setAllFilms] = useState([])
    const [allTv, setAllTv] = useState([])

  useEffect(() => {
    fetch('https://online-movie-database.p.rapidapi.com/title/v2/get-popular?country=US&language=en-US', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '700d36cd97msh5886fe3882d5a97p1e376bjsn524492e792ba',
        'x-rapidapi-host': 'online-movie-database.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(json => setAllFilms(json.data.movies.edges))
  }, [setAllFilms])


    return (
        <div 
        className="feed-container">
            <h2 className="list-title">New Releases</h2>
            <ul className="film-list">
                {allFilms.map((film) => <FilmCard film={film} key={film.node.id}/>)}
            </ul>

        </div>
    )
}