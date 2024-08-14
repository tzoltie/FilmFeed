import { useEffect, useState } from "react"
import searchIcon from "../../assets/svg/search.svg"
import { searchFilm } from "../../Utils/apiClient"
import FilmCard from "../Feed/FilmCard/FilmCard"

export default function Search() {
    const [request, setRequest] = useState([])
    const [listsFilms, setListsFilms] = useState([])
    const [addedFilms, setAddedFilms] = useState([])
    const [searchComplete, setSearchComplete] = useState(false)
    const [listPage, setListPage] = useState(true)
    const [searchForm, setSearchForm] = useState({
        filmTitle: ""
    })

    // useEffect(() => {
    //     const delayApiSearch = setTimeout(() => {
    //         searchFilm(searchForm.filmTitle).then(setRequest)
    //     }, 5000)
    //     setSearchComplete(true)
    //     return () => clearTimeout(delayApiSearch)
    // }, [searchForm])

    const filmOnChange = (e) => {
        const { name, value } = e.target
        setSearchForm({ [name]: value })
    }

    const displayListFilms = () => {
        const currentUrl =  window.location.href
        if(currentUrl.includes("/lists")) {
            // return <div className="lists-films-container">
            //     <ul className="newlist-films-list">
            //         {addedFilms.map((film) => 
            //         <FilmCard film={film} key={film.id} styling={"search-result"}/>)}
            //     </ul>
            // </div>
        }
    }
    const addFilmOnClick = (film) => {
        setAddedFilms([...addedFilms, film])
    }
    const film = [{id: 1, original_title: "The Batman", release_date: 2021}, {id: 2, original_title: "James Bond"}, {id: 3, original_title: "Blade Runner", release_date: 1984}, {id: 4, original_title: "The Batman", release_date: 2021}]

    return (
        <div className="searchbar-results-container">
        <div className="searchbar-container">
            <input 
            type="text"
            value={searchForm.film}
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
            {displayListFilms}
        </div>
        {!searchComplete &&
        <div className="search-results-container">
            <ul className="search-results-list">
                {/* {request.results.map((film) => 
                <FilmCard film={film} key={film.id}/>)} */}
                <FilmCard film={film[0]} styling={"search-result"} onClick={addFilmOnClick}/>
                <FilmCard film={film[1]} styling={"search-result"} onClick={addFilmOnClick}/>
                <FilmCard film={film[2]} styling={"search-result"} onClick={addFilmOnClick}/>
                <FilmCard film={film[2]} styling={"search-result"} onClick={addFilmOnClick}/>
            </ul>
        </div>}
        </div>
    )
}