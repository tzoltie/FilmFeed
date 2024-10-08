import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import back from "../../assets/svg/backarrow.svg";
import { getFilmImagesById } from "../../Utils/apiClient";

export default function Images() {
  const [film, setFilm] = useState({});
  const urlPararms = useParams();

  useEffect(() => {
    getFilmImagesById(urlPararms.id).then(setFilm)
  }, [urlPararms]);

  return (
    <div>
      {typeof film !== 'undefined' && (
        <>
        <Link to={`/${film.id}`}>
            <img src={back} className="icon" id="back" />
        </Link>
          <div className="images-container">
            <section className="posters-box">
              <h2>Posters</h2>
              <ul className="film-image-list">
                {film.length === 0 ? (
                  <li></li>
                ) : (
                film?.images.posters.map((image, index) => (
                  <li key={index}>
                    <img
                      src={`http://image.tmdb.org/t/p/w92${image.file_path}`}
                      alt="poster"
                    />
                  </li>
                )))}
              </ul>
            </section>
            <section className="backdrops-box">
              <h2>Backdrops</h2>
              <ul className="film-image-list">
              {film.length === 0 ? (
                  <li></li>
                ) : (
                film?.images.backdrops.map((image, index) => (
                  <li key={index}>
                    <img
                      src={`http://image.tmdb.org/t/p/w92${image.file_path}`}
                      alt="backdrop images"
                    />
                  </li>
                )))}
              </ul>
            </section>
            <section className="logos-box">
              <h2>Worldwide Logos</h2>
              <ul className="film-image-list">
              {film.length === 0 ? (
                  <li></li>
                ) : (
                film?.images.logos.map((image, index) => (
                  <li key={index}>
                    <img
                      src={`http://image.tmdb.org/t/p/w92${image.file_path}`}
                      alt="backdrop images"
                    />
                  </li>
                )))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
