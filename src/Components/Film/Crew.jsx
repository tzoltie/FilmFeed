/* eslint-disable react/prop-types */
export default function Cast({film, checkImage, removeDuplicates}) {

    return (
        <div className="cast-crew-box">
            <h2 className="heading">Crew</h2>
            <ul className="crew-list">
              {removeDuplicates.map((cast) => (
                <li key={cast.id} className="crew-list-item">
                    {checkImage(cast)}
                  <p>{cast.character}</p>
                  <h4>{cast.name}</h4>
                </li>
              ))}
            </ul>
          </div>
    )
}