import {BASE_URL_SOCKET} from '../../config/api'
import {io} from 'socket.io-client'

export let socketInstance

export const setSocketConnection = () => {
    socketInstance = io(`${BASE_URL_SOCKET}`, {
        auth: {token: `Bearer ${localStorage.getItem('token')}`},
    })
}
