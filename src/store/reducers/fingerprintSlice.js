import {createSlice} from '@reduxjs/toolkit'
import fingerprint from '@fingerprintjs/fingerprintjs'

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
