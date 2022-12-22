export const convertToLocaleDate = (date, forInput) => {
    if (forInput) {
        return date?.split('.').reverse().join('-')
    } else {
        return date && new Date(date).toLocaleDateString()
    }
}
