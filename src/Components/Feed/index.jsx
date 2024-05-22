import { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";
import "../../styling/feed.css";

export default function Feed() {
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc4NjRiNTE2MGFiYWNiMTY2MjBkMjQxMzEzNTkwMSIsInN1YiI6IjY2NGM3NTdkNWRlOTkyYjM5MDk2NzdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QeHy3M8bm_kjzVChwkoAzboigbojz5kHZp0XavRy8",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setAllFilms(json.results));
  }, [setAllFilms]);

  return (
    <div className="feed-container">
      <h2 className="list-title">New Releases</h2>
      <ul className="film-list">
        {allFilms.map((film) => (
          <FilmCard film={film} key={film.id} />
        ))}
      </ul>
    </div>
  );
}
