export default function FilmDetails({film, styling}) {
    function updateToCurrency(number) {
        if(number === 0) {
          return "unavailable"
        }
        let value = Intl.NumberFormat('en-Us', { style: 'currency', currency: 'USD'}).format(number)
        return value
    }

  return (
    <div className={styling}>
      <section className="runtime-box">
        <h3>Runtime</h3>
        <p>{`${film.runtime} mins`}</p>
      </section>
      {film.genres.length > 0 &&
      <section className="genre-box">
        <h3>Genres</h3>
        <ul id="genre">
          {film.genres.map((i) => <li key={i.id}>{i.name}</li>)}
        </ul>
      </section>}
      <section className="status-box">
        <h3>Status</h3>
        <p>{film.status}</p>
      </section>
      <section className="budget-box">
        <h3>Budget</h3>
        <p>{updateToCurrency(film.budget)}</p>
      </section>
      <section className="revenue-box">
        <h3>Revenue</h3>
        <p>{updateToCurrency(film.revenue)}</p>
      </section>
      <section className="origin-box">
        <h3>Country of origin</h3>
        {film.length === 0 ? <p></p> : <p>{film.origin_country[0]}</p>}
      </section>
    </div>
  );
}
