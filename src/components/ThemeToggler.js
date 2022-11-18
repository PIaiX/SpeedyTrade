import React from 'react'
import {ThemeContext, themes} from '../contexts/ThemeContext'

function getFaviconEl() {
    return document.getElementById('favicon')
}

function ThemeToggler() {
    const changeToDark = () => {
        const favicon = getFaviconEl()
        favicon.href = 'favicon-dark.svg'
    }

    const changeToLight = () => {
        const favicon = getFaviconEl()
        favicon.href = 'favicon-light.svg'
    }

    return (
        <ThemeContext.Consumer>
            {({theme, setTheme}) => (
                <label className="themes-switcher">
                    <input
                        type="checkbox"
                        id="theme-switch"
                        onChange={() => {
                            if (theme === themes.light) {
                                setTheme(themes.dark)
                                changeToDark()
                            }
                            if (theme === themes.dark) {
                                setTheme(themes.light)
                                changeToLight()
                            }
                        }}
                        value={theme === themes.dark}
                        checked={theme === themes.dark}
                    />
                </label>
            )}
        </ThemeContext.Consumer>
    )
}

export default ThemeToggler
