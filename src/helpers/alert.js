import store from '../store'
import {setAlert} from '../store/reducers/alertSlice'
import {defineErrorByType} from './error'

const dispatchAlert = (variant, message) => {
    store.dispatch(setAlert({variant, message}))
}

const dispatchApiErrorAlert = (error) => dispatchAlert('danger', defineErrorByType(error))

export {dispatchAlert, dispatchApiErrorAlert}
