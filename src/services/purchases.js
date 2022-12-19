import {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const getPurchases = async (payload, userId) => {
    try {
        const response = await $authApi.get(
            `${apiRoutes.GET_PURCHASE}/${userId}?page=${payload.page}&limit=${payload.limit}&orderBy=desc`
        )
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const getSale = async (payload, userId) => {
    try {
        const response = await $authApi.get(
            `${apiRoutes.GET_SALE}/${userId}?page=${payload.page}&limit=${payload.limit}&orderBy=desc`
        )
        return response.data?.body
    } catch (error) {
        throw error
    }
}
