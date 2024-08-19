import { Link } from "react-router-dom"

export default function Crew({checkImage, list}) {

  function removeDuplicates(list) {
    const dupsRemoved = [...new Set(list)]
    return dupsRemoved
  }
  
    return (
        <div className="cast-crew-box">
            <h2 className="heading">Crew</h2>
            <ul className="crew-list">
              {removeDuplicates(list).map((crew, index) => (
                <li key={index} className="crew-list-item">
                  <Link to={`/${crew.id}/cast&crew`} className="link">
                  {checkImage(crew)}
                  <p>{crew.job}</p>
                  <h4>{crew.name}</h4>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
    )
}