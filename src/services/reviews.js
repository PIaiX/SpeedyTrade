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

export const getUserReviews = async (lotId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.REVIEW_LOTS}/${lotId}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const getUserReviewsByFilter = async (lotId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.REVIEW_LOTS_BY_FILTER}/${lotId}`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const deleteMyReview = async (reviewId) => {
    try {
        return await $authApi.delete(`${apiRoutes.REVIEW_ACTIONS}/${reviewId}`)
    } catch (error) {
        throw error
    }
}

export const editMyReview = async (reviewId, payload) => {
    try {
        return await $authApi.patch(`${apiRoutes.REVIEW_ACTIONS}/${reviewId}`, payload)
    } catch (error) {
        throw error
    }
}

export const createReview = async (payloads) => {
    try {
        return await $authApi.post(apiRoutes.REVIEW_ACTIONS, payloads)
    } catch (error) {
        throw error
    }
}
