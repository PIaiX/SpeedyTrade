import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: '',
    avatar: '',
    message: '',
    conversation: '',
    isShow: false,
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
    },
})

export const {setNotification, resetNotification} = notificationSlice.actions

export default notificationSlice.reducer
