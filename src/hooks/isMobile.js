import { useEffect, useState } from 'react'

const useIsMobile = (width) => {
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: ' + width + ')').matches)

    useEffect(() => {
        function updateView() {
            if (window.matchMedia('(max-width: ' + width + ')').matches) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', updateView)
        updateView()
        return () => window.removeEventListener('resize', updateView)
    })

    return isMobile
}

export default useIsMobile