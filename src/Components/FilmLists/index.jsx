import FilmCard from "../Feed/FilmCard/FilmCard";

function FilmList({loggedInUser, list, results}) {
    console.log(results)
    return (
        <>
            <header>
                <h2>{`${loggedInUser.profile.name}'s`} {list}</h2>
            </header>
            <main>
                {results.status === "pending" || results.status === "fail" ? (
                <div className="empty-watchlist-container">
                    <div className="empty-watchlist-header">
                        <h3>{loggedInUser.username}, add films to your list</h3>
                    </div>
                    <div>
                        <ul className="empty-watchlist-list">
                        {results.map((li, index) => 
                            <li key={index} className="empty-watchlist-item"></li>)}
                        </ul>
                    </div>
                </div>
                ) : (
                    <div className="watchlist-container">
                        <ul className="watchlist-list">
                        {results.data.watchlist.map((film) => 
                            <FilmCard film={film} key={film.id}/>)}
                        </ul>
                    </div>
                )}
            </main>
        </>
    )
}

export { FilmList }