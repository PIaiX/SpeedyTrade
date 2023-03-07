import { apiRoutes } from '../config/api'
import $api, { $authApi } from './index'

export const resetPasswordEmailVerify = async (payloads) => {
    try {
        await $api.post(`${apiRoutes.RESET_PASSWORD_EMAIL_VERIFY}`, payloads)
    } catch (error) {
        throw error
    }
}

export const resetPasswordConfirm = async (payloads) => {
    try {
        await $api.post(`${apiRoutes.RESET_PASSWORD_CONFIRM}`, payloads)
    } catch (error) {
        throw error
    }
}
