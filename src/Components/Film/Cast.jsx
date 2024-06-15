/* eslint-disable react/prop-types */
export default function Cast({film, checkImage}) {
  if (typeof film !== 'object') {
    return <img className="profile-image"/>
  }

    return (
        <div className="cast-crew-box">
            <h2 className="heading">Cast</h2>
            <ul className="cast-list">
              {film.length === 0 ? (
                <li></li>
              ) : (
              film.credits.cast.map((cast) => (
                <li key={cast.id} className="cast-list-item">
                    {checkImage(cast)}
                  <p>{cast.character}</p>
                  <h4>{cast.name}</h4>
                </li>
              )))}
            </ul>
          </div>
    )
}