import FilmCard from "../Feed/FilmCard/FilmCard";

export default function SearchResList({request, searchComplete, addedFilms, setAddedFilms}) {
    return (
        <ul className="search-results-list">
        {request.results.length < 1 && searchComplete && (
          <li>No results found</li>
        )}
        {request.results.length > 0 &&
          request.results.map((film) => {
            const inList = addedFilms.some(
              (addedFilm) => addedFilm.id === film.id
            );
            return (
              <FilmCard
                film={film}
                key={film.id}
                styling={"search-result"}
                addFilm={setAddedFilms}
                currentFilms={addedFilms}
                inList={inList}
              />
            );
          })}
      </ul>
    )
}