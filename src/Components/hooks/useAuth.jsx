import { useContext } from "react"
import { AuthContext } from "../Context/auth.jsx"

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth