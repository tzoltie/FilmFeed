import { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";
import "../../styling/feed.css";

export default function Feed() {
  const [upcoming, setUpcomingFilms] = useState([]);
  const [popular, setPopular] = useState([])
  const [topFilms, setTopFilms] = useState([])

  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1?",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc4NjRiNTE2MGFiYWNiMTY2MjBkMjQxMzEzNTkwMSIsInN1YiI6IjY2NGM3NTdkNWRlOTkyYjM5MDk2NzdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QeHy3M8bm_kjzVChwkoAzboigbojz5kHZp0XavRy8",
  //         accept: "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setUpcomingFilms(json.results));
  // }, []);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1?",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc4NjRiNTE2MGFiYWNiMTY2MjBkMjQxMzEzNTkwMSIsInN1YiI6IjY2NGM3NTdkNWRlOTkyYjM5MDk2NzdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QeHy3M8bm_kjzVChwkoAzboigbojz5kHZp0XavRy8",
          accept: "application/json",
        },
      }
    )
    .then(res => res.json())
    .then((json) => setPopular(json.results))
  }, [])

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1?",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTc4NjRiNTE2MGFiYWNiMTY2MjBkMjQxMzEzNTkwMSIsInN1YiI6IjY2NGM3NTdkNWRlOTkyYjM5MDk2NzdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QeHy3M8bm_kjzVChwkoAzboigbojz5kHZp0XavRy8",
          accept: "application/json",
        },
      }
    )
    .then(res => res.json())
    .then((json) => setTopFilms(json.results))
  }, [])

  

  return (
    <div className="feed-container">
      {/* <section className="upcoming-list-container">
        <h2 className="list-title">Upcoming</h2>
        <ul className="film-list" id="upcoming">
          {upcoming.map((film) => (
            <FilmCard film={film} key={film.id} />
          ))}
        </ul>
      </section> */}
      <section className="popular-list-container">
        <h2 className="list-title">Popular</h2>
        <ul className="film-list" id="popular">
        {popular.length === 0 ? (
            <li></li>
              ) : (
          popular.map((film) => (
            <FilmCard film={film} key={film.id}/>
          )))}
        </ul>
      </section>
      <section className="cinema-list-container">
        <h2 className="list-title">Cinema Greats</h2>
        <ul className="film-list" id="cinema-greats">
          {topFilms.length === 0 ? (
            <li></li>
          ) : (
          topFilms.map((film) => (
            <FilmCard film={film} key={film.id}/>
          ))
          )}
        </ul>
      </section>
    </div>
  );
}
