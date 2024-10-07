import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styling/FilmPage.css";
import Cast from "./Cast";
import Crew from "./Crew"
import { addFilmToWatchlist, getFilmById, getUserRating } from "../../Utils/apiClient";
import useAuth from "../hooks/useAuth";
import Button from "../Button";
import Add from "../AddFilm";
import Review from "../Review";
import StarRating from "../Rating";
import AddFilmMenu from "../AddFilm/menu";
import FilmCard from "../Feed/FilmCard/FilmCard";
import { useMediaQuery } from "react-responsive";
import FilmDetails from "./Details";
import StarRatingBtn from "../Rating/starRatingBtns";
import FilmReview from "./Review";

export default function FilmPage() {
  const [film, setFilm] = useState({id: ""});
  const [addReview, setAddReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [addFilm, setAddFilm] = useState(false)
  const [viewList, setViewList] = useState(false)
  const ratingSection = useRef({})
  const [userRating, setUserRating] = useState({status: "pending", data: {reviews: []}})
  const urlPararms = useParams();
  const isLoggedIn = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const { loggedInUser } = useAuth()

  useEffect(() => {
    getFilmById(`${urlPararms.id}`).then(setFilm)
    getUserRating(`${urlPararms.id}`).then(setUserRating)
    .then(filterReviews)
    .finally(mobileStyling)
  }, [urlPararms, addReview]);

  const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
  const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

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
      return <>
      <Link to={`/${screenPlayCredit.id}/cast&crew`} className="link">
        {checkImage(screenPlayCredit)}
        <h4>{screenPlayCredit.name}</h4>
      </Link>
      </>
    }
    if(typeof findCrewByJob === "undefined") {
      return;
    }
    return <>
    <Link to={`/${findCrewByJob.id}/cast&crew`} className="link">
      {checkImage(findCrewByJob)}
      <h4>{findCrewByJob.name}</h4>
    </Link>
    </>
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

  function addToWatchlist() {
    addFilmToWatchlist(film.id, film.title, film.poster_path, user.id)
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

  const [ratingClick, setRatingClick] = useState(false)
  
  function onClick(rating) {
    if(typeof isLoggedIn !== 'string') {
      return alert("Must create an account in order to add review")
    }
    setAddReview(true)
    setRating(rating)

    const star = document.getElementsByClassName("star")
    if(ratingClick) {
      for(let i = Number(rating); i < 5; i++) {
        star[i].style.fill = "#5f6368"
      }
      return setRatingClick(false)
    }
    
    setRatingClick(true)
    for(let i = 0; i < Number(rating); i++) {
      star[i].style.fill = "#FF5733"
    }
    
  }

  function getRating() {
    const reviews = userRating.data.reviews
    const usersRating = reviews.find((rating) => rating.userId === user.id)
    return usersRating ? <StarRating userRating={usersRating.rating} styling={"user-rating-stars"}/> : <p></p>
  }

  function mobileStyling() {
    if(!isMobile) {
      return;
    } else {
      document.getElementsByClassName("film-page-header")[0].style.display = "flex"
      document.getElementsByClassName("star_0-rating-btn")[0].style.padding = "0.6em 1em"
      document.getElementsByClassName("star_1-rating-btn")[0].style.padding = "0.6em 1em"
      document.getElementsByClassName("star_2-rating-btn")[0].style.padding = "0.6em 1em"
      document.getElementsByClassName("star_3-rating-btn")[0].style.padding = "0.6em 1em"
      document.getElementsByClassName("star_4-rating-btn")[0].style.padding = "0.6em 1em"
    }
  }

  const [filmReviews, setFilmReviews] = useState([])
 
  function filterReviews() {
    const reviews = userRating.data.reviews.filter((review) => review.content.length > 0)
    if(reviews.length > 0) {
      return setFilmReviews(reviews)
    }
  }

  const [showAllReviews, setShowAllReviews] = useState(false)

  function showReviews() {
    setShowAllReviews(true)
  }


  return (
    <>
      {typeof film.id === 'number' && (
        <div className="film-page-container">
          <h1>{film.title}</h1>
          <div className="film-page-header">
            <section className="poster-title-box">
              <h4 id="release-date">{convertReleaseDate(film.release_date)}</h4>
              {isDesktop ?
              <>
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={`${film.title} poster`}
                className="poster"
                id="page-poster"
              />
                <p id="synopsis">{checkSynopsis(film)}</p>
              </> :
              <>
              <img 
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={`${film.title} poster`}
              className="poster"
              id="page-poster-mobile"
              />
              <p id="synopsis">{film.overview}</p>
              <p id="synopsis">{checkSynopsis(film)}</p>
              </>
              }
            </section>
            {isDesktop &&
            <section className="director-writer-box">
              <section>
                <h4>Director</h4>
                {getCrew(film.credits.crew, "Director")}
              </section>
              <section>
                <h4>Writer</h4>
                {getCrew(film.credits.crew, "Writer")}
              </section>
            </section>}
          </div>
          <div className="header-footer">
            <section className="rating-box">
              <div>
                <h2>Rating</h2>
              </div>
              <StarRatingBtn onClick={onClick}/>
              <div className="avg-user-rating-box">
                <p>Avg rating: {calculateAvg(film.vote_average)}</p>
                {userRating.status === "success" && userRating.data.reviews.length > 0 &&
                <>
                {getRating()}
                <p>Last rating:</p>
                </>}
              </div>
              {addReview && 
                <Review rating={rating} filmId={film.id} film={{poster: film.poster_path, title: film.title}} setAddReview={setAddReview} ratingSection={ratingSection}/>
              }
            </section>
            {isDesktop ? 
            <FilmDetails film={film}/> : 
            <div className="film-details-container-mobile">
              <div className="film-details-heading">
                <h2>Details</h2>
              </div>
            </div>}
          </div>
          {/* <div className="images-videos-container">
            <Link to={`/${film.id}/images`}
            className="link">
              <section className="images-box">
                <h2 id="images-heading">Images</h2>
              </section>
            </Link>
            <section className="videos-box">
              <h2 id="videos-heading">Videos</h2>
            </section>
          </div> */}
          {typeof film.credits !== 'undefined' &&
          <div className="cast_crew-container">
            <Cast list={film.credits.cast} checkImage={checkImage} heading={"Cast"} />
            <Crew list={film.credits.crew} checkImage={checkImage} heading={"Crew"}/>
          </div>}
          {userRating.data.reviews.length > 0 &&
          <div className="reviews-container">
            <div>
              <h2>
                Reviews
              </h2>
            </div>
            <ul>
              {filmReviews.length > 0 ? (filmReviews.length >= 3 && !showAllReviews ? (filmReviews.slice(0, 3).toReversed().map(review => 
                <FilmReview review={review} key={review.id}/> )) : (
                  filmReviews.toReversed().map(review =>
                    <FilmReview review={review} key={review.id}/>
                  )
                )) : (
                <li className="empty-review-list-item">
                  <p>Looks like there have been no reviews for this film, let people know what you thought of this film!</p>
                </li>
                )
              }
            </ul>
            {filmReviews.length > 3 & !showAllReviews &&
            <Button text={"show more"} className={"show-more-reviews"} onClick={() => showReviews()}/>}
          </div>}
          {typeof user === 'object' &&
          <Button text={<Add />} onClick={openPopUp} className={"addFilm-button"}/>}
          {addFilm &&
            <AddFilmMenu setViewList={setViewList} addToWatchlist={addToWatchlist} ratingSection={ratingSection} toggleMenu={setAddFilm} poster={film.poster_path}/>
          }
          {typeof film.similar !== 'undefined' &&
          <div className="similar-list-container">
            <div className="similar-list-box">
              <div>
                <h2>Similar Films</h2>
              </div>
              <ul className="similar-films-list">
                {film.similar.results.map((film) =>
                <li key={film.id}>
                  <FilmCard film={film} key={film.id} styling={"feed-card"}/>
                </li>)}
              </ul>
            </div>
          </div>}
        </div>
      )}
    </>
  );
}
