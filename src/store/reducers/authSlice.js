import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
    isAuth: false,
    user: null,
}
/*
export const login = createAsyncThunk('auth/login', async (payloads, thunkAPI) => {
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

export const refreshToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    try {
        const response = await $api.get(apiRoutes.REFRESH_TOKEN)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})*/

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
    },
    /*extraReducers: (builder) => {
        builder
            .addCase(login?.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token)
                state.isLoadingLogin = false
                state.isAuth = true
                state.user = action.payload.user
            })
            .addCase(login?.rejected, (state) => {
                state.isLoadingLogin = false
            })
            .addCase(login?.pending, (state) => {
                state.isLoadingLogin = true
            })
            .addCase(logout?.fulfilled, (state) => {
                localStorage.removeItem('token')
                state.isAuth = false
                state.user = null
            })
            .addCase(logout?.rejected, (state) => {
                localStorage.removeItem('token')
                state.isAuth = false
                state.user = null
            })
            .addCase(refreshToken?.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token)
                state.isLoadingRefresh = false
                state.isAuth = true
                state.user = action.payload.user
            })
            .addCase(refreshToken?.rejected, (state) => {
                localStorage.removeItem('token')
                state.isLoadingRefresh = false
            })
    },*/
})

export const {setUser, setLoadingRefresh} = authSlice.actions
