import { $authApi } from '.'
import { apiRoutes } from '../config/api'

const isPromo = async (data) => {
    const response = await $authApi.post(apiRoutes.GET_PROMO, data)
    return response
}

export { isPromo }
