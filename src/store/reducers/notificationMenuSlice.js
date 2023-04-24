import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    count: 0
}

const notificationMenuSlice = createSlice({
    name: 'notificationMenu',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.messages = [...state.messages, action.payload]
            state.count = state.count + 1
        },
        clearNotifications: (state) => {
            state.messages = initialState.messages
            state.count = initialState.count
        },
    },
})

export const { addNotification, clearNotifications } = notificationMenuSlice.actions

export default notificationMenuSlice.reducer
