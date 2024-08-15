export default function ListImage({films}) {
    return (
        <div className="list-image-container">
            {films.map(filmObj => 
            <img key={filmObj.film.id}
            src={`https://image.tmdb.org/t/p/w500${filmObj.film.poster}`}
            className="list-image"/>)}
        </div>
    )
}