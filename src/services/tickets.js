import { $authApi } from './index'
import { apiRoutes } from '../config/api'
import { socketInstance } from './sockets/socketInstance'

export const getAllTickets = async (userId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.TICKET_ACTIONS}/${userId}?order=desc`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const createTicket = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('ticket:create', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const getAllTicketMessages = async (ticketId, payload) => {
    try {
        const response = await $authApi.get(
            `${apiRoutes.TICKET_MESSAGE_ACTIONS}/${ticketId}?page=${payload.page}&limit=${payload.limit}&orderBy=${payload.orderBy}`
        )
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const createTicketMessage = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('ticket:messageCreate', payloads, (response) => {
            try {
                console.log(response)
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}