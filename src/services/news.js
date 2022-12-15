import axios from 'axios'
import BASE_URL, {apiRoutes} from '../config/api'

export const getAllNews = async (payloads) => {
    try {
        const response = await axios.get(
            `${BASE_URL}${apiRoutes.NEWS_ACTION}?page=${payloads.page}&limit=${payloads.limit}&orderBy=${
                payloads?.orderBy || ''
            }`
        )
        return response?.data?.body
    } catch (error) {
        throw error
    }
}

export const getOneNews = async (slug) => {
    try {
        const response = await axios.get(`${BASE_URL}${apiRoutes.NEWS_ACTION}/${slug}`)
        return response?.data?.body
    } catch (error) {
        throw error
    }
}
