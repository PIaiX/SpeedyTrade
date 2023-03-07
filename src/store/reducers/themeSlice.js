import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        initTheme: (state) => {
            const faviconNode = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

            faviconNode.forEach(function (element) {
                element.setAttribute('href', '/favicon-light.svg');
            });

            document.documentElement.dataset.theme = state.mode

        },
        switchTheme: (state) => {

            const isLight = state.mode === 'light'
            const faviconNode = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

            let img;
            faviconNode.href = isLight ? img = 'favicon-dark.svg' : img = 'favicon-light.svg'

            faviconNode.forEach(function (element) {
                element.setAttribute('href', '/' + img);
            });

            state.mode = isLight ? 'dark' : 'light'
            document.documentElement.dataset.theme = isLight ? 'dark' : 'light'


        },
    },
})

export const { initTheme, switchTheme } = themeSlice.actions
export default themeSlice.reducer
