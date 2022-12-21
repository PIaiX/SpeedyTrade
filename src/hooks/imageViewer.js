import {useEffect, useState} from 'react'

export const useImageViewer = (file) => {
    const [info, setInfo] = useState({
        data_url: null,
        height: null,
        width: null,
    })

    useEffect(() => {
        if (file) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                const result = e.target?.result
                if (result) {
                    setInfo((prevState) => {
                        return {
                            ...prevState,
                            data_url: result,
                        }
                    })
                }
            }
            fileReader.readAsDataURL(file)
        } else {
            setInfo(null)
        }
    }, [file])

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            if (img?.width && img?.height) {
                setInfo((prevState) => {
                    return {
                        ...prevState,
                        width: img.width,
                        height: img.height,
                    }
                })
            }
        }
        img.src = info?.data_url
    }, [info?.data_url])

    return info
}
