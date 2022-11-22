const loadPhoto = (path = '') =>
    path?.length
        ? path.includes('http')
            ? path
            : `https://api.speedytrade.ru/uploads/${path}`
        : '/imgs/photo-replacer.jpg'

export {loadPhoto}
