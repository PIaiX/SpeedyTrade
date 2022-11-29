const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    //auth
    AUTH_REGISTRATION: '/auth/login',
    AUTH_REGISTRATION_EMAIL_VERIFY: '/auth/forgotPassword/emailVerify',
    AUTH_REGISTRATION_CODE_VERIFY: '/auth/forgotPassword/codeVerify',
    AUTH_LOGIN: '/auth/login',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_REFRESH: '/auth/refresh',

    //catalog
    GET_GAMES_CATEGORIES: 'game/category',
    GET_PARAMS_CATEGORIES: 'game/category/parameter',
    ACTIONS_GAMES: 'game',
    GET_GAMES_PLATFORM: 'game/platform',
    GET_GAMES_SERVERS: 'game/server',
}

const apiResponseMessages = {}

const apiRejectMessages = {}

const apiErrors = {}

export default BASE_URL
export {apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
