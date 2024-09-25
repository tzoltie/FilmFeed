import FilmRating from "../Rating/filmRating";

export default function ListPageList({list, onClick, setShowRating, showRating, styling, posterId}) {
    return (
        <ul className={styling}>
            {list.map((film) => 
                <li key={film.id} onClick={() => onClick(film.id)} className="list-page-list-item" onMouseEnter={() => setShowRating(true)} onMouseLeave={() => setShowRating(false)}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${film.poster}`}
                        className="list-image"
                        id={posterId}
                    />
                    {showRating && <FilmRating film={film}/>}
                </li>)}
        </ul>
    )
}