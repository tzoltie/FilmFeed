import { useEffect, useState } from "react";
import FilmCard from "../Feed/FilmCard/FilmCard";
import SearchResList from "./searchResList";

export default function SearchResListContainer({ searchResRef, request, searchComplete, addedFilms, setAddedFilms, isMobile}) {
    const [searching, setSearching] = useState(true)

    useEffect(() => {
        updateMobileStyling()
    }, [searching, addedFilms])

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

    const updateMobileStyling = () => {
        if(isMobile && addedFilms.length > 0) {
            setSearching(false)
            const addToListBtn = document.getElementsByClassName("add-to-list-button")
            const addToListBtnArr = Array.from(addToListBtn)
            addToListBtnArr.forEach((btn) => {
                btn.style.width = "350px"
                btn.style.left = "70%"
                btn.style.borderBottom = "1px solid #FF5733"
            })
        }
    }

  return (
    <div className="search-results-container" ref={searchResRef}>
     {isMobile ? (
    <>
    {searching &&
      <SearchResList request={request} searchComplete={searchComplete} addedFilms={addedFilms} setAddedFilms={setAddedFilms}/>}
    {addedFilms?.length > 0 && !searching && displayListFilms()}
    </>
    ) : (
        <>
        <SearchResList request={request} searchComplete={searchComplete} addedFilms={addedFilms} setAddedFilms={setAddedFilms}/>
        {addedFilms?.length > 0 && displayListFilms()}
        </>
    )}
    </div>
  );
}
