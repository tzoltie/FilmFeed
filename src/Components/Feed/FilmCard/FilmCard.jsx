/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../../styling/FilmPage.css"

export default function FilmCard({ film }) {


  if (!film) {
    <p>Loading...</p>;
  }

  
  let title = film.original_title;
  function checkTitle() {
    if(film.character) {
      title = film.character
    }
    if(typeof title !== 'string') {
      return <h3>...</h3>
    }
    if (title.length > 24) {
      return title.slice(0, 24) + "...";
    }
    if(film.title) {
      title = film.title
    }
    return title;
  }
  
  let poster = film.poster_path
  function checkPoster() {
    if(typeof poster !== 'string') {
      return <img className="poster" id="unknown-poster"/>
    }
    if(film.poster) {
      return <img
      src={`https://image.tmdb.org/t/p/w500${film.poster}`}
      className="poster"
      alt={`${title} movie poster`}
      />
    }
    return <img
    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
    className="poster"
    alt={`${title} movie poster`}
    />
  }

  return (
    <>
      {film && (
        <Link to={`/${film.id}`} className="link">
          <li className="film-list-item">
            {checkPoster()}
            <h3>{checkTitle()}</h3>
          </li>
        </Link>
      )}
    </>
  );
}
