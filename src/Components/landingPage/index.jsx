import { useEffect } from "react";
import Login from "../User/login.jsx";
import useAuth from "../hooks/useAuth.jsx";

export default function LandingPage() {
    const { setToken, setloggedInUser } = useAuth()
    

    useEffect(() => {
        localStorage.removeItem('token')
        setToken(null)
        setloggedInUser(null)
    })
    

    return (
        <div className="landing-page-container">
            <Login />
        </div>
    )
}