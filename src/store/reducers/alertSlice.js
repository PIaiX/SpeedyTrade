import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    variant: '',
    message: '',
    isShow: false,
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.variant = action?.payload?.variant
            state.message = action?.payload?.message
            state.isShow = true
        },
        resetAlert: (state) => {
            state.variant = initialState.variant
            state.message = initialState.message
            state.isShow = initialState.isShow
        },
    },
})

export const {setAlert, resetAlert} = alertSlice.actions

export default alertSlice.reducer
