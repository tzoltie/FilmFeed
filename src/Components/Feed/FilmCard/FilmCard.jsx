/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function FilmCard({ film }) {
    const title = film.node.titleText.text
    const poster = film.node.primaryImage.url
    const release = film.node.releaseYear.year
    const id = film.node.id

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
                <img src={poster} className="poster"/>
                <h3>{checkTitle()}</h3>
            </li>
        </Link>
      )}
    </>
  );
}
