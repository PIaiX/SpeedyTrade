const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoutes = {
    //auth
    AUTH_REGISTRATION: '/auth/register',
    AUTH_REGISTRATION_EMAIL_VERIFY: '/auth/register/emailVerify',
    AUTH_LOGIN: '/auth/login',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_REFRESH: '/auth/refreshToken',

    //reset password
    RESET_PASSWORD_EMAIL_VERIFY: 'auth/forgotPassword/emailVerify',
    RESET_PASSWORD_CONFIRM: 'auth/forgotPassword',

    //user

    USER_UPDATE_PASSWORD: 'user/updatePassword',

    //catalog
    GET_GAMES_CATEGORIES: 'game/category',
    GET_PARAMS_CATEGORIES: 'game/category/parameter',
    ACTIONS_GAMES: 'game',
    GET_GAMES_PLATFORM: 'game/platform',
    GET_GAMES_SERVERS: 'game/server',

    //news
    NEWS_ACTION: 'news',

    //purchase
    GET_PURCHASE: 'lot/purchase/purchase',
    GET_SALE: 'lot/purchase/sale',
}

const apiResponseMessages = {}

const apiRejectMessages = {
    DEFAULT: 'Что-то пошло не так, повторите попытку позже',
}

const apiErrors = {}

const apiValidationRules = {
    required: 'Заполните поле',
    unique: 'unique',
}

export default BASE_URL
export {apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors, apiValidationRules}
