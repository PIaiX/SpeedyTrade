import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [],
    pagination: {},
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleFavoriteSync: (state, action) => {
            if (action?.payload) {
                const isFavorite = state.items.find((item) => item?.id === action?.payload?.id)
                if (isFavorite) {
                    state.items = state.items.filter((item) => item?.id !== isFavorite?.id) || []
                } else {
                    state.items.push({...action?.payload})
                }
            }
        },
        updateFavoriteAll: (state, action) => {
            if (action?.payload?.length > 0) {
                state.items = action?.payload
            }
        },
        resetFavoriteSync: (state) => {
            state.items = []
            state.pagination = {}
        },
    },
})

export const {toggleFavoriteSync, updateFavoriteAll, resetFavoriteSync} = favoriteSlice.actions
export default favoriteSlice.reducer
