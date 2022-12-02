import React from 'react'

const ValidateWrapper = ({children, error, className}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''} ${className ? className : ''}`}>
        {children}
        {error && <div className="validate-error">{error?.message}</div>}
    </div>
)

export default ValidateWrapper
