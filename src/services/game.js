import { apiRoutes } from '../config/api'
import { $api } from './index'
import axios from 'axios';

const getGames = async () => {

    const response = await $api.get(apiRoutes.CATEGORIES)
    return response?.data

}
const getGame = async (data) => {

    const response = await $api.get(apiRoutes.CATEGORY, { params: data })
    return response?.data

}

export { getGames, getGame }
