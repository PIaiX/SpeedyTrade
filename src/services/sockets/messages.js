import { socketInstance } from './socketInstance'

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

export const emitViewedMessage = async (conversationId) => {
    // conversationId: { conversationId: number , userId: number }
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:viewed', conversationId, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const emitPaginateMessages = async (Id, payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('message:paginate', Id, payloads, (response) => {
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


export const emitCallForHelp = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('lots:callForHelp', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

// ------------------ Public Chat ---------------------------------------------

// interface CreatePublicMessage {
//     text: text,
//     attachedfile: file,
// }

export const emitCreatePublicMessage = async (payloads) => {
    //
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('pcmessage:create', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}

// interface PaginatePublicMessages {
//     limit: number,
//     page : number,
//     orderBy: 'asc' | 'desc'
// }

export const emitPaginatePublicMessages = async (payloads) => {
    return await new Promise((resolve, reject) => {
        socketInstance?.emit('pcmessage:paginate', payloads, (response) => {
            try {
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    })
}
