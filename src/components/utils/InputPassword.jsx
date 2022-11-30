import React, {useState} from 'react'
import {FiEye, FiEyeOff} from 'react-icons/fi'

export default function InputPassword(props) {
    const [visible, setVisible] = useState(props.visible)

    return (
        <div className={'password ' + props.className}>
            <input
                type={visible ? 'text' : 'password'}
                name={props.name}
                className={props?.forInputClassName}
                autoComplete="new-password"
                {...props.register}
            />
            <button type="button" onClick={() => setVisible(!visible)}>
                {visible ? <FiEye /> : <FiEyeOff />}
            </button>
            {props?.errorMessage && <span className="validate-error">{props?.errorMessage}</span>}
        </div>
    )
}
