import {createAsyncThunk} from '@reduxjs/toolkit'
import {$authApi} from './index'
import {apiRoutes} from '../config/api'
import {toggleFavoriteSync, updateFavoriteAll} from '../store/reducers/favoriteSlice'

const getFavorites = createAsyncThunk('favorite', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth

    if (isAuth) {
        try {
            const response = await $authApi.get(apiRoutes.FAVORITES, {params: payloads})
            if (response?.data?.items) {
                thunkAPI.dispatch(updateFavoriteAll(response.data.items))
                return response?.data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

const toggleFavorite = createAsyncThunk('favorite', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth

    thunkAPI.dispatch(toggleFavoriteSync(payloads))

    if (isAuth) {
        try {
            const response = await $authApi.put(apiRoutes.FAVORITES, {productId: payloads?.id})
            return response?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export {getFavorites, toggleFavorite}
