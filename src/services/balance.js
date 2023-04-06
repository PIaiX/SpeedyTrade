import { $authApi } from './index'
import { apiRoutes } from '../config/api'

export const getBalanceOperations = async (page) => {
    try {
        const response = await $authApi.get(`${apiRoutes.GET_OPERATIONS}${page}`)
        return response.data
    } catch (error) {
        throw error
    }
}
