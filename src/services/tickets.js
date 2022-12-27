import {$authApi} from './index'
import {apiRoutes} from '../config/api'

export const getAllTickets = async (userId) => {
    try {
        const response = await $authApi.get(`${apiRoutes.TICKET_ACTIONS}/${userId}?order=desc`)
        return response.data?.body
    } catch (error) {
        throw error
    }
}

export const createTicket = async (payloads) => {
    try {
        const response = await $authApi.post(apiRoutes.TICKET_ACTIONS, payloads, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        return response.data
    } catch (error) {
        throw error
    }
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
    try {
        const response = await $authApi.post(apiRoutes.TICKET_MESSAGE_ACTIONS, payloads, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        return response.data?.body
    } catch (error) {
        throw error
    }
}
