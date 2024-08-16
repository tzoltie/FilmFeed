import { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";
import "../../styling/feed.css";
import { getTmdbPopularList, getTmdbTopRatedList, getTmdbTrendingList } from "../../Utils/apiClient";
import { renderToStaticNodeStream } from "react-dom/server";

export default function Feed() {
  const [popular, setPopular] = useState([])
  const [topFilms, setTopFilms] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(() => {
    getTmdbPopularList().then(setPopular)
    getTmdbTopRatedList().then(setTopFilms)
    getTmdbTrendingList().then(setTrending)
  }, [])

  return (
    <div className="feed-container">
      <section className="feed-list-container">
        <div>
          <h2 className="list-title">Trending</h2>
        </div>
        <div className="trending-list-container">
          <ul className="film-list" id="upcoming">
            {trending.length === 0 ? (
              <li></li>
            ) : (
              trending.results.map((film) => (
                <FilmCard film={film} key={film.id} styling={"feed-card"} />
              )))}
          </ul>
        </div>
      </section>
      <section className="feed-list-container">
        <div>
          <h2 className="list-title">Popular</h2>
        </div>
        <div className="popular-list-container">
          <ul className="film-list" id="popular">
          {popular.length === 0 ? (
            <li></li>
              ) : (
          popular.results.map((film) => (
            <FilmCard film={film} key={film.id} styling={"feed-card"}/>
          )))}
          </ul>
        </div>
      </section>
      <section className="feed-list-container">
        <div>
          <h2 className="list-title">Cinema Greats</h2>
        </div>
        <div className="cinema-list-container">
          <ul className="film-list" id="cinema-greats">
          {topFilms.length === 0 ? (
            <li></li>
          ) : (
          topFilms.results.map((film) => (
            <FilmCard film={film} key={film.id} styling={"feed-card"}/>
          )))}
          </ul>
        </div>
      </section>
    </div>
  );
}
