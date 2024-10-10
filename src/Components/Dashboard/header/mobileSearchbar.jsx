import Search from "../../Search";
import search from "../../../assets/svg/search.svg"
import { useNavigate } from "react-router-dom";

export default function MobileSearchbar({searchResRef, userSearch, request, onClick}) {
    const navigate = useNavigate()

    const searchResults = () => {
        if(request.results.length > 0 && userSearch) {
            navigate('/search-result')
        }
    }
    

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
            {userSearch && request.results.length > 0 && searchResults()}
        </section>
    )
}