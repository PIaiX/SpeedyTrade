import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: '',
    avatar: '',
    message: '',
    conversation: '',
    isShow: false,
    unreadCount: '',
    saleCount: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.user = action?.payload?.userName
            state.avatar = action?.payload?.userAvatar
            state.message = action?.payload?.text
            state.conversation = action?.payload?.conversationId
            state.isShow = true
        },
        resetNotification: (state) => {
            state.user = initialState.user
            state.avatar = initialState.avatar
            state.message = initialState.message
            state.isShow = initialState.isShow
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action?.payload?.unreadCount
        },
        setSaleCount: (state, action) => {
            state.saleCount = action?.payload?.saleCount
        },
    },
})

export const {setNotification, resetNotification, setUnreadCount, setSaleCount} = notificationSlice.actions

export default notificationSlice.reducer
