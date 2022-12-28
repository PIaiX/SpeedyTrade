import {useEffect, useState} from 'react'
import {getBanner} from '../../services/banner'

const useGetBanner = () => {
    const [banner, setBanner] = useState({
        isLoaded: false,
        items: null,
    })

    useEffect(() => {
        getBanner()
            .then((res) => setBanner({isLoaded: true, items: res}))
            .catch(() => setBanner({isLoaded: true, items: null}))
    }, [])

    return {banner}
}

export default useGetBanner
