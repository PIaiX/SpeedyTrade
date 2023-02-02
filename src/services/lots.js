import {apiRoutes} from '../config/api'
import $api, {$authApi} from './index'

export const getGameLots = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_LOTS}/?gameId=${gameId}&page=1`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getUserLots = async (userId, page, perPage, gameId, serverId, platformId) => {
    try {
        const response = await $api(
            `${apiRoutes.GET_LOTS}/?userId=${userId}&page=${page}&limit=${perPage}&gameId=${gameId}&serverId=${serverId}&platformId=${platformId}`
        )
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

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

export const getLotsByCategoryRegionAndParams = async (regionId, categoryId, params, onlyOnline, query) => {
    try {
        const response = await $api.get(
            `${apiRoutes.LOTS_ACTIONS}?regionId=${regionId}&categoryId=${categoryId}&onlyOnline=${onlyOnline}&query=${query}&page=1&limit=10`,
            {
                params: {options: '[' + params + ']'},
            }
        )
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

export const getLot = async (id) => {
    try {
        const response = await $api(`${apiRoutes.GET_LOTS}/${id}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getLotReviews = async (id) => {
    try {
        const response = await $api(`${apiRoutes.GET_LOT_REVIEWS}/${id}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const postLot = async (payloads) => {
    try {
        const response = await $authApi.post(apiRoutes.GET_LOTS, payloads)
        return response?.data
    } catch (error) {
        return {status: 500, body: error}
    }
}

export const editLot = async (lotId, payloads) => {
    try {
        const response = await $authApi.patch(`${apiRoutes.GET_LOTS}/${lotId}`, payloads)
        return response?.data
    } catch (error) {
        return {status: 500, body: error}
    }
}
