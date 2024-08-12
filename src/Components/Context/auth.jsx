import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ERR from "../../Utils/error";
import { login, register } from "../../Utils/apiClient";

const AuthContext = createContext()

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if(storedToken) {
            setToken(storedToken)
            navigate(location?.pathname || "/")
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
        localStorage.setItem('token', token)
        setUser(res.data.user)
        
        navigate('/')
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
            console.log(res)
            if(res.data.error) {
                const error = res.data.error
                return alert(error)
            }
            setToken(res.data.token)
            localStorage.setItem('token', token)
            setUser(res.data.user)
            navigate('/')
        } catch (err) {
            alert(err.message)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }
    
    const isEmailValid = (email) => {
        const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        return regEx.test(email)
    }

    const value = {
        token,
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister: handleRegister
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }