const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL_SOCKET = process.env.REACT_APP_BASE_URL_FOR_SOCKET

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
    USER_ACTIONS: 'user',
    USER_UPDATE_PASSWORD: 'user/updatePassword',

    //catalog
    GET_GAMES_CATEGORIES: 'game/category',
    GET_PARAMS_CATEGORIES: 'game/category/parameter',
    ACTIONS_GAMES: 'game',
    GET_GAMES_PLATFORM: 'game/platform',
    GET_GAMES_SERVERS: 'game/server',
    GET_GAMES_SERVERS_BY_GAME: 'game/server/bygame',
    GET_GAMES_REGIONS: 'game/region',
    SEARCH_GAMES: 'game/search',
    GET_GAMES_WHERE_I_HAVE_LOTS: 'game/whereIHaveLots',
    GET_GAMES_WHERE_USER_HAS_LOTS: 'game/whereUserHasLots',

    //banner
    GET_BANNER: 'banner',

    //lots
    GET_LOTS: 'lot',
    GET_LOT_REVIEWS: 'user/review/lot',

    //news
    NEWS_ACTION: 'news',

    //purchase
    GET_PURCHASE: 'lot/purchase/mypurchases',
    GET_SALE: 'lot/purchase/sale',

    //tickets
    TICKET_ACTIONS: 'ticket',
    TICKET_MESSAGE_ACTIONS: 'ticket/message',

    //reviews
    REVIEW_ACTIONS: 'user/review',
    REVIEW_LOTS: 'user/review/lot',
    REVIEW_LOTS_BY_FILTER: 'user/review/saler',

    //favorites
    FAVORITES_ACTIONS: 'user/favorite',

    //lots
    LOTS_SELLER: 'lot/purchase',
    LOTS_ACTIONS: 'lot',
    PURCHASE_LOT: 'lot/purchase',
    PURCHASE_CONFIRM: 'lot/purchase/confirm',

    //document
    GET_DOCUMENT: 'documents',

    GET_OPERATIONS: 'balance/operations'
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

export { BASE_API_URL, BASE_URL, BASE_URL_SOCKET }
export { apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors, apiValidationRules }
