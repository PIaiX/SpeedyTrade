import {apiRoutes} from '../config/api'
import $api, {$authApi} from './index'

export const getAllGames = async () => {
    try {
        const response = await $api(`${apiRoutes.ACTIONS_GAMES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getOneGame = async (slug) => {
    try {
        const response = await $authApi.get(`${apiRoutes.ACTIONS_GAMES}/${slug}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGamePlatform = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_PLATFORM}/${gameId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGameRegions = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_REGIONS}/${gameId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGameServersByGameID = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_SERVERS_BY_GAME}/${gameId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGameServers = async (regionId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_SERVERS}/${regionId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
export const getCategories = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_CATEGORIES}/${gameId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getCategoryParameters = async (categoryId) => {
    try {
        const response = await $api(`${apiRoutes.GET_PARAMS_CATEGORIES}/${categoryId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGoldParameters = async (categoryId) => {
    try {
        const response = await $api(`${apiRoutes.GET_PARAMS_CATEGORIES}/${categoryId}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
