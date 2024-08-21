import ListPage from "../UsersList/listPage";

function FilmList({loggedInUser, list, results}) {
    console.log(results)
    return (
        <>
            <header className="list-heading">
                <h2>{`${loggedInUser.profile.name}'s`} {list}</h2>
            </header>
            <main>
            {results.status === "pending" || results.status === "fail" &&
            <div className="error-heading-container">
                <h2>Could not fetch your list</h2>
            </div>}
                {results.data.watchlist.length < 1 ? (
                <div className="empty-watchlist-container">
                    <div className="empty-watchlist-header">
                        <h3>{loggedInUser.username}, add films to your list</h3>
                    </div>
                    <div>
                        <ul className="empty-watchlist-list">
                        {results.data.watchlist.map((li, index) => 
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