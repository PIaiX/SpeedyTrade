import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        initTheme: (state) => {
            document.documentElement.dataset.theme = state.mode
        },
        switchTheme: (state) => {
            const isLight = state.mode === 'light'
            const faviconNode = document.getElementById('favicon')

            faviconNode.href = isLight ? 'favicon-dark.svg' : 'favicon-light.svg'
            state.mode = isLight ? 'dark' : 'light'
            document.documentElement.dataset.theme = isLight ? 'dark' : 'light'
        },
    },
})

export const {initTheme, switchTheme} = themeSlice.actions
export default themeSlice.reducer
