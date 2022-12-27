import $api, {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const getSellerLots = async (sellerId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.LOTS_SELLER}/${sellerId}?page=1`)
        return response.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getLotsByCategory = async (categoryId) => {
    try {
        const response = await $api.get(`${apiRoutes.LOTS_ACTIONS}?categoryId=${categoryId}&page=1`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const getOneLot = async (lotId) => {
    try {
        const response = await $api.get(`${apiRoutes.LOTS_ACTIONS}/${lotId}`)
        return response.data?.body
    } catch (error) {
        console.log(error)
    }
}
