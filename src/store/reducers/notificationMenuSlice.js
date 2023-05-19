import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../actions/auth'

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
        removeMessageNotification: (state, action) => {
            state.messages = state.messages.filter(el => el.conversationId !== action.payload)
            state.count = state.count - 1
        },
    },
    extraReducers: builder =>
        builder
            .addCase(logout.fulfilled, (state) => {
                state.messages = initialState.messages
                state.count = initialState.count
            })
})

export const { addNotification, clearNotifications, removeMessageNotification } = notificationMenuSlice.actions

export default notificationMenuSlice.reducer
