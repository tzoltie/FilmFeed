/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../../styling/FilmPage.css";
import "../../Search/styling.css";
import Button from "../../Button";
import Add from "../../AddFilm";
import Remove from "../../Remove";
import { useEffect, useState } from "react";

export default function FilmCard({ film, styling, addFilm, currentFilms }) {

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
    if(styling === "search-result" || styling === "new-film") {
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

  const onClickAdd = () => {
    addFilm([...currentFilms, film])
    console.log("add clicked")
  }

  const onClickRemove = (id) => {
    console.log(id)
    const updatedList = currentFilms.filter((film) => (film.id !== id))
    console.log("removed clicked")
  }

  const [inList, setInList] = useState(false)

  useEffect(() => {
    const filmInList = currentFilms?.find((li) => (li.original_title === film.original_title))
      if(filmInList) {
        setInList(true)
      }
  }, [currentFilms])

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
              <Button className={"add-to-list-button"} text={<Remove />} onClick={onClickRemove(film.id)}/>
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
