import Search from "../../Search";
import search from "../../../assets/svg/search.svg"
import { useNavigate } from "react-router-dom";

export default function MobileSearchbar({searchResRef, userSearch, setUserSearch, request, onClick, appTitle, mobileDashSearchbar}) {
    const navigate = useNavigate()

    const searchResults = () => {
        navigate("/search-result")
        setUserSearch(false)
        appTitle[0].style.display = ""
        mobileDashSearchbar[0].style.width = "85%"
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