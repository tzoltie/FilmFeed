import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ERR from "../../Utils/error";
import { login, register } from "../../Utils/apiClient";

const AuthContext = createContext()

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [loggedInUser, setloggedInUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if(storedToken) {
            setToken(storedToken)
            navigate({
                pathname: location?.pathname || "/home"
            })
        }
    }, [location?.pathname])

    async function handleRegister(email, password, username, firstName) {

        try {
            const checkEmail = isEmailValid(email)
        if(!email || !checkEmail) {
            throw new Error(ERR.EMAIL_REQUIRED)
        }
        if(!password) {
            throw new Error(ERR.PASSWORD_INVALID)
        }
        if(!username) {
            throw new Error(ERR.USERNAME_INVALID)
        }
        if(!firstName) {
            throw new Error(ERR.NAME_REQUIRED)
        }
    
        const res = await register(email, password, username, firstName)
        if(res.data.error) {
            const error = res.data.error
            return alert(error)
        }
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setloggedInUser(res.data.user)
        setIsLoggedIn(true)
        
        navigate({
            pathname: '/home'
        })
        } catch(err) {
            alert(err.message)
        }
        
    }
    
    async function handleLogin(email, password) {
        try {
            if(!email) {
                throw new Error(ERR.EMAIL_MISSING)
            }
            if(!password) {
                throw new Error(ERR.PASSWORD_MISSING)
            }
        
            const res = await login(email, password)
            if(res.data.error) {
                const error = res.data.error
                return alert(error)
            }
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setloggedInUser(res.data.user)
            setIsLoggedIn(true)
            navigate({
                pathname: '/home'
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setloggedInUser(null)
        setIsLoggedIn(false)
    }
    
    const isEmailValid = (email) => {
        const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        return regEx.test(email)
    }

    const value = {
        token,
        loggedInUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister,
        setToken,
        setloggedInUser,
        setIsLoggedIn,
        isLoggedIn
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }