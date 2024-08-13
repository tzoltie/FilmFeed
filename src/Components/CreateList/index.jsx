import { useEffect, useState } from "react"
import Button from "../Button"
import "../UsersList/styling.css"
import "./styling.css"
import Add from "../AddFilm"
import searchIcon from "../../assets/svg/search.svg"
import { searchFilm } from "../../Utils/apiClient"
import FilmCard from "../Feed/FilmCard/FilmCard"

export default function CreateList() {
    const [newFilm, setNewFilm] = useState(false)
    const [results, setResults] = useState([])
    const [newListForm, setNewListForm] = useState({
        listTitle: ""
    })
    const [searchForm, setSearchForm] = useState({
        film: ""
    })
   
    useEffect(() => {

    }, [results])

    const titleonChange = (e) => {
        const { name, value } = e.target
        setNewListForm({ [name]: value })
    }

    const filmOnChange = (e) => {
        const { name, value } = e.target
        setSearchForm({ [name]: value })
    }

    const onClick = () => {
        setNewFilm(true)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        searchFilm(searchForm.filmTitle).then(setResults)
        console.log(results)
    }

    return (
        <div className="new-list-container">
            <div className="empty-list-item">
                <header>
                    <input
                    placeholder="List title"
                    className="listTitle-input"
                    name="listTitle"
                    value={newListForm.listTitle}
                    required
                    onChange={titleonChange}
                    />
                </header>
                <main>
                    {!newFilm &&
                        <Button text={Add} className="add-film-to-list-btn" onClick={onClick}/>
                    }
                    {newFilm &&
                    <div className="addFilmToList-container">
                        <header>
                            <div className="addFilm-header">
                                <form onSubmit={onSubmit}>
                                    <input 
                                    type="text"
                                    value={searchForm.film}
                                    name="filmTitle"
                                    placeholder="Search films"
                                    onChange={filmOnChange}
                                    className="search-films-searchbar"
                                    />
                                </form>
                                <img 
                                src={searchIcon}
                                className="icon"
                                id="searchFilm-icon"/>
                            </div>
                        </header>
                    </div>
                    }
                </main>
                
            </div>
            {results > 1 &&
            <aside className="results-container">
                <ul>
                {results.map((film) =>
                 <FilmCard film={film} key={film.id}/>
                )}
                </ul>
            </aside>}
        </div>
    )
}