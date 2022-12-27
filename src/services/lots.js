import {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const getSellerLots = async (sellerId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.LOTS_SELLER}/${sellerId}?page=1`)
        return response.data?.body
    } catch (error) {
        console.log(error)
    }
}
