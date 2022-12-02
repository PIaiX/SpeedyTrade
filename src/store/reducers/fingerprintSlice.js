import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

const fingerprintSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFingerprint: (state, action) => {
            state.value = action?.payload
        },
    },
})

export const {setFingerprint} = fingerprintSlice.actions

export default fingerprintSlice.reducer
