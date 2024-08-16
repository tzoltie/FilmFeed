import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function Cast({film, checkImage}) {
  const filmExists = typeof film === 'object' && !Array.isArray(film)
  if (typeof film !== 'object') {
    return <img className="profile-image"/>
  }

    return (
        <div className="cast-crew-box">
            <h2 className="heading">Cast</h2>
            <ul className="cast-list">
              {!filmExists ? (
                <img className="profile-image"/>
              ) : (
              film.credits.cast.map((cast) => (
                  <li key={cast.id} className="cast-list-item">
                    <Link to={`/${cast.id}/cast&crew`}>
                    {checkImage(cast)}
                    <p>{cast.character}</p>
                    <h4>{cast.name}</h4>
                    </Link>
                  </li>
              )))}
            </ul>
          </div>
    )
}