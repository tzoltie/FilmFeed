/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function FilmCard({ film }) {
    const title = film.original_title
    const poster = film.poster_path
    const id = film.id

  if (!film) {
    <p>Loading...</p>;
  }

  function checkTitle() {
    if(title.length > 24) {
        return title.slice(0, 24) + '...'
    }
    return title
  }


  return (
    <>
      {film && (
        <Link to={`/${id}`}>
            <li className="film-list-item">
                <img src={`https://image.tmdb.org/t/p/w500${poster}`} className="poster"/>
                <h3>{checkTitle()}</h3>
            </li>
        </Link>
      )}
    </>
  );
}
