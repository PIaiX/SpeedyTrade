import React from 'react'
import Loader from './Loader'

const LoaderButton = ({children, loaderProps, ...props}) => {
    return (
        <button type="button" {...props}>
            {children || <Loader {...loaderProps} />}
        </button>
    )
}

export default LoaderButton
