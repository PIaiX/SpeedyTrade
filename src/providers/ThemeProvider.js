import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext, themes } from '../contexts/ThemeContext';
import { setTheme as setThemeAction } from '../store/reducers/themeActions';


const getTheme = (state) => {
  const theme = state.theme;
  if (Object.values(themes).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  return userMedia.matches ? themes.light : themes.dark;
};

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => getTheme(state));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    dispatch(setThemeAction(theme));
  }, [dispatch, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: theme => dispatch(setThemeAction(theme)) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;