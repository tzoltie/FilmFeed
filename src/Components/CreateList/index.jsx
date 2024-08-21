import { useState } from "react"
import Button from "../Button"
import "../UsersList/styling.css"
import "./styling.css"
import Add from "../AddFilm"
import Search from "../Search"
import DoneCheck from "../Assets/Done"
import FilmCard from "../Feed/FilmCard/FilmCard"
import useSearch from "../hooks/useSearch"
import { addMultiFilmsList } from "../../Utils/apiClient"
import { useLocation } from "react-router-dom"

export default function CreateList({ setNewList, setListsUpdated }) {
    const { request, setRequest, searchResRef } = useSearch()
    const location = useLocation()
    const [newFilm, setNewFilm] = useState(false)
    const [addList, setAddList] = useState(false)
    const [addedFilms, setAddedFilms] = useState([])
    const [searchComplete, setSearchComplete] = useState(false)
    const [newListForm, setNewListForm] = useState({
        listTitle: ""
    })

    const titleOnChange = (e) => {
        const { name, value } = e.target
        setNewListForm({ [name]: value })
        setAddList(true)
    }

    const onClick = () => {
        setNewFilm(true)
    }

    const listComplete = () => {
        addMultiFilmsList(newListForm.listTitle, addedFilms)
        setNewFilm(false)
        setAddList(false)
        setNewListForm({
            listTitle: ""
        })
        setNewList(false)
        setSearchComplete(false)
        setListsUpdated(true)
        setRequest([])
    }

    const displayListFilms = () => {
        if(location.pathname === "/lists") {
            return <div className="lists-films-container">
                <ul className="newlist-films-list">
                    {addedFilms.map((film) => {
                    const inList = addedFilms.some((addedFilm) => addedFilm.id === film.id)
                    return <FilmCard film={film} key={film.id} styling={"new-film"} addFilm={setAddedFilms} currentFilms={addedFilms} inList={inList}/>})}
                </ul>
            </div>
        }
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
                    onChange={titleOnChange}
                    />
                    {addList &&
                    <Button text={<DoneCheck />} onClick={listComplete} className={"list-complete-btn"}/>}
                </header>
                <main className="search-container">
                    {!newFilm &&
                        <Button text={<Add />} className="add-film-to-list-btn" onClick={onClick}/>
                    }
                    {newFilm &&
                    <div className="addFilmToList-container">
                        <Search />
                        
                        <div className="search-results-container" ref={searchResRef}>
                            <ul className="search-results-list">
                            {request.results.length < 1 && !searchComplete &&
                                <li>No results found</li>}
                        {request.results.length > 0 &&
                            request.results.map((film) => {
                                const inList = addedFilms.some((addedFilm) => addedFilm.id === film.id)
                                return <FilmCard film={film} key={film.id} styling={"search-result"} addFilm={setAddedFilms} currentFilms={addedFilms} inList={inList}/>})}
                            </ul>
                            {addedFilms?.length > 0 && displayListFilms()}
                        </div>
                    </div>}
                </main>
            </div>
        </div>
    )
}