import {useEffect, useState} from 'react'

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 991px)').matches)

    useEffect(() => {
        function updateView() {
            if (window.matchMedia('(max-width: 991px)').matches) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        updateView()
        window.addEventListener('resize', updateView)
        return () => window.removeEventListener('resize', updateView)
    }, [])

    return {isMobile}
}

export default useIsMobile
