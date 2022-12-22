import {convertToLocaleDate} from './convertToLocaleDate'

const groupBy = (arr, key, isDate) => {
    const initialValue = {}
    if (isDate) {
        return arr?.reduce((acc, cval) => {
            const myAttribute = cval[key] && convertToLocaleDate(cval[key])
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc
        }, initialValue)
    } else {
        return arr?.reduce((acc, cval) => {
            const myAttribute = cval[key]
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc
        }, initialValue)
    }
}
export default groupBy
