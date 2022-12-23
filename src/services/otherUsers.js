import $api from './index'
import {apiRoutes} from '../config/api'

export const getUserInformation = async (userId) => {
    try {
        const response = await $api.get(`${apiRoutes.USER_ACTIONS}/${userId}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}
