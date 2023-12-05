import {apiRoutes} from '../config/api'
import {$api} from './index'

const getDocuments = async () => {
    const response = await $api.get(apiRoutes.DOCUMENTS)
    return response?.data
}
const getDocument = async (link) => {
    const response = await $api.get(apiRoutes.DOCUMENT, {params: {link}})
    return response?.data
}

export {getDocuments, getDocument}
