import { Link } from "react-router-dom"

export default function Cast({list, checkImage}) {

    return (
        <div className="cast-box">
            <h2 className="heading">Cast</h2>
            <ul className="cast-list">
              {list.map((cast) => (
                  <li key={cast.id} className="cast-list-item">
                    <Link to={`/${cast.id}/cast&crew`} className="link">
                    {checkImage(cast)}
                    <p>{cast.character}</p>
                    <h4>{cast.name}</h4>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
    )
}