import ListPage from "../UsersList/listPage";

function FilmList({loggedInUser, list, results}) {
    return (
        <>
            <header className="list-heading">
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
                    <ListPage list={results.data.watchlist}/>
                )}
            </main>
        </>
    )
}

export { FilmList }