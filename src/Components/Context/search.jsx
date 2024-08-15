import { createContext, useEffect, useState } from "react";
import { searchFilm } from "../../Utils/apiClient";
import exp from "constants";


const SearchContext = createContext()

function SearchProvider({ children }) {
    const [request, setRequest] = useState([])
    const [searchComplete, setSearchComplete] = useState(false)
    const [searchForm, setSearchForm] = useState({
        filmTitle: ""
    })
    useEffect(() => {
        const delayApiSearch = setTimeout(() => {
            searchFilm(searchForm.filmTitle).then(setRequest)
        }, 3000)
        setSearchComplete(true)
        return () => clearTimeout(delayApiSearch)
    }, [searchForm])
    
    const value = {
        request,
        setRequest,
        searchForm,
        setSearchForm,
        searchComplete
    }
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export { SearchContext, SearchProvider}