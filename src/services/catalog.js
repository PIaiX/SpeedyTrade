import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

export const getCatalogAllGames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${apiRoutes.ACTIONS_GAMES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
