import BASE_URL from '../config/api'

const getImageURL = (path = '') => {
    if (path && path?.length) {
        return `${BASE_URL}/${path}`
    } else return `/images/no-photo.jpg`
}

export {getImageURL}
