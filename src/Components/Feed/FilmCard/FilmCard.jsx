/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import "../../../styling/FilmPage.css";
import "../../Search/styling.css";
import Button from "../../Button";
import Add from "../../AddFilm";
import Remove from "../../Remove";
import { useState } from "react";

export default function FilmCard({ film, styling, addFilm, currentFilms, listReady }) {

  if (!film) {
    <p>Loading...</p>;
  }

  let title = film.title;
  function checkTitle() {
    if(styling === "search-result" || styling === "new-film") {
      return <div className="search-result-title-container">
        <h3>{title.slice(0, 24) + "..."}</h3>
        <p>{film.release_date.slice(0, 4)}</p>
      </div>
    }
    if (film.character) {
      title = film.character;
    }
    if (typeof title !== "string") {
      return <h3>...</h3>;
    }
    if (title.length > 24) {
      return title.slice(0, 24) + "...";
    }
    return <h3>{title}</h3>
  }

  let poster = film.poster_path;
  function checkPoster() {
    if (typeof poster !== "string") {
      return <img className={`${styling}-poster`} id="unknown-poster" />
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

  const [inList, setInList] = useState(false)

  const onClickAdd = () => {
    addFilm([...currentFilms, film])
    setInList(true)
  }

  const onClickRemove = (id) => {
    const updatedList = currentFilms.filter((film) => (film.id !== id))
    addFilm(updatedList)
    setInList(false)
  }
  

  const renderCorrectCard = () => {
    const currentUrl =  window.location.href

    if(currentUrl.includes("/lists") && !inList) {
      return <div className="add-to-list-container">
              <li className={`${styling}-list-item`}>
                {checkPoster()}
                {checkTitle()}
              </li>
              <Button className={"add-to-list-button"} text={<Add />} onClick={onClickAdd}/>
            </div>
    }
    if(currentUrl.includes("/lists") && inList) {
      return <div className="add-to-list-container">
              <li className={`${styling}-list-item`}>
                {checkPoster()}
                {checkTitle()}
              </li>
              <Button className={"add-to-list-button"} text={<Remove />} onClick={() => onClickRemove(film.id)}/>
            </div>
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
