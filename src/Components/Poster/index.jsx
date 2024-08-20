import "./styling.css"

export default function Poster({poster}) {
    return (
        <div className="poster-overlay">
            <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            className="poster"
            id="large-poster"
            />
        </div>
    )
}