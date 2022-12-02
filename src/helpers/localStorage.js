const getLocalStorageItem = (field = '') => {
    return JSON.parse(localStorage.getItem(field))
}

export {getLocalStorageItem}
