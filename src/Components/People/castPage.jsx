import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styling.css";
import "../../styling/feed.css";
import FilmCard from "../Feed/FilmCard/FilmCard";
import { getProfile } from "../../Utils/apiClient";
import Button from "../Button";

export default function CastPage() {
  const [person, setPerson] = useState({id: ""});
  const urlPararms = useParams();
  const [showBio, setShowBio] = useState(false);
  const [allCredits, setAllCredits] = useState([]);
  const [showCredits, setShowCredits] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile(urlPararms.id).then(setPerson);
  }, [urlPararms.id, showCredits]);

  const shortenBio = (bio) => {
    if (typeof bio === "undefined") {
      return bio;
    }
    if (bio.length > 1000) {
      const shortenedBio = bio.slice(0, 1000);
      return `${shortenedBio}...`;
    }
    return bio;
  };

  const onClick = () => {
    setShowBio((prev) => !prev);
  };

  const removeDuplicates = (crewList) => {
    const newList = [];
    const filterCrewDups = crewList.forEach((role) => {
      if (!newList.includes(role.job)) {
        newList.push(role.job);
      }
    });
    return newList;
  };

  const onClickShowList = (role) => {
    if (typeof role === "string") {
      const found = person.combined_credits.crew.filter(
        (film) => film.job === role
      );
      if (found.length > 0) {
        const creditsFound = { credits: found };
        setAllCredits(creditsFound);
        setShowCredits(true)
      }
      
      return;
    }
    if (typeof role !== "string") {
      const castCredits = { credits: role };
      setAllCredits(castCredits);
      setShowCredits(true)
    }
    return;
  };

  const goToFilm = (film) => {
    navigate(`/${film}`)
  }

  const checkBio = (bio) => {
    if(bio.length === 0) {
      return "No bio available."
    }
    return bio
  }

  return (
    <>
      {typeof person.id === 'number' && (
        <div className="profile-container">
          <header className="profile-header">
            <div>
              <div>
                <h1>{person.name}</h1>
              </div>
            </div>
            <section className="profile-header-bio">
              <div className="profile-image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                  alt={`${person.name}'s profile image`}
                  id="persons_profile_img"
                />
              </div>
              <div className="bio-container" onClick={() => onClick()}>
                {!showBio ? (
                  <p>{shortenBio(person.biography)}</p>
                ) : (
                  <p>{checkBio(person.biography)}</p>
                )}
              </div>
            </section>
          </header>
          <section className="film-credits-list-container">
            <ul className="film-list">
              <div className="credits-container">
                {typeof person.combined_credits.crew !== 'undefined' &&
                person.combined_credits.crew.length > 0 &&
                person.combined_credits.cast.length > 0 ? (
                  <div className="crew-credits-list-container">
                    <div className="credits-scroll-box">
                      <ul className="credits-list">
                        <li className="credit-box">
                          <Button
                            text={<h2>Actor</h2>}
                            className={"credits-menu-btn"}
                            onClick={() => {
                              onClickShowList(person.combined_credits.cast);
                            }}
                          />
                        </li>
                        {removeDuplicates(person.combined_credits.crew).map(
                          (credits, index) => (
                            <li key={index} className="credit-box">
                              <Button
                                text={<h2>{credits}</h2>}
                                className={"credits-menu-btn"}
                                onClick={() => onClickShowList(credits)}
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ) : person.combined_credits.crew.length > 0 ? (
                  <ul className="credits-list">
                    {removeDuplicates(person.combined_credits.crew).map(
                      (credits, index) => (
                        <li key={index} className="credit-box">
                          <Button
                            text={<h2>{credits}</h2>}
                            className={"credits-menu-btn"}
                            onClick={() => onClickShowList(credits)}
                          />
                        </li>
                      )
                    )}
                  </ul>
                ) : person.combined_credits.cast.length > 0 ? (
                  <ul className="credits-list">
                    <li className="credit-box">
                      <Button
                        text={<h2>Actor</h2>}
                        className={"credits-menu-btn"}
                        onClick={() => {
                          onClickShowList(person.combined_credits.cast);
                        }}
                      />
                    </li>
                  </ul>
                ) : (
                  <div>No credits available</div>
                )}
              </div>
            </ul>
            <div className="credits-list-container">
            {
              typeof allCredits.credits !== "undefined" && typeof person.combined_credits.crew === 'undefined' && (
                person.combined_credits.crew.length === 0 &&
                    person.combined_credits.cast.length > 0 && (
                      <div className="actor-list-container">
                        {person.combined_credits.cast.map((film) => (
                          <li key={film.id}>
                            <img
                              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                              className="list-image"
                            />
                          </li>
                        ))}
                      </div>
                    )
              )}
              {showCredits &&
              <div className="actor-list-container">
              {allCredits.credits.map((film) =>
                    <li key={film.id} onClick={() => goToFilm(film.id)}>
                        <img 
                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        className="list-image"/>
                    </li>
                )}
                </div>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
