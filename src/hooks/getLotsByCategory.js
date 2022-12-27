import {useEffect, useState} from 'react'
import {getLotsByCategory} from '../services/lots'

const useGetLotsByCategory = (currentCategoryId) => {
    const [lots, setLots] = useState({
        isLoaded: false,
        items: [],
        meta: {},
    })

    useEffect(() => {
        currentCategoryId &&
            getLotsByCategory(currentCategoryId)
                .then((res) => setLots({isLoaded: true, items: res?.data, meta: res?.meta}))
                .catch(() => setLots({isLoaded: true, items: [], meta: {}}))
    }, [currentCategoryId])

    return {lots}
}

export default useGetLotsByCategory
