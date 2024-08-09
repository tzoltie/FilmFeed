import { useNavigate } from 'react-router-dom'
import ERR from '../Utils/error'
import { login, register } from './apiClient'



async function HandleRegister(email, password, username, firstName) {
    const navigate = useNavigate()

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
        return alert(error.message)
    }
    const token = res.data.token
    localStorage.setItem('token', token)
    const localstore = localStorage.getItem('token')
    console.log(localstore)
    navigate('/')
}

async function HandleLogin(email, password) {
    const navigate = useNavigate()
    if(!email) {
        throw new Error(ERR.EMAIL_MISSING)
    }
    if(!password) {
        throw new Error(ERR.PASSWORD_MISSING)
    }

    const res = await login(email, password)
    if(res.data.error) {
        const error = res.data.error
        return alert(error.message)
    }
    const token = res.data.token
    localStorage.setItem('token', token)
    navigate('/')
}

function isEmailValid(email) {
    const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    return regEx.test(email)
}

export {
    HandleRegister,
    HandleLogin
}