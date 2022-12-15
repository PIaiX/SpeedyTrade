import BASE_URL from '../config/api'

const getImageURL = (path = '') => {
    if (path.includes('http')) {
        return path
    } else if (path) {
        return `${BASE_URL}/${path}`
    } else {
        return `/images/no-photo.jpg`
    }
}

export {getImageURL}
