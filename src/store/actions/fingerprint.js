import {createAsyncThunk} from '@reduxjs/toolkit'
import fingerprint from '@fingerprintjs/fingerprintjs'
import {setFingerprint} from '../reducers/fingerprintSlice'

const initFingerprint = createAsyncThunk('fingerprint/init', async (_, thunkAPI) => {
    fingerprint
        .load()
        .then((fp) => fp.get())
        .then((result) => {
            if (result) {
                thunkAPI.dispatch(setFingerprint(result.visitorId))
            }
        })
})

export {initFingerprint}
