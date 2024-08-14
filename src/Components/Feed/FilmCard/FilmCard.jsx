/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../../styling/FilmPage.css";
import "../../Search/styling.css";
import Button from "../../Button";
import Add from "../../AddFilm";

export default function FilmCard({ film, styling, onClick }) {

  if (!film) {
    <p>Loading...</p>;
  }

  let title = film.original_title;
  function checkTitle() {
    if (film.character) {
      title = film.character;
    }
    if (typeof title !== "string") {
      return <h3>...</h3>;
    }
    if (title.length > 24) {
      return title.slice(0, 24) + "...";
    }
    if (film.title) {
      title = film.title;
    }
    if(styling === "search-result") {
      return <div className="search-result-title-container">
        <h4>{title}</h4>
        <p>{film.release_date}</p>
      </div>
    }
    return <h3>{title}</h3>
  }

  let poster = film.poster_path;
  function checkPoster() {
    if (typeof poster !== "string") {
      return <div className="poster-container">
        <img className={`${styling}-poster`} id="unknown-poster" />
        <Button text={<Add />} className="add-to-list-button" onClick={onClick(film)}/>
      </div>
    }
    if (film.poster) {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w500${film.poster}`}
          className={`${styling}-poster`}
          alt={`${title} movie poster`}
        />
      );
    }
    return (
      <img
        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        className={`${styling}-poster`}
        alt={`${title} movie poster`}
      />
    );
  }

  const renderCorrectCard = () => {
    const currentUrl =  window.location.href
    if(currentUrl.includes("/lists")) {
      return <li className={`${styling}-list-item`}>
            {checkPoster()}
            {checkTitle()}
            </li>
    }
    return <Link to={`/${film.id}`} className="link">
              <li className={`${styling}-list-item`}>
              {checkPoster()}
              {checkTitle()}
              </li>
           </Link>
  }

  return (
    <>
      {renderCorrectCard()}
    </>
  );
}
