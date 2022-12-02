import {apiValidationRules} from '../config/api'
import {validationErrorMessages} from '../config/validation'

const defineApiErrorByRule = (rule = true) => {
    switch (rule) {
        case apiValidationRules[rule]:
            return validationErrorMessages[rule]
        default:
            return null
    }
}

export {defineApiErrorByRule}
