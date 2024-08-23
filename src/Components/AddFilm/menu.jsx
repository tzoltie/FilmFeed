import "./styling.css"
import AddIcon from "../Assets/Add"
import AddToListIcon from "../Assets/AddToList"
import AddToWatchList from "../Assets/AddToWatchlist"
import Expand from "../Assets/Expand"
import { useEffect, useRef, useState } from "react"
import Poster from "../Poster"

export default function AddFilmMenu({ setViewList, addToWatchlist, ratingSection, poster, toggleMenu }) {
    const menuRef = useRef()
    const [renderPoster, setRenderPoster] = useState(false)

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
            return addToWatchlist()
        }
        if(instruction === "rate") {
            return window.scrollTo({top: ratingSection.current, behavior: 'smooth'})
        }
        if(instruction === "poster") {
            setRenderPoster(true)
            return
        }
    }
    return (
        <>
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
        {renderPoster &&
        <>
            <Poster poster={poster}/>
        </>
        }
    </>
    )
}