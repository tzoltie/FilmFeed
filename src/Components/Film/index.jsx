import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  //   function checkSynopsis(film) {
  //     const synopsis = film.overview;
  //     if (synopsis.length < 5) {
  //       return (
  //         <p>
  //           Oops, looks like this synopsis is unavailable. Pesky borrowers upto
  //           their mischief
  //         </p>
  //       );
  //     }
  //     return synopsis;
  //   }

  function getCrew(film, job) {
    const crew = film.credits.crew;
    const findCrewByJob = crew.find((crewMember) => {
      if (crewMember.job === job) return crewMember;
    });

    return (
      <>
        {checkImage(findCrewByJob)}
        <h4>{findCrewByJob.name}</h4>
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
        alt={`${cast.name}'s image`}
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
console.log(film)
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
              {/* <h4>Director: {getCrew(film, "Director")}</h4>
              <h4>Writer: {getCrew(film, "Writer")}</h4> */}
            </section>
          </div>
          <div className="images-videos-container">
            <Link to={`/${film.id}/images`}
            className="link">
              <section className="images-box">
                <h2 id="images-heading">Images</h2>
              </section>
            </Link>
            <section className="videos-box">
              <h2 id="videos-heading">Videos</h2>
            </section>
          </div>
          {/* <Cast film={film} checkImage={checkImage}/> */}
        </div>
      )}
    </>
  );
}
