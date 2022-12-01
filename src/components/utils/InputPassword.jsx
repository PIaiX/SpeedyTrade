import React, {useState} from 'react'
import {FiEye, FiEyeOff} from 'react-icons/fi'

export default function InputPassword({visible, register, ...props}) {
    const [isVisible, setIsVisible] = useState(props.visible)

    return (
        <div className="password">
            <input type={isVisible ? 'text' : 'password'} autoComplete="new-password" {...register} {...props} />
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? <FiEye /> : <FiEyeOff />}
            </button>
        </div>
    )
}
