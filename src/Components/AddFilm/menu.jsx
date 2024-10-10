import "./styling.css"
import AddIcon from "../Assets/Add"
import AddToListIcon from "../Assets/AddToList"
import AddToWatchList from "../Assets/AddToWatchlist"
import Expand from "../Assets/Expand"
import { useEffect, useRef, useState } from "react"
import Poster from "../Poster"
import { useMediaQuery } from "react-responsive"

export default function AddFilmMenu({ setViewList, addToWatchlist, ratingSection, poster, toggleMenu, styling }) {
    const menuRef = useRef()
    const [renderPoster, setRenderPoster] = useState(false)
    const isMobile = useMediaQuery({ query: "(max-width: 430px)"})

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        updateStylingMobile()
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        
    }, [renderPoster])

    const handleClickOutside = (e) => {
        if(
            menuRef.current &&
            !menuRef.current.contains(e.target)
        ) {
            toggleMenu(false)
            const filmPageContainer = document.getElementsByClassName("film-page-container")[0]
            filmPageContainer.style.opacity = "1"
        }
    }

    const onClick = async (instruction) => {
        if(instruction === "list") {
            setViewList(true)
        }
        if(instruction === "watchlist") {
            toggleMenu(false)
            return addToWatchlist()
        }
        if(instruction === "rate") {
            toggleMenu(false)
            return window.scrollTo({top: ratingSection.current, behavior: 'smooth'})
        }
        if(instruction === "poster") {
            setRenderPoster(true)
            const filmPageContainer = document.getElementsByClassName("film-page-container")[0]
            filmPageContainer.style.opacity = "0.33"
            const poster = document.getElementById("large-poster")
            poster.style.opacity = "1"
            return;
        }
    }

    const updateStylingMobile = () => {
        if(renderPoster && isMobile) {
            const posterContainer = document.getElementsByClassName("poster-overlay")[0]
            posterContainer.style.top = "15%"
            posterContainer.style.left = "8%"
            const poster = document.getElementById("large-poster")
            poster.style.height = "550px"
        }
    }

    return (
        <>
        <div className={styling} ref={menuRef}>
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