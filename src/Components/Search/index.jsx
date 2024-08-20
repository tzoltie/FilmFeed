import searchIcon from "../../assets/svg/search.svg"
import useSearch from "../hooks/useSearch"

export default function Search() {
    const { setSearchForm, searchForm } = useSearch()

    const filmOnChange = (e) => {
        const { name, value } = e.target
        setSearchForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    return (
        <div className="searchbar-results-container">
            <div className="searchbar-container">
                <input 
                type="text"
                value={searchForm.filmTitle || ""}
                name="filmTitle"
                placeholder="Search films"
                onChange={filmOnChange}
                className="search-films-searchbar"
                />
                <img 
                src={searchIcon}
                className="icon"
                id="searchFilm-icon"
                />
            </div>
        </div>
    )
}