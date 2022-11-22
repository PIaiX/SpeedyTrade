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
}

const apiResponseMessages = {}

const apiRejectMessages = {}

const apiErrors = {}

export {BASE_URL, apiRoutes, apiResponseMessages, apiRejectMessages, apiErrors}
