import {apiRoutes, BASE_URL} from '../config/api'
import $api from './index'

export const getOneGame = async (slug) => {
    try {
        const response = await $api(`${apiRoutes.ACTIONS_GAMES}/${slug}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export const getGamePlatform = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_PLATFORM}/${gameId}`)
    } catch (error) {
        console.log(error)
    }
}

export const getGameServers = async (gameId) => {
    try {
        const response = await $api(`${apiRoutes.GET_GAMES_SERVERS}/${gameId}`)
    } catch (error) {
        console.log(error)
    }
}
