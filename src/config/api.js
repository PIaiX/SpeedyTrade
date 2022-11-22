const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    //auth
    LOGIN: 'auth/login',
    REFRESH_TOKEN: 'auth/refreshToken',
    LOGOUT: 'auth/logout',
    FORGOT_PASSWORD_EMAIL_VERIFY: 'auth/forgotPassword/emailVerify',
    CONFIRM_FORGOT_PASSWORD: 'auth/forgotPassword',
    REGISTRATION: 'auth/register',
    REGISTRATION_EMAIL_VERIFY: 'auth/register/emailVerify',

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

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
