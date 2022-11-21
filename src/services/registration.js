import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

const emailVerify = async (email) => {
    try {
        return await axios.post(
            `${BASE_URL}${apiRoutes.REGISTRATION_EMAIL_VERIFY}`,
            {email},
            {
                headers: {
                    'User-Fingerprint': localStorage.getItem('fingerprint'),
                },
            }
        )
    } catch (error) {
        throw error
    }
}

const confirmRegistration = async (payloads) => {
    try {
        const res = await axios.post(`${BASE_URL}${apiRoutes.REGISTRATION}`, payloads, {
            headers: {
                'User-Fingerprint': localStorage.getItem('fingerprint'),
            },
        })
        return res?.data?.body
    } catch (error) {
        throw error
    }
}

export {emailVerify, confirmRegistration}
