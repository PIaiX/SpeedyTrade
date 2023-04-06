import $api from './index'
import {apiRoutes} from '../config/api'

export const getDocument = async (id='') => {
    try {
        const response = await $api.get(`${apiRoutes.GET_DOCUMENT}/${id}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}
