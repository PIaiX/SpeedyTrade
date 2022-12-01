import React from 'react'

const ValidateWrapper = ({children, error}) => (
    <div className={`validate-wrapper ${error ? 'validate-wrapper_error' : ''}`}>
        {children}
        {error && <div className="validate-error">{error?.message}</div>}
    </div>
)

export default ValidateWrapper
