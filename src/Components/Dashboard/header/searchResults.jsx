import useSearch from "../../hooks/useSearch";
import SearchResults from "../../Search/searchResults";
import "./styling.css"

export default function SearchResultsDash() {
    const { request } = useSearch()
    return (
        <div className="mobile-search-res-container">
            {request.results.length > 0 ?
            <SearchResults styling={"search-results-container-dashboard-mobile"}/> :
            <div className="search-res-unsuccessful-container">
                <h2>No results found, try searching for something else.</h2>
            </div>}
        </div>
    )
}