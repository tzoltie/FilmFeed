import { useEffect, useState } from "react"
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
import { useMediaQuery } from "react-responsive"
import SearchResList from "./searchRes"
import SearchResListContainer from "./searchRes"

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
    const isMobile = useMediaQuery({ query: '(max-width: 430px)' })

    useEffect(() => {
        updateStylingMobile()
    }, [newFilm, request])

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
        setListsUpdated(prev => !prev)
        setAddedFilms([])
        setRequest({results: []})
    }


    const updateStylingMobile = () => {
        if(isMobile) {
            const newListBox = document.getElementsByClassName("empty-list-item")[0]
            newListBox.style.width = "100%"
            const listTitleContainer = document.getElementsByClassName("empty-list-item-header")[0]
            listTitleContainer.style.width = "100%"
            const listTitle = document.getElementsByClassName("listTitle-input")[0]
            listTitle.style.width = "88%"
        }
        if(isMobile && newFilm) {
            const searchbarContainer = document.getElementsByClassName("searchbar-results-container")[0]
            searchbarContainer.style.width = "100%"
            const searchbar = document.getElementsByClassName("search-films-searchbar")[0]
            searchbar.style.width = "90%"
        }
        if(isMobile && request.results.length > 0) {
            const searchResultFilmTitle = document.getElementsByClassName("search-result-title-container")
            const searchResArr = Array.from(searchResultFilmTitle)
            searchResArr.forEach((li) => {li.style.padding = "0.25rem"})

            const addToListBtn = document.getElementsByClassName("add-to-list-button")
            const addToListBtnArr = Array.from(addToListBtn)
            addToListBtnArr.forEach((btn) => {
                btn.style.width = "350px"
                btn.style.left = "70%"
                btn.style.borderBottom = "1px solid #FF5733"
            })

            const searchResContainer = document.getElementsByClassName("search-results-container")
            const searchResContArr = Array.from(searchResContainer)
            searchResContArr.forEach((cont) => { cont.style.gridTemplateColumns = "1fr 0.5fr"})

            const searchResLi = document.getElementsByClassName("search-result-list-item")
            const searchResLiArr = Array.from(searchResLi)
            searchResLiArr.forEach((li) => li.style.borderBottom = "0")
        }
    }

    return (
        <div className="new-list-container">
            <div className="empty-list-item">
                <header className="empty-list-item-header">
                    <input
                    placeholder="List title"
                    className="listTitle-input"
                    name="listTitle"
                    value={newListForm.listTitle}
                    required
                    onChange={titleOnChange}
                    />
                    {addList &&
                    <Button text={<DoneCheck />} onClick={() => listComplete()} className={"list-complete-btn"}/>}
                </header>
                <main className="search-container">
                    {!newFilm &&
                        <Button text={<Add />} className="add-film-to-list-btn" onClick={onClick}/>
                    }
                    {newFilm &&
                    <div className="addFilmToList-container">
                        <Search />
                        
                        <SearchResListContainer searchResRef={searchResRef} request={request} searchComplete={searchComplete} addedFilms={addedFilms} setAddedFilms={setAddedFilms} isMobile={isMobile}/>
                    </div>}
                </main>
            </div>
        </div>
    )
}