/*import {createAsyncThunk} from '@reduxjs/toolkit'
import {apiRoutes} from '../../config/api'
import {$api, $authApi} from '../index'

const login = createAsyncThunk('auth/login', async (payloads, thunkAPI) => {
    try {
        const response = await $api.post(apiRoutes.LOGIN, payloads)
        return response?.data?.body
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await $authApi.delete(apiRoutes.LOGOUT)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const refreshToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.REFRESH_TOKEN)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export {login}
*/
