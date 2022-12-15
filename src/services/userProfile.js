import {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const updatePassword = async (payloads, userId) => {
    try {
        await $authApi.patch(`${apiRoutes.USER_UPDATE_PASSWORD}/${userId}`, payloads)
    } catch (error) {
        throw error
    }
}
