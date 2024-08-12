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
                <p></p>
              ) : (
              removeDuplicates(film).map((crew, index) => (
                <li key={index} className="crew-list-item">
                    {checkImage(crew)}
                  <p>{crew.job}</p>
                  <h4>{crew.name}</h4>
                </li>
              )))}
            </ul>
          </div>
    )
}