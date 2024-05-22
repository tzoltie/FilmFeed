import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styling/FilmPage.css";
import Cast from "./Cast";

export default function FilmPage() {
  const [film, setFilm] = useState({});
  const urlPararms = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${urlPararms.id}?api_key=017864b5160abacb16620d2413135901&append_to_response=credits,images`
    )
      .then((response) => response.json())
      .then((json) => setFilm(json));
  }, [urlPararms, setFilm]);

  if (!film) {
    return <p>Loading...</p>;
  }

    function checkSynopsis(film) {
      const synopsis = film.overview;
      if (synopsis.length < 5) {
        return (
          <p>
            Oops, looks like this synopsis is unavailable. Pesky borrowers upto
            their mischief
          </p>
        );
      }
      return synopsis;
    }

  function getDirector(film) {
    const crew = film.credits.crew;
    const findDirector = crew.find((crewMember) => {
      if (crewMember.job === "Director") return crewMember;
    });

    return (
      <>
        {checkImage(findDirector)}
        <h4>{findDirector.name}</h4>
      </>
    );
  }

  function getWriter(film) {
    const crew = film.credits.crew;
    const findWriter = crew.find((crewMember) => {
      if (crewMember.job === "Writer") return crewMember;
    });

    return (
      <>
        {checkImage(findWriter)}
        <h4>{findWriter.name}</h4>
      </>
    );
  }

  function checkImage(cast) {
    const profileImage = cast.profile_path;
    if (profileImage === null) {
      return <h2 id="unknown-profile-image">{getInitials(cast)}</h2>;
    }
    return (
      <img
        src={`http://image.tmdb.org/t/p/w92${cast.profile_path}`}
        alt={`${cast.name} image`}
        className="profile-image"
      />
    );
  }

  function getInitials(cast) {
    const name = cast.name;
    const letters = name.split(" ");
    let initials = "";
    for (let i = 0; i < letters.length; i++) {
      if (letters[i].length > 0 && letters[i] !== "") {
        initials += letters[i][0];
      }
    }
    return initials;
  }

  return (
    <>
      {film && (
        <div className="film-page-container">
          <h1>{film.title}</h1>
          <div className="film-page-header">
            <section className="poster-title-box">
              <h4 id="release-date">{film.release_date}</h4>
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={`${film.title} poster`}
                className="poster"
                id="page-poster"
              />
              <p id="synopsis">{film.overview}</p>
              {/* <p id="synopsis">{checkSynopsis(film)}</p> */}
            </section>
            <section className="crew-box">
              <h4 id="Director">Director: {getDirector(film)}</h4>
              <h4 id="Writer">Writer: {getWriter(film)}</h4>
            </section>
          </div>
          {/* <Cast film={film} checkImage={checkImage}/> */}
        </div>
      )}
    </>
  );
}
