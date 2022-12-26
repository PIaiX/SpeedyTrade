import $api from './index'
import {apiRoutes} from '../config/api'

export const getBanner = async () => {
    try {
        const response = await $api.get(apiRoutes.GET_BANNER)
        return response.data?.body
    } catch (error) {
        throw error
    }
}
