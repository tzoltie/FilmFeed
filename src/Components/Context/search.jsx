import { createContext, useEffect, useState } from "react";
import { searchFilm } from "../../Utils/apiClient";


const SearchContext = createContext()

function SearchProvider({ children }) {
    const [request, setRequest] = useState({results: []})
    const [searchComplete, setSearchComplete] = useState(false)
    const [searchForm, setSearchForm] = useState({
        filmTitle: ""
    })
    useEffect(() => {
        const delayApiSearch = setTimeout(() => {
            searchFilm(searchForm.filmTitle).then(setRequest)
            .finally(setSearchComplete(true))
        }, 2000)
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