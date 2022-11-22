import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

export const loginInProfile = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.LOGIN}`, payloads, {
            headers: {'User-Fingerprint': localStorage.getItem('fingerprint')},
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}
