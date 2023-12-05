export const SET_THEME = 'SET_THEME';

export const setTheme = (theme) => {
    return {
        type: SET_THEME,
        payload: theme
    };
};