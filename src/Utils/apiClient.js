import { API_URL, TMDB_KEY, TMDB_URL } from "./constants.js"

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

const getUserWatchlist = (userId) => {
    return get(`watchlist/${userId}`, true)
}

const addFilmToWatchlist = (filmId, filmTitle, filmPoster, watchlistId) => {
    const payload = {
        title: filmTitle,
        filmId: filmId,
        poster: filmPoster
    }
    return post(payload, `watchlist/${watchlistId}`, true)
}

const getUsersLists = (userId) => {
    return get(`lists/${userId}`, true)
}
const getUsersListById = (id) => {
    return get(`lists/${id}`, true)
}

async function post(payload, route, auth = true) {
    return apiRequest('POST', payload, route, auth)
}

async function get(route, auth = true) {
    return apiRequest('GET', null, route, auth)
}

async function apiRequest(method, data, route, auth = true) {

    const request = {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
    }
    if(method.toUpperCase() !== 'GET') {
        request.body = JSON.stringify(data)
    }
    if(auth) {
        request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }

    const response = await fetch(`${API_URL}/${route}`, request)

    return response.json()
}

async function getFilmById(id) {
    return tmdbApiRequest(`movie/${id}`)
}

async function searchFilm(filmTitle) {
    return tmdbApiRequest(`search/movie?query=${filmTitle}`)
}

async function tmdbApiRequest(route) {
    const request = {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${TMDB_KEY}`,
          accept: "application/json",
        },
    }
    const response = await fetch(`${TMDB_URL}/${route}`, request)
    return response.json()
}

export { register, login, getUserWatchlist, addFilmToWatchlist, getUsersLists, getUsersListById, searchFilm, getFilmById }