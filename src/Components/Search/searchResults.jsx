import { useState } from "react";
import FilmCard from "../Feed/FilmCard/FilmCard";
import useSearch from "../hooks/useSearch";

export default function SearchResults({styling}) {
    const [searchComplete, setSearchComplete] = useState(false)
    const { request, setRequest, setSearchForm } = useSearch() 

    function searchResOnClick() {
        setRequest({results: []})
        setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
        setSearchComplete(true)
    }

    return (
        <div className={styling}>
            <ul className="search-results-list-dashboard" onClick={() => searchResOnClick()}>
                {request.results.map((film) => 
                <FilmCard film={film} key={film.id} styling={"search-result"}/>)}
            </ul>
        </div>
    )
}