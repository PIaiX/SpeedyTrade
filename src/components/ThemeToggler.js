import React from 'react'
import { ThemeContext, themes } from '../contexts/ThemeContext'

function ThemeToggler(props) {
    return (
        <ThemeContext.Consumer>
            {({ theme, setTheme }) => (
                <label className='themes-switcher'>
                    <input type='checkbox' id="theme-switch" onChange={() => {
                        if (theme === themes.light) setTheme(themes.dark)
                        if (theme === themes.dark) setTheme(themes.light)
                    }}
                    value={theme === themes.dark} defaultChecked={true}/>
                </label>
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemeToggler;