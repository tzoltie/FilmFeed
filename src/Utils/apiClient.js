import { API_URL } from "./constants"

const register = (email, password, username, firstName) => {
    const payload = {
        email: email,
        password: password,
        username: username,
        firstName: firstName
    }
    return post(payload, 'users/register', false)
}

const login = (email, password) => {
    const payload = {
        email: email,
        password: password
    }
    return post(payload, 'login', false)
}

async function post(payload, route, auth = true) {
    return apiRequest('POST', payload, route, auth)
}

async function apiRequest(method, data, route, auth = true) {
    const request = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
    }
    if(method.toUpperCase !== 'GET') {
        request.body = JSON.stringify(data)
    }
    if(auth) {
        request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }

    const response = await fetch(`${API_URL}/${route}`, request)
    const stringed = response.json()

    if(
        route === 'users/register' ||
        route === 'login'
    ) {
        localStorage.setItem('token', stringed.data.token)
    }
    
    return stringed
}

export { register, login }