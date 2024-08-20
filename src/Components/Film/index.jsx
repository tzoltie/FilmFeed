import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styling/FilmPage.css";
import Cast from "./Cast";
import Crew from "./Crew"
import { addFilmToWatchlist, getFilmById, getUserRating } from "../../Utils/apiClient";
import useAuth from "../hooks/useAuth";
import Button from "../Button";
import Add from "../AddFilm";
import Star from "../Assets/Star/star";
import Review from "../Review";
import StarRating from "../Rating";
import AddFilmMenu from "../AddFilm/menu";
import Poster from "../Poster";

export default function FilmPage() {
  const [film, setFilm] = useState({title: ""});
  const [review, setReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [addFilm, setAddFilm] = useState(false)
  const [viewList, setViewList] = useState(false)
  const ratingSection = useRef({})
  const [userRating, setUserRating] = useState({status: "pending", data: {reviews: []}})
  const urlPararms = useParams();
  const isLoggedIn = localStorage.getItem('token')
  const { loggedInUser } = useAuth()

  useEffect(() => {
    getFilmById(`${urlPararms.id}`).then(setFilm)
    getUserRating(`${urlPararms.id}`).then(setUserRating)
  }, [urlPararms, review]);

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

  function getCrew(crew, job) {
    const findCrewByJob = crew.find((crewMember) => (crewMember.job === job));
    const screenPlayCredit = crew.find((crewMember) => (crewMember.job === 'Screenplay'))
    if(!findCrewByJob && screenPlayCredit) {
      return <>{checkImage(screenPlayCredit)}
      <h4>{screenPlayCredit.name}</h4></>
    }
    return <>
      {checkImage(findCrewByJob)}
      <h4>{findCrewByJob.name}</h4>
    </>
  }

  function updateToCurrency(number) {
    if(number === 0) {
      return "unavailable"
    }
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

  function openPopUp() {
    setAddFilm(true)
  }

  async function addToWatchlist() {
    await addFilmToWatchlist(film.id, film.title, film.poster_path, loggedInUser.id)
  }

  function calculateAvg(avg) {
    if(avg === 0) {
      return 0
    }
    const fiveStarAvg = Number(avg) / 2
    return fiveStarAvg.toFixed(1)
  }

  function convertReleaseDate(date) {
    if(date.length <= 4) {
      return date
    }
    const year = date.slice(0, 4)
    return year
  }

  function onClick(rating) {
    if(isLoggedIn.length === 0) {
      return alert("Must create an account in order to add review")
    }
    setReview(true)
    setRating(rating)
  }

  function getRating() {
    const reviews = userRating.data.reviews
    const usersRating = reviews.find((rating) => rating.userId === loggedInUser.id)
    return usersRating ? <StarRating userRating={usersRating.rating} styling={"user-rating-stars"}/> : <p></p>
  }


  return (
    <>
      {film.title.length > 1 && (
        <div className="film-page-container">
          <h1>{film.title}</h1>
          <div className="film-page-header">
            <section className="poster-title-box">
              <h4 id="release-date">{convertReleaseDate(film.release_date)}</h4>
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={`${film.title} poster`}
                className="poster"
                id="page-poster"
              />
              <p id="synopsis">{film.overview}</p>
              <p id="synopsis">{checkSynopsis(film)}</p>
            </section>
            <section className="director-writer-box">
              <section>
                <h4>Director</h4>
                {getCrew(film.credits.crew, "Director")}
              </section>
              <section>
                <h4>Writer</h4>
                {getCrew(film.credits.crew, "Writer")}
              </section>
            </section>
          </div>
          <div className="header-footer">
            <section className="rating-box">
              <div>
                <h2>Rating</h2>
              </div>
              <div>
                <Button text={<Star />} className={'star_0-rating-btn'} onClick={() => onClick("1")}/>
                <Button text={<Star />} className={"star_1-rating-btn"} onClick={() => onClick("2")}/>
                <Button text={<Star />} className={"star_2-rating-btn"} onClick={() => onClick("3")}/>
                <Button text={<Star />} className={"star_3-rating-btn"} onClick={() => onClick("4")}/>
                <Button text={<Star />} className={"star_4-rating-btn"} onClick={() => onClick("5")}/>
              </div>
              <div className="avg-user-rating-box">
                <p>Avg rating: {calculateAvg(film.vote_average)}</p>
                {userRating.status === "success" && userRating.data.reviews.length > 0 &&
                <>
                {getRating()}
                <p>Last rating:</p>
                </>
                
                }
              </div>
              {review && 
                <Review rating={rating} filmId={film.id} film={{poster: film.poster_path, title: film.title}} setReview={setReview} ratingSection={ratingSection}/>
              }
            </section>
            <div className="film-details-box">
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
          <div className="cast_crew-container">
            <Cast list={film.credits.cast} checkImage={checkImage} heading={"Cast"} />
            <Crew list={film.credits.crew} checkImage={checkImage} heading={"Crew"}/>
          </div>
          {loggedInUser !== null &&
          <Button text={<Add />} onClick={openPopUp} className={"addFilm-button"}/>}
          {addFilm &&
            <AddFilmMenu setViewList={setViewList} addToWatchlist={addToWatchlist} ratingSection={ratingSection} toggleMenu={setAddFilm} poster={film.poster_path}/>
          }
        </div>
      )}
    </>
  );
}
