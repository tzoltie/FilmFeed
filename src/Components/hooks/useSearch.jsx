import { useContext } from "react"
import { SearchContext } from "../Context/search"

const useSearch = () => {
    return useContext(SearchContext)
}

export default useSearch