import { useEffect, useRef, useState } from "react";
import "./styling.css";
import {
    addUserFavouriteFilms,
  getUser,
  getUserFavouriteFilms,
  addProfileImage,
} from "../../Utils/apiClient";
import useAuth from "../hooks/useAuth";
import Button from "../Button";
import AddIcon from "../Assets/Add";
import { useNavigate } from "react-router-dom";
import StarRating from "../Rating";
import Search from "../Search";
import useSearch from "../hooks/useSearch";
import FilmCard from "../Feed/FilmCard/FilmCard";

export default function Profile() {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({ status: "pending" });
  const [favouriteFilms, setFavouriteFilms] = useState({ status: "pending" });
  const [addFavourite, setAddFavourite] = useState(false);
  const [userPicks, setUserPicks] = useState([]);
  const { request, setRequest, setSearchForm, searchResRef } = useSearch();
  const [addImage, setAddImage] = useState(false);
  const [profileURL, setProfileURL] = useState({
    url: "",
  });
  const fileUploadRef = useRef()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getUser(user.id)
      .then(setUserProfile)
      .then(getUserFavouriteFilms(user.id).then(setFavouriteFilms));
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userPicks, addImage]);

  const checkProfileImg = (image) => {
    if (typeof image !== "string") {
      return;
    }
    return <img src={image} className="profile-pic" />;
  };

  const addProfilePic = () => {
    setAddImage(true);
  };


  const handleImgUpload = (e) => {
    e.preventDefault()
    fileUploadRef.current.click()
  };

  const uploadImageDisplay = () => {
    const uploadedImage = fileUploadRef.current.files[0]
    const cachedURL = URL.createObjectURL(uploadedImage)
    checkProfileImg(cachedURL)
    setAddImage(prev => !prev)
  }

  const goToFilm = (filmId) => {
    navigate(`/${filmId}`);
  };

  const submitProfile = () => {
    addUserFavouriteFilms(userPicks, user.id)
    setAddFavourite(false)
  };

  const countTotal = (arr) => {
    return arr.length;
  };

  const searchFilmToAdd = () => {
    setAddFavourite(true);
  };

  const handleClickOutside = (e) => {
    if (searchResRef.current && !searchResRef.current.contains(e.target)) {
      setSearchForm((prevForm) => ({ ...prevForm, filmTitle: "" }));
      setRequest({ results: [] });
      setAddFavourite(false);
    }
  };


  return (
    <div className="profile-page-container">
      <div className="profile-page-card">
        <div className="profile-page-header">
          <h1>Profile</h1>
        </div>
        {userProfile.status === "success" && (
          <div className="profile-photo-container">
            <div className="profile-photo">
              {!addImage && checkProfileImg(userProfile.data.user.profile.profilePic)}
              <form className="profile-photo-form">
                <input 
                  type="file"
                  className="profile-pic-input"
                  hidden
                  ref={fileUploadRef}
                  onChange={uploadImageDisplay}
                />
                <Button
                  text={<AddIcon />}
                  className="add-profile-pic-btn"
                  onClick={handleImgUpload}
                />
              </form>
            </div>
            <div className="username">
              <h2>{userProfile.data.user.username}</h2>
            </div>
            <div className="users-favourite-films-container">
                {userPicks.length === 4 &&
                <div className="submit-fav-films-container">
                    <Button text={"Add Favourites"} className={"add-profile-btn"} onClick={() => submitProfile()}/>
                </div>}
              <div className="users-favourite-films">
                <ul className="profile-films-list">
                  {favouriteFilms.status === "success"
                    ? Array.from({ length: 4 }).map((_, index) => {
                        const film =
                          favouriteFilms.data.favourites[index] ||
                          userPicks[
                            index - favouriteFilms.data.favourites.length
                          ];
                        return film ? (
                          <li
                            className="users-profile-films-list"
                            key={film.id}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500${
                                film.poster_path || film.film.poster
                              }`}
                              className="list-image"
                              onClick={() => goToFilm(film.id)}
                            />
                          </li>
                        ) : (
                          <li
                            className="users-profile-films-list"
                            key={`add-film-item-${index}`}
                          >
                            <Button
                              text={<AddIcon />}
                              className="add-favourite-film-btn"
                              onClick={() => searchFilmToAdd()}
                            />
                          </li>
                        );
                      })
                    : favouriteFilms.status === "fail" && userPicks.length > 0
                    ? Array.from({ length: 4 }).map((_, index) => {
                        const film = userPicks[index];
                        return film ? (
                          <li
                            className="users-profile-films-list"
                            key={film.id}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                              className="list-image"
                              onClick={() => goToFilm(film.id)}
                            />
                          </li>
                        ) : (
                          <li
                            className="users-profile-films-list"
                            key={`add-film-item-${index}`}
                          >
                            <Button
                              text={<AddIcon />}
                              className="add-favourite-film-btn"
                              onClick={() => searchFilmToAdd()}
                            />
                          </li>
                        );
                      })
                    : Array.from({ length: 4 }).map((_, index) => (
                        <li
                          className="users-profile-films-list"
                          key={`add-film-item-${index}`}
                        >
                          <Button
                            text={<AddIcon />}
                            className="add-favourite-film-btn"
                            onClick={() => searchFilmToAdd()}
                          />
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            <div className="recently-watched">
              <p>Recently watched</p>
              <ul className="profile-films-list">
                {Array.from({ length: 4}).map((_, index) => {
                  const latest = userProfile.data.user.reviews.toReversed()[index]
                    return latest ? (

                      <li className="users-profile-films-list" key={latest.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${latest.film.poster}`}
                            className="list-image"
                            onClick={() => goToFilm(latest.filmId)}
                          />
                          <div className="user-rating-container">
                            <StarRating userRating={latest.rating} />
                          </div>
                      </li>
                    ) : (
                      <li className="empty-profile-film-list" key={index}></li>
                    )
                })}
              </ul>
            </div>
            <div className="stats-container">
              {userProfile.status === "success" && (
                <ul className="user-stats-list">
                  <li className="user-stats">
                    <p>Total films:</p>
                    <p>{countTotal(userProfile.data.user.reviews)}</p>
                  </li>
                  <li className="user-stats">
                    <p>Watchlist:</p>
                    <p>{countTotal(userProfile.data.user.watchlist)}</p>
                  </li>
                  <li className="user-stats">
                    <p>Lists:</p>
                    <p>{countTotal(userProfile.data.user.lists)}</p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      {addFavourite && (
        <div className="search-films-to-add-container" ref={searchResRef}>
          <div className="search-film">
            <Search />
          </div>
          <div className="search-films-favourites">
            {request.results.length > 0 && addFavourite && (
              <div className="search-films-favourites-results">
                <ul className="search-films-favourite-list">
                  {request.results.map((film) => (
                    <FilmCard
                      film={film}
                      key={film.id}
                      styling={"search-result"}
                      usersFavouriteArr={setUserPicks}
                      favouritePicked={userPicks}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
