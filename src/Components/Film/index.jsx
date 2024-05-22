import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styling/FilmPage.css";

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

  function checkImage(cast) {
    const profileImage = cast.profile_path;
    console.log(profileImage)
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
                className="poster"
                id="page-poster"
              />
              <p id="synopsis">{film.overview}</p>
              {/* <p id="synopsis">{checkSynopsis(film)}</p> */}
            </section>
            <section className="crew-box">
              <h4>Director: {}</h4>
              <h4>Writer: </h4>
            </section>
          </div>
          <div className="cast-crew-box">
            <h2 className="heading">Cast</h2>
            <ul className="cast-list">
              {film.credits.cast.map((cast) => (
                <li key={cast.id} className="cast-list-item">
                    {checkImage(cast)}
                  {/* <img
                    src={`http://image.tmdb.org/t/p/w92${cast.profile_path}`}
                    alt={`${cast.name} image`}
                    className="profile-image"
                  /> */}
                  <p>{cast.character}</p>
                  <h4>{cast.name}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
