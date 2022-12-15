import store from '../store'
import {setAlert} from '../store/reducers/alertSlice'
import {defineApiErrorByRule} from './error'

const dispatchAlert = (variant, message) => {
    store.dispatch(setAlert({variant, message}))
}

const dispatchApiErrorAlert = (error) => dispatchAlert('danger', defineApiErrorByRule(error))

export {dispatchAlert, dispatchApiErrorAlert}
