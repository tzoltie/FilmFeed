import { useState } from "react";
import FilmCard from "../Feed/FilmCard/FilmCard";
import useSearch from "../hooks/useSearch";

export default function SearchResults({styling}) {
    const [searchComplete, setSearchComplete] = useState(false)
    const { request, setRequest, setSearchForm, searchResRef } = useSearch() 

    function searchResOnClick() {
        setRequest({results: []})
        setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
        setSearchComplete(true)
    }

    return (
        <div className={styling}>
            <ul className="search-results-list-dashboard" onClick={() => searchResOnClick()} ref={searchResRef}>
                {request.results.map((film) => 
                <FilmCard film={film} key={film.id} styling={"search-result"}/>)}
            </ul>
        </div>
    )
}