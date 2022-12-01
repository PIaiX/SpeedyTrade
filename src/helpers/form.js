import {defineApiErrorByRule} from './error'

const validateFormFromApi = (error, setFormError) => {
    const errors = error?.response?.data?.errors?.errors || []

    errors?.length &&
        errors.forEach((item) => {
            const errorMessage = defineApiErrorByRule(item?.rule)

            errorMessage && setFormError(item?.field, {type: 'custom', message: errorMessage})
        })
}

export {validateFormFromApi}
