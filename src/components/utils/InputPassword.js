import React, {useState} from 'react'
import {FiEye, FiEyeOff} from 'react-icons/fi'

export default function InputPassword(props) {
    const [visible, setVisibility] = useState(props.visible)
    const handleClick = () => {
        visible ? setVisibility(false) : setVisibility(true)
    }

    return (
        <div className={'password ' + props.className}>
            <input
                type={visible ? 'text' : 'password'}
                name={props.name}
                autoComplete="current-password"
                minLength="8"
                maxLength="20"
                size="8"
                required
                value={props.value}
                onChange={props.onChange}
            />
            <button type="button" onClick={() => handleClick()}>
                {visible ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    )
}
