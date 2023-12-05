import { apiRoutes } from '../config/api'
import { $authApi } from './index'

// const createTransaction = async (data) => {
//     const response = await $authApi.post(apiRoutes.ORDER_CREATE, data)
//     return response
// }
const getTransactions = async (data) => {
    const response = await $authApi.get(apiRoutes.TRANSACTION_GET_ALL, { params: data })
    return response?.data
}
const getTransaction = async (data) => {
    const response = await $authApi.get(apiRoutes.TRANSACTION_GET_ONE, { params: data })
    return response?.data
}

export { getTransactions, getTransaction }
