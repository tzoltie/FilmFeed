/* eslint-disable react/prop-types */
export default function Crew({checkImage, film}) {
  const filmExists = typeof film === 'object' && !Array.isArray(film)

  function removeDuplicates(film) {
    const crew = film.credits.crew
    const dupsRemoved = [...new Set(crew)]
    return dupsRemoved
  }
  
    return (
        <div className="cast-crew-box">
            <h2 className="heading">Crew</h2>
            <ul className="crew-list">
              {!filmExists ? (
                <li></li>
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