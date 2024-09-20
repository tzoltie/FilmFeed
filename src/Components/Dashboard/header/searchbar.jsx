import Search from "../../Search";
import SearchResults from "../../Search/searchResults";
import search from '../../../assets/svg/search.svg'

export default function Searchbar({searchResRef, userSearch, request, onClick}) {
    return (
        <section className='search-bar-container-dashboard' ref={searchResRef}>
            {!userSearch &&
            <div className="search-bar-icon-container">
                <img 
                src={search} 
                className='icon' 
                id='search'
                onClick={onClick}/>
            </div>}
            {userSearch &&
            <Search />}
            {request.results.length > 0 && userSearch &&
            <SearchResults styling={"search-results-container-dashboard"}/>}
        </section>
    )
}