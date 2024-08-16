import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styling/FilmPage.css";
import Cast from "./Cast";
import Crew from "./Crew"
import { addFilmToWatchlist, getFilmById } from "../../Utils/apiClient";
import useAuth from "../hooks/useAuth";
import Button from "../Button";
import Add from "../AddFilm";

export default function FilmPage() {
  const [film, setFilm] = useState([]);
  const urlPararms = useParams();
  const { loggedInUser } = useAuth()

  useEffect(() => {
    getFilmById(`${urlPararms.id}`).then(setFilm)
  }, [urlPararms]);

    function checkSynopsis(film) {
      if (typeof film !== 'object') {
        return <p>Loading synopsis...</p>;
      }

      const synopsis = film.overview;
      if (synopsis?.length < 5) {
        return (
          <p>
            Oops, looks like this synopsis is unavailable. Pesky borrowers upto
            their mischief
          </p>
        );
      } else {
        return synopsis;
      }
    }

  // function getCrew(film, job) {
  //   if(typeof film === 'object' && film.id) {
  //     const crew = film.credits.crew;
  //     const findCrewByJob = crew.find((crewMember) => (crewMember.job === job));
  //     console.log(findCrewByJob)
  //     return <>
  //           {checkImage(findCrewByJob)}
  //           <h4>{findCrewByJob.name}</h4>
  //         </>
  //   }
  //   return <img className="profile-image" id="unknown-profile-image"/>
  // }

  function updateToCurrency(number) {
    let value = Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD'}).format(number)
    return value
  }

  function checkImage(cast) {
    if (typeof cast !== 'object') {
      return <img className="profile-image" id="unknown-profile-image"/>
    }
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
    if (typeof cast !== 'object') {
      return
    }
    const name = cast?.name;
    const letters = name.split(" ");
    let initials = "";
    for (let i = 0; i < letters.length; i++) {
      if (letters[i].length > 0 && letters[i] !== "") {
        initials += letters[i][0];
      }
    }
    return initials;
  }

  async function addFilmToList() {
    await addFilmToWatchlist(film.id, film.title, film.poster_path, loggedInUser.id)
  }

  return (
    <>
      {typeof film === 'object' && (
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
              <p id="synopsis">{checkSynopsis(film)}</p>
            </section>
            <section className="crew-box">
              <section>
                <h4>Director:</h4>  
                {/* {getCrew(film, "Director")} */}
              </section>
              <section>
                <h4>Writer:</h4>
                {/* {getCrew(film, "Writer")} */}
              </section>
            </section>
          </div>
          <div className="header-footer">
          <section className="runtime-box">
                <h3>Runtime</h3>
                <p>{`${film.runtime} mins`}</p>
            </section>
            <section className="genre-box">
              <h3>Genres</h3>
              <ul id="genre">
              {typeof film === 'object' ? (
                <li></li>
              ) : (  
              film.genres.map((i) => 
              <li key={i.id}>{i.name}</li>))}
              </ul>
            </section>
            <section className="status-box">
                <h3>Status</h3>
                <p>{film.status}</p>
            </section>
            <section className="budget-box">
              <h3>Budget</h3>
              <p>{updateToCurrency(film.budget)}</p>
            </section>
            <section className="revenue-box">
              <h3>Revenue</h3>
              <p>{updateToCurrency(film.revenue)}</p>
            </section>
            <section className="origin-box">
              <h3>Country of origin</h3>
              {film.length === 0 ? (
                <p></p>
              ) : (
                <p>{film.origin_country[0]}</p>
              )} 
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
          {/* <Cast film={film} checkImage={checkImage}/>
          <Crew film={film} checkImage={checkImage}/> */}
          <Button text={<Add />} onClick={addFilmToList} className={"addFilm-button"}/>
        </div>
      )}
    </>
  );
}
