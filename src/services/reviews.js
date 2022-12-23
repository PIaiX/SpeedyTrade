import {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const getMyReviews = async (userId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.REVIEW_ACTIONS}/${userId}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const getUserReviews = async (userId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.REVIEW_LOTS}/${userId}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}
