import {apiRoutes} from '../config/api'
import {$authApi} from '.'

const getSearch = async (text) => {
    const response = await $authApi.get(apiRoutes.SEARCH_GET, {params: {text}})
    return response?.data
}

export {getSearch}
