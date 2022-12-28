import {useEffect, useState} from 'react'
import {getOneLot} from '../../services/lots'

const useGetOneLot = (lotId) => {
    const [lot, setLot] = useState({
        isLoaded: false,
        item: {},
    })

    useEffect(() => {
        lotId &&
            getOneLot(lotId)
                .then((res) => setLot({isLoaded: true, item: res}))
                .catch(() => setLot({isLoaded: true, item: {}}))
    }, [lotId])

    return {lot}
}

export default useGetOneLot
