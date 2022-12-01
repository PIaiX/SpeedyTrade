const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    //auth
    AUTH_REGISTRATION: '/auth/register',
    AUTH_REGISTRATION_EMAIL_VERIFY: '/auth/register/emailVerify',
    AUTH_LOGIN: '/auth/login',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_REFRESH: '/auth/refreshToken',

    //catalog
    GET_GAMES_CATEGORIES: 'game/category',
    GET_PARAMS_CATEGORIES: 'game/category/parameter',
    ACTIONS_GAMES: 'game',
    GET_GAMES_PLATFORM: 'game/platform',
    GET_GAMES_SERVERS: 'game/server',
}

const apiResponseMessages = {}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
}

const apiErrors = {}

const apiValidationRules = {
    unique: 'unique',
}

export default BASE_URL
export {apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors, apiValidationRules}
