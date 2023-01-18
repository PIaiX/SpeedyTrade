import {socketInstance} from './socketInstance'

export const emitCreateMessage = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:create', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitCreateWithoutTopicMessage = async (toUserId, payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:createWithoutTopic', toUserId, payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitCreateWithOfferTopicMessage = async (toUserId, payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:createWithOfferTopic', toUserId, payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitViewedMessage = async (conversationId, userId) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:viewed', conversationId, userId, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitPaginateMessages = async (conversationId, payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:paginate', conversationId, payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitGetConversationWithUserId = async (userId) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('conversation:getByUserId', userId, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}
