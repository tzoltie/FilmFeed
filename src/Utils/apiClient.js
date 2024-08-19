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

const addRating = (review, filmId, film) => {
    const {
        content,
        rating
    } = review

    const payload = {
        content: content,
        rating: rating,
        film: film
    }

    return post(payload, `reviews/${filmId}`, true)
}

const getUserRating = (filmId) => {
    return get(`reviews/film/${filmId}`, true)
}

const getUserDiary = () => {
    return get('reviews/user', true)
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
    return post(payload, `watchlist/${watchlistId}/add`, true)
}

const getUsersLists = (userId) => {
    return get(`lists/${userId}`, true)
}

const getUsersListById = (id) => {
    return get(`lists/${id}`, true)
}

const addMultiFilmsList = (listTitle, filmsArr) => {
    const payload = {
        title: listTitle,
        films: filmsArr
    }
    return post(payload, 'lists/newList', true)
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
    return tmdbApiRequest(`movie/${id}?append_to_response=credits&language=en-US`)
}

async function searchFilm(filmTitle) {
    return tmdbApiRequest(`search/movie?query=${filmTitle}`)
}

async function getTmdbPopularList() {
    return tmdbApiRequest('movie/popular?language=en-US&page=1?')
}

async function getTmdbTopRatedList() {
    return tmdbApiRequest('movie/top_rated?language=en&page=1?')
}

async function getTmdbTrendingList() {
    return tmdbApiRequest('trending/movie/day?language=en-US')
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

export { register, login, getUserWatchlist, addFilmToWatchlist, getUsersLists, getUsersListById, searchFilm, getFilmById, addMultiFilmsList, getTmdbPopularList, getTmdbTopRatedList, getTmdbTrendingList, addRating, getUserRating, getUserDiary }