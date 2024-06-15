/* eslint-disable react/prop-types */
export default function Crew({checkImage, film}) {

  function removeDuplicates(film) {
    if (typeof film !== 'object') {
      return <img className="profile-image"/>
    }
    const crew = film.credits.crew
    const dupsRemoved = [...new Set(crew)]
    return dupsRemoved
  }
    return (
        <div className="cast-crew-box">
            <h2 className="heading">Crew</h2>
            <ul className="crew-list">
              {film.length === 0 ? (
                <li></li>
              ) : (
              removeDuplicates(film).map((cast) => (
                <li key={cast.id} className="crew-list-item">
                    {checkImage(cast)}
                  <p>{cast.character}</p>
                  <h4>{cast.name}</h4>
                </li>
              )))}
            </ul>
          </div>
    )
}