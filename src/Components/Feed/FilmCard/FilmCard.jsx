/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function FilmCard({ film }) {
  const title = film.original_title;


  if (!film) {
    <p>Loading...</p>;
  }

  function checkTitle() {
    if (title.length > 24) {
      return title.slice(0, 24) + "...";
    }
    return title;
  }

  return (
    <>
      {film && (
        <Link to={`/${film.id}`} className="link">
          <li className="film-list-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              className="poster"
              alt={`${title} movie poster`}
            />
            <h3>{checkTitle()}</h3>
          </li>
        </Link>
      )}
    </>
  );
}
