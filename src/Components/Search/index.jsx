import { useMediaQuery } from "react-responsive"
import searchIcon from "../../assets/svg/search.svg"
import useSearch from "../hooks/useSearch"
import { useEffect } from "react"

export default function Search() {
    const { setSearchForm, searchForm } = useSearch()
    const isMobile = useMediaQuery({ query: "(max-width: 430px)"})

    useEffect(() => {
        updateMobileStyling()
    }, [])

    const filmOnChange = (e) => {
        const { name, value } = e.target
        setSearchForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    const updateMobileStyling = () => {
        if(isMobile) {
            const searchbar = document.getElementsByClassName("search-films-searchbar")[0]
            searchbar.style.width = "90%"
            searchbar.style.fontSize = "20px"
        }
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