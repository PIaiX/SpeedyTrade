import {socketInstance} from './socketInstance'

export const emitPaginateConversation = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:paginate', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitGetConversation = async (conversationId) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:get', conversationId, (response) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitCloseConversation = async (conversationId) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:close', conversationId, (response) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitDeleteConversation = async (conversationId) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:delete', conversationId, (response) => {
            try {
                resolve(response?.body)
            } catch (e) {
                reject(e)
            }
        })
    })
}
