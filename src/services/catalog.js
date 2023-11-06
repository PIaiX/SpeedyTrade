import { apiRoutes } from '../config/api'
import { $api } from './index'

export const getCatalogAllGames = async () => {
    try {
        const response = await $api(apiRoutes.ACTIONS_GAMES)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
