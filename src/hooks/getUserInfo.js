import {useEffect, useState} from 'react'
import {getUserInformation} from '../services/otherUsers'

const useGetUserInfo = (id) => {
    const [user, setUser] = useState({
        isLoaded: false,
        item: {},
    })

    useEffect(() => {
        getUserInformation(id)
            .then((res) => setUser({isLoaded: true, item: res}))
            .catch(() => setUser({isLoaded: true, item: {}}))
    }, [id])

    return {user}
}

export default useGetUserInfo
