import { Link } from "react-router-dom"
import "./styling.css"
import AddIcon from "../Assets/Add"
import AddToListIcon from "../Assets/AddToList"
import AddToWatchList from "../Assets/AddToWatchlist"
import Expand from "../Assets/Expand"
import { useEffect, useRef } from "react"

export default function AddFilmMenu({ setViewList, addToWatchlist, ratingSection, poster, toggleMenu }) {
    const menuRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = (e) => {
        if(
            menuRef.current &&
            !menuRef.current.contains(e.target)
        ) {
            toggleMenu(false)
        }
    }

    const onClick = async (instruction) => {
        if(instruction === "list") {
            setViewList(true)
        }
        if(instruction === "watchlist") {
            return addToWatchlist
        }
        if(instruction === "rate") {
            return window.scrollTo({top: ratingSection.current, behavior: 'smooth'})
        }
        if(instruction === "poster") {
            return <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            className="poster"
            id="page-poster"
          />
        }
    }
    return (
        <div className="add-film-popup" ref={menuRef}>
            <ul className="popup-list">
                <li className="popup-list-item" onClick={() => onClick("list")}>
                    <div className="menu-item">
                        <AddToListIcon />
                        <h4 className="popup-heading">Add to a list</h4>
                    </div>
                </li>
                <li className="popup-list-item" onClick={() => onClick("watchlist")}>
                    <div className="menu-item">
                        <AddToWatchList />
                        <h4 className="popup-heading">Add to watchlist</h4>
                    </div>
                </li>
                <li className="popup-list-item" onClick={() => onClick("rate")}>
                    <div className="menu-item">
                        <AddIcon />
                        <h4 className="popup-heading">Rate</h4>
                    </div>
                </li>
                <li className="popup-list-item" onClick={() => onClick("poster")}>
                    <div className="menu-item">
                        <Expand />
                        <h4 className="popup-heading">View Poster</h4>
                    </div>
                </li>
            </ul>
        </div>
    )
}