import ERR from '../Utils/error'

function handleRegister(email, password, username, firstName) {

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

}

function isEmailValid(email) {
    const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    return regEx.test(email)
}

export {
    handleRegister
}